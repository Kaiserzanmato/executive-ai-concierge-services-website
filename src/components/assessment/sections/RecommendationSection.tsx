"use client";

import { SectionShell } from "../SectionShell";
import type { AssessmentScoreResult } from "@/lib/assessmentScoring";

export function RecommendationSection({
  scores,
  onBack,
  onNext,
  submitting,
}: {
  scores: AssessmentScoreResult | null;
  onBack: () => void;
  onNext: () => void;
  submitting?: boolean;
}) {
  return (
    <SectionShell
      title="Your Personalized Recommendation"
      description="Based on your answers, here's what we'd suggest."
      onBack={onBack}
      onNext={onNext}
      submitting={submitting}
    >
      {!scores ? (
        <p className="text-sm text-platinum-300">Calculating your recommendation...</p>
      ) : (
        <div className="space-y-6">
          <div>
            <p className="form-label">Recommended service/s</p>
            <ul className="mt-2 space-y-1">
              {scores.recommendedServices.map((s) => (
                <li key={s} className="text-sm text-ivory-50">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-soft border border-white/10 bg-ink-800 px-4 py-3">
              <p className="text-xs text-platinum-300">Executive AI readiness score</p>
              <p className="text-2xl font-semibold text-ivory-50 mt-1">{scores.aiReadinessScore}/100</p>
            </div>
            <div className="rounded-soft border border-white/10 bg-ink-800 px-4 py-3">
              <p className="text-xs text-platinum-300">Estimated time savings</p>
              <p className="text-2xl font-semibold text-ivory-50 mt-1">{scores.hoursRecoverablePerWeek} hrs/week</p>
            </div>
          </div>

          <div>
            <p className="form-label">Main opportunities identified</p>
            <ul className="mt-2 space-y-1">
              {scores.topAutomationOpportunities.map((o) => (
                <li key={o} className="text-sm text-platinum-100">
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="form-label">Suggested next step</p>
            <p className="text-sm text-platinum-100 mt-1">{scores.suggestedNextStep}</p>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
