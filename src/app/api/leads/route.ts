import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { cleanText, isEmail } from "@/lib/sanitize";
import { scoreLead } from "@/lib/leadScoring";
import { appendLeadToGoogleSheet } from "@/lib/sheetsFallback";

async function sendWebhook(url: string | undefined, payload: unknown): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Webhook failures must not block the lead insert
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const raw = await req.json();

    // Honeypot — if populated, silently accept but do nothing
    if (raw.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const input = {
      fullName: cleanText(raw.fullName, 160),
      email: cleanText(raw.email, 240).toLowerCase(),
      phone: cleanText(raw.phone, 80),
      company: cleanText(raw.company, 160),
      roleTitle: cleanText(raw.roleTitle, 160),
      country: cleanText(raw.country, 120),
      clientCategory: cleanText(raw.clientCategory, 160),
      estimatedBudgetRange: cleanText(raw.estimatedBudgetRange, 120),
      desiredPhase: cleanText(raw.desiredPhase, 120),
      urgency: cleanText(raw.urgency, 120),
      executiveContextSummary: cleanText(raw.executiveContextSummary, 4000),
      operationalPainPoints: cleanText(raw.operationalPainPoints, 4000),
      requestedOutcome: cleanText(raw.requestedOutcome, 4000),
      consentPrivacy: Boolean(raw.consentPrivacy),
      consentContact: Boolean(raw.consentContact),
      encryptedPayload: raw.encryptedPayload ?? null,
      referrer: cleanText(raw.referrer, 500),
      utmSource: cleanText(raw.utmSource, 160),
      utmMedium: cleanText(raw.utmMedium, 160),
      utmCampaign: cleanText(raw.utmCampaign, 160),
      userAgent: cleanText(req.headers.get("user-agent"), 500),
      ipRegion:
        cleanText(req.headers.get("x-vercel-ip-country"), 50) ||
        cleanText(req.headers.get("cf-ipcountry"), 50),
    };

    // Server-side validation
    if (!input.fullName || !isEmail(input.email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid name and email address." },
        { status: 400 }
      );
    }
    if (!input.consentPrivacy || !input.consentContact) {
      return NextResponse.json(
        { ok: false, error: "Consent is required before submitting an inquiry." },
        { status: 400 }
      );
    }
    if (!input.clientCategory || !input.estimatedBudgetRange || !input.desiredPhase || !input.urgency) {
      return NextResponse.json(
        { ok: false, error: "Please complete all required selection fields." },
        { status: 400 }
      );
    }
    if (input.executiveContextSummary.length < 10 || input.operationalPainPoints.length < 10 || input.requestedOutcome.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Please provide meaningful detail in the text fields." },
        { status: 400 }
      );
    }

    const scoring = scoreLead({
      clientCategory: input.clientCategory,
      estimatedBudgetRange: input.estimatedBudgetRange,
      desiredPhase: input.desiredPhase,
      urgency: input.urgency,
      roleTitle: input.roleTitle,
      operationalPainPoints: input.operationalPainPoints,
    });

    const { data, error } = await getSupabaseAdmin()
      .from("executive_concierge_leads")
      .insert({
        status: scoring.highValue ? "high_value" : "new",
        source: "website_form",
        full_name: input.fullName,
        email: input.email,
        phone: input.phone || null,
        company: input.company || null,
        role_title: input.roleTitle || null,
        country: input.country || null,
        client_category: input.clientCategory,
        estimated_budget_range: input.estimatedBudgetRange,
        desired_phase: input.desiredPhase,
        urgency: input.urgency,
        executive_context_summary: input.executiveContextSummary,
        operational_pain_points: input.operationalPainPoints,
        requested_outcome: input.requestedOutcome,
        consent_privacy: input.consentPrivacy,
        consent_contact: input.consentContact,
        lead_score: scoring.score,
        high_value_flag: scoring.highValue,
        encrypted_payload: input.encryptedPayload ?? null,
        encryption_mode: input.encryptedPayload ? "client_hybrid_rsa_oaep_aes_gcm" : "server_encrypted",
        referrer: input.referrer || null,
        utm_source: input.utmSource || null,
        utm_medium: input.utmMedium || null,
        utm_campaign: input.utmCampaign || null,
        user_agent: input.userAgent || null,
        ip_region: input.ipRegion || null,
      })
      .select("id, lead_score, high_value_flag")
      .single();

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "Unable to save inquiry securely. Please try again." },
        { status: 500 }
      );
    }

    // Lead event log
    await getSupabaseAdmin().from("executive_concierge_lead_events").insert({
      lead_id: data.id,
      event_type: "lead_created",
      event_payload: {
        score: scoring.score,
        highValue: scoring.highValue,
        desiredPhase: input.desiredPhase,
        source: "website_form",
      },
    });

    // High-value webhooks (fire-and-forget)
    if (scoring.highValue) {
      const webhookPayload = {
        event: "high_value_executive_lead",
        leadId: data.id,
        name: input.fullName,
        email: input.email,
        company: input.company,
        roleTitle: input.roleTitle,
        clientCategory: input.clientCategory,
        desiredPhase: input.desiredPhase,
        score: scoring.score,
        urgency: input.urgency,
      };

      await Promise.all([
        sendWebhook(process.env.CRM_WEBHOOK_URL, webhookPayload),
        sendWebhook(process.env.GMAIL_ALERT_WEBHOOK_URL, {
          subject: "High-Value Executive AI Concierge Inquiry",
          body: `A high-value inquiry was submitted by ${input.fullName} from ${input.company || "an undisclosed organization"}. Desired phase: ${input.desiredPhase}. Lead score: ${scoring.score}.`,
        }),
      ]);
    }

    // Google Sheets fallback
    await appendLeadToGoogleSheet({
      leadId: data.id,
      createdAt: new Date().toISOString(),
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      company: input.company,
      roleTitle: input.roleTitle,
      country: input.country,
      clientCategory: input.clientCategory,
      estimatedBudgetRange: input.estimatedBudgetRange,
      desiredPhase: input.desiredPhase,
      urgency: input.urgency,
      executiveContextSummary: input.executiveContextSummary,
      operationalPainPoints: input.operationalPainPoints,
      requestedOutcome: input.requestedOutcome,
      leadScore: scoring.score,
      highValue: scoring.highValue,
      source: "website_form",
    });

    return NextResponse.json({
      ok: true,
      leadId: data.id,
      highValue: scoring.highValue,
      message: "Your private inquiry has been received securely.",
    });
  } catch (err) {
    console.error("Lead route unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected submission error. Please try again." },
      { status: 500 }
    );
  }
}
