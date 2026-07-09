import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseServer";
import { cleanText } from "@/lib/sanitize";
import { scoreAssessment, type AssessmentAnswers } from "@/lib/assessmentScoring";
import { sendWebhook } from "@/lib/webhook";

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
      .select("id, full_name, email, executive_type, industry")
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

    const { error: scoreError } = await db
      .from("executive_concierge_assessment_scores")
      .upsert(
        {
          respondent_id: respondent.id,
          operations_score: scores.operationsScore,
          ai_readiness_score: scores.aiReadinessScore,
          hours_recoverable_per_week: scores.hoursRecoverablePerWeek,
          top_bottlenecks: scores.topBottlenecks,
          top_automation_opportunities: scores.topAutomationOpportunities,
          recommended_phase: scores.recommendedPhase,
          recommend_consultation: scores.recommendConsultation,
          recommended_services: scores.recommendedServices,
          suggested_next_step: scores.suggestedNextStep,
        },
        { onConflict: "respondent_id" }
      );

    if (scoreError) {
      console.error("Assessment complete score insert error:", scoreError.message);
      return NextResponse.json({ ok: false, error: "Unable to compute your results." }, { status: 500 });
    }

    await db
      .from("executive_concierge_assessment_respondents")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", respondent.id);

    if (scores.recommendConsultation) {
      await sendWebhook(process.env.ASSESSMENT_CONSULTATION_WEBHOOK_URL, {
        event: "high_intent_assessment_completed",
        respondentId: respondent.id,
        fullName: respondent.full_name,
        email: respondent.email,
        executiveType: respondent.executive_type,
        recommendedPhase: scores.recommendedPhase,
        operationsScore: scores.operationsScore,
        aiReadinessScore: scores.aiReadinessScore,
      });
    }

    return NextResponse.json({ ok: true, scores });
  } catch (err) {
    console.error("Assessment complete unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error completing assessment." }, { status: 500 });
  }
}
