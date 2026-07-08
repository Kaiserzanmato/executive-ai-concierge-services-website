"use client";

import { ReactNode } from "react";

export function SectionShell({
  title,
  description,
  children,
  onBack,
  onNext,
  isFirst,
  isLast,
  submitting,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  submitting?: boolean;
}) {
  return (
    <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8 md:p-10 shadow-panel backdrop-blur-xl">
      <h2 className="text-2xl font-semibold tracking-tightLuxury text-ivory-50 mb-2">{title}</h2>
      {description && <p className="text-sm text-platinum-200 leading-6 mb-6">{description}</p>}

      <div className="space-y-5">{children}</div>

      <div className="mt-10 flex items-center justify-between gap-4">
        {!isFirst ? (
          <button
            type="button"
            onClick={onBack}
            disabled={submitting}
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-platinum-100 hover:bg-white/5 transition-colors disabled:opacity-60"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={submitting}
          className="rounded-full bg-ivory-50 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-100 transition-colors disabled:opacity-60"
        >
          {submitting ? "Saving..." : isLast ? "See My Results" : "Next"}
        </button>
      </div>
    </div>
  );
}
