"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup } from "../fields";

const OUTCOME_OPTIONS = [
  "Save time",
  "Reduce stress",
  "Increase productivity",
  "Better work-life balance",
  "Faster decisions",
  "Delegate more work",
  "Improve customer experience",
  "Increase revenue",
  "Reduce operating costs",
  "Scale operations",
  "Improve team collaboration",
  "Other",
];

export interface DesiredOutcomesAnswers {
  outcomes: string[];
}

export function DesiredOutcomesSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<DesiredOutcomesAnswers>;
  onBack: () => void;
  onNext: (answers: DesiredOutcomesAnswers) => void;
  submitting?: boolean;
}) {
  const [outcomes, setOutcomes] = useState<string[]>(defaultValues?.outcomes ?? []);

  return (
    <SectionShell
      title="Which outcomes are most important?"
      description="Select up to 3."
      onBack={onBack}
      onNext={() => onNext({ outcomes })}
      submitting={submitting}
    >
      <CheckboxGroup options={OUTCOME_OPTIONS} selected={outcomes} onChange={setOutcomes} max={3} />
    </SectionShell>
  );
}
