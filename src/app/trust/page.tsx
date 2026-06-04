import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trust Center — Built for Discretion, Control, and Executive Trust",
  description:
    "Our security posture, data handling commitments, privacy controls, and governance model. Designed for environments where privacy, accuracy, and judgment matter.",
};

const securityPillars = [
  {
    title: "Encrypted Intake Workflows",
    body: "Inquiry payloads may be encrypted client-side using hybrid RSA-OAEP + AES-GCM encryption before transmission. Sensitive executive context can be routed through encrypted secure channels rather than plaintext databases.",
  },
  {
    title: "Role-Based Access Design",
    body: "Access to executive data, workflow configurations, and system outputs is restricted to authorized personnel with a legitimate operational need. Assistants, Chiefs of Staff, operators, and advisors each receive only the access appropriate to their role.",
  },
  {
    title: "Human-in-the-Loop Approvals",
    body: "High-risk actions — including external communications, calendar changes, financial routing, and sensitive escalations — remain subject to explicit human review and approval before execution. The AI is a governed layer, not an autonomous actor.",
  },
  {
    title: "Audit Logging",
    body: "Key workflow actions, approval decisions, escalation events, and system outputs are logged for accountability, review, and incident response. Audit records help maintain trust and support continuous improvement.",
  },
  {
    title: "Data Minimization",
    body: "We collect only the information required to evaluate and support the requested service. Client context is not shared with unauthorized parties and is never used to train public AI models without explicit written permission.",
  },
  {
    title: "Private Deployment Options",
    body: "For clients with heightened confidentiality requirements, private deployment architecture is available. This may include isolated infrastructure, custom access controls, and dedicated operational oversight.",
  },
];

const compliancePoints = [
  {
    heading: "SOC 2 Type II Readiness Posture",
    body: "Our recommended architecture follows SOC 2 Type II readiness principles, including access control, auditability, incident response planning, data minimization, vendor review, encryption, backup discipline, and separation of duties.",
  },
  {
    heading: "ISO 27001-Aligned Operating Practices",
    body: "Our information security operating practices are aligned with ISO 27001 principles. This includes asset classification, risk management, access governance, operational security, and continuous improvement.",
  },
  {
    heading: "Accurate Certification Representation",
    body: "Formal security certifications are represented as active certifications only when a completed independent audit has been performed. Until then, all client-facing language accurately describes the service as designed with SOC 2 and ISO 27001 readiness in mind.",
  },
];

const dataCommitments = [
  "We collect only the information required to evaluate and support the requested service.",
  "Sensitive executive context is handled through encrypted workflows.",
  "Access is limited to authorized personnel with a legitimate operational need.",
  "High-risk actions remain subject to human approval.",
  "Client data is not used to train public AI models without written permission.",
  "Private workflow knowledge is separated by client and protected through access controls.",
  "Audit logs are maintained for key workflow actions.",
];

export default function TrustPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-950 px-6 pt-36 pb-20 md:px-10 lg:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(216,183,106,0.10),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="section-eyebrow">Trust Center</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-executive text-ivory-50 md:text-6xl lg:text-7xl leading-tight">
            Built for discretion, control, and executive trust.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-platinum-200">
            Executive AI Concierge Services is designed for environments where privacy, accuracy,
            and judgment matter. The platform is implemented with encrypted intake, access controls,
            secure database design, human approval gates, audit logging, and clear data handling
            practices.
          </p>
        </div>
      </section>

      {/* AI Governance Statement */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="rounded-executive border border-white/10 bg-white/[0.03] p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-5">Our Governance Position</p>
          <p className="text-xl leading-8 text-ivory-50 font-medium max-w-3xl">
            We do not position AI as an uncontrolled autonomous actor. We position AI as a governed
            operational layer that supports the executive and their trusted team.
          </p>
          <p className="mt-5 text-base leading-7 text-platinum-200 max-w-3xl">
            Every implementation is designed around a human-in-the-loop model. Sensitive actions
            require approval. High-risk requests can be escalated. Your existing assistant remains
            in control where human judgment is required. The AI handles the repetitive operational
            load while human oversight governs the decision points that matter.
          </p>
        </div>
      </section>

      {/* Security Pillars */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <h2 className="text-2xl font-semibold tracking-tightLuxury text-ivory-50 mb-12">
          Security Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-executive border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:bg-white/[0.05]"
            >
              <h3 className="text-lg font-semibold text-ivory-50">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-platinum-200">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Positioning */}
      <section className="bg-ink-900/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="section-eyebrow">Security positioning</p>
          <h2 className="mt-6 text-3xl font-semibold tracking-executive text-ivory-50 md:text-4xl leading-tight max-w-2xl">
            Accurate compliance representation.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-platinum-200">
            Our recommended architecture follows SOC 2 Type II readiness principles and ISO
            27001-aligned operating practices. This includes access control, auditability, incident
            response planning, data minimization, vendor review, encryption, backup discipline, and
            separation of duties.
          </p>
          <div className="mt-12 space-y-6">
            {compliancePoints.map((point) => (
              <div key={point.heading} className="rounded-soft border border-white/10 bg-white/[0.02] p-7">
                <h3 className="text-base font-semibold text-ivory-50 mb-3">{point.heading}</h3>
                <p className="text-sm leading-7 text-platinum-200">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Commitments */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <h2 className="text-2xl font-semibold tracking-tightLuxury text-ivory-50 mb-10">
          Data Handling Commitments
        </h2>
        <ul className="space-y-4">
          {dataCommitments.map((item) => (
            <li key={item} className="flex items-start gap-4 text-base leading-7 text-platinum-200">
              <span className="mt-2.5 h-px w-5 bg-gold-300/50 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-platinum-300/60 max-w-2xl leading-6">
          No online system can be guaranteed to be completely secure. Clients with heightened
          confidentiality requirements should request a private deployment architecture and a
          separate security review.
        </p>
      </section>

      {/* Links */}
      <section className="bg-ink-900/30 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy", desc: "How we collect, use, and protect your information." },
              { label: "Terms of Service", href: "/terms", desc: "The terms governing use of our website and services." },
              { label: "Submit an Inquiry", href: "/apply", desc: "Begin a private consultation with our team." },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-executive border border-white/10 bg-white/[0.03] p-7 hover:bg-white/[0.05] transition-all duration-200 group"
              >
                <p className="text-base font-semibold text-ivory-50 group-hover:text-gold-100 transition-colors">
                  {link.label} <span className="text-platinum-300">→</span>
                </p>
                <p className="mt-3 text-sm leading-6 text-platinum-200">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
