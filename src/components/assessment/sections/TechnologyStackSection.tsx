"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup } from "../fields";

const TOOL_OPTIONS = [
  "Google Workspace",
  "Microsoft 365",
  "Slack",
  "Notion",
  "Salesforce / CRM",
  "Zoom / video conferencing",
  "Custom internal tools",
  "None of the above",
];

export interface TechnologyStackAnswers {
  tools: string[];
  integrationComplexity: "low" | "medium" | "high";
}

export function TechnologyStackSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<TechnologyStackAnswers>;
  onBack: () => void;
  onNext: (answers: TechnologyStackAnswers) => void;
  submitting?: boolean;
}) {
  const [tools, setTools] = useState<string[]>(defaultValues?.tools ?? []);
  const [integrationComplexity, setIntegrationComplexity] = useState<TechnologyStackAnswers["integrationComplexity"]>(
    defaultValues?.integrationComplexity ?? "medium"
  );

  return (
    <SectionShell
      title="Technology Stack"
      description="Which tools are part of your current executive operating environment?"
      onBack={onBack}
      onNext={() => onNext({ tools, integrationComplexity })}
      submitting={submitting}
    >
      <CheckboxGroup options={TOOL_OPTIONS} selected={tools} onChange={setTools} />

      <div>
        <label className="form-label">How complex do you expect integration to be?</label>
        <select
          className="form-field"
          value={integrationComplexity}
          onChange={(e) =>
            setIntegrationComplexity(e.target.value as TechnologyStackAnswers["integrationComplexity"])
          }
        >
          <option value="low">Low — mostly standard tools</option>
          <option value="medium">Medium — some custom systems</option>
          <option value="high">High — heavily customized environment</option>
        </select>
      </div>
    </SectionShell>
  );
}
