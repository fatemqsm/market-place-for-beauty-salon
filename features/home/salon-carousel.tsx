"use client";

import { NavigateNextIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { useId, useRef, useState } from "react";
import { SalonCard } from "@/features/salons/salon-card";
import type { SalonItem } from "@/features/salons/salons";
import { useSavedSalons } from "@/features/salons/use-saved-salons";

type SalonCarouselProps = {
  title: string;
  /** Short label printed above the title. */
  eyebrow: string;
  items: SalonItem[];
  gradientTitle?: boolean;
  className?: string;
};

const arrowButtonClassName =
  "focus-ring-2 flex shrink-0 items-center justify-center rounded-full border border-border bg-background text-text-secondary shadow-box transition-[background-color,border-color,color,opacity,scale] duration-fast ease-standard not-aria-disabled:cursor-pointer not-aria-disabled:hover:border-accent-soft not-aria-disabled:hover:bg-surface-strong not-aria-disabled:hover:text-ink motion-safe:not-aria-disabled:active:scale-95 aria-disabled:opacity-40";

export function SalonCarousel({ title, eyebrow, items, gradientTitle = false, className }: SalonCarouselProps) {
  const titleId = useId();
  const scrollerId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const { savedIds, toggleSaved } = useSavedSalons(items);

  function updateEdges() {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    // In RTL, scrollLeft starts at 0 and grows negative toward the end.
    const offset = Math.abs(scroller.scrollLeft);
    setAtStart(offset <= 1);
    setAtEnd(offset + scroller.clientWidth >= scroller.scrollWidth - 1);
  }

  function scrollByCards(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    const card = scroller?.firstElementChild;
    if (!scroller || !card) {
      return;
    }
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(scroller).columnGap);
    // No `behavior`: the scroller's motion-safe:scroll-smooth decides, so reduced motion jumps instantly.
    scroller.scrollBy({ left: -direction * step });
  }

  return (
    <section aria-labelledby={titleId} className={cn("w-full", className)}>
      <Reveal className="flex items-end justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-accent lg:text-sm">
            <span aria-hidden="true" className="h-px w-6 bg-accent-soft" />
            {eyebrow}
          </p>
          <h2
            id={titleId}
            className={cn(
              "text-lg leading-tight font-bold text-ink lg:text-3xl",
              gradientTitle && "lg:text-gradient-title",
            )}
          >
            {title}
          </h2>
        </div>
        <div className="flex shrink-0 gap-2 lg:hidden">
          <button
            type="button"
            aria-controls={scrollerId}
            aria-label={`سالن قبلی در ${title}`}
            aria-disabled={atStart}
            onClick={atStart ? undefined : () => scrollByCards(-1)}
            className={cn(arrowButtonClassName, "size-9")}
          >
            <NavigateNextIcon width={18} height={18} />
          </button>
          <button
            type="button"
            aria-controls={scrollerId}
            aria-label={`سالن بعدی در ${title}`}
            aria-disabled={atEnd}
            onClick={atEnd ? undefined : () => scrollByCards(1)}
            className={cn(arrowButtonClassName, "size-9")}
          >
            <NavigateNextIcon width={18} height={18} className="-scale-x-100" />
          </button>
        </div>
      </Reveal>
      <div className="relative mt-5 lg:mt-6">
        {/* Both arrows sit in the 72px page gutter so the track matches the header width. */}
        <button
          type="button"
          aria-controls={scrollerId}
          aria-label={`سالن قبلی در ${title}`}
          aria-disabled={atStart}
          onClick={atStart ? undefined : () => scrollByCards(-1)}
          className={cn(arrowButtonClassName, "absolute -start-14 top-1/2 z-10 hidden size-14 -translate-y-1/2 lg:flex")}
        >
          <NavigateNextIcon />
        </button>
        <button
          type="button"
          aria-controls={scrollerId}
          aria-label={`نمایش سالن‌های بیشتر در ${title}`}
          aria-disabled={atEnd}
          onClick={atEnd ? undefined : () => scrollByCards(1)}
          className={cn(arrowButtonClassName, "absolute -end-14 top-1/2 z-10 hidden size-14 -translate-y-1/2 lg:flex")}
        >
          <NavigateNextIcon className="-scale-x-100" />
        </button>
        {/* On phones the gap exceeds the 27px page padding plus the card shadow, so the next card stays off-screen. */}
        <div
          id={scrollerId}
          ref={scrollerRef}
          onScroll={updateEdges}
          className="scrollbar-none -m-6 flex min-w-0 snap-x snap-mandatory scroll-px-6 gap-14 overflow-x-auto p-6 sm:gap-5 lg:-my-6 lg:mx-0 lg:scroll-px-0 lg:px-0 lg:py-6 lg:snap-proximity motion-safe:scroll-smooth"
        >
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              delay={Math.min(index, 3) * 70}
              className="flex w-64 shrink-0 snap-start sm:w-72 xl:w-80"
            >
              <SalonCard
                plate={item.plate}
                imageCount={item.imageCount}
                saved={savedIds.has(item.id)}
                onToggleSave={() => toggleSaved(item.id)}
                className="w-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
