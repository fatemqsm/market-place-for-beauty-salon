"use client";

import { useState } from "react";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { Review, SalonImage } from "@/features/salons/salon.types";
import { fromDateKey } from "@/lib/persian-calendar";
import { cn } from "@/lib/utils";
import { RatingStars } from "./rating-stars";

const reviewDateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

// Longer reviews start clamped to three lines.
const clampAfter = 160;

type ReviewCardProps = {
  review: Review;
  onOpenImage: (images: SalonImage[], index: number) => void;
};

export function ReviewCard({ review, onOpenImage }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > clampAfter;

  return (
    <article className="flex flex-col gap-3 py-5">
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/10 text-base font-bold text-accent"
        >
          {review.author[0]}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="truncate text-sm/snug font-bold text-ink">{review.author}</h3>
          <p className="text-xs/normal text-text-muted">
            <time dateTime={review.date}>{reviewDateFormatter.format(fromDateKey(review.date))}</time>
            {review.serviceName && ` · ${review.serviceName}`}
          </p>
        </div>
        {review.local && (
          <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-text-secondary">
            نمایشی
          </span>
        )}
      </header>
      <RatingStars rating={review.rating} size={15} />
      <p className={cn("text-sm/relaxed whitespace-pre-line text-ink", long && !expanded && "line-clamp-3")}>{review.text}</p>
      {long && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          className="focus-ring-2 w-fit cursor-pointer rounded-sm text-sm font-semibold text-accent"
        >
          {expanded ? "کمتر" : "بیشتر"}
        </button>
      )}
      {review.images.length > 0 && (
        <ul aria-label={`تصاویر نظر ${review.author}`} className="flex flex-wrap gap-2">
          {review.images.map((image, index) => (
            <li key={image.id}>
              <button
                type="button"
                aria-label={`${image.alt}، بزرگ‌نمایی`}
                onClick={() => onOpenImage(review.images, index)}
                className="group focus-ring-2 block cursor-pointer overflow-hidden rounded-lg"
              >
                <SalonPhoto plate={image.plate} src={image.src} sizes="80px" className="size-20" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
