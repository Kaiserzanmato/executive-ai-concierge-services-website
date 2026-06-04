import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Phase 1: Unified Executive Productivity Hub",
  description:
    "A bespoke 24/7 command center for calendar, email, meetings, tasks, and executive context. Designed for leaders who need clarity before the day begins.",
};

const capabilities = [
  "Calendar consolidation across executive, assistant-managed, board, family office, and travel calendars",
  "Inbox intelligence for urgent requests, VIP contacts, investor communications, board updates, and internal escalations",
  "Meeting aggregation with agenda extraction, participant context, decision history, and follow-up tracking",
  "Daily executive briefing generated from approved sources",
  "Travel, appointment, and private commitment coordination",
  "Decision queue for items requiring executive approval",
  "Secure handoff notes for Executive Assistants, Chiefs of Staff, and operations teams",
];

export default function ProductivityHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-950 px-6 pt-36 pb-20 md:px-10 lg:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(216,183,106,0.12),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="section-eyebrow">Phase 1</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-executive text-ivory-50 md:text-6xl lg:text-7xl leading-tight">
            Unified Executive Productivity Hub
          </h1>
          <p className="mt-6 text-lg leading-8 text-gold-300/80 max-w-xl">
            A bespoke 24/7 command center for calendar, email, meetings, tasks, and executive context.
          </p>
        </div>
      </section>

      {/* Service Detail */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main copy */}
          <div className="lg:col-span-7 space-y-8 text-base leading-7 text-platinum-200">
            <p className="text-xl leading-8 text-ivory-50 font-medium">
              The Unified Executive Productivity Hub creates one intelligent operating layer across
              your daily executive systems.
            </p>
            <p>
              Instead of moving between calendars, inboxes, meeting notes, travel updates,
              documents, and assistant messages, your executive context is consolidated into a
              secure, structured environment. This phase is designed for leaders who need clarity
              before the day begins.
            </p>
            <p>
              The system can aggregate priority meetings, identify scheduling conflicts, prepare
              pre-meeting briefs, summarize unread messages, highlight urgent requests, track open
              follow-ups, and organize daily decisions into a calm executive view.
            </p>
            <p>
              The goal is not to add another dashboard. The goal is to reduce the number of times
              you need to search, remember, forward, ask, clarify, or repeat yourself.
            </p>

            {/* Outcome box */}
            <div className="rounded-soft bg-ink-800 border border-white/10 p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-4">Business Outcome</p>
              <p className="text-base leading-7 text-ivory-100">
                You begin each day with a single executive briefing instead of a scattered set of
                tools, threads, and reminders.
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
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-4">Best For</p>
              <ul className="space-y-2 text-sm text-platinum-200">
                {["C-Suite Executives", "Founders and CEOs", "Family Office Principals", "Board-Level Leaders"].map((r) => (
                  <li key={r} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-gold-300/50" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/apply" className="block btn-primary text-center">
              Request a Phase 1 Assessment
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
            <p className="text-xs uppercase tracking-[0.22em] text-gold-300">Continue to Phase 2</p>
            <h2 className="mt-3 text-2xl font-semibold text-ivory-50 tracking-tightLuxury">
              AI Executive Assistant Integration
            </h2>
            <p className="mt-3 text-sm leading-6 text-platinum-200 max-w-lg">
              Once your command center is established, the next phase integrates the AI Concierge
              with your existing Executive Assistant or Chief of Staff.
            </p>
          </div>
          <Link href="/services/ai-executive-assistant-integration" className="flex-shrink-0 btn-secondary">
            Explore Phase 2 →
          </Link>
        </div>
      </section>
    </>
  );
}
