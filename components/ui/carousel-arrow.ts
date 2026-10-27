import { cn } from "@/lib/utils";

/** Round previous/next button beside a horizontal card track; set its size through `className`. */
export function carouselArrowClassName(className?: string) {
  return cn(
    "focus-ring-2 flex shrink-0 items-center justify-center rounded-full border border-border bg-background text-text-secondary shadow-box transition-[background-color,border-color,color,opacity,scale] duration-fast ease-standard not-aria-disabled:cursor-pointer not-aria-disabled:hover:border-accent-soft not-aria-disabled:hover:bg-surface-strong not-aria-disabled:hover:text-ink motion-safe:not-aria-disabled:active:scale-95 aria-disabled:opacity-40",
    className,
  );
}
