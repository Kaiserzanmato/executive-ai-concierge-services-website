import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Private Inquiry — Request a Consultation",
  description:
    "Submit a private inquiry to explore an executive AI operating layer tailored to your calendar, inbox, staff, and workflows. All inquiries are handled with strict confidentiality.",
};

export default function ApplyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink-950 px-6 pt-36 pb-16 md:px-10 lg:pt-48">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(216,183,106,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left — Copy */}
            <div className="lg:col-span-5">
              <p className="section-eyebrow">Private Inquiry</p>
              <h1 className="mt-6 text-5xl font-semibold tracking-executive text-ivory-50 leading-tight md:text-6xl">
                Request a Private Consultation
              </h1>
              <p className="mt-8 text-lg leading-8 text-platinum-200">
                Every engagement begins with a private operational assessment. We identify where
                time is being lost, where executive context is fragmented, which workflows require
                human judgment, and which tasks can be safely delegated.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  { label: "Confidential", detail: "All inquiries are handled under strict confidentiality." },
                  { label: "No obligation", detail: "No client relationship exists until a written agreement is executed." },
                  { label: "Personalized review", detail: "A qualified advisor reviews every inquiry personally." },
                  { label: "Encrypted intake", detail: "Your inquiry is encrypted before submission." },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <span className="mt-1 h-px w-4 bg-gold-300/60 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-ivory-100">{item.label}</p>
                      <p className="text-sm text-platinum-300 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Who this is for */}
              <div className="mt-12 rounded-executive border border-white/10 bg-white/[0.03] p-7">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-4">Who this is for</p>
                <ul className="space-y-2">
                  {[
                    "C-Suite Executives",
                    "Founders and CEOs",
                    "Family Office Principals",
                    "UHNWIs and Private Equity Leaders",
                    "Celebrities and Public Figures",
                    "Executive Assistants and Chiefs of Staff",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-platinum-200">
                      <span className="h-px w-3 bg-gold-300/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-7">
              <div className="rounded-executive border border-white/10 bg-white/[0.03] p-8 md:p-10 shadow-panel">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-2">Secure Inquiry Form</p>
                <h2 className="text-2xl font-semibold tracking-tightLuxury text-ivory-50 mb-8">
                  Tell us about your executive environment
                </h2>
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="border-t border-white/[0.06] pt-8">
          <p className="text-xs text-platinum-300/50 leading-6 max-w-3xl">
            Submission of this form does not create a client relationship or engagement with
            Executive AI Concierge Services. No service agreement, retainer, or obligation is
            implied by inquiring. All information is handled in accordance with our{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-platinum-300 transition-colors">
              Privacy Policy
            </a>
            . Inquiries are reviewed personally and responses are provided based on fit and
            availability. Not all inquiries will result in a consultation.
          </p>
        </div>
      </section>
    </>
  );
}
