import { HeartIcon, PinIcon, StarIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { salonListing } from "./salons";

type SalonCardProps = {
  saved: boolean;
  onToggleSave: () => void;
};

export function SalonCard({ saved, onToggleSave }: SalonCardProps) {
  return (
    <article className="relative w-full shrink-0 snap-start rounded-lg bg-white/50 shadow-card sm:w-72">
      <div className="h-39.25 rounded-t-lg bg-primary" />
      <div className="flex flex-col px-2 pt-2 pb-4">
        <div className="flex h-6.75 items-end justify-between">
          <h3 className="text-base leading-none font-semibold text-ink">{salonListing.name}</h3>
          <p className="flex items-center gap-1.25 text-base leading-none font-semibold text-ink">
            <span className="sr-only">امتیاز</span>
            <StarIcon className="text-stars" />
            <span dir="ltr" className="w-7.25 text-right">
              {salonListing.rating}
            </span>
          </p>
        </div>
        <p className="flex h-4.5 items-end gap-2 text-xs leading-none text-ink">
          <PinIcon className="text-accent" />
          {salonListing.area}
        </p>
        <p className="flex h-4.25 items-end text-xs leading-none text-text-secondary">
          <span dir="ltr">{salonListing.reviews}</span>&nbsp;بازخورد
        </p>
      </div>
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? `حذف ${salonListing.name} از علاقه‌مندی‌ها` : `افزودن ${salonListing.name} به علاقه‌مندی‌ها`}
        onClick={onToggleSave}
        className={cn(
          "focus-ring-2 absolute inset-e-2 top-2 flex h-9.25 w-9.5 cursor-pointer items-center justify-center rounded-full bg-white/50 lg:inset-e-2.25 lg:size-6.25",
          saved ? "text-selected" : "text-text-secondary",
        )}
      >
        <HeartIcon filled={saved} className="-scale-x-100" />
      </button>
    </article>
  );
}
