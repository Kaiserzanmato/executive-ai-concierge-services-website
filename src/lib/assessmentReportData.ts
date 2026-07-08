import { getSupabaseAdmin } from "./supabaseServer";
import type { ReportData } from "./assessmentReports";
import type { AssessmentScoreResult } from "./assessmentScoring";

export async function loadReportData(resumeToken: string): Promise<ReportData | null> {
  const db = getSupabaseAdmin();

  const { data: respondent, error: respondentError } = await db
    .from("executive_concierge_assessment_respondents")
    .select("id, full_name, email, executive_type, industry, company_size, income_range, completed_at")
    .eq("resume_token", resumeToken)
    .single();

  if (respondentError || !respondent) return null;

  const { data: scoreRow, error: scoreError } = await db
    .from("executive_concierge_assessment_scores")
    .select(
      "operations_score, ai_readiness_score, hours_recoverable_per_week, top_bottlenecks, top_automation_opportunities, recommended_phase, recommend_consultation"
    )
    .eq("respondent_id", respondent.id)
    .single();

  if (scoreError || !scoreRow) return null;

  const scores: AssessmentScoreResult = {
    operationsScore: scoreRow.operations_score,
    aiReadinessScore: scoreRow.ai_readiness_score,
    hoursRecoverablePerWeek: Number(scoreRow.hours_recoverable_per_week),
    topBottlenecks: scoreRow.top_bottlenecks ?? [],
    topAutomationOpportunities: scoreRow.top_automation_opportunities ?? [],
    recommendedPhase: scoreRow.recommended_phase,
    recommendConsultation: scoreRow.recommend_consultation,
  };

  return {
    respondent: {
      fullName: respondent.full_name ?? undefined,
      email: respondent.email ?? undefined,
      executiveType: respondent.executive_type ?? undefined,
      industry: respondent.industry ?? undefined,
      companySize: respondent.company_size ?? undefined,
      incomeRange: respondent.income_range ?? undefined,
    },
    scores,
    generatedAt: respondent.completed_at || new Date().toISOString(),
  };
}
