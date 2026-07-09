"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup } from "../fields";

const MOTIVATION_OPTIONS = [
  "I want more personal time with family and hobbies.",
  "I spend too much time on administrative work.",
  "My executive assistant needs AI support.",
  "My team is overwhelmed.",
  "I want to scale without hiring more people.",
  "I want to improve decision making.",
  "I want better visibility across my business.",
  "I want to automate repetitive work.",
  "I'm curious what AI could do for me.",
  "Other",
];

export interface MotivationsAnswers {
  reasons: string[];
}

export function MotivationsSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<MotivationsAnswers>;
  onBack: () => void;
  onNext: (answers: MotivationsAnswers) => void;
  submitting?: boolean;
}) {
  const [reasons, setReasons] = useState<string[]>(defaultValues?.reasons ?? []);

  return (
    <SectionShell
      title="What brings you here today?"
      description="Select up to 3."
      onBack={onBack}
      onNext={() => onNext({ reasons })}
      submitting={submitting}
    >
      <CheckboxGroup options={MOTIVATION_OPTIONS} selected={reasons} onChange={setReasons} max={3} />
    </SectionShell>
  );
}
