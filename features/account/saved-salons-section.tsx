"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { NavigateNextIcon } from "@/components/icons";
import { carouselArrowClassName } from "@/components/ui/carousel-arrow";
import { SalonCard } from "@/features/salons/salon-card";
import type { SalonItem } from "@/features/salons/salons";
import { useCardScroller } from "@/hooks/use-card-scroller";

type SavedSalonsSectionProps = {
  /** Owned by the page, so an unsaved salon stays removed after opening a booking and coming back. */
  salons: SalonItem[];
  onUnsave: (id: string) => void;
  className?: string;
};

export function SavedSalonsSection({ salons, onUnsave, className }: SavedSalonsSectionProps) {
  const titleId = useId();
  const scrollerId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [notice, setNotice] = useState("");
  const { scrollerRef, atStart, atEnd, updateEdges, scrollByCards } = useCardScroller<HTMLDivElement>();

  function unsave(id: string) {
    onUnsave(id);
    setNotice("سالن از علاقه‌مندی‌ها حذف شد.");
    // The card and its button disappear, so focus moves to the section instead of the page.
    headingRef.current?.focus();
  }

  return (
    <section aria-labelledby={titleId} className={className}>
      <div className="flex items-center justify-between gap-4">
        <h2 id={titleId} ref={headingRef} tabIndex={-1} className="text-lg/snug font-bold text-ink outline-none">
          سالن‌های ذخیره‌شده
        </h2>
        {/* Desktop has no swipe, so the side column pages through the cards with buttons. */}
        {salons.length > 1 && (
          <div className="flex gap-2 max-lg:hidden">
            <button
              type="button"
              aria-controls={scrollerId}
              aria-label="سالن ذخیره‌شده قبلی"
              aria-disabled={atStart}
              onClick={atStart ? undefined : () => scrollByCards(-1)}
              className={carouselArrowClassName("size-9")}
            >
              <NavigateNextIcon width={18} height={18} />
            </button>
            <button
              type="button"
              aria-controls={scrollerId}
              aria-label="سالن ذخیره‌شده بعدی"
              aria-disabled={atEnd}
              onClick={atEnd ? undefined : () => scrollByCards(1)}
              className={carouselArrowClassName("size-9")}
            >
              <NavigateNextIcon width={18} height={18} className="-scale-x-100" />
            </button>
          </div>
        )}
      </div>
      <p role="status" className="sr-only">
        {notice}
      </p>
      {salons.length > 0 ? (
        /*
          Phones show the next card peeking in. From `lg` each card fills the narrow column; the side padding
          leaves room for the card shadow, and the wider gap keeps the next card out of that padding.
        */
        <div
          id={scrollerId}
          ref={scrollerRef}
          onScroll={updateEdges}
          className="scrollbar-none relative -mx-6.75 mt-1 flex snap-x snap-mandatory scroll-px-6.75 gap-4 overflow-x-auto px-6.75 pt-2 pb-4 lg:-mx-8 lg:-mb-8 lg:gap-16 lg:scroll-px-8 lg:px-8 lg:pt-4 lg:pb-12 motion-safe:scroll-smooth"
        >
          {salons.map((item) => (
            <div key={item.id} className="flex w-64 shrink-0 snap-start lg:w-full">
              <SalonCard
                id={item.id}
                plate={item.plate}
                imageCount={item.imageCount}
                saved
                onToggleSave={() => unsave(item.id)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 rounded-xl bg-surface px-4 py-6 text-center text-sm/relaxed text-text-secondary">
          سالنی ذخیره نکرده‌اید. با قلب روی کارت سالن‌ها، آن‌ها را اینجا نگه دارید.{" "}
          <Link href="/search" className="focus-ring-2 rounded-sm font-semibold text-accent underline">
            جستجوی سالن
          </Link>
        </p>
      )}
    </section>
  );
}
