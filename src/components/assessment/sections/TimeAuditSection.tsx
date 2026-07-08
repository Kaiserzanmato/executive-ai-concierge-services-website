"use client";

import { useState } from "react";
import { SectionShell } from "../SectionShell";

export interface TimeAuditAnswers {
  hoursPerWeekCalendar: number;
  hoursPerWeekInbox: number;
  hoursPerWeekMeetingPrep: number;
  hoursPerWeekTravel: number;
  hoursPerWeekAdminOther: number;
}

const FIELDS: { key: keyof TimeAuditAnswers; label: string }[] = [
  { key: "hoursPerWeekCalendar", label: "Calendar management & scheduling" },
  { key: "hoursPerWeekInbox", label: "Inbox triage & correspondence" },
  { key: "hoursPerWeekMeetingPrep", label: "Meeting preparation & follow-up" },
  { key: "hoursPerWeekTravel", label: "Travel & logistics coordination" },
  { key: "hoursPerWeekAdminOther", label: "Other administrative overhead" },
];

export function TimeAuditSection({
  defaultValues,
  onBack,
  onNext,
  submitting,
}: {
  defaultValues?: Partial<TimeAuditAnswers>;
  onBack: () => void;
  onNext: (answers: TimeAuditAnswers) => void;
  submitting?: boolean;
}) {
  const [values, setValues] = useState<TimeAuditAnswers>({
    hoursPerWeekCalendar: defaultValues?.hoursPerWeekCalendar ?? 0,
    hoursPerWeekInbox: defaultValues?.hoursPerWeekInbox ?? 0,
    hoursPerWeekMeetingPrep: defaultValues?.hoursPerWeekMeetingPrep ?? 0,
    hoursPerWeekTravel: defaultValues?.hoursPerWeekTravel ?? 0,
    hoursPerWeekAdminOther: defaultValues?.hoursPerWeekAdminOther ?? 0,
  });

  return (
    <SectionShell
      title="Time Audit"
      description="Estimate how many hours per week you or your team currently spend on each category."
      onBack={onBack}
      onNext={() => onNext(values)}
      submitting={submitting}
    >
      {FIELDS.map(({ key, label }) => (
        <div key={key}>
          <label className="form-label">{label} (hours/week)</label>
          <input
            type="number"
            min={0}
            max={80}
            step={0.5}
            className="form-field"
            value={values[key]}
            onChange={(e) => setValues({ ...values, [key]: Number(e.target.value) })}
          />
        </div>
      ))}
    </SectionShell>
  );
}
