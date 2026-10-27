import { cn } from "@/lib/utils";
import type { FieldSize } from "./search-popover";

type SearchFieldState = {
  size?: FieldSize;
  filled: boolean;
  active: boolean;
  className?: string;
};

const fieldSizeClassNames: Record<FieldSize, string> = {
  default: "h-13.5 rounded-lg text-base/none lg:h-14.5 lg:text-xl/none",
  compact: "h-11.25 rounded-4xl text-lg/none",
};

function fieldBackground(size: FieldSize, filled: boolean, active: boolean) {
  if (active) {
    return "bg-background";
  }
  // The compact sticky bar has no resting fill, even once a value is chosen.
  if (size === "compact") {
    return "bg-transparent";
  }
  return filled ? "bg-surface" : "bg-background/70";
}

/** Trigger of a search popover: a button, or a label that wraps a text input. */
export function searchFieldClassName({ size = "default", filled, active, className }: SearchFieldState) {
  return cn(
    "focus-ring-2 flex w-full min-w-0 cursor-pointer items-center gap-2 px-4 text-start font-semibold whitespace-nowrap transition-[background-color,box-shadow,color] duration-fast ease-standard",
    fieldSizeClassNames[size],
    fieldBackground(size, filled, active),
    filled ? "text-ink" : "text-text-muted",
    (filled || active) && "shadow-box",
    "focus-within:bg-background focus-within:shadow-box",
    className,
  );
}

export const searchFieldInputClassName = cn(
  "min-w-0 flex-1 bg-transparent text-ink outline-none",
  "placeholder:text-text-muted",
);

export const searchFieldLabelClassName = "min-w-0 truncate";

export function searchPanelClassName(className?: string) {
  return cn(
    "absolute inset-s-0 top-full z-40 mt-2 rounded-xl border border-border bg-background p-8 shadow-popover motion-safe:animate-overlay",
    className,
  );
}

type SearchOptionState = {
  highlighted: boolean;
  selected: boolean;
  className?: string;
};

export function searchOptionClassName({ highlighted, selected, className }: SearchOptionState) {
  return cn(
    "flex min-h-10 w-full cursor-pointer items-center gap-2 rounded-lg px-3 text-start text-base font-semibold transition-colors duration-fast ease-standard hover:bg-hover",
    highlighted && "bg-hover",
    selected ? "text-selected" : "text-text-secondary",
    className,
  );
}
