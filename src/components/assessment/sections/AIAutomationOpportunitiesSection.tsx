"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup, SeveritySliders } from "../fields";

const OPPORTUNITY_OPTIONS = [
  "Automated calendar consolidation",
  "AI-drafted email responses",
  "Meeting briefing generation",
  "Travel itinerary automation",
  "Executive daily briefings",
  "Automated task routing & approvals",
  "Document summarization",
  "Personalized communication drafting",
];

export interface AIAutomationOpportunitiesAnswers {
  opportunities: string[];
  priority: Record<string, number>;
}

export function AIAutomationOpportunitiesSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<AIAutomationOpportunitiesAnswers>;
  onBack: () => void;
  onNext: (answers: AIAutomationOpportunitiesAnswers) => void;
  submitting?: boolean;
}) {
  const [opportunities, setOpportunities] = useState<string[]>(defaultValues?.opportunities ?? []);
  const [priority, setPriority] = useState<Record<string, number>>(defaultValues?.priority ?? {});

  return (
    <SectionShell
      title="AI Automation Opportunities"
      description="Select which automations would be most valuable to you, then rank their priority."
      onBack={onBack}
      onNext={() => onNext({ opportunities, priority })}
      submitting={submitting}
    >
      <CheckboxGroup options={OPPORTUNITY_OPTIONS} selected={opportunities} onChange={setOpportunities} />
      <SeveritySliders items={opportunities} severity={priority} onChange={setPriority} label="Priority" />
    </SectionShell>
  );
}
