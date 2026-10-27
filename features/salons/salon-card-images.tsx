"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { PhotoWash } from "./salon-photo";
import type { SalonPlate } from "./salons";

type SalonCardImagesProps = {
  count: number;
  salonName: string;
  plate: SalonPlate;
};

const frameClassName = "relative h-39.25 overflow-hidden rounded-t-xl bg-primary";

function navButtonClassName(unavailable: boolean, className: string) {
  return cn(
    "focus-ring-2 absolute top-17.5 z-20 flex size-7.5 items-center justify-center rounded-full shadow-box transition-[color,background-color,opacity] duration-fast ease-standard lg:size-6.25",
    unavailable ? "bg-background/70 text-text-muted" : "cursor-pointer bg-background/90 text-accent hover:bg-background",
    className,
  );
}

function PhotoFrame({
  plate,
  children,
  className,
  ...props
}: { plate: SalonPlate; children?: ReactNode } & ComponentProps<"div">) {
  return (
    <div className={cn(frameClassName, className)} {...props}>
      <PhotoWash plate={plate} />
      {children}
    </div>
  );
}

/** Placeholder photo area. With more than one photo it becomes a carousel; photos load once the API exists. */
export function SalonCardImages({ count, salonName, plate }: SalonCardImagesProps) {
  const [index, setIndex] = useState(0);

  if (count <= 1) {
    return <PhotoFrame plate={plate} />;
  }

  const atStart = index === 0;
  const atEnd = index === count - 1;

  return (
    <PhotoFrame plate={plate} role="group" aria-roledescription="carousel" aria-label={`تصاویر ${salonName}`}>
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
        className="absolute bottom-3.5 left-1/2 z-10 flex h-4 -translate-x-1/2 items-center gap-2 rounded-full bg-background/80 px-1.5 lg:h-3"
      >
        {Array.from({ length: count }, (_, dot) => (
          <span
            key={dot}
            className={cn(
              "h-2 rounded-full transition-[width,background-color] duration-base ease-standard lg:h-1.5",
              dot === index ? "w-4 bg-accent" : "w-2 bg-text-muted lg:w-1.5",
            )}
          />
        ))}
      </div>
    </PhotoFrame>
  );
}
