"use client";

export function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 rounded-soft border border-white/10 bg-ink-800 px-4 py-3 cursor-pointer hover:border-gold-300/30 transition-colors"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="h-4 w-4 rounded border-white/20 bg-ink-800 accent-gold-300 cursor-pointer flex-shrink-0"
          />
          <span className="text-sm text-platinum-100">{option}</span>
        </label>
      ))}
    </div>
  );
}

export function SeveritySliders({
  items,
  severity,
  onChange,
  label = "How significant is each?",
}: {
  items: string[];
  severity: Record<string, number>;
  onChange: (next: Record<string, number>) => void;
  label?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-4 mt-5">
      <p className="form-label">{label}</p>
      {items.map((item) => (
        <div key={item}>
          <div className="flex items-center justify-between text-xs text-platinum-300 mb-1">
            <span>{item}</span>
            <span>{severity[item] ?? 3}/5</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={severity[item] ?? 3}
            onChange={(e) => onChange({ ...severity, [item]: Number(e.target.value) })}
            className="w-full accent-gold-300"
          />
        </div>
      ))}
    </div>
  );
}
