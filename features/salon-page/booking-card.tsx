import Link from "next/link";
import { CheckIcon, PinIcon } from "@/components/icons";
import { buttonClassName } from "@/components/ui/button";
import type { SalonProfile } from "@/features/salons/salon.types";
import { OpenStatus } from "./open-status";
import { RatingStars } from "./rating-stars";

type BookingCardProps = {
  salon: Pick<SalonProfile, "id" | "name" | "rating" | "reviewCount" | "hours" | "area" | "cancellationPolicy">;
};

/** Desktop sidebar: the booking action stays in view while the page scrolls. */
export function BookingCard({ salon }: BookingCardProps) {
  return (
    <div className="sticky top-24 flex flex-col gap-4 rounded-xl border border-border bg-background p-6 shadow-card">
      <p className="text-xl/snug font-bold text-ink">{salon.name}</p>
      <p className="flex items-center gap-1.5 text-sm text-text-secondary">
        <span dir="ltr" className="font-bold text-ink">
          {salon.rating}
        </span>
        <RatingStars rating={salon.rating} size={15} />
        (<span dir="ltr">{salon.reviewCount}</span>)
      </p>
      <Link href={`/salons/${salon.id}/book`} className={buttonClassName("primary", "h-12 w-full")}>
        رزرو نوبت
      </Link>
      <div className="flex flex-col gap-2.5 border-t border-border pt-4">
        <OpenStatus hours={salon.hours} />
        <p className="flex items-center gap-1.5 text-sm/normal text-text-secondary">
          <PinIcon className="mx-0.75 shrink-0 text-accent" />
          {salon.area}
        </p>
        <p className="flex items-start gap-1.5 text-sm/normal text-text-secondary">
          <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-success" />
          {salon.cancellationPolicy}
        </p>
      </div>
    </div>
  );
}
