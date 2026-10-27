"use client";

import { useRef, useState } from "react";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { SalonImage } from "@/features/salons/salon.types";
import { cn } from "@/lib/utils";
import { PhotoViewer, type PhotoViewerState } from "./photo-viewer";

type SalonGalleryProps = {
  salonName: string;
  photos: SalonImage[];
  className?: string;
};

const photoButtonClassName = "group focus-ring-0 relative block cursor-pointer overflow-hidden focus-visible:z-10";

export function SalonGallery({ salonName, photos, className }: SalonGalleryProps) {
  const [viewer, setViewer] = useState<PhotoViewerState>(null);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const open = (position: number) => setViewer({ images: photos, index: position });

  function handleScroll() {
    const track = trackRef.current;
    if (track) {
      // In RTL, scrollLeft starts at 0 and grows negative toward the end.
      setIndex(Math.round(Math.abs(track.scrollLeft) / track.clientWidth));
    }
  }

  return (
    <section aria-label={`تصاویر ${salonName}`} className={className}>
      {/* Phones: a full-bleed strip to swipe through. */}
      <div className="relative lg:hidden">
        <div ref={trackRef} onScroll={handleScroll} className="scrollbar-none relative flex h-72 snap-x snap-mandatory overflow-x-auto">
          {photos.map((photo, position) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`${photo.alt}، بزرگ‌نمایی`}
              onClick={() => open(position)}
              className={cn(photoButtonClassName, "h-full w-full shrink-0 snap-center")}
            >
              <SalonPhoto plate={photo.plate} src={photo.src} className="size-full" />
            </button>
          ))}
        </div>
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-e-4 bottom-4 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-semibold text-on-accent"
        >
          <span dir="ltr">
            {index + 1} / {photos.length}
          </span>
        </p>
      </div>

      {/* Desktop: one large photo and two smaller ones, as on Fresha. */}
      <div className="hidden h-104 grid-cols-[2fr_1fr] grid-rows-2 gap-2 overflow-hidden rounded-xl lg:grid">
        {photos.slice(0, 3).map((photo, position) => (
          <button
            key={photo.id}
            type="button"
            aria-label={`${photo.alt}، بزرگ‌نمایی`}
            onClick={() => open(position)}
            className={cn(photoButtonClassName, position === 0 && "row-span-2")}
          >
            <SalonPhoto plate={photo.plate} src={photo.src} className="size-full" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => open(0)}
        className="focus-ring-2 mt-3 hidden cursor-pointer rounded-sm text-sm font-semibold text-accent underline-offset-4 hover:underline lg:inline-block"
      >
        مشاهده همه {photos.length} تصویر
      </button>

      <PhotoViewer title={`تصاویر ${salonName}`} state={viewer} onClose={() => setViewer(null)} />
    </section>
  );
}
