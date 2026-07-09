"use client";

export function CheckboxGroup({
  options,
  selected,
  onChange,
  max,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  max?: number;
}) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      if (max && selected.length >= max) return;
      onChange([...selected, option]);
    }
  }

  const atLimit = Boolean(max) && selected.length >= (max ?? 0);

  return (
    <div>
      {max && (
        <p className="text-xs text-platinum-300 mb-2">
          {selected.length} of {max} selected
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          const disabled = !isSelected && atLimit;
          return (
            <label
              key={option}
              className={`flex items-center gap-3 rounded-soft border border-white/10 bg-ink-800 px-4 py-3 transition-colors ${
                disabled
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer hover:border-gold-300/30"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                disabled={disabled}
                onChange={() => toggle(option)}
                className="h-4 w-4 rounded border-white/20 bg-ink-800 accent-gold-300 cursor-pointer flex-shrink-0 disabled:cursor-not-allowed"
              />
              <span className="text-sm text-platinum-100">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export interface DescriptiveOption {
  value: string;
  label: string;
  description?: string;
}

export function DescriptiveCheckboxGroup({
  options,
  selected,
  onChange,
  max,
}: {
  options: DescriptiveOption[];
  selected: string[];
  onChange: (next: string[]) => void;
  max?: number;
}) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else {
      if (max && selected.length >= max) return;
      onChange([...selected, value]);
    }
  }

  const atLimit = Boolean(max) && selected.length >= (max ?? 0);

  return (
    <div>
      {max && (
        <p className="text-xs text-platinum-300 mb-2">
          {selected.length} of {max} selected
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          const disabled = !isSelected && atLimit;
          return (
            <label
              key={option.value}
              className={`flex items-start gap-3 rounded-soft border border-white/10 bg-ink-800 px-4 py-3 transition-colors ${
                disabled
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer hover:border-gold-300/30"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                disabled={disabled}
                onChange={() => toggle(option.value)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-ink-800 accent-gold-300 cursor-pointer flex-shrink-0 disabled:cursor-not-allowed"
              />
              <span>
                <span className="block text-sm font-medium text-ivory-50">{option.label}</span>
                {option.description && (
                  <span className="block text-xs text-platinum-300 leading-5 mt-0.5">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

