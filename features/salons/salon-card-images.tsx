"use client";

import { useState } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type SalonCardImagesProps = {
  count: number;
  salonName: string;
};

function navButtonClassName(unavailable: boolean, className: string) {
  return cn(
    "focus-ring-2 absolute top-17.5 flex size-7.5 items-center justify-center rounded-full lg:size-6.25",
    unavailable ? "bg-white/50 text-text-secondary" : "cursor-pointer bg-surface text-accent",
    className,
  );
}

/** Placeholder photo area. With more than one photo it becomes a carousel; photos load once the API exists. */
export function SalonCardImages({ count, salonName }: SalonCardImagesProps) {
  const [index, setIndex] = useState(0);

  if (count <= 1) {
    return <div className="h-39.25 rounded-t-lg bg-primary" />;
  }

  const atStart = index === 0;
  const atEnd = index === count - 1;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`تصاویر ${salonName}`}
      className="relative h-39.25 rounded-t-lg bg-primary"
    >
      <p aria-live="polite" className="sr-only">
        {`تصویر ${index + 1} از ${count}`}
      </p>
      <button
        type="button"
        aria-label="تصویر قبلی"
        aria-disabled={atStart}
        onClick={atStart ? undefined : () => setIndex(index - 1)}
        className={navButtonClassName(atStart, "inset-s-1.25 lg:inset-s-2")}
      >
        <ChevronRightIcon />
      </button>
      <button
        type="button"
        aria-label="تصویر بعدی"
        aria-disabled={atEnd}
        onClick={atEnd ? undefined : () => setIndex(index + 1)}
        className={navButtonClassName(atEnd, "inset-e-1 lg:inset-e-2.25")}
      >
        <ChevronRightIcon className="-scale-x-100" />
      </button>
      <div
        aria-hidden="true"
        className="absolute bottom-3.5 left-1/2 flex h-4 -translate-x-1/2 items-center gap-3 rounded-full bg-white/50 px-0.5 lg:h-3"
      >
        {Array.from({ length: count }, (_, dot) => (
          <span
            key={dot}
            className={cn("size-3 rounded-full", dot === index ? "bg-accent lg:size-2" : "bg-text-secondary lg:size-1.5")}
          />
        ))}
      </div>
    </div>
  );
}
