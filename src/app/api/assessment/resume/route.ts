import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { cleanText } from "@/lib/sanitize";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const token = cleanText(req.nextUrl.searchParams.get("token"), 200);

    if (!token) {
      return NextResponse.json({ ok: false, error: "Resume token is required." }, { status: 400 });
    }

    const db = getSupabaseAdmin();

    const { data: respondent, error: respondentError } = await db
      .from("executive_concierge_assessment_respondents")
      .select("id, resume_token, status, current_step")
      .eq("resume_token", token)
      .single();

    if (respondentError || !respondent) {
      return NextResponse.json({ ok: false, error: "Assessment session not found." }, { status: 404 });
    }

    const { data: responses } = await db
      .from("executive_concierge_assessment_responses")
      .select("section_key, answers")
      .eq("respondent_id", respondent.id);

    const answers: Record<string, unknown> = {};
    for (const row of responses ?? []) {
      answers[row.section_key] = row.answers;
    }

    return NextResponse.json({
      ok: true,
      status: respondent.status,
      currentStep: respondent.current_step,
      answers,
    });
  } catch (err) {
    console.error("Assessment resume unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error resuming assessment." }, { status: 500 });
  }
}
