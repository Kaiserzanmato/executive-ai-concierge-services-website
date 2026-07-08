"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup } from "../fields";

const CONCERN_OPTIONS = [
  "Data privacy & confidentiality",
  "Loss of personal touch",
  "Accuracy & reliability",
  "Over-reliance on automation",
  "Security vulnerabilities",
  "Learning curve",
];

export interface AIComfortLevelAnswers {
  comfortLevel: number;
  priorAiUse: boolean;
  concerns: string[];
}

export function AIComfortLevelSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<AIComfortLevelAnswers>;
  onBack: () => void;
  onNext: (answers: AIComfortLevelAnswers) => void;
  submitting?: boolean;
}) {
  const [comfortLevel, setComfortLevel] = useState<number>(defaultValues?.comfortLevel ?? 3);
  const [priorAiUse, setPriorAiUse] = useState<boolean>(defaultValues?.priorAiUse ?? false);
  const [concerns, setConcerns] = useState<string[]>(defaultValues?.concerns ?? []);

  return (
    <SectionShell
      title="AI Comfort Level"
      description="Help us calibrate how much autonomy and personalization would suit you."
      onBack={onBack}
      onNext={() => onNext({ comfortLevel, priorAiUse, concerns })}
      submitting={submitting}
    >
      <div>
        <div className="flex items-center justify-between text-xs text-platinum-300 mb-1">
          <span className="form-label mb-0">How comfortable are you with AI handling executive tasks?</span>
          <span>{comfortLevel}/5</span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          value={comfortLevel}
          onChange={(e) => setComfortLevel(Number(e.target.value))}
          className="w-full accent-gold-300"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={priorAiUse}
          onChange={(e) => setPriorAiUse(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-ink-800 accent-gold-300 cursor-pointer"
        />
        <span className="text-sm text-platinum-100">
          I have used AI tools for professional or executive tasks before.
        </span>
      </label>

      <div>
        <label className="form-label">Any concerns about AI adoption?</label>
        <CheckboxGroup options={CONCERN_OPTIONS} selected={concerns} onChange={setConcerns} />
      </div>
    </SectionShell>
  );
}
