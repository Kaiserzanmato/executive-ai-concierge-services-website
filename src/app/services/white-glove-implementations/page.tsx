import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Phase 4: Premium White-Glove C-Suite Implementations",
  description:
    "Elite, ultra-secure AI automation for leaders and private offices where convenience, discretion, and control matter more than cost. UHNWIs, celebrities, private equity leaders, and family offices.",
};

const capabilities = [
  "Private deployment architecture for sensitive executive operations",
  "Advanced human approval flows for high-risk actions",
  "Secure automations across calendar, email, CRM, documents, task systems, and executive communications",
  "Encrypted inquiry and private request routing",
  "Role-based access for assistants, Chiefs of Staff, operators, legal teams, and trusted advisors",
  "Executive-ready reporting on time saved, response speed, workflow volume, and operational leverage",
  "White-glove onboarding, staff training, workflow documentation, and continuous improvement",
];

const suitedFor = [
  "Ultra-High-Net-Worth Individuals",
  "Celebrities and public figures",
  "Major founders and private equity leaders",
  "Family offices with complex staff structures",
  "Executives with sensitive responsibilities",
  "Private offices requiring advanced governance",
];

export default function WhiteGloveImplementationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-950 px-6 pt-36 pb-20 md:px-10 lg:pt-48 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(216,183,106,0.14),transparent_35%),radial-gradient(circle_at_20%_70%,rgba(126,167,255,0.08),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="section-eyebrow">Phase 4</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-executive text-ivory-50 md:text-6xl lg:text-7xl leading-tight">
            Premium White-Glove C-Suite Implementations
          </h1>
          <p className="mt-6 text-lg leading-8 text-gold-300/80 max-w-xl">
            Elite, ultra-secure AI automation for leaders and private offices where convenience, discretion, and control matter more than cost.
          </p>
        </div>
      </section>

      {/* Detail */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-8 text-base leading-7 text-platinum-200">
            <p className="text-xl leading-8 text-ivory-50 font-medium">
              Phase 4 is designed for clients who require a premium implementation model with deeper
              privacy controls, advanced integrations, tighter operational governance, and a higher
              level of service.
            </p>
            <p>
              This phase is appropriate for UHNWIs, celebrities, public figures, major founders,
              private equity leaders, family offices, and executives with sensitive responsibilities.
              The engagement may include private deployment architecture, secure workflow
              orchestration, executive staff training, advanced approval gates, custom dashboards,
              encrypted intake, high-value interaction routing, and ongoing optimization.
            </p>
            <p>
              The objective is to create an AI-powered operating layer that feels invisible,
              refined, and dependable. It should reduce friction without exposing private context.
              It should increase speed without sacrificing judgment. It should create convenience
              without reducing control.
            </p>

            {/* Suited For */}
            <div className="rounded-soft border border-white/10 bg-ink-800/50 p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-5">This phase is suited for</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suitedFor.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-platinum-200">
                    <span className="h-px w-3 bg-gold-300/50 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-soft bg-ink-800 border border-white/10 p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-4">Business Outcome</p>
              <p className="text-base leading-7 text-ivory-100">
                You gain a private AI operating layer designed for your standards, your risk
                profile, your staff structure, and your lifestyle.
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

            <div className="rounded-executive border border-gold-300/20 bg-gold-300/[0.04] p-7">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-4">Pricing</p>
              <p className="text-sm leading-6 text-platinum-200">
                Phase 4 engagements are scoped individually. Pricing is presented following a
                private consultation and operational assessment. Retainer arrangements are available
                for ongoing executive support.
              </p>
            </div>

            <Link href="/apply" className="block btn-primary text-center">
              Request a Private Phase 4 Consultation
            </Link>
            <Link href="/services" className="block text-center text-sm text-platinum-300 hover:text-ivory-50 transition-colors">
              ← Back to all services
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink-900/30 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-executive text-ivory-50 leading-tight">
            Ready to discuss a fully private, white-glove engagement?
          </h2>
          <p className="mt-5 text-base leading-7 text-platinum-200 max-w-xl mx-auto">
            Submit a private inquiry. All Phase 4 consultations are handled under strict
            confidentiality and begin with a private operational discovery session.
          </p>
          <Link href="/apply" className="mt-8 inline-block btn-primary">
            Submit a Private Inquiry
          </Link>
        </div>
      </section>
    </>
  );
}
