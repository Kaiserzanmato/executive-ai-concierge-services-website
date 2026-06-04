import type { Metadata } from "next";
import Link from "next/link";
import { PhaseCard } from "@/components/PhaseCard";

export const metadata: Metadata = {
  title: "Services — Four Phases to Build Your Private AI Operating Layer",
  description:
    "From calendar and inbox consolidation to white-glove private automation. Four service phases designed for C-suite executives, founders, UHNWIs, family offices, and private offices.",
};

const phases = [
  {
    phase: "Phase 1",
    title: "Unified Executive Productivity Hub",
    description:
      "A bespoke 24/7 command center for calendar, email, meetings, tasks, and executive context. Aggregate priority meetings, identify conflicts, prepare pre-meeting briefs, summarize unread messages, highlight urgent requests, and organize daily decisions into a calm executive view.",
    outcome:
      "You begin each day with a single executive briefing instead of a scattered set of tools, threads, and reminders.",
    href: "/services/productivity-hub",
  },
  {
    phase: "Phase 2",
    title: "AI Executive Assistant Integration",
    description:
      "Human-in-the-loop AI workflows designed to enhance your existing Executive Assistant or Chief of Staff. The AI prepares drafts, briefs, summaries, routing suggestions, and approval queues while your human team retains judgment and final control.",
    outcome:
      "Your assistant stops spending hours assembling context and starts operating with a faster, more intelligent support layer.",
    href: "/services/ai-executive-assistant-integration",
  },
  {
    phase: "Phase 3",
    title: "Personalized AI Concierge Experience",
    description:
      "A deeply tailored AI experience built around your lifestyle, communication style, decision patterns, and private workflows. The system learns how you operate, what you prefer, what your assistant should protect, and where your personal and professional worlds intersect.",
    outcome:
      "Your AI Concierge begins to understand how you operate, what matters to you, and how your support team should protect your time.",
    href: "/services/personalized-ai-concierge",
  },
  {
    phase: "Phase 4",
    title: "Premium White-Glove C-Suite Implementations",
    description:
      "Elite, ultra-secure AI automation for leaders and private offices where convenience, discretion, and control matter more than cost. Appropriate for UHNWIs, celebrities, public figures, major founders, private equity leaders, and family offices.",
    outcome:
      "You gain a private AI operating layer designed for your standards, your risk profile, your staff structure, and your lifestyle.",
    href: "/services/white-glove-implementations",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-950 px-6 pt-36 pb-20 md:px-10 lg:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(216,183,106,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="section-eyebrow">Our services</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-executive text-ivory-50 md:text-6xl lg:text-7xl leading-tight">
            Four phases to build your private AI operating layer.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-platinum-200">
            From calendar and inbox consolidation to white-glove private automation, our engagement
            model is designed to meet the executive where they are and build toward a secure,
            intelligent, highly personalized support system.
          </p>
        </div>
      </section>

      {/* Services Intro */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="rounded-executive border border-white/10 bg-white/[0.03] p-10 md:p-14">
          <h2 className="text-2xl font-semibold tracking-tightLuxury text-ivory-50 leading-snug max-w-3xl">
            Every engagement begins with a private operational assessment.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-7 text-platinum-200 max-w-3xl">
            <p>
              We identify where time is being lost, where executive context is fragmented, which
              workflows require human judgment, and which repetitive tasks can be safely delegated
              to AI.
            </p>
            <p>
              The result is not a generic chatbot. The result is a bespoke executive operating
              layer that fits the client&apos;s staff structure, security expectations, lifestyle,
              and decision-making style.
            </p>
          </div>
          <Link href="/apply" className="mt-10 inline-block btn-primary">
            Request a Private Assessment
          </Link>
        </div>
      </section>

      {/* Phase Cards */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.phase} {...phase} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-900/30 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="section-eyebrow">Begin your engagement</p>
          <h2 className="mt-6 text-4xl font-semibold tracking-executive text-ivory-50 md:text-5xl leading-tight">
            Not sure which phase is right for your situation?
          </h2>
          <p className="mt-6 text-lg leading-8 text-platinum-200 max-w-xl mx-auto">
            Submit a private inquiry. A qualified advisor will review your executive environment and
            recommend the most appropriate starting point.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-primary">
              Submit a Private Inquiry
            </Link>
            <Link href="/operating-model" className="btn-secondary">
              View the Operating Model
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
