import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { cleanText } from "@/lib/sanitize";
import { scoreAssessment, type AssessmentAnswers } from "@/lib/assessmentScoring";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const raw = await req.json();
    const resumeToken = cleanText(raw.resumeToken, 200);

    if (!resumeToken) {
      return NextResponse.json({ ok: false, error: "Resume token is required." }, { status: 400 });
    }

    const db = getSupabaseAdmin();

    const { data: respondent, error: respondentError } = await db
      .from("executive_concierge_assessment_respondents")
      .select("id")
      .eq("resume_token", resumeToken)
      .single();

    if (respondentError || !respondent) {
      return NextResponse.json({ ok: false, error: "Assessment session not found." }, { status: 404 });
    }

    const { data: responses } = await db
      .from("executive_concierge_assessment_responses")
      .select("section_key, answers")
      .eq("respondent_id", respondent.id);

    const answers: Record<string, AssessmentAnswers> = {};
    for (const row of responses ?? []) {
      answers[row.section_key] = row.answers as AssessmentAnswers;
    }

    const scores = scoreAssessment(answers);

    return NextResponse.json({ ok: true, scores });
  } catch (err) {
    console.error("Assessment preview unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error computing preview." }, { status: 500 });
  }
}
