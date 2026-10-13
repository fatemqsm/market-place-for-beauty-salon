"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type FilterTagsProps<T extends string | number> = {
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
  /** Choosing the selected tag again clears the filter. */
  clearable?: boolean;
  className?: string;
};

/** Single-choice tags. Render inside a `fieldset` whose `legend` names the group. */
export function FilterTags<T extends string | number>({
  options,
  value,
  onChange,
  clearable = false,
  className,
}: FilterTagsProps<T>) {
  const name = useId();

  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <label
            key={option.value}
            className={cn(
              "focus-ring-2 flex cursor-pointer items-center rounded-4xl border p-4 text-base/none font-semibold whitespace-nowrap transition-colors duration-fast ease-standard",
              selected ? "border-selected bg-selected text-on-accent" : "border-border bg-background text-ink hover:bg-hover",
            )}
          >
            <input
              type="radio"
              name={name}
              checked={selected}
              onChange={() => onChange(option.value)}
              onClick={() => clearable && selected && onChange(null)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
