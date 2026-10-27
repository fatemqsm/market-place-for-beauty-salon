"use client";

import { useId, useState, type ActionDispatch } from "react";
import { buttonClassName } from "@/components/ui/button";
import { PhotoViewer, type PhotoViewerState } from "@/features/salon-page/photo-viewer";
import type { Review } from "@/features/salons/salon.types";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { AccountBooking } from "./account.types";
import type { AccountAction } from "./account-state";
import { describeBookingDate, shownStatus } from "./booking-time";
import { summarizeBooking } from "./booking-summary";
import { MyReviewCard } from "./my-review-card";
import { ReviewDialog } from "./review-dialog";

type MyReviewsSectionProps = {
  bookings: AccountBooking[];
  now: Date;
  dispatch: ActionDispatch<[AccountAction]>;
  className?: string;
};

export function MyReviewsSection({ bookings, now, dispatch, className }: MyReviewsSectionProps) {
  const titleId = useId();
  const [reviewing, setReviewing] = useState<AccountBooking | null>(null);
  const [viewer, setViewer] = useState<PhotoViewerState>(null);
  const [notice, setNotice] = useState("");

  // Both arrays are built here, so sorting them in place is safe (and works on older iOS).
  const written = bookings
    .filter((booking): booking is AccountBooking & { review: Review } => booking.review !== null)
    .sort((a, b) => b.review.date.localeCompare(a.review.date));
  const waiting = bookings
    .filter((booking) => !booking.review && shownStatus(booking, now) === "completed")
    .sort((a, b) => b.date.localeCompare(a.date));

  function handleReviewed(bookingId: string, review: Review) {
    dispatch({ type: "review", bookingId, review });
    setReviewing(null);
    setNotice("نظر شما ثبت شد. تا اتصال به سرور، فقط در همین مرورگر می‌ماند.");
  }

  return (
    <section aria-labelledby={titleId} className={className}>
      <h2 id={titleId} className="text-lg/snug font-bold text-ink">
        دیدگاه‌های من{" "}
        <span className="text-sm font-normal text-text-muted">
          (<span dir="ltr">{written.length}</span>)
        </span>
      </h2>

      <p role="status" className="mt-3 rounded-lg bg-success/10 px-4 py-3 text-sm font-semibold text-success empty:hidden">
        {notice}
      </p>

      {waiting.length > 0 && (
        <div className="mt-3 rounded-xl bg-surface p-4">
          <h3 className="text-sm font-bold text-ink">منتظر نظر شما</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {waiting.map((booking) => {
              const { salon, serviceLabel, plate } = summarizeBooking(booking);
              return (
                <li key={booking.id} className="flex items-center gap-3">
                  <SalonPhoto plate={plate} className="size-11 shrink-0 rounded-lg" />
                  <p className="flex min-w-0 flex-1 flex-col text-sm/snug">
                    <span className="truncate font-semibold text-ink">{salon.name}</span>
                    <span className="truncate text-xs text-text-muted">
                      {describeBookingDate(booking.date)} · {serviceLabel}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setReviewing(booking)}
                    className={buttonClassName("secondary", "h-10 shrink-0 px-4 text-sm")}
                  >
                    ثبت نظر
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {written.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-3">
          {written.map((booking) => {
            const { salon, plate } = summarizeBooking(booking);
            return (
              <li key={booking.id}>
                <MyReviewCard
                  review={booking.review}
                  salonId={salon.id}
                  salonName={salon.name}
                  plate={plate}
                  onOpenImage={(images, index) => setViewer({ images, index })}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        waiting.length === 0 && (
          <p className="mt-3 rounded-xl bg-surface px-4 py-6 text-center text-sm/relaxed text-text-secondary">
            هنوز نظری ننوشته‌اید. بعد از هر نوبت، تجربه‌تان را اینجا ثبت کنید تا به دیگران در انتخاب سالن کمک کند.
          </p>
        )
      )}

      <ReviewDialog booking={reviewing} onClose={() => setReviewing(null)} onSubmitted={handleReviewed} />
      <PhotoViewer title="تصاویر نظر شما" state={viewer} onClose={() => setViewer(null)} />
    </section>
  );
}
