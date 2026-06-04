import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Operating Model — A Discreet Implementation Model for High-Trust Environments",
  description:
    "We implement in controlled phases because executive operations cannot be treated like standard software onboarding. Every calendar rule, inbox pattern, approval flow, and private preference must be understood before automation is introduced.",
};

const stages = [
  {
    number: "01",
    title: "Private Discovery",
    description:
      "We document the executive's current operating environment, including calendars, inboxes, meetings, assistants, recurring decisions, communication preferences, and friction points. This session is conducted under strict confidentiality. Nothing is assumed. Everything is mapped.",
  },
  {
    number: "02",
    title: "Workflow Architecture",
    description:
      "We define the AI Concierge's scope, approved data sources, escalation rules, staff roles, automation boundaries, and required human approvals. We establish what the AI may observe, summarize, draft, recommend, or execute — and what must always remain subject to human judgment.",
  },
  {
    number: "03",
    title: "Secure Build",
    description:
      "We configure the website, intake, database, automation workflows, AI Concierge interface, RAG knowledge base, and routing layer. All systems are built according to the approved architecture, with access controls, audit logging, and approval gates established before activation.",
  },
  {
    number: "04",
    title: "Staff Enablement",
    description:
      "We train Executive Assistants, Chiefs of Staff, operators, and trusted stakeholders on how to work with the AI system safely and effectively. Staff understand their role in the human-in-the-loop model and how to escalate, correct, or override the system.",
  },
  {
    number: "05",
    title: "Controlled Launch",
    description:
      "We launch with limited workflows, monitor system performance, review outputs, refine prompts, and expand only when quality and trust are established. No new automations are added without client approval.",
  },
  {
    number: "06",
    title: "Continuous Optimization",
    description:
      "We review time saved, workflow volume, approval patterns, rejected actions, executive satisfaction, and opportunities for deeper automation. The system improves through structured feedback, not unsupervised learning.",
  },
];

const principles = [
  {
    title: "Discretion First",
    body: "Every system configuration, workflow rule, and executive preference is treated as private. Access is limited to authorized personnel only.",
  },
  {
    title: "Human Judgment Preserved",
    body: "The AI is a governed layer, not an autonomous actor. Sensitive actions, external communications, and high-risk decisions remain subject to human approval.",
  },
  {
    title: "Accuracy Over Speed",
    body: "We do not expand automation faster than trust is established. Quality and accuracy take priority over rapid deployment.",
  },
  {
    title: "Controlled Scope",
    body: "The AI operates only within its defined boundaries. Any scope expansion requires client agreement and re-architecture review.",
  },
];

export default function OperatingModelPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-950 px-6 pt-36 pb-20 md:px-10 lg:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(216,183,106,0.10),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="section-eyebrow">How we work</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-executive text-ivory-50 md:text-6xl lg:text-7xl leading-tight">
            A discreet implementation model for high-trust executive environments.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-platinum-200">
            We implement in controlled phases because executive operations cannot be treated like
            standard software onboarding. Every calendar rule, inbox pattern, approval flow, private
            preference, and staff handoff must be understood before automation is introduced.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="max-w-3xl space-y-6 text-base leading-7 text-platinum-200">
          <p>
            Our operating model prioritizes discretion, accuracy, and adoption. We begin by mapping
            the executive&apos;s current support environment, then define what the AI may observe,
            summarize, draft, recommend, or execute. Human approval gates are established before
            sensitive actions are activated.
          </p>
          <p>
            The engagement does not end at deployment. We continuously review outputs, refine the
            system, and expand automation only when quality and executive trust have been
            demonstrated through real-world performance.
          </p>
        </div>
      </section>

      {/* Implementation Stages */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <h2 className="text-2xl font-semibold tracking-tightLuxury text-ivory-50 mb-12">
          Implementation Stages
        </h2>
        <div className="space-y-5">
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 rounded-executive border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:bg-white/[0.05]"
            >
              <div className="md:col-span-1">
                <span className="text-xs font-mono text-gold-300">{stage.number}</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-lg font-semibold text-ivory-50">{stage.title}</h3>
              </div>
              <div className="md:col-span-8">
                <p className="text-base leading-7 text-platinum-200">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Operating Principles */}
      <section className="bg-ink-900/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="section-eyebrow">Our operating principles</p>
          <h2 className="mt-6 text-3xl font-semibold tracking-executive text-ivory-50 md:text-4xl leading-tight max-w-2xl">
            The values that guide every engagement.
          </h2>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
                <h3 className="text-lg font-semibold text-ivory-50">{p.title}</h3>
                <p className="mt-4 text-sm leading-7 text-platinum-200">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 text-center">
        <p className="section-eyebrow">Begin your engagement</p>
        <h2 className="mt-6 text-3xl font-semibold tracking-executive text-ivory-50 md:text-4xl leading-tight max-w-2xl mx-auto">
          Ready to explore how this model applies to your executive environment?
        </h2>
        <p className="mt-5 text-base leading-7 text-platinum-200 max-w-xl mx-auto">
          Submit a private inquiry. A qualified advisor will review your situation and recommend the
          most appropriate starting point.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/apply" className="btn-primary">
            Submit a Private Inquiry
          </Link>
          <Link href="/trust" className="btn-secondary">
            View Trust Center
          </Link>
        </div>
      </section>
    </>
  );
}
