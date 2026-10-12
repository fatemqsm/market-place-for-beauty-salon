import { EyeIcon, HeartIcon, PinIcon, StarIcon } from "./icons";
import { salonListing } from "./salons";

type SalonCardProps = {
  saved: boolean;
  onToggleSave: () => void;
};

export function SalonCard({ saved, onToggleSave }: SalonCardProps) {
  return (
    <article className="w-[248px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(40,30,40,0.06)] ring-1 ring-black/[0.04]">
      <div className="relative h-[118px] bg-[#b9b8c8]">
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? "حذف سالن زیبایی رویا از ذخیره‌ها" : "ذخیره سالن زیبایی رویا"}
          onClick={onToggleSave}
          className={`absolute start-3 top-3 grid size-8 place-items-center rounded-full bg-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24181c] ${saved ? "text-[#e4a3b3]" : "text-[#6b6566]"}`}
        >
          <HeartIcon filled={saved} className="size-4" />
        </button>
      </div>
      <div className="flex items-start justify-between gap-3 px-3 py-3">
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-[#2a2426]">{salonListing.name}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8a8485]">
            <span className="inline-flex items-center gap-1">
              <PinIcon className="size-3" />
              {salonListing.area}
            </span>
            <span className="inline-flex items-center gap-1">
              <EyeIcon className="size-3" />
              <span dir="ltr">{salonListing.views}</span>
              بازدید
            </span>
          </p>
        </div>
        <p dir="ltr" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#2a2426]">
          {salonListing.rating}
          <StarIcon className="size-3.5 text-[#f5b301]" />
        </p>
      </div>
    </article>
  );
}
