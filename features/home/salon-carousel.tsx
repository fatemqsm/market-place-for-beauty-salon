"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { SalonCard } from "./salon-card";
import type { SalonCarouselItem } from "./salons";

type SalonCarouselProps = {
  title: string;
  items: SalonCarouselItem[];
  gradientTitle?: boolean;
  className?: string;
};

const pillButtonClassName =
  "h-full flex-1 cursor-pointer rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-disabled:cursor-default";

export function SalonCarousel({ title, items, gradientTitle = false, className = "" }: SalonCarouselProps) {
  const titleId = useId();
  const scrollerId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [savedIds, setSavedIds] = useState(
    () => new Set(items.filter((item) => item.saved).map((item) => item.id)),
  );

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
    scroller.scrollBy({ left: -direction * step, behavior: "smooth" });
  }

  function toggleSaved(id: string) {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <section aria-labelledby={titleId} className={`me-auto w-full max-w-[1279px] ${className}`}>
      <div className="flex h-[52px] items-center justify-between gap-4">
        <h2
          id={titleId}
          className={`flex h-full flex-1 items-center text-base leading-none font-semibold text-ink lg:text-2xl lg:font-medium ${gradientTitle ? "lg:text-gradient-title" : ""}`}
        >
          {title}
        </h2>
        <div className="relative flex h-[30px] w-[90px] shrink-0 lg:hidden">
          <Image src="/home/carousel-nav.svg" alt="" fill className="pointer-events-none" />
          <button
            type="button"
            aria-controls={scrollerId}
            aria-label={`سالن قبلی در ${title}`}
            aria-disabled={atStart}
            onClick={atStart ? undefined : () => scrollByCards(-1)}
            className={pillButtonClassName}
          />
          <button
            type="button"
            aria-controls={scrollerId}
            aria-label={`سالن بعدی در ${title}`}
            aria-disabled={atEnd}
            onClick={atEnd ? undefined : () => scrollByCards(1)}
            className={pillButtonClassName}
          />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-4 lg:mt-4">
        {/* On phones the gap exceeds the 27px page padding plus the card shadow, so the next card stays off-screen. */}
        <div
          id={scrollerId}
          ref={scrollerRef}
          onScroll={updateEdges}
          className="-m-6 flex min-w-0 flex-1 snap-x snap-mandatory scroll-px-6 gap-14 overflow-x-auto sm:gap-4 scroll-smooth p-6 [scrollbar-width:none] lg:snap-proximity [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <SalonCard key={item.id} saved={savedIds.has(item.id)} onToggleSave={() => toggleSaved(item.id)} />
          ))}
        </div>
        <button
          type="button"
          aria-controls={scrollerId}
          aria-label={`نمایش سالن‌های بیشتر در ${title}`}
          aria-disabled={atEnd}
          onClick={atEnd ? undefined : () => scrollByCards(1)}
          className="hidden size-[63px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-disabled:cursor-default aria-disabled:opacity-40 lg:flex"
        >
          <Image src="/home/navigate-next.svg" alt="" width={63} height={63} className="-scale-x-100" />
        </button>
      </div>
    </section>
  );
}
