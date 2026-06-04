import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Phase 3: Personalized AI Concierge Experience",
  description:
    "A deeply tailored AI experience built around your lifestyle, communication style, decision patterns, and private workflows. The AI adapts to the executive, not a generic template.",
};

const capabilities = [
  "Personalized executive preference memory",
  "Communication style and tone modeling",
  "Private workflow design for personal, business, family office, and lifestyle operations",
  "Controlled intake for requests from staff, partners, family office teams, advisors, and external contacts",
  "Briefing systems for travel, board meetings, investor calls, media appearances, and high-stakes conversations",
  "Lifestyle coordination support for appointments, reservations, wellness schedules, travel notes, and personal commitments",
  "Guardrailed recommendation workflows based on approved preferences and trusted sources",
];

const profiles = [
  {
    type: "Founders",
    detail:
      "Investor updates, board preparation, product strategy notes, hiring signals, and travel coordination.",
  },
  {
    type: "Public Figures",
    detail:
      "Media requests, brand opportunities, appearance scheduling, team coordination, and controlled communication workflows.",
  },
  {
    type: "Family Offices & UHNWIs",
    detail:
      "Private appointments, household operations, philanthropic commitments, personal travel, and high-discretion support.",
  },
];

export default function PersonalizedConcierge() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-950 px-6 pt-36 pb-20 md:px-10 lg:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,183,106,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="section-eyebrow">Phase 3</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-executive text-ivory-50 md:text-6xl lg:text-7xl leading-tight">
            Personalized AI Concierge Experience
          </h1>
          <p className="mt-6 text-lg leading-8 text-gold-300/80 max-w-xl">
            A deeply tailored AI experience built around your lifestyle, communication style, decision patterns, and private workflows.
          </p>
        </div>
      </section>

      {/* Detail */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-8 text-base leading-7 text-platinum-200">
            <p className="text-xl leading-8 text-ivory-50 font-medium">
              The Personalized AI Concierge Experience turns automation into a private operating
              advantage.
            </p>
            <p>
              This phase goes beyond basic productivity. It teaches the system how you think, what
              you prefer, how you communicate, how you make decisions, how you prepare for meetings,
              what you avoid, what your assistant should protect, and how your personal and
              professional worlds intersect.
            </p>
            <p>
              Every workflow is custom. The AI is shaped around the individual, not forced into a
              generic template.
            </p>

            {/* Profile Examples */}
            <div className="space-y-5 pt-4">
              {profiles.map((p) => (
                <div key={p.type} className="rounded-soft border border-white/10 bg-ink-800/50 p-6">
                  <p className="text-sm font-semibold text-ivory-100 mb-2">For {p.type}</p>
                  <p className="text-sm leading-6 text-platinum-200">{p.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-soft bg-ink-800 border border-white/10 p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-4">Business Outcome</p>
              <p className="text-base leading-7 text-ivory-100">
                Your AI Concierge begins to understand how you operate, what matters to you, and
                how your support team should protect your time.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-executive border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-5">Capabilities</p>
              <ul className="space-y-3">
                {capabilities.map((c) => (
                  <li key={c} className="flex gap-3 items-start text-sm leading-6 text-platinum-200">
                    <span className="text-gold-300/60 mt-1 flex-shrink-0">—</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/apply" className="block btn-primary text-center">
              Request a Phase 3 Assessment
            </Link>
            <Link href="/services" className="block text-center text-sm text-platinum-300 hover:text-ivory-50 transition-colors">
              ← Back to all services
            </Link>
          </div>
        </div>
      </section>

      {/* Next Phase */}
      <section className="bg-ink-900/30 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Continue to Phase 4</p>
            <h2 className="mt-3 text-2xl font-semibold text-ivory-50 tracking-tightLuxury">
              Premium White-Glove C-Suite Implementations
            </h2>
            <p className="mt-3 text-sm leading-6 text-platinum-200 max-w-lg">
              For clients who require a premium implementation model with deeper privacy controls,
              advanced integrations, and a higher level of service.
            </p>
          </div>
          <Link href="/services/white-glove-implementations" className="flex-shrink-0 btn-secondary">
            Explore Phase 4 →
          </Link>
        </div>
      </section>
    </>
  );
}
