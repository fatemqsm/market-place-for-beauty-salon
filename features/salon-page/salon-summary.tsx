import { BadgeCheckIcon, PinIcon } from "@/components/icons";
import type { SalonProfile } from "@/features/salons/salon.types";
import { cn } from "@/lib/utils";
import { OpenStatus } from "./open-status";
import { RatingStars } from "./rating-stars";
import { SalonActions } from "./salon-actions";

type SalonSummaryProps = {
  salon: SalonProfile;
  className?: string;
};

export function SalonSummary({ salon, className }: SalonSummaryProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl/tight font-bold text-ink lg:text-4xl/tight">{salon.name}</h1>
        <SalonActions salonName={salon.name} variant="plain" className="max-lg:hidden" />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-sm/normal">
        <a href="#reviews" className="focus-ring-2 flex items-center gap-1.5 rounded-sm text-ink">
          <span dir="ltr" className="font-bold">
            {salon.rating}
          </span>
          <RatingStars rating={salon.rating} size={15} />
          <span className="text-accent underline underline-offset-4">
            <span dir="ltr">{salon.reviewCount}</span> نظر
          </span>
        </a>
        <OpenStatus hours={salon.hours} />
        <p className="flex items-center gap-1.5 text-text-secondary">
          <PinIcon className="shrink-0 text-accent" />
          {salon.area}
        </p>
        {salon.certificates.length > 0 && (
          <a
            href="#certificates"
            className="focus-ring-2 flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent"
          >
            <BadgeCheckIcon width={16} height={16} />
            مدارک تأییدشده
          </a>
        )}
      </div>
    </div>
  );
}
