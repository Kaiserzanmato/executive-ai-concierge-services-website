"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";

const DELEGATION_OPTIONS = [
  "Less than 20%",
  "Around 25%",
  "Around 50%",
  "Around 75%",
  "As much as safely possible",
];

export interface AIDelegationLevelAnswers {
  level: string;
}

export function AIDelegationLevelSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<AIDelegationLevelAnswers>;
  onBack: () => void;
  onNext: (answers: AIDelegationLevelAnswers) => void;
  submitting?: boolean;
}) {
  const [level, setLevel] = useState<string>(defaultValues?.level ?? "");

  return (
    <SectionShell
      title="How much of your work would you like AI to handle?"
      onBack={onBack}
      onNext={() => onNext({ level })}
      submitting={submitting}
    >
      <div>
        <label className="form-label">Select one</label>
        <select className="form-field" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Select an option</option>
          {DELEGATION_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </SectionShell>
  );
}
