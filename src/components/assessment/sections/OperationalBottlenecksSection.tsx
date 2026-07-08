"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup, SeveritySliders } from "../fields";

const BOTTLENECK_OPTIONS = [
  "Calendar conflicts & scheduling delays",
  "Inbox overload",
  "Meeting preparation gaps",
  "Travel logistics complexity",
  "Delegation bottlenecks",
  "Follow-up & task tracking",
  "Document & information retrieval",
  "Cross-team coordination",
];

export interface OperationalBottlenecksAnswers {
  bottlenecks: string[];
  severity: Record<string, number>;
}

export function OperationalBottlenecksSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<OperationalBottlenecksAnswers>;
  onBack: () => void;
  onNext: (answers: OperationalBottlenecksAnswers) => void;
  submitting?: boolean;
}) {
  const [bottlenecks, setBottlenecks] = useState<string[]>(defaultValues?.bottlenecks ?? []);
  const [severity, setSeverity] = useState<Record<string, number>>(defaultValues?.severity ?? {});

  return (
    <SectionShell
      title="Operational Bottlenecks"
      description="Select the areas where you experience the most friction, then rate how significant each is."
      onBack={onBack}
      onNext={() => onNext({ bottlenecks, severity })}
      submitting={submitting}
    >
      <CheckboxGroup options={BOTTLENECK_OPTIONS} selected={bottlenecks} onChange={setBottlenecks} />
      <SeveritySliders items={bottlenecks} severity={severity} onChange={setSeverity} />
    </SectionShell>
  );
}
