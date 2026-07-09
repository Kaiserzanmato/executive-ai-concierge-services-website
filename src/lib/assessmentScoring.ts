export type AssessmentAnswers = Record<string, unknown>;

export interface AssessmentScoreResult {
  operationsScore: number;
  aiReadinessScore: number;
  hoursRecoverablePerWeek: number;
  topBottlenecks: string[];
  topAutomationOpportunities: string[];
  recommendedPhase: 1 | 2 | 3 | 4;
  recommendConsultation: boolean;
  recommendedServices: string[];
  suggestedNextStep: string;
}

const PHASE_LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: "Phase 1 — Productivity Hub",
  2: "Phase 2 — AI Executive Assistant Integration",
  3: "Phase 3 — Personalized AI Concierge",
  4: "Phase 4 — White-Glove Implementation",
};

const DELEGATION_PERCENT: Record<string, number> = {
  "Less than 20%": 15,
  "Around 25%": 25,
  "Around 50%": 50,
  "Around 75%": 75,
  "As much as safely possible": 90,
};

const INVESTMENT_BONUS: Record<string, number> = {
  "Executive Starter — US$3,000–5,000": 10,
  "Executive Plus — US$6,000–10,000": 15,
  "Enterprise Custom Build — Custom pricing after consultation": 20,
  "Not sure yet — recommend the best option": 5,
  "Prefer to discuss privately": 10,
};

const TIMELINE_URGENCY_BONUS: Record<string, number> = {
  "Just exploring": 0,
  "Within 3 months": 10,
  "Within 30 days": 15,
  "Not sure": 5,
};

const NOT_SURE_INVESTMENT = "Not sure yet — recommend the best option";
const META_SERVICE_OPTIONS = ["Not sure yet", "Other / Custom Request"];

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function bool(value: unknown): boolean {
  return value === true;
}

function list(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function scoreAssessment(answers: Record<string, AssessmentAnswers>): AssessmentScoreResult {
  const profile = answers.executive_profile ?? {};
  const motivations = answers.motivations ?? {};
  const timeDrainAreas = answers.time_drain_areas ?? {};
  const desiredOutcomes = answers.desired_outcomes ?? {};
  const delegation = answers.ai_delegation_level ?? {};
  const servicesInterest = answers.ai_services_interest ?? {};
  const currentTools = answers.current_ai_tools ?? {};
  const timeline = answers.implementation_timeline ?? {};
  const investment = answers.investment_readiness ?? {};
  const consultation = answers.consultation_preferences ?? {};

  const reasons = list(motivations.reasons);
  const areas = list(timeDrainAreas.areas);
  const outcomes = list(desiredOutcomes.outcomes);
  const delegationLevel = str(delegation.level);
  const services = list(servicesInterest.services);
  const tools = list(currentTools.tools);
  const timelineValue = str(timeline.timeline);
  const investmentLevel = str(investment.level);
  const executiveType = str(profile.executiveType);

  // ── Operations score: fewer selected pain points = less friction ──
  const operationsScore = Math.round(clamp(100 - areas.length * 6 - reasons.length * 4));

  // ── AI readiness score ──────────────────────────────────────────
  const delegationPercent = DELEGATION_PERCENT[delegationLevel] ?? 0;
  const usesAnyAiTool = tools.some((t) => t !== "None");
  const investmentBonus = INVESTMENT_BONUS[investmentLevel] ?? 0;
  const timelineBonus = TIMELINE_URGENCY_BONUS[timelineValue] ?? 0;

  const aiReadinessScore = Math.round(
    clamp(delegationPercent * 0.5 + (usesAnyAiTool ? 20 : 0) + investmentBonus + timelineBonus)
  );

  // ── Estimated time savings ──────────────────────────────────────
  const hoursRecoverablePerWeek = Math.round(areas.length * 2 * 10) / 10;

  // ── Ranked lists ────────────────────────────────────────────────
  const topBottlenecks = areas.slice(0, 3);

  const explicitServices = services.filter((s) => !META_SERVICE_OPTIONS.includes(s));
  const topAutomationOpportunities =
    explicitServices.length > 0 ? explicitServices.slice(0, 3) : outcomes.slice(0, 3);

  // ── Recommended service/s ───────────────────────────────────────
  let recommendedServices: string[];
  if (explicitServices.length > 0) {
    recommendedServices = explicitServices.slice(0, 3);
  } else {
    const derived: string[] = [];
    if (delegationPercent >= 75) derived.push("Autonomous AI Agents");
    if (outcomes.includes("Delegate more work") || outcomes.includes("Save time")) {
      derived.push("Executive AI Assistant");
    }
    if (outcomes.includes("Reduce operating costs") || outcomes.includes("Scale operations")) {
      derived.push("Workflow Automation");
    }
    recommendedServices = derived.length > 0 ? derived.slice(0, 3) : ["Executive AI Concierge"];
  }

  // ── Phase recommendation (deterministic, re-keyed to new inputs) ─
  const premiumExecTypes = ["UHNWI", "Celebrity", "Professional Athlete", "Family Office"];
  const personalizationExecTypes = ["Founder", "UHNWI", "Public Figure"];

  let recommendedPhase: 1 | 2 | 3 | 4;
  if (
    investmentLevel === "Enterprise Custom Build — Custom pricing after consultation" ||
    delegationLevel === "As much as safely possible" ||
    premiumExecTypes.includes(executiveType)
  ) {
    recommendedPhase = 4;
  } else if (
    investmentLevel === "Executive Plus — US$6,000–10,000" ||
    recommendedServices.includes("Executive AI Assistant")
  ) {
    recommendedPhase = 2;
  } else if (recommendedServices.includes("Executive AI Concierge") && personalizationExecTypes.includes(executiveType)) {
    recommendedPhase = 3;
  } else {
    recommendedPhase = 1;
  }

  // ── Consultation recommendation ─────────────────────────────────
  const recommendConsultation =
    operationsScore < 50 ||
    aiReadinessScore >= 70 ||
    (investmentLevel !== "" && investmentLevel !== NOT_SURE_INVESTMENT) ||
    bool(consultation.wantsConsultation);

  // ── Suggested next step ─────────────────────────────────────────
  const suggestedNextStep = recommendConsultation
    ? `Schedule a private consultation to scope your ${recommendedServices[0]} implementation.`
    : `Explore the ${PHASE_LABELS[recommendedPhase]} details on our services pages or request a consultation when you're ready.`;

  return {
    operationsScore,
    aiReadinessScore,
    hoursRecoverablePerWeek,
    topBottlenecks,
    topAutomationOpportunities,
    recommendedPhase,
    recommendConsultation,
    recommendedServices,
    suggestedNextStep,
  };
}
