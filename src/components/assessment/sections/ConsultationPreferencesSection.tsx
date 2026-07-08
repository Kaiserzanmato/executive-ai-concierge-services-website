"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";

export interface ConsultationPreferencesAnswers {
  wantsConsultation: boolean;
  preferredContactMethod: string;
  preferredTiming: string;
  notes: string;
}

const CONTACT_METHODS = ["Email", "Phone", "Signal", "Secure message"];
const TIMING_OPTIONS = ["As soon as possible", "Within a week", "Within a month", "No preference"];

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
  const [wantsConsultation, setWantsConsultation] = useState<boolean>(defaultValues?.wantsConsultation ?? false);
  const [preferredContactMethod, setPreferredContactMethod] = useState<string>(
    defaultValues?.preferredContactMethod ?? ""
  );
  const [preferredTiming, setPreferredTiming] = useState<string>(defaultValues?.preferredTiming ?? "");
  const [notes, setNotes] = useState<string>(defaultValues?.notes ?? "");

  return (
    <SectionShell
      title="Consultation Preferences"
      description="Let us know if you'd like a private consultation once your results are ready."
      onBack={onBack}
      onNext={() => onNext({ wantsConsultation, preferredContactMethod, preferredTiming, notes })}
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
          I would like to schedule a private consultation after reviewing my results.
        </span>
      </label>

      {wantsConsultation && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="form-label">Preferred contact method</label>
              <select
                className="form-field"
                value={preferredContactMethod}
                onChange={(e) => setPreferredContactMethod(e.target.value)}
              >
                <option value="">Select a method</option>
                {CONTACT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Preferred timing</label>
              <select
                className="form-field"
                value={preferredTiming}
                onChange={(e) => setPreferredTiming(e.target.value)}
              >
                <option value="">Select a timeframe</option>
                {TIMING_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Anything else we should know?</label>
            <textarea
              className="form-field resize-none"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional context for your consultation..."
            />
          </div>
        </>
      )}
    </SectionShell>
  );
}
