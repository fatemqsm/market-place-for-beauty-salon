"use client";

import { useId, useRef, useState } from "react";
import { ChevronLeftIcon } from "./icons";
import { SalonCard } from "./salon-card";
import type { SalonCarouselItem } from "./salons";

type SalonCarouselProps = {
  title: string;
  items: SalonCarouselItem[];
};

export function SalonCarousel({ title, items }: SalonCarouselProps) {
  const titleId = useId();
  const scrollerId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [savedIds, setSavedIds] = useState(
    () => new Set(items.filter((item) => item.saved).map((item) => item.id)),
  );

  function showMore() {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    scroller.scrollBy({ left: -252, behavior: "smooth" });
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
    <section aria-labelledby={titleId} className="mx-auto w-[min(1120px,calc(100%-2rem))]">
      <h2 id={titleId} className="mb-4 text-lg font-bold text-[#1c1917]">
        {title}
      </h2>
      <div className="flex items-start gap-2">
        <div
          id={scrollerId}
          ref={scrollerRef}
          className="flex min-w-0 flex-1 gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <SalonCard
              key={item.id}
              saved={savedIds.has(item.id)}
              onToggleSave={() => toggleSaved(item.id)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-controls={scrollerId}
          aria-label={`نمایش موارد بیشتر در ${title}`}
          onClick={showMore}
          className="mt-10 grid size-9 shrink-0 place-items-center text-[#9a9495] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24181c]"
        >
          <ChevronLeftIcon className="size-6" />
        </button>
      </div>
    </section>
  );
}
