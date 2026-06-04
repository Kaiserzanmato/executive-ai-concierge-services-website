import Link from "next/link";

const footerLinks = {
  services: [
    { label: "Services Overview", href: "/services" },
    { label: "Productivity Hub", href: "/services/productivity-hub" },
    { label: "EA Integration", href: "/services/ai-executive-assistant-integration" },
    { label: "Personalized Concierge", href: "/services/personalized-ai-concierge" },
    { label: "White-Glove Suite", href: "/services/white-glove-implementations" },
  ],
  platform: [
    { label: "Operating Model", href: "/operating-model" },
    { label: "Trust Center", href: "/trust" },
    { label: "Private Inquiry", href: "/apply" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-ink-950 mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-2 w-2 rounded-full bg-gold-300" />
              <span className="text-sm font-semibold tracking-tightLuxury text-ivory-50">
                Executive AI Concierge Services
              </span>
            </div>
            <p className="text-sm leading-7 text-platinum-300 max-w-xs">
              Private AI operations for leaders whose time cannot be replaced.
              Designed for founders, C-suite executives, UHNWIs, family offices,
              celebrities, and private offices that require precision, discretion,
              and operational leverage.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-green animate-pulseSoft" />
              <span className="text-xs text-platinum-300">Accepting qualified inquiries</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-5">Services</p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-platinum-300 hover:text-ivory-50 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-5">Platform</p>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-platinum-300 hover:text-ivory-50 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold-300 mb-5">Legal</p>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-platinum-300 hover:text-ivory-50 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-wrap gap-6 mb-8">
            {[
              "SOC 2 Type II Readiness Posture",
              "ISO 27001-Aligned Controls",
              "Human-in-the-Loop Approvals",
              "Encrypted Intake Workflows",
              "Role-Based Access Design",
              "Private Deployment Options",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span className="h-px w-3 bg-gold-300/60" />
                <span className="text-xs text-platinum-300">{badge}</span>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-white/[0.04]">
            <p className="text-xs text-platinum-300/60">
              &copy; {year} Executive AI Concierge Services. All rights reserved.
            </p>
            <p className="text-xs text-platinum-300/40 max-w-md text-right">
              No client relationship is created until a written agreement is executed.
              Security certifications are represented as readiness posture only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
