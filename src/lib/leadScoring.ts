export type LeadScoreInput = {
  clientCategory: string;
  estimatedBudgetRange: string;
  desiredPhase: string;
  urgency: string;
  roleTitle: string;
  operationalPainPoints: string;
};

export function scoreLead(input: LeadScoreInput): { score: number; highValue: boolean } {
  let score = 0;

  const combined = [
    input.clientCategory,
    input.estimatedBudgetRange,
    input.desiredPhase,
    input.urgency,
    input.roleTitle,
    input.operationalPainPoints,
  ]
    .join(" ")
    .toLowerCase();

  if (/uhnw|ultra|family office|celebrity|public figure/.test(combined)) score += 35;
  if (/founder|ceo|chair|partner|principal|c-suite|executive/.test(combined)) score += 25;
  if (/phase 4|white.glove|private deployment/.test(combined)) score += 25;
  if (/\$50,000|\$100,000|100000|250000|enterprise/.test(combined)) score += 25;
  if (/immediate|30 days|urgent|this quarter/.test(combined)) score += 15;

  return { score, highValue: score >= 65 };
}
