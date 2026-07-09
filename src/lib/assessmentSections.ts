export const ASSESSMENT_SECTIONS = [
  { key: "executive_profile", label: "Executive Profile" },
  { key: "motivations", label: "What Brings You Here" },
  { key: "time_drain_areas", label: "Time Drain Areas" },
  { key: "desired_outcomes", label: "Desired Outcomes" },
  { key: "ai_delegation_level", label: "AI Delegation Level" },
  { key: "ai_services_interest", label: "AI Services Interest" },
  { key: "current_ai_tools", label: "Current AI Usage" },
  { key: "implementation_timeline", label: "Implementation Timeline" },
  { key: "investment_readiness", label: "Investment Readiness" },
  { key: "recommendation", label: "Personalized Recommendation" },
  { key: "consultation_preferences", label: "Consultation Preference" },
] as const;

export type SectionKey = (typeof ASSESSMENT_SECTIONS)[number]["key"];

export function stepIndexForSection(sectionKey: string): number {
  const idx = ASSESSMENT_SECTIONS.findIndex((s) => s.key === sectionKey);
  return idx === -1 ? 1 : idx + 1;
}
