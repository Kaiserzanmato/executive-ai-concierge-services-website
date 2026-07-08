import { Metadata } from "next";
import Link from "next/link";
import { loadReportData } from "@/lib/assessmentReportData";
import { PHASE_LABELS } from "@/lib/assessmentReports";
import { ResultsActions } from "@/components/assessment/ResultsActions";

export const metadata: Metadata = {
  title: "Your Assessment Results",
  description: "Your personalized Executive Operations Assessment results and recommendations.",
};

export default async function AssessmentResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  const data = token ? await loadReportData(token) : null;

  if (!data) {
    return (
      <section className="relative bg-ink-950 px-6 pt-36 pb-24 md:px-10 lg:pt-48">
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Results Not Found</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-executive text-ivory-50">
            We could not locate your assessment results.
          </h1>
          <p className="mt-4 text-platinum-200">
            Your results link may have expired or is invalid. You can start a new assessment below.
          </p>
          <Link href="/assessment" className="btn-primary mt-8 inline-block">
            Start Assessment
          </Link>
        </div>
      </section>
    );
  }

  const { respondent, scores } = data;

  return (
    <section className="relative bg-ink-950 px-6 pt-36 pb-24 md:px-10 lg:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(216,183,106,0.12),transparent_40%)]" />
      <div className="relative mx-auto max-w-4xl">
        <p className="section-eyebrow">Your Private Results</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-executive text-ivory-50">
          {respondent.fullName ? `${respondent.fullName}'s` : "Your"} Executive Operations Assessment
        </h1>

        {/* Stat tiles */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-7 text-center">
            <p className="text-4xl font-semibold text-ivory-50">{scores.operationsScore}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-platinum-300">
              Executive Operations Score
            </p>
          </div>
          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-7 text-center">
            <p className="text-4xl font-semibold text-ivory-50">{scores.aiReadinessScore}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-platinum-300">AI Readiness Score</p>
          </div>
          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-7 text-center">
            <p className="text-4xl font-semibold text-ivory-50">{scores.hoursRecoverablePerWeek}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-platinum-300">
              Hours Recoverable / Week
            </p>
          </div>
        </div>

        {/* Bottlenecks & Opportunities */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-7">
            <h3 className="text-lg font-semibold text-ivory-50 mb-3">Top Operational Bottlenecks</h3>
            {scores.topBottlenecks.length > 0 ? (
              <ol className="space-y-2 text-sm text-platinum-200 list-decimal list-inside">
                {scores.topBottlenecks.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-platinum-300">None identified.</p>
            )}
          </div>
          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-7">
            <h3 className="text-lg font-semibold text-ivory-50 mb-3">Highest ROI Automation Opportunities</h3>
            {scores.topAutomationOpportunities.length > 0 ? (
              <ol className="space-y-2 text-sm text-platinum-200 list-decimal list-inside">
                {scores.topAutomationOpportunities.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-platinum-300">None identified.</p>
            )}
          </div>
        </div>

        {/* Recommendation */}
        <div className="mt-8 rounded-executive border border-gold-300/30 bg-white/[0.03] p-7">
          <p className="section-eyebrow">Recommended</p>
          <h3 className="mt-2 text-2xl font-semibold text-ivory-50">{PHASE_LABELS[scores.recommendedPhase]}</h3>
          <p className="mt-3 text-sm text-platinum-200 leading-6">
            {scores.recommendConsultation
              ? "Based on your results, we recommend a private consultation to discuss implementation."
              : "Review the recommended phase details on our services pages to learn more."}
          </p>
          <Link href="/services" className="btn-secondary mt-5 inline-block">
            Explore Services
          </Link>
        </div>

        {/* Actions */}
        <div className="mt-10">
          <ResultsActions resumeToken={token!} />
        </div>
      </div>
    </section>
  );
}
