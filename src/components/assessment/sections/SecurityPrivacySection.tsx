"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";
import { CheckboxGroup } from "../fields";

const CONFIDENTIALITY_OPTIONS = [
  "Private deployment / dedicated infrastructure",
  "Non-disclosure agreements for all staff",
  "Encrypted data at rest and in transit",
  "Role-based access controls",
  "Audit logging of all access",
  "No data used for model training",
];

export interface SecurityPrivacyAnswers {
  securityTier: "standard" | "elevated" | "maximum";
  confidentialityNeeds: string[];
}

export function SecurityPrivacySection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<SecurityPrivacyAnswers>;
  onBack: () => void;
  onNext: (answers: SecurityPrivacyAnswers) => void;
  submitting?: boolean;
}) {
  const [securityTier, setSecurityTier] = useState<SecurityPrivacyAnswers["securityTier"]>(
    defaultValues?.securityTier ?? "standard"
  );
  const [confidentialityNeeds, setConfidentialityNeeds] = useState<string[]>(
    defaultValues?.confidentialityNeeds ?? []
  );

  return (
    <SectionShell
      title="Security & Privacy"
      description="Define your required level of discretion and data protection."
      onBack={onBack}
      onNext={() => onNext({ securityTier, confidentialityNeeds })}
      submitting={submitting}
    >
      <div>
        <label className="form-label">Required security tier</label>
        <select
          className="form-field"
          value={securityTier}
          onChange={(e) => setSecurityTier(e.target.value as SecurityPrivacyAnswers["securityTier"])}
        >
          <option value="standard">Standard — typical business confidentiality</option>
          <option value="elevated">Elevated — heightened discretion required</option>
          <option value="maximum">Maximum — UHNW / public figure level discretion</option>
        </select>
      </div>

      <div>
        <label className="form-label">Which confidentiality measures matter most to you?</label>
        <CheckboxGroup
          options={CONFIDENTIALITY_OPTIONS}
          selected={confidentialityNeeds}
          onChange={setConfidentialityNeeds}
        />
      </div>
    </SectionShell>
  );
}
