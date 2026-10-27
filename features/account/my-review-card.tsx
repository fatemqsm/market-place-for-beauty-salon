"use client";

import Link from "next/link";
import { useState } from "react";
import { RatingStars } from "@/features/salon-page/rating-stars";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { Review, SalonImage } from "@/features/salons/salon.types";
import type { SalonPlate } from "@/features/salons/salons";
import { cn } from "@/lib/utils";
import { describeBookingDate } from "./booking-time";

// Longer reviews start clamped to three lines, as on the salon page.
const clampAfter = 160;

type MyReviewCardProps = {
  review: Review;
  salonId: string;
  salonName: string;
  plate: SalonPlate;
  onOpenImage: (images: SalonImage[], index: number) => void;
};

/** A review the customer wrote, headed by the salon it is about rather than by the author. */
export function MyReviewCard({ review, salonId, salonName, plate, onOpenImage }: MyReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > clampAfter;

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 shadow-card">
      <header className="flex items-start gap-3">
        <SalonPhoto plate={plate} className="size-12 shrink-0 rounded-lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="text-base/snug font-bold text-ink">
            <Link href={`/salons/${salonId}#reviews`} className="focus-ring-2 rounded-sm hover:text-accent">
              {salonName}
            </Link>
          </h3>
          <p className="text-xs/normal text-text-muted">
            <time dateTime={review.date}>{describeBookingDate(review.date)}</time>
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
        <ul aria-label={`تصاویر نظر شما درباره ${salonName}`} className="flex flex-wrap gap-2">
          {review.images.map((image, index) => (
            <li key={image.id}>
              <button
                type="button"
                aria-label={`${image.alt}، بزرگ‌نمایی`}
                onClick={() => onOpenImage(review.images, index)}
                className="group focus-ring-2 block cursor-pointer overflow-hidden rounded-lg"
              >
                <SalonPhoto plate={image.plate} src={image.src} sizes="64px" className="size-16" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
