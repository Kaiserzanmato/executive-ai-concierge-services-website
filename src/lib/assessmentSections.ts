export const ASSESSMENT_SECTIONS = [
  { key: "executive_profile", label: "Executive Profile" },
  { key: "time_audit", label: "Time Audit" },
  { key: "operational_bottlenecks", label: "Operational Bottlenecks" },
  { key: "ai_automation_opportunities", label: "AI Automation Opportunities" },
  { key: "executive_assistant", label: "Executive Assistant / Chief of Staff" },
  { key: "ai_comfort_level", label: "AI Comfort Level" },
  { key: "human_approval_preferences", label: "Human Approval Preferences" },
  { key: "technology_stack", label: "Technology Stack" },
  { key: "security_privacy", label: "Security & Privacy" },
  { key: "executive_priorities", label: "Executive Priorities" },
  { key: "consultation_preferences", label: "Consultation Preferences" },
] as const;

export type SectionKey = (typeof ASSESSMENT_SECTIONS)[number]["key"];

export function stepIndexForSection(sectionKey: string): number {
  const idx = ASSESSMENT_SECTIONS.findIndex((s) => s.key === sectionKey);
  return idx === -1 ? 1 : idx + 1;
}
