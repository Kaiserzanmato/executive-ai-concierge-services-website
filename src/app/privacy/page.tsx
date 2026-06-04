import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Executive AI Concierge Services Privacy Policy. How we collect, use, store, protect, and process information submitted through our website and services.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-ink-950 px-6 pt-36 pb-16 md:px-10 lg:pt-48">
        <div className="relative mx-auto max-w-4xl">
          <p className="section-eyebrow">Legal</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-executive text-ivory-50 leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-5 text-base text-platinum-300">
            Effective Date: Upon publication of this website.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-0 pb-28">
        <div className="prose prose-invert prose-sm max-w-none space-y-10 text-platinum-200 leading-7">

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Introduction</h2>
            <p>
              Executive AI Concierge Services respects the privacy of executives, founders, family
              offices, public figures, and private teams that engage with our website and services.
              This Privacy Policy explains how we collect, use, store, protect, and process
              information submitted through our website, inquiry forms, consultation requests, AI
              Concierge chat widget, and related service workflows.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <p>
                We may collect personal and business information that you voluntarily provide,
                including your name, email address, phone number, company, role, country, preferred
                contact method, budget range, operational needs, executive support structure, and
                the content of your inquiry.
              </p>
              <p>
                If you interact with our AI Concierge chat widget, we may collect the messages you
                submit, session metadata, approximate interaction timestamps, routing tags, lead
                qualification signals, and technical information required to provide a useful
                response.
              </p>
              <p>
                We may also collect limited technical data such as browser type, device type,
                referring page, IP-derived region, and site usage events for security, analytics,
                and service improvement.
              </p>
            </div>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">How We Use Information</h2>
            <div className="space-y-4">
              <p>
                We use collected information to respond to inquiries, evaluate fit for private
                consultation, prepare service recommendations, route high-value requests, improve
                website performance, protect against abuse, maintain audit records, and operate
                secure executive support workflows.
              </p>
              <p>
                We may use inquiry and chat information to understand which service phase may be
                most relevant to your needs. We do not sell personal information.
              </p>
            </div>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Sensitive Executive Information</h2>
            <p>
              We recognize that executives, founders, public figures, celebrities, and private
              offices may share sensitive operational context. Sensitive information should only be
              submitted through approved secure channels. Where encryption is enabled, inquiry
              payloads may be encrypted before storage or routed through secure backend services.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">AI Systems and Model Use</h2>
            <p>
              AI systems used in connection with this website are configured to answer only within
              approved service parameters. Client-specific private data is not used to train public
              AI models without written authorization. Where AI tools are used for service delivery,
              human review and approval controls are applied to sensitive actions.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Data Sharing</h2>
            <div className="space-y-4">
              <p>
                We may share information with authorized service providers that support website
                hosting, secure database storage, CRM routing, email notification, analytics,
                automation, or AI response generation. These providers are selected based on
                operational need and appropriate security posture.
              </p>
              <p>
                We may disclose information if required by law, legal process, regulatory request,
                security investigation, or to protect rights, safety, and service integrity.
              </p>
            </div>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Data Security</h2>
            <div className="space-y-4">
              <p>
                We use reasonable administrative, technical, and organizational safeguards designed
                to protect submitted information. Recommended safeguards include encryption in
                transit, encrypted storage for sensitive payloads, access controls, audit logs,
                secure environment variables, Row Level Security, service-role isolation, and
                restricted administrative access.
              </p>
              <p>
                No online system can be guaranteed to be completely secure. Clients with heightened
                confidentiality requirements should request a private deployment architecture.
              </p>
            </div>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Data Retention</h2>
            <p>
              We retain inquiry and interaction records only as long as reasonably necessary for
              consultation, service delivery, legal, security, and operational purposes. Records may
              be deleted, anonymized, or archived when they are no longer required.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Your Choices</h2>
            <p>
              You may request access, correction, or deletion of personal information where legally
              applicable. You may also request that we stop contacting you for consultation or
              marketing follow-up. To make a request, use the secure inquiry form on this website.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">International Processing</h2>
            <p>
              If you submit information from outside the operating jurisdiction of the service
              provider, your information may be processed in countries with different data
              protection laws. By submitting information, you acknowledge that international
              processing may occur where necessary to provide the service.
            </p>
          </div>

          <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8">
            <h2 className="text-xl font-semibold text-ivory-50 mb-4">Contact</h2>
            <p>
              For privacy-related requests, contact the service operator through the{" "}
              <Link href="/apply" className="text-gold-300 hover:text-gold-100 underline underline-offset-2">
                secure inquiry form
              </Link>{" "}
              on this website.
            </p>
          </div>
        </div>

        <div className="mt-12 flex gap-6">
          <Link href="/terms" className="text-sm text-platinum-300 hover:text-ivory-50 transition-colors">
            Terms of Service →
          </Link>
          <Link href="/trust" className="text-sm text-platinum-300 hover:text-ivory-50 transition-colors">
            Trust Center →
          </Link>
        </div>
      </section>
    </>
  );
}
