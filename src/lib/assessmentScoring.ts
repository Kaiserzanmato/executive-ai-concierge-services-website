export type AssessmentAnswers = Record<string, unknown>;

export interface AssessmentScoreResult {
  operationsScore: number;
  aiReadinessScore: number;
  hoursRecoverablePerWeek: number;
  topBottlenecks: string[];
  topAutomationOpportunities: string[];
  recommendedPhase: 1 | 2 | 3 | 4;
  recommendConsultation: boolean;
}

function num(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : parseFloat(String(value));
  return Number.isFinite(n) ? n : fallback;
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function bool(value: unknown): boolean {
  return value === true;
}

function record(value: unknown): Record<string, number> {
  return value && typeof value === "object" ? (value as Record<string, number>) : {};
}

function list(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function rankBySeverity(items: string[], severity: Record<string, number>, take = 3): string[] {
  return [...items]
    .sort((a, b) => (severity[b] ?? 3) - (severity[a] ?? 3))
    .slice(0, take);
}

export function scoreAssessment(answers: Record<string, AssessmentAnswers>): AssessmentScoreResult {
  const profile = answers.executive_profile ?? {};
  const timeAudit = answers.time_audit ?? {};
  const bottlenecks = answers.operational_bottlenecks ?? {};
  const automation = answers.ai_automation_opportunities ?? {};
  const eaSection = answers.executive_assistant ?? {};
  const aiComfort = answers.ai_comfort_level ?? {};
  const approval = answers.human_approval_preferences ?? {};
  const techStack = answers.technology_stack ?? {};
  const security = answers.security_privacy ?? {};
  const consultation = answers.consultation_preferences ?? {};

  // ── Time audit ──────────────────────────────────────────────
  const totalHoursLost =
    num(timeAudit.hoursPerWeekCalendar) +
    num(timeAudit.hoursPerWeekInbox) +
    num(timeAudit.hoursPerWeekMeetingPrep) +
    num(timeAudit.hoursPerWeekTravel) +
    num(timeAudit.hoursPerWeekAdminOther);

  // ── Bottlenecks ─────────────────────────────────────────────
  const bottleneckItems = list(bottlenecks.bottlenecks);
  const bottleneckSeverity = record(bottlenecks.severity);
  const avgSeverity =
    bottleneckItems.length > 0
      ? bottleneckItems.reduce((sum, b) => sum + (bottleneckSeverity[b] ?? 3), 0) / bottleneckItems.length
      : 3;

  // ── Automation opportunities ────────────────────────────────
  const opportunityItems = list(automation.opportunities);
  const opportunityPriority = record(automation.priority);

  // ── AI comfort / approval / tech stack ──────────────────────
  const comfortLevel = num(aiComfort.comfortLevel, 3);
  const priorAiUse = bool(aiComfort.priorAiUse);
  const approvalStyle = str(approval.approvalStyle); // 'full_autonomy' | 'approval_required' | 'hybrid'
  const integrationComplexity = str(techStack.integrationComplexity); // 'low' | 'medium' | 'high'

  // ── Scores ──────────────────────────────────────────────────
  const operationsScore = Math.round(
    clamp(100 - totalHoursLost * 3 - avgSeverity * 8)
  );

  const aiReadinessScore = Math.round(
    clamp(
      comfortLevel * 15 +
        (approvalStyle === "full_autonomy" ? 20 : approvalStyle === "hybrid" ? 10 : 0) +
        (integrationComplexity === "low" ? 15 : integrationComplexity === "medium" ? 8 : 0) +
        (priorAiUse ? 10 : 0)
    )
  );

  const hoursRecoverablePerWeek = Math.round(totalHoursLost * 0.6 * 10) / 10;

  const topBottlenecks = rankBySeverity(bottleneckItems, bottleneckSeverity, 3);
  const topAutomationOpportunities = rankBySeverity(opportunityItems, opportunityPriority, 3);

  // ── Phase recommendation (deterministic business rules) ─────
  const executiveType = str(profile.executiveType);
  const securityTier = str(security.securityTier); // 'standard' | 'elevated' | 'maximum'
  const hasEA = bool(eaSection.hasEA);
  const eaType = str(eaSection.eaType); // 'none' | 'part_time' | 'full_time' | 'chief_of_staff'

  let recommendedPhase: 1 | 2 | 3 | 4 = 1;

  const premiumExecTypes = ["UHNWI", "Celebrity", "Professional Athlete", "Family Office"];
  const personalizationExecTypes = ["Founder", "UHNWI", "Public Figure"];

  if (premiumExecTypes.includes(executiveType) || securityTier === "maximum") {
    recommendedPhase = 4;
  } else if (hasEA && (eaType === "full_time" || eaType === "chief_of_staff")) {
    recommendedPhase = 2;
  } else if (personalizationExecTypes.includes(executiveType) && comfortLevel >= 3) {
    recommendedPhase = 3;
  } else {
    recommendedPhase = 1;
  }

  const recommendConsultation =
    operationsScore < 50 || aiReadinessScore >= 70 || bool(consultation.wantsConsultation);

  return {
    operationsScore,
    aiReadinessScore,
    hoursRecoverablePerWeek,
    topBottlenecks,
    topAutomationOpportunities,
    recommendedPhase,
    recommendConsultation,
  };
}
