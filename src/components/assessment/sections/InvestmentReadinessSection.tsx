"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";

const INVESTMENT_OPTIONS = [
  "Executive Starter — US$3,000–5,000",
  "Executive Plus — US$6,000–10,000",
  "Enterprise Custom Build — Custom pricing after consultation",
  "Not sure yet — recommend the best option",
  "Prefer to discuss privately",
];

export interface InvestmentReadinessAnswers {
  level: string;
}

export function InvestmentReadinessSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<InvestmentReadinessAnswers>;
  onBack: () => void;
  onNext: (answers: InvestmentReadinessAnswers) => void;
  submitting?: boolean;
}) {
  const [level, setLevel] = useState<string>(defaultValues?.level ?? "");

  return (
    <SectionShell
      title="Investment readiness"
      description="If we identify strong value and ROI, what investment level are you comfortable exploring?"
      onBack={onBack}
      onNext={() => onNext({ level })}
      submitting={submitting}
    >
      <div>
        <label className="form-label">Select one</label>
        <select className="form-field" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Select an option</option>
          {INVESTMENT_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </SectionShell>
  );
}
