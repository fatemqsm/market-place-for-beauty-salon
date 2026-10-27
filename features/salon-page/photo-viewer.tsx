"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { NavigateNextIcon } from "@/components/icons";
import { Dialog } from "@/components/ui/dialog";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { SalonImage } from "@/features/salons/salon.types";
import { cn } from "@/lib/utils";

export type PhotoViewerState = { images: SalonImage[]; index: number } | null;

type PhotoViewerProps = {
  title: string;
  state: PhotoViewerState;
  onClose: () => void;
};

const arrowClassName =
  "focus-ring-2 absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/15 text-on-accent transition-[background-color,opacity] duration-fast ease-standard lg:flex not-aria-disabled:cursor-pointer not-aria-disabled:hover:bg-background/30 aria-disabled:opacity-30";

/** Full-screen photos: swipe on touch screens, arrow buttons and arrow keys elsewhere. */
export function PhotoViewer({ title, state, onClose }: PhotoViewerProps) {
  return (
    <Dialog open={state !== null} onClose={onClose} title={title} hideTitle size="full">
      {state && <PhotoTrack images={state.images} initialIndex={state.index} />}
    </Dialog>
  );
}

function PhotoTrack({ images, initialIndex }: { images: SalonImage[]; initialIndex: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const atStart = index === 0;
  const atEnd = index === images.length - 1;

  useEffect(() => {
    // Opens on the chosen photo; `instant` overrides the track's smooth scrolling for this jump only.
    trackRef.current?.children[initialIndex]?.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center" });
  }, [initialIndex]);

  function goTo(next: number) {
    if (next < 0 || next >= images.length) {
      return;
    }
    // No `behavior`: the track's motion-safe:scroll-smooth decides, so reduced motion jumps instantly.
    trackRef.current?.children[next]?.scrollIntoView({ block: "nearest", inline: "center" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (track) {
      // In RTL, scrollLeft starts at 0 and grows negative toward the end.
      setIndex(Math.round(Math.abs(track.scrollLeft) / track.clientWidth));
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    // In RTL, the left arrow moves forward.
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index - 1);
    }
  }

  const current = images[index];

  return (
    <div onKeyDown={handleKeyDown} className="relative flex h-full flex-col gap-4 pt-14 lg:pt-16">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-none relative flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto motion-safe:scroll-smooth"
      >
        {images.map((image, position) => (
          <div
            key={image.id}
            role="group"
            aria-roledescription="اسلاید"
            aria-label={`${position + 1} از ${images.length}`}
            className="flex w-full shrink-0 snap-center items-center justify-center lg:px-20"
          >
            <SalonPhoto
              plate={image.plate}
              src={image.src}
              alt={image.alt}
              sizes="100vw"
              className="aspect-4/5 max-h-full w-full max-w-xl rounded-xl lg:aspect-4/3 lg:max-w-4xl"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="تصویر قبلی"
        aria-disabled={atStart}
        onClick={() => goTo(index - 1)}
        className={cn(arrowClassName, "inset-s-4")}
      >
        <NavigateNextIcon width={36} height={36} />
      </button>
      <button
        type="button"
        aria-label="تصویر بعدی"
        aria-disabled={atEnd}
        onClick={() => goTo(index + 1)}
        className={cn(arrowClassName, "inset-e-4")}
      >
        <NavigateNextIcon width={36} height={36} className="-scale-x-100" />
      </button>
      <div className="flex shrink-0 items-center justify-between gap-4 pb-2 text-sm/normal">
        <p className="min-w-0 truncate font-semibold">{current?.caption ?? current?.alt}</p>
        <p aria-live="polite" className="shrink-0 text-on-accent/80">
          <span dir="ltr">
            {index + 1} / {images.length}
          </span>
        </p>
      </div>
    </div>
  );
}
