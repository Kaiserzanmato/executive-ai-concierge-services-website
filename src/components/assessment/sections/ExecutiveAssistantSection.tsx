"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";

export interface ExecutiveAssistantAnswers {
  hasEA: boolean;
  eaType: "none" | "part_time" | "full_time" | "chief_of_staff";
  eaSatisfaction: number;
}

export function ExecutiveAssistantSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<ExecutiveAssistantAnswers>;
  onBack: () => void;
  onNext: (answers: ExecutiveAssistantAnswers) => void;
  submitting?: boolean;
}) {
  const [eaType, setEaType] = useState<ExecutiveAssistantAnswers["eaType"]>(defaultValues?.eaType ?? "none");
  const [eaSatisfaction, setEaSatisfaction] = useState<number>(defaultValues?.eaSatisfaction ?? 3);

  return (
    <SectionShell
      title="Executive Assistant / Chief of Staff"
      description="Tell us about your existing human support structure, if any."
      onBack={onBack}
      onNext={() =>
        onNext({
          hasEA: eaType !== "none",
          eaType,
          eaSatisfaction,
        })
      }
      submitting={submitting}
    >
      <div>
        <label className="form-label">Do you have an Executive Assistant or Chief of Staff?</label>
        <select
          className="form-field"
          value={eaType}
          onChange={(e) => setEaType(e.target.value as ExecutiveAssistantAnswers["eaType"])}
        >
          <option value="none">No dedicated support</option>
          <option value="part_time">Part-time assistant</option>
          <option value="full_time">Full-time Executive Assistant</option>
          <option value="chief_of_staff">Chief of Staff</option>
        </select>
      </div>

      {eaType !== "none" && (
        <div>
          <div className="flex items-center justify-between text-xs text-platinum-300 mb-1">
            <span className="form-label mb-0">How satisfied are you with current support?</span>
            <span>{eaSatisfaction}/5</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={eaSatisfaction}
            onChange={(e) => setEaSatisfaction(Number(e.target.value))}
            className="w-full accent-gold-300"
          />
        </div>
      )}
    </SectionShell>
  );
}
