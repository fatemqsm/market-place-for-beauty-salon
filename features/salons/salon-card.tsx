import Link from "next/link";
import { HeartIcon, PinIcon, StarIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SalonCardImages } from "./salon-card-images";
import { salonListing, type SalonPlate } from "./salons";

type SalonCardProps = {
  id: string;
  plate: SalonPlate;
  imageCount: number;
  saved: boolean;
  onToggleSave: () => void;
  className?: string;
};

export function SalonCard({ id, plate, imageCount, saved, onToggleSave, className }: SalonCardProps) {
  return (
    <article
      className={cn(
        "group relative w-full rounded-xl border border-border bg-background shadow-card transition-[box-shadow,border-color,translate] duration-base ease-standard hover:border-accent-soft hover:shadow-card-hover motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      <SalonCardImages count={imageCount} salonName={salonListing.name} plate={plate} />
      <div className="flex flex-col gap-1.5 px-3 pt-3 pb-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base leading-snug font-bold text-ink">
            {/* The link's overlay covers the whole card; the save button and photo arrows sit above it. */}
            <Link
              href={`/salons/${id}`}
              className="focus-ring-2 rounded-sm after:absolute after:inset-0 after:rounded-xl after:content-['']"
            >
              {salonListing.name}
            </Link>
          </h3>
          <p className="flex shrink-0 items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-sm leading-none font-bold text-ink">
            <span className="sr-only">امتیاز</span>
            <StarIcon width={14} height={14} className="text-stars" />
            <span dir="ltr">{salonListing.rating}</span>
          </p>
        </div>
        <p className="flex items-center gap-1.5 text-xs leading-none text-text-secondary">
          <PinIcon className="text-accent" />
          {salonListing.area}
        </p>
        <p className="text-xs leading-none text-text-muted">
          <span dir="ltr">{salonListing.reviews}</span>&nbsp;بازخورد
        </p>
      </div>
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? `حذف ${salonListing.name} از علاقه‌مندی‌ها` : `افزودن ${salonListing.name} به علاقه‌مندی‌ها`}
        onClick={onToggleSave}
        className={cn(
          "focus-ring-2 absolute inset-e-2 top-2 flex size-9 cursor-pointer items-center justify-center rounded-full shadow-box backdrop-blur-sm transition-[color,background-color,scale] duration-fast ease-standard motion-safe:active:scale-90 lg:size-8",
          saved ? "bg-background text-selected" : "bg-background/80 text-text-secondary hover:bg-background hover:text-accent",
        )}
      >
        <HeartIcon
          filled={saved}
          width={18}
          height={18}
          className={cn("-scale-x-100", saved && "motion-safe:animate-pop")}
        />
      </button>
    </article>
  );
}
