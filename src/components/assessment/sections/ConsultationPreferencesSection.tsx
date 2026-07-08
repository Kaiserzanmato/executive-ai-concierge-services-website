"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionShell } from "../SectionShell";

export interface ConsultationPreferencesAnswers {
  wantsConsultation: boolean;
}

export function ConsultationPreferencesSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<ConsultationPreferencesAnswers>;
  onBack: () => void;
  onNext: (answers: ConsultationPreferencesAnswers) => void;
  submitting?: boolean;
}) {
  const [wantsConsultation, setWantsConsultation] = useState<boolean>(
    defaultValues?.wantsConsultation ?? false
  );

  return (
    <SectionShell
      title="Consultation Preferences"
      description="Would you like to schedule a private consultation?"
      onBack={onBack}
      onNext={() => onNext({ wantsConsultation })}
      isLast
      submitting={submitting}
    >
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={wantsConsultation}
          onChange={(e) => setWantsConsultation(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-ink-800 accent-gold-300 cursor-pointer"
        />
        <span className="text-sm text-platinum-100">
          Yes, I'd like to schedule a private consultation.
        </span>
      </label>

      {wantsConsultation && (
        <Link href="/apply" className="btn-primary inline-block mt-4">
          Schedule Private Consultation
        </Link>
      )}
    </SectionShell>
  );
}
