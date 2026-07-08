import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { cleanText } from "@/lib/sanitize";
import { sendWebhook } from "@/lib/webhook";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const raw = await req.json();
    const resumeToken = cleanText(raw.resumeToken, 200);
    const preferredContactMethod = cleanText(raw.preferredContactMethod, 80);
    const preferredTiming = cleanText(raw.preferredTiming, 120);
    const notes = cleanText(raw.notes, 2000);

    if (!resumeToken) {
      return NextResponse.json({ ok: false, error: "Resume token is required." }, { status: 400 });
    }

    const db = getSupabaseAdmin();

    const { data: respondent, error: respondentError } = await db
      .from("executive_concierge_assessment_respondents")
      .select("id, full_name, email, executive_type")
      .eq("resume_token", resumeToken)
      .single();

    if (respondentError || !respondent) {
      return NextResponse.json({ ok: false, error: "Assessment session not found." }, { status: 404 });
    }

    const { error: insertError } = await db.from("executive_concierge_consultation_requests").insert({
      respondent_id: respondent.id,
      preferred_contact_method: preferredContactMethod || null,
      preferred_timing: preferredTiming || null,
      notes: notes || null,
    });

    if (insertError) {
      console.error("Consultation request insert error:", insertError.message);
      return NextResponse.json({ ok: false, error: "Unable to submit your request." }, { status: 500 });
    }

    await sendWebhook(process.env.ASSESSMENT_CONSULTATION_WEBHOOK_URL, {
      event: "assessment_consultation_requested",
      respondentId: respondent.id,
      fullName: respondent.full_name,
      email: respondent.email,
      executiveType: respondent.executive_type,
      preferredContactMethod,
      preferredTiming,
    });

    return NextResponse.json({ ok: true, message: "Your consultation request has been received." });
  } catch (err) {
    console.error("Consultation request unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error submitting request." }, { status: 500 });
  }
}
