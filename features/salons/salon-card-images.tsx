"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type SalonCardImagesProps = {
  count: number;
  salonName: string;
};

const frameClassName = "relative h-39.25 overflow-hidden rounded-t-lg bg-primary";

const washClassName =
  "pointer-events-none absolute inset-0 bg-linear-to-br from-surface via-primary to-accent/20 transition-[scale] duration-slow ease-standard motion-safe:group-hover:scale-105";

function navButtonClassName(unavailable: boolean, className: string) {
  return cn(
    "focus-ring-2 absolute top-17.5 z-10 flex size-7.5 items-center justify-center rounded-full transition-colors duration-fast ease-standard lg:size-6.25",
    unavailable ? "bg-background/70 text-text-secondary" : "cursor-pointer bg-surface text-accent hover:bg-background",
    className,
  );
}

function PhotoWash() {
  return <div aria-hidden="true" className={washClassName} />;
}

function PhotoFrame({ children, className, ...props }: { children?: ReactNode } & ComponentProps<"div">) {
  return (
    <div className={cn(frameClassName, className)} {...props}>
      <PhotoWash />
      {children}
    </div>
  );
}

/** Placeholder photo area. With more than one photo it becomes a carousel; photos load once the API exists. */
export function SalonCardImages({ count, salonName }: SalonCardImagesProps) {
  const [index, setIndex] = useState(0);

  if (count <= 1) {
    return (
      <div className={frameClassName}>
        <PhotoWash />
      </div>
    );
  }

  const atStart = index === 0;
  const atEnd = index === count - 1;

  return (
    <PhotoFrame role="group" aria-roledescription="carousel" aria-label={`تصاویر ${salonName}`}>
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
        className="absolute bottom-3.5 left-1/2 z-10 flex h-4 -translate-x-1/2 items-center gap-3 rounded-full bg-background/70 px-0.5 lg:h-3"
      >
        {Array.from({ length: count }, (_, dot) => (
          <span
            key={dot}
            className={cn(
              "size-3 rounded-full transition-colors duration-fast ease-standard",
              dot === index ? "bg-accent lg:size-2" : "bg-text-secondary lg:size-1.5",
            )}
          />
        ))}
      </div>
    </PhotoFrame>
  );
}
