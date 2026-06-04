import type { Metadata } from "next";
import Link from "next/link";
import TrustStrip from "@/components/TrustStrip";
import { PhaseCard } from "@/components/PhaseCard";

export const metadata: Metadata = {
  title: "Executive AI Concierge Services — Private AI Operations for Elite Leaders",
  description:
    "An AI-powered executive operating layer built around your calendar, inbox, meetings, staff, and private workflows. Designed for C-suite executives, founders, UHNWIs, family offices, and private figures.",
};

const phases = [
  {
    phase: "Phase 1",
    title: "Unified Executive Productivity Hub",
    description:
      "A bespoke 24/7 command center for calendar, email, meetings, tasks, and executive context. One intelligent operating layer across your daily executive systems — consolidating calendars, inboxes, meeting notes, travel updates, and assistant messages.",
    outcome:
      "You begin each day with a single executive briefing instead of a scattered set of tools, threads, and reminders.",
    href: "/services/productivity-hub",
  },
  {
    phase: "Phase 2",
    title: "AI Executive Assistant Integration",
    description:
      "Human-in-the-loop AI workflows designed to enhance your existing Executive Assistant or Chief of Staff. The AI prepares drafts, briefs, summaries, routing suggestions, and approval queues while your human team retains judgment and control.",
    outcome:
      "Your assistant stops spending hours assembling context and starts operating with a faster, more intelligent support layer.",
    href: "/services/ai-executive-assistant-integration",
  },
  {
    phase: "Phase 3",
    title: "Personalized AI Concierge Experience",
    description:
      "A deeply tailored AI experience built around your lifestyle, communication style, decision patterns, and private workflows. The AI learns how you think, what you prefer, how you communicate, and which workflows deserve automation.",
    outcome:
      "Your AI Concierge begins to understand how you operate, what matters to you, and how your support team should protect your time.",
    href: "/services/personalized-ai-concierge",
  },
  {
    phase: "Phase 4",
    title: "Premium White-Glove C-Suite Implementations",
    description:
      "Elite, ultra-secure AI automation for leaders and private offices where convenience, discretion, and control matter more than cost. Private deployment architecture, advanced approval gates, encrypted intake, and ongoing optimization.",
    outcome:
      "You gain a private AI operating layer designed for your standards, your risk profile, your staff structure, and your lifestyle.",
    href: "/services/white-glove-implementations",
  },
];

const painPoints = [
  {
    title: "Fragmented Executive Context",
    body: "Critical information lives across email, calendars, notes, chats, documents, CRM records, travel tools, and human memory.",
  },
  {
    title: "Expensive Attention Leakage",
    body: "The executive spends too much time reviewing, forwarding, clarifying, searching, approving, and repeating instructions.",
  },
  {
    title: "Inconsistent Operational Follow-Through",
    body: "Even excellent teams can lose time when workflows depend on manual updates, scattered tools, or unclear handoff rules.",
  },
];

const useCases = [
  { profile: "C-Suite Executive", detail: "Daily briefings, calendar governance, inbox triage, board prep." },
  { profile: "Venture-Backed Founder", detail: "Investor updates, hiring signals, board preparation, strategic focus protection." },
  { profile: "Family Office", detail: "Household operations, philanthropic commitments, private travel, high-discretion support." },
  { profile: "Celebrity & Public Figure", detail: "Media requests, appearance scheduling, brand governance, team coordination." },
  { profile: "Private Equity Leader", detail: "Portfolio monitoring, deal flow management, investor communication, board-level escalations." },
  { profile: "Chief of Staff", detail: "Principal support acceleration, approval queues, staff coordination, communication modeling." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 px-6 pt-36 pb-28 text-ivory-50 md:px-10 lg:px-16 lg:pt-48 lg:pb-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(216,183,106,0.16),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(126,167,255,0.10),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left — Copy */}
          <div className="lg:col-span-7">
            <p className="text-sm uppercase tracking-[0.28em] text-gold-300">
              Private AI operations for leaders whose time cannot be replaced.
            </p>
            <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-executive md:text-7xl lg:text-8xl leading-[0.95]">
              An AI-powered executive operating layer built around your calendar, inbox, meetings, staff, and private workflows.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-platinum-200">
              Executive AI Concierge Services designs, deploys, and manages discreet AI systems
              that help founders, C-suite leaders, family offices, and public figures reclaim time,
              reduce operational noise, and turn fragmented daily operations into a calm, intelligent
              command center.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/apply" className="btn-primary">
                Request a Private Consultation
              </Link>
              <Link href="/services" className="btn-secondary">
                Explore the 4-Phase Model
              </Link>
            </div>
            <p className="mt-8 text-sm text-platinum-300/70">
              Built for executives, founders, UHNWIs, celebrities, and private offices that require
              precision, discretion, and operational leverage.
            </p>
          </div>

          {/* Right — Executive Briefing Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-executive border border-white/10 bg-white/[0.035] p-6 shadow-panel backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-platinum-300">Executive Briefing</p>
              <div className="mt-6 space-y-4">
                {[
                  "Calendar conflicts resolved before the day begins.",
                  "Priority messages surfaced from trusted contacts.",
                  "Assistant handoffs prepared with context and approval rules.",
                  "Meeting briefs generated from approved knowledge sources.",
                  "Private workflow requests routed through secure intake.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-soft border border-white/10 bg-ink-800/70 p-4 text-sm leading-6 text-platinum-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-5 text-platinum-300/60">
                Designed for private offices, founders, C-suite executives, celebrities, and
                high-discretion support teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <TrustStrip />

      {/* Problem Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <p className="section-eyebrow">The modern executive has more tools, but less time.</p>
        <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-executive text-ivory-50 md:text-5xl leading-tight">
          Your calendar, inbox, meetings, travel, documents, assistant handoffs, and decision
          requests should not compete for your attention.
        </h2>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-platinum-200">
          High-performing leaders are surrounded by systems, yet most of those systems still require
          manual coordination. Calendars live in separate environments. Meeting notes disappear into
          threads. Executive assistants spend hours chasing context. Important decisions are delayed
          by fragmented information. Personal preferences, communication style, travel patterns, and
          private operating rules often remain trapped in someone&apos;s memory.
        </p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-platinum-200">
          Executive AI Concierge Services solves this by creating a secure, deeply personalized AI
          operating layer around the executive. The goal is not to replace trusted human staff. The
          goal is to make the entire executive support system faster, more organized, more
          proactive, and more intelligent.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((p) => (
            <div key={p.title} className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
              <h3 className="text-lg font-semibold text-ivory-50 leading-tight">{p.title}</h3>
              <p className="mt-4 text-sm leading-7 text-platinum-200">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-ink-900/30 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="section-eyebrow">A private digital employee for your executive life.</p>
          <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-executive text-ivory-50 md:text-5xl leading-tight">
            We build AI systems that work like an extension of your executive staff.
          </h2>
          <div className="mt-8 max-w-3xl space-y-6 text-lg leading-8 text-platinum-200">
            <p>
              Our service creates a bespoke AI Concierge that understands how you operate, how your
              team supports you, how your calendar should be protected, how your communication should
              sound, and which workflows deserve automation.
            </p>
            <p>
              The system can consolidate calendar and inbox context, prepare meeting intelligence,
              coordinate with an existing Executive Assistant or Chief of Staff, summarize key
              decisions, route requests, draft responses, organize travel context, and surface the
              information that matters before it becomes urgent.
            </p>
            <p>
              Every implementation is designed around a human-in-the-loop model. Sensitive actions
              can require approval. High-risk requests can be escalated. Your existing assistant
              remains in control where human judgment is required. The AI handles the repetitive
              operational load.
            </p>
          </div>
        </div>
      </section>

      {/* Four Phases */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <p className="section-eyebrow">Four service phases</p>
        <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-executive text-ivory-50 md:text-5xl leading-tight">
          Four phases to build your private AI operating layer.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-platinum-200">
          From calendar and inbox consolidation to white-glove private automation, our engagement
          model is designed to meet the executive where they are and build toward a secure,
          intelligent, highly personalized support system.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.phase} {...phase} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-secondary inline-block">
            View Full Service Details
          </Link>
        </div>
      </section>

      {/* Executive Use Cases */}
      <section className="bg-ink-900/30 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="section-eyebrow">Who we serve</p>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-executive text-ivory-50 md:text-5xl leading-tight">
            Designed for the leaders at the top of the most demanding organizations.
          </h2>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <div key={uc.profile} className="rounded-executive border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-base font-semibold text-ivory-50">{uc.profile}</h3>
                <p className="mt-3 text-sm leading-6 text-platinum-200">{uc.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Model Preview */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-eyebrow">How we implement</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-executive text-ivory-50 md:text-5xl leading-tight">
              A discreet implementation model for high-trust executive environments.
            </h2>
            <p className="mt-8 text-lg leading-8 text-platinum-200">
              We implement in controlled phases because executive operations cannot be treated like
              standard software onboarding. Every calendar rule, inbox pattern, approval flow,
              private preference, and staff handoff must be understood before automation is
              introduced.
            </p>
            <Link href="/operating-model" className="mt-10 inline-flex items-center gap-2 text-sm text-platinum-300 hover:text-ivory-50 transition-colors">
              View the full operating model <span>→</span>
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { n: "01", title: "Private Discovery", desc: "We document the executive's current operating environment." },
              { n: "02", title: "Workflow Architecture", desc: "We define the AI Concierge's scope, data sources, and approval rules." },
              { n: "03", title: "Secure Build", desc: "We configure all systems, AI interfaces, and routing layers." },
              { n: "04", title: "Staff Enablement", desc: "We train your Executive Assistant, Chief of Staff, and operators." },
              { n: "05", title: "Controlled Launch", desc: "We launch with limited workflows and expand only when trust is established." },
              { n: "06", title: "Continuous Optimization", desc: "We review performance and deepen automation over time." },
            ].map((step) => (
              <div key={step.n} className="flex gap-5 items-start rounded-soft border border-white/[0.07] bg-white/[0.02] px-6 py-4">
                <span className="text-xs font-mono text-gold-300/70 mt-0.5 flex-shrink-0">{step.n}</span>
                <div>
                  <p className="text-sm font-semibold text-ivory-100">{step.title}</p>
                  <p className="text-sm text-platinum-300 mt-1 leading-5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Discretion */}
      <section className="bg-ink-900/30 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="section-eyebrow">Security and discretion</p>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-executive text-ivory-50 md:text-5xl leading-tight">
            Built for discretion, control, and executive trust.
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-platinum-200">
            Executive AI Concierge Services is designed for environments where privacy, accuracy,
            and judgment matter. We do not position AI as an uncontrolled autonomous actor. We
            position AI as a governed operational layer that supports the executive and their
            trusted team.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Encrypted Intake", body: "Inquiry payloads may be encrypted client-side before transmission." },
              { title: "Role-Based Access", body: "Assistants, Chiefs of Staff, and operators access only what they need." },
              { title: "Human Approval Gates", body: "Sensitive actions require explicit human review before execution." },
              { title: "Audit Logging", body: "Key workflow actions are logged for accountability and review." },
              { title: "Private Deployment Options", body: "For clients with heightened requirements, private architecture is available." },
              { title: "No Model Training on Client Data", body: "Client context is never used to train public AI models without consent." },
            ].map((item) => (
              <div key={item.title} className="rounded-executive border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-base font-semibold text-ivory-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-platinum-200">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-sm text-platinum-300/60 max-w-2xl">
            Our recommended architecture follows SOC 2 Type II readiness principles and ISO
            27001-aligned operating practices. Formal certifications are represented as readiness
            posture only — not active certifications.
          </div>
          <Link href="/trust" className="mt-8 inline-flex items-center gap-2 text-sm text-platinum-300 hover:text-ivory-50 transition-colors">
            Visit the Trust Center <span>→</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <div className="rounded-executive border border-white/10 bg-white/[0.03] p-12 md:p-16 text-center shadow-panel">
          <p className="section-eyebrow">Begin your engagement</p>
          <h2 className="mt-6 text-4xl font-semibold tracking-executive text-ivory-50 md:text-5xl leading-tight max-w-2xl mx-auto">
            Request a private consultation to explore your executive AI operating layer.
          </h2>
          <p className="mt-6 text-lg leading-8 text-platinum-200 max-w-xl mx-auto">
            Every engagement begins with a private operational assessment. We identify where time is
            being lost and which workflows can be safely delegated to AI with human approval controls.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-primary">
              Submit a Private Inquiry
            </Link>
            <Link href="/services" className="btn-secondary">
              Learn About Our Services
            </Link>
          </div>
          <p className="mt-8 text-xs text-platinum-300/50">
            No client relationship is created until a written agreement is executed.
            All inquiries are handled with strict confidentiality.
          </p>
        </div>
      </section>
    </>
  );
}
