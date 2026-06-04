import Link from "next/link";

type PhaseCardProps = {
  phase: string;
  title: string;
  description: string;
  outcome: string;
  href: string;
  index?: number;
};

export function PhaseCard({ phase, title, description, outcome, href, index = 0 }: PhaseCardProps) {
  return (
    <article
      className="group rounded-executive border border-white/10 bg-white/[0.03] p-8 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] hover:border-white/[0.15] flex flex-col"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <p className="text-xs uppercase tracking-[0.24em] text-gold-300">{phase}</p>
      <h3 className="mt-5 text-2xl font-semibold tracking-tightLuxury text-ivory-50 leading-tight">
        {title}
      </h3>
      <p className="mt-5 text-base leading-7 text-platinum-200 flex-1">{description}</p>
      <div className="mt-8 rounded-soft bg-ink-800 p-5 text-sm leading-6 text-ivory-100">
        <span className="text-gold-300 font-medium">Outcome: </span>
        {outcome}
      </div>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm text-platinum-300 hover:text-ivory-50 transition-colors duration-200 group/link"
      >
        Explore this phase
        <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
      </Link>
    </article>
  );
}
