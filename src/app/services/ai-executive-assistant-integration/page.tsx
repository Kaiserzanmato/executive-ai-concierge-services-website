import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Phase 2: AI Executive Assistant Integration",
  description:
    "Human-in-the-loop AI workflows designed to enhance your existing Executive Assistant or Chief of Staff — without removing them from the process.",
};

const capabilities = [
  "Assistant-facing AI dashboard for daily priorities and pending approvals",
  "Draft generation for email responses, meeting follow-ups, travel notes, and internal updates",
  "Human approval gates for calendar movement, external replies, introductions, and sensitive requests",
  "Escalation rules for VIP contacts, investors, media, legal, family office, or board-level messages",
  "Communication style modeling based on approved executive writing samples",
  "Meeting preparation briefs for assistants and Chiefs of Staff",
  "Shared memory rules for preferences, recurring decisions, and operating principles",
];

export default function AIAssistantIntegrationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-950 px-6 pt-36 pb-20 md:px-10 lg:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(126,167,255,0.10),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="section-eyebrow">Phase 2</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-executive text-ivory-50 md:text-6xl lg:text-7xl leading-tight">
            AI Executive Assistant Integration
          </h1>
          <p className="mt-6 text-lg leading-8 text-gold-300/80 max-w-xl">
            Human-in-the-loop AI workflows designed to enhance your existing Executive Assistant or Chief of Staff.
          </p>
        </div>
      </section>

      {/* Service Detail */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main copy */}
          <div className="lg:col-span-7 space-y-8 text-base leading-7 text-platinum-200">
            <p className="text-xl leading-8 text-ivory-50 font-medium">
              Most executives do not need an AI system that replaces their assistant. They need an
              AI system that makes their assistant dramatically more effective.
            </p>
            <p>
              Phase 2 creates a collaboration framework between the AI Concierge and your existing
              Executive Assistant, Chief of Staff, or private office team. The AI can prepare
              drafts, summarize context, detect scheduling conflicts, generate meeting briefs,
              classify inbound requests, and suggest next steps. Your human team remains responsible
              for judgment, tone, relationship management, and final approval.
            </p>
            <p>
              This is especially valuable for executives with complex stakeholder networks. The AI
              can help your team move faster without losing discretion, accuracy, or human control.
            </p>

            {/* Outcome box */}
            <div className="rounded-soft bg-ink-800 border border-white/10 p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-4">Business Outcome</p>
              <p className="text-base leading-7 text-ivory-100">
                Your assistant stops spending hours assembling context and starts operating with a
                faster, more intelligent support layer.
              </p>
            </div>
          </div>

          {/* Sidebar */}
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

            <div className="rounded-executive border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-4">Human Control Preserved</p>
              <p className="text-sm leading-6 text-platinum-200">
                Every action that involves external communications, calendar changes, or sensitive
                escalations requires explicit human review and approval before execution.
              </p>
            </div>

            <Link href="/apply" className="block btn-primary text-center">
              Request a Phase 2 Assessment
            </Link>
            <Link href="/services" className="block text-center text-sm text-platinum-300 hover:text-ivory-50 transition-colors">
              ← Back to all services
            </Link>
          </div>
        </div>
      </section>

      {/* Next Phase CTA */}
      <section className="bg-ink-900/30 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Continue to Phase 3</p>
            <h2 className="mt-3 text-2xl font-semibold text-ivory-50 tracking-tightLuxury">
              Personalized AI Concierge Experience
            </h2>
            <p className="mt-3 text-sm leading-6 text-platinum-200 max-w-lg">
              With your team and systems aligned, the next phase tailors the AI around your unique
              lifestyle, communication style, and private operating preferences.
            </p>
          </div>
          <Link href="/services/personalized-ai-concierge" className="flex-shrink-0 btn-secondary">
            Explore Phase 3 →
          </Link>
        </div>
      </section>
    </>
  );
}
