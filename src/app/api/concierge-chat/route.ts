import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";

async function sendWebhook(url: string | undefined, payload: unknown): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-blocking
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const sessionKey = String(body.sessionKey || "").slice(0, 120);
    const visitorMessage = String(body.visitorMessage || "")
      .replace(/[<>]/g, "")
      .slice(0, 3000);
    const assistantReply = String(body.assistantReply || "")
      .replace(/[<>]/g, "")
      .slice(0, 3000);
    const highValue = Boolean(body.highValue);

    if (!sessionKey || !visitorMessage) {
      return NextResponse.json(
        { ok: false, error: "Missing chat session data." },
        { status: 400 }
      );
    }

    const db = getSupabaseAdmin();

    // Upsert session
    let { data: session } = await db
      .from("ai_concierge_sessions")
      .select("id, high_value_flag, crm_alert_sent")
      .eq("session_key", sessionKey)
      .single();

    if (!session) {
      const created = await db
        .from("ai_concierge_sessions")
        .insert({ session_key: sessionKey, high_value_flag: highValue })
        .select("id, high_value_flag, crm_alert_sent")
        .single();
      session = created.data;
    }

    if (!session) {
      return NextResponse.json(
        { ok: false, error: "Unable to create chat session." },
        { status: 500 }
      );
    }

    // Log both messages
    await db.from("ai_concierge_messages").insert([
      {
        session_id: session.id,
        role: "visitor",
        message: visitorMessage,
        lead_signal_score: highValue ? 75 : 20,
        metadata: {
          source: body.source,
          page: body.page,
          referrer: body.referrer,
        },
      },
      {
        session_id: session.id,
        role: "assistant",
        message: assistantReply,
        lead_signal_score: highValue ? 75 : 20,
        metadata: { generated_by: "local_service_routing_or_rag_model" },
      },
    ]);

    // Fire CRM alert once per session for high-value signals
    if (highValue && !session.crm_alert_sent) {
      await db
        .from("ai_concierge_sessions")
        .update({ high_value_flag: true, handoff_requested: true, crm_alert_sent: true })
        .eq("id", session.id);

      await sendWebhook(process.env.CRM_WEBHOOK_URL, {
        event: "high_value_ai_concierge_interaction",
        sessionKey,
        visitorMessage,
        page: body.page,
        recommendation: "Prioritize private consultation follow-up.",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Concierge chat error:", err);
    return NextResponse.json(
      { ok: false, error: "Unable to process concierge chat." },
      { status: 500 }
    );
  }
}
