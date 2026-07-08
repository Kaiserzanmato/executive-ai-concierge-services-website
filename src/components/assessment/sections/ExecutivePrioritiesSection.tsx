"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup } from "../fields";

const PRIORITY_OPTIONS = [
  "Reclaiming personal time",
  "Faster decision-making",
  "Reducing operational overhead",
  "Improving executive presence & preparation",
  "Enhancing privacy & discretion",
  "Scaling support without adding headcount",
];

const TIME_HORIZONS = [
  "Immediate — within 30 days",
  "This quarter",
  "Next 6 months",
  "Strategic planning stage, no fixed timeline",
];

export interface ExecutivePrioritiesAnswers {
  topPriorities: string[];
  timeHorizon: string;
}

export function ExecutivePrioritiesSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<ExecutivePrioritiesAnswers>;
  onBack: () => void;
  onNext: (answers: ExecutivePrioritiesAnswers) => void;
  submitting?: boolean;
}) {
  const [topPriorities, setTopPriorities] = useState<string[]>(defaultValues?.topPriorities ?? []);
  const [timeHorizon, setTimeHorizon] = useState<string>(defaultValues?.timeHorizon ?? "");

  return (
    <SectionShell
      title="Executive Priorities"
      description="What matters most to you as you consider an AI operating layer?"
      onBack={onBack}
      onNext={() => onNext({ topPriorities, timeHorizon })}
      submitting={submitting}
    >
      <CheckboxGroup options={PRIORITY_OPTIONS} selected={topPriorities} onChange={setTopPriorities} />

      <div>
        <label className="form-label">Implementation time horizon</label>
        <select className="form-field" value={timeHorizon} onChange={(e) => setTimeHorizon(e.target.value)}>
          <option value="">Select a timeframe</option>
          {TIME_HORIZONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </SectionShell>
  );
}
