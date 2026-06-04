import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing use of the Executive AI Concierge Services website, inquiry forms, AI Concierge chat widget, consultation process, and related digital materials.",
};

export default function TermsPage() {
  return (
    <>
      <section className="relative bg-ink-950 px-6 pt-36 pb-16 md:px-10 lg:pt-48">
        <div className="relative mx-auto max-w-4xl">
          <p className="section-eyebrow">Legal</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-executive text-ivory-50 leading-tight">
            Terms of Service
          </h1>
          <p className="mt-5 text-base text-platinum-300">
            Effective Date: Upon publication of this website.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-0 pb-28">
        <div className="space-y-8 text-platinum-200 leading-7">

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Introduction</h2>
            <p>
              These Terms of Service govern your use of the Executive AI Concierge Services website,
              inquiry forms, AI Concierge chat widget, consultation process, and related digital
              materials. By using this website or submitting an inquiry, you agree to these terms.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Nature of Services</h2>
            <div className="space-y-4">
              <p>
                Executive AI Concierge Services provides AI strategy, workflow automation, executive
                productivity architecture, AI Concierge design, and operational implementation
                support. The website is intended to provide information, collect qualified
                inquiries, and support private consultation.
              </p>
              <p>
                No client relationship is created until a written agreement, scope of work, or
                service contract is executed.
              </p>
            </div>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">No Guarantee of Outcome</h2>
            <p>
              AI systems, automations, and workflow designs can improve operational speed,
              organization, and decision support, but no specific business, financial, time-saving,
              legal, security, or performance outcome is guaranteed.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Client Responsibilities</h2>
            <p>
              Clients are responsible for providing accurate information, identifying sensitive
              workflows, securing necessary internal approvals, complying with applicable laws,
              maintaining appropriate human review, and ensuring that AI-generated recommendations
              are reviewed before high-risk action.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">AI Limitations</h2>
            <p>
              AI systems may produce incomplete, inaccurate, outdated, or inappropriate outputs. AI
              should not be treated as a replacement for legal, financial, medical, security, or
              professional judgment. Sensitive actions should remain subject to human review and
              approval.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Confidentiality</h2>
            <p>
              Information submitted through the website will be handled according to the Privacy
              Policy. Confidentiality obligations for paid engagements are governed by a separate
              written agreement, non-disclosure agreement, or master services agreement.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Security</h2>
            <p>
              The website may use encryption, secure database practices, role-based access, and
              other safeguards. However, no system is completely immune from risk. Clients with
              heightened confidentiality requirements should request a private deployment
              architecture and separate security review.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Prohibited Use</h2>
            <p>
              You may not use the website, inquiry forms, or AI Concierge chat widget to submit
              unlawful content, malicious code, abusive messages, impersonation requests,
              privacy-invasive instructions, credential theft attempts, or requests that support
              fraud, harassment, exploitation, or illegal activity.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Intellectual Property</h2>
            <p>
              The website design, copy, service descriptions, frameworks, code structures, and brand
              materials are owned by the service operator unless otherwise stated. You may not copy,
              resell, or misrepresent these materials without written permission.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Third-Party Services</h2>
            <p>
              The website and service workflows may integrate with third-party platforms such as
              hosting providers, database providers, automation platforms, email systems, AI model
              providers, CRM systems, analytics tools, and productivity software. Use of those
              platforms may be subject to their own terms and policies.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, the service operator is not liable for
              indirect, incidental, consequential, special, punitive, or exemplary damages arising
              from website use, inquiry submission, AI output, automation behavior, third-party
              systems, or service delays.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Changes to Terms</h2>
            <p>
              These Terms may be updated from time to time. Continued use of the website after
              updates means you accept the revised terms.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Contact</h2>
            <p>
              For questions about these Terms, contact the service operator through the{" "}
              <Link href="/apply" className="text-gold-300 hover:text-gold-100 underline underline-offset-2">
                secure inquiry form
              </Link>{" "}
              on this website.
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-6">
          <Link href="/privacy" className="text-sm text-platinum-300 hover:text-ivory-50 transition-colors">
            Privacy Policy →
          </Link>
          <Link href="/trust" className="text-sm text-platinum-300 hover:text-ivory-50 transition-colors">
            Trust Center →
          </Link>
        </div>
      </section>
    </>
  );
}
