const trustBadges = [
  { label: "SOC 2 Type II Readiness Posture" },
  { label: "ISO 27001-Aligned Controls" },
  { label: "Human-in-the-Loop Approvals" },
  { label: "Encrypted Intake Workflows" },
  { label: "Role-Based Access Design" },
  { label: "Private Deployment Options" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-white/[0.06] bg-ink-900/40 backdrop-blur-sm py-5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="h-px w-3 bg-gold-300/50" />
              <span className="text-xs text-platinum-300 whitespace-nowrap">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center mt-4 text-[11px] text-platinum-300/40 leading-5">
          Designed for private offices, venture-backed founders, board-level executives,
          celebrities, family offices, and high-discretion teams.
        </p>
      </div>
    </section>
  );
}
