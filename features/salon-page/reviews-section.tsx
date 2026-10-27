"use client";

import { useId, useState } from "react";
import { PencilIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { chipClassName } from "@/components/ui/chip";
import { Dialog } from "@/components/ui/dialog";
import { inputClassName } from "@/components/ui/input";
import type { Review, SalonProfile } from "@/features/salons/salon.types";
import { PhotoViewer, type PhotoViewerState } from "./photo-viewer";
import { ProfileSection } from "./profile-section";
import { RatingStars } from "./rating-stars";
import { ReviewCard } from "./review-card";
import { ReviewForm } from "./review-form";

type ReviewsSectionProps = {
  salon: Pick<SalonProfile, "name" | "ratingCounts" | "reviews" | "services">;
};

type ReviewSort = "newest" | "top";

const pageSize = 5;

export function ReviewsSection({ salon }: ReviewsSectionProps) {
  const sortId = useId();
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [withPhotos, setWithPhotos] = useState(false);
  const [sort, setSort] = useState<ReviewSort>("newest");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [formOpen, setFormOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [viewer, setViewer] = useState<PhotoViewerState>(null);

  // The summary counts all reviews on the server plus the ones written in this session.
  const counts = salon.ratingCounts.map(
    (count, index) => count + localReviews.filter((review) => review.rating === 5 - index).length,
  );
  const total = counts.reduce((sum, count) => sum + count, 0);
  const average = counts.reduce((sum, count, index) => sum + count * (5 - index), 0) / total;

  const all = [...localReviews, ...salon.reviews];
  const photoCount = all.filter((review) => review.images.length > 0).length;
  const shown = all
    .filter((review) => !withPhotos || review.images.length > 0)
    // `filter` already returned a new array, so sorting in place is safe (and works on older iOS).
    .sort((a, b) => (sort === "top" ? b.rating - a.rating : 0) || b.date.localeCompare(a.date));

  function handleSubmitted(review: Review) {
    setLocalReviews((current) => [review, ...current]);
    setWithPhotos(false);
    setSort("newest");
    setFormOpen(false);
    setNotice("نظر شما ثبت شد. تا اتصال به سرور، فقط در همین صفحه نمایش داده می‌شود.");
  }

  return (
    <ProfileSection id="reviews" title="نظرات مشتریان">
      <div className="grid gap-6 rounded-xl bg-surface p-5 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10 lg:p-6">
        <div className="flex flex-col items-center justify-center gap-1.5 text-center">
          <p dir="ltr" className="text-5xl/none font-bold text-ink">
            {average.toFixed(1)}
          </p>
          <RatingStars rating={average} size={20} />
          <p className="text-sm text-text-secondary">
            از <span dir="ltr">{total}</span> نظر
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <ul aria-label="توزیع امتیازها" className="flex flex-col gap-1.5">
            {counts.map((count, index) => (
              <li key={index} className="flex items-center gap-3 text-xs text-text-secondary">
                <span className="w-12 shrink-0">{5 - index} ستاره</span>
                <span aria-hidden="true" className="h-2 flex-1 overflow-hidden rounded-full bg-surface-strong">
                  <span className="block h-full rounded-full bg-stars" style={{ width: `${(count / total) * 100}%` }} />
                </span>
                <span dir="ltr" className="w-8 shrink-0 text-end">
                  {count}
                </span>
              </li>
            ))}
          </ul>
          <Button variant="secondary" onClick={() => setFormOpen(true)} className="h-11.5 w-full text-base lg:w-fit">
            <PencilIcon width={18} height={18} />
            نوشتن نظر
          </Button>
        </div>
      </div>

      <p
        role="status"
        className="mt-4 rounded-lg border border-success/20 bg-success/5 px-4 py-3 text-sm/normal font-semibold text-success empty:hidden"
      >
        {notice}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={!withPhotos}
            onClick={() => setWithPhotos(false)}
            className={chipClassName(!withPhotos, "focus-ring-2 h-10")}
          >
            همه
          </button>
          <button
            type="button"
            aria-pressed={withPhotos}
            onClick={() => setWithPhotos(true)}
            className={chipClassName(withPhotos, "focus-ring-2 h-10")}
          >
            دارای تصویر (<span dir="ltr">{photoCount}</span>)
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor={sortId} className="text-sm font-semibold text-text-secondary">
            مرتب‌سازی
          </label>
          <select
            id={sortId}
            value={sort}
            onChange={(event) => setSort(event.target.value as ReviewSort)}
            className={inputClassName(false, "h-10 px-3 text-sm font-semibold")}
          >
            <option value="newest">جدیدترین</option>
            <option value="top">بالاترین امتیاز</option>
          </select>
        </div>
      </div>

      {shown.length > 0 ? (
        <ul className="mt-2 divide-y divide-border">
          {shown.slice(0, visibleCount).map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} onOpenImage={(images, index) => setViewer({ images, index })} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-lg bg-surface px-4 py-6 text-center text-sm text-text-secondary">
          هنوز نظری با تصویر ثبت نشده است.
        </p>
      )}
      {shown.length > visibleCount && (
        <Button
          variant="secondary"
          onClick={() => setVisibleCount(visibleCount + pageSize)}
          className="mt-2 h-11.5 w-full text-base lg:w-auto"
        >
          نمایش نظرات بیشتر
        </Button>
      )}

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} title={`نظر شما درباره ${salon.name}`}>
        <ReviewForm serviceNames={salon.services.map((service) => service.name)} onSubmitted={handleSubmitted} />
      </Dialog>
      <PhotoViewer title="تصاویر نظر" state={viewer} onClose={() => setViewer(null)} />
    </ProfileSection>
  );
}
