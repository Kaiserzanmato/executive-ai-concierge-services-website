"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup } from "../fields";

const TOOL_OPTIONS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Microsoft Copilot",
  "Perplexity",
  "Notion AI",
  "Cursor",
  "Claude Code",
  "None",
  "Other",
];

export interface CurrentAIToolsAnswers {
  tools: string[];
}

export function CurrentAIToolsSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<CurrentAIToolsAnswers>;
  onBack: () => void;
  onNext: (answers: CurrentAIToolsAnswers) => void;
  submitting?: boolean;
}) {
  const [tools, setTools] = useState<string[]>(defaultValues?.tools ?? []);

  return (
    <SectionShell
      title="Which tools do you already use?"
      description="Current AI usage."
      onBack={onBack}
      onNext={() => onNext({ tools })}
      submitting={submitting}
    >
      <CheckboxGroup options={TOOL_OPTIONS} selected={tools} onChange={setTools} />
    </SectionShell>
  );
}
