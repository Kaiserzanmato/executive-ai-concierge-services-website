import { Metadata } from "next";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";

export const metadata: Metadata = {
  title: "Executive Operations Assessment",
  description:
    "A private, personalized assessment of your executive operations — time audit, bottlenecks, AI readiness, and a recommended path forward. Takes 5-8 minutes.",
};

export default function AssessmentPage() {
  return (
    <section className="relative bg-ink-950 px-6 pt-36 pb-24 md:px-10 lg:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(216,183,106,0.12),transparent_40%)]" />
      <div className="relative mx-auto max-w-4xl">
        <p className="section-eyebrow">Free Executive Assessment</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-executive text-ivory-50">
          Discover your Executive Operations Score.
        </h1>
        <p className="mt-5 text-lg leading-8 text-platinum-200 max-w-2xl">
          A private, 5-8 minute assessment covering your time audit, operational bottlenecks, and
          AI readiness — with a personalized recommendation and downloadable report at the end.
        </p>

        <div className="mt-12">
          <AssessmentWizard />
        </div>
      </div>
    </section>
  );
}
