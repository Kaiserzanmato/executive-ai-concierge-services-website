"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup } from "../fields";

const TIME_DRAIN_OPTIONS = [
  "Email",
  "Calendar",
  "Meetings",
  "Meeting notes",
  "Client communication",
  "Approvals",
  "Research",
  "Reporting",
  "Document preparation",
  "Scheduling",
  "Project management",
  "Team coordination",
  "Sales",
  "Marketing",
  "Finance",
  "Recruiting",
  "Customer Support",
  "Personal tasks",
  "Travel planning",
  "Other",
];

export interface TimeDrainAreasAnswers {
  areas: string[];
}

export function TimeDrainAreasSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<TimeDrainAreasAnswers>;
  onBack: () => void;
  onNext: (answers: TimeDrainAreasAnswers) => void;
  submitting?: boolean;
}) {
  const [areas, setAreas] = useState<string[]>(defaultValues?.areas ?? []);

  return (
    <SectionShell
      title="Which areas consume the most of your time?"
      description="Select up to 5."
      onBack={onBack}
      onNext={() => onNext({ areas })}
      submitting={submitting}
    >
      <CheckboxGroup options={TIME_DRAIN_OPTIONS} selected={areas} onChange={setAreas} max={5} />
    </SectionShell>
  );
}
