import { cn } from "@/lib/utils";

/** Pill choice: buttons with `aria-pressed`, or labels around a radio or checkbox. */
export function chipClassName(selected: boolean, className?: string) {
  return cn(
    "inline-flex h-9 cursor-pointer items-center justify-center rounded-full border px-4 text-sm/normal font-semibold transition-[color,background-color,border-color,scale] duration-fast ease-standard motion-safe:active:scale-95",
    selected
      ? "border-selected bg-selected text-on-accent"
      : "border-border text-text-secondary hover:border-accent-soft hover:bg-hover",
    className,
  );
}
