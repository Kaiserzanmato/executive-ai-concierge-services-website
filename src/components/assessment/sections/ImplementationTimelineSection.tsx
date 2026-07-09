"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";

const TIMELINE_OPTIONS = ["Just exploring", "Within 3 months", "Within 30 days", "Not sure"];

export interface ImplementationTimelineAnswers {
  timeline: string;
}

export function ImplementationTimelineSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<ImplementationTimelineAnswers>;
  onBack: () => void;
  onNext: (answers: ImplementationTimelineAnswers) => void;
  submitting?: boolean;
}) {
  const [timeline, setTimeline] = useState<string>(defaultValues?.timeline ?? "");

  return (
    <SectionShell
      title="How soon are you looking to implement?"
      onBack={onBack}
      onNext={() => onNext({ timeline })}
      submitting={submitting}
    >
      <div>
        <label className="form-label">Select one</label>
        <select className="form-field" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
          <option value="">Select a timeframe</option>
          {TIMELINE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </SectionShell>
  );
}
