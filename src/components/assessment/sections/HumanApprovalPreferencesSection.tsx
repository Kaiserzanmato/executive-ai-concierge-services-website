"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";

export interface HumanApprovalPreferencesAnswers {
  approvalStyle: "full_autonomy" | "approval_required" | "hybrid";
  riskTolerance: number;
}

export function HumanApprovalPreferencesSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<HumanApprovalPreferencesAnswers>;
  onBack: () => void;
  onNext: (answers: HumanApprovalPreferencesAnswers) => void;
  submitting?: boolean;
}) {
  const [approvalStyle, setApprovalStyle] = useState<HumanApprovalPreferencesAnswers["approvalStyle"]>(
    defaultValues?.approvalStyle ?? "hybrid"
  );
  const [riskTolerance, setRiskTolerance] = useState<number>(defaultValues?.riskTolerance ?? 3);

  return (
    <SectionShell
      title="Human Approval Preferences"
      description="Define how much you want AI to act independently versus requiring your sign-off."
      onBack={onBack}
      onNext={() => onNext({ approvalStyle, riskTolerance })}
      submitting={submitting}
    >
      <div>
        <label className="form-label">Preferred approval style</label>
        <select
          className="form-field"
          value={approvalStyle}
          onChange={(e) => setApprovalStyle(e.target.value as HumanApprovalPreferencesAnswers["approvalStyle"])}
        >
          <option value="full_autonomy">Full autonomy — let AI act independently</option>
          <option value="hybrid">Hybrid — AI drafts, I approve high-stakes actions</option>
          <option value="approval_required">Approval required — I review everything</option>
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-platinum-300 mb-1">
          <span className="form-label mb-0">Risk tolerance for automated decisions</span>
          <span>{riskTolerance}/5</span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          value={riskTolerance}
          onChange={(e) => setRiskTolerance(Number(e.target.value))}
          className="w-full accent-gold-300"
        />
      </div>
    </SectionShell>
  );
}
