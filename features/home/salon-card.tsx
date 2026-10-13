import Image from "next/image";
import { salonListing } from "./salons";

type SalonCardProps = {
  saved: boolean;
  onToggleSave: () => void;
};

export function SalonCard({ saved, onToggleSave }: SalonCardProps) {
  return (
    <article className="relative w-full shrink-0 sm:w-[288px] snap-start rounded-lg bg-white/50 shadow-[6px_6px_20px_rgba(0,0,0,0.06)]">
      <div className="h-[157px] rounded-t-lg bg-primary" />
      <div className="flex flex-col px-2 pt-2 pb-4">
        <div className="flex h-[27px] items-end justify-between">
          <h3 className="text-base leading-none font-semibold text-ink">{salonListing.name}</h3>
          <p className="flex items-center gap-[5px] text-base leading-none font-semibold text-ink">
            <span className="sr-only">امتیاز</span>
            <Image src="/home/star.svg" alt="" width={24} height={24} />
            <span dir="ltr" className="w-[29px] text-right">
              {salonListing.rating}
            </span>
          </p>
        </div>
        <p className="flex h-[18px] items-end gap-2 text-xs leading-none text-ink">
          <Image src="/home/card-pin.svg" alt="" width={12} height={14} />
          {salonListing.area}
        </p>
        <p className="flex h-[17px] items-end text-xs leading-none text-text-secondary">
          <span dir="ltr">{salonListing.reviews}</span>&nbsp;بازخورد
        </p>
      </div>
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? `حذف ${salonListing.name} از علاقه‌مندی‌ها` : `افزودن ${salonListing.name} به علاقه‌مندی‌ها`}
        onClick={onToggleSave}
        className="absolute end-2 top-2 flex h-[37px] w-[38px] cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:end-[9px] lg:size-[25px]"
      >
        <Image src={saved ? "/home/heart-lg-alt.svg" : "/home/heart-lg.svg"} alt="" width={38} height={37} className="-scale-x-100 lg:hidden" />
        <Image
          src={saved ? "/home/heart-alt.svg" : "/home/heart.svg"}
          alt=""
          width={25}
          height={25}
          className="hidden -scale-x-100 lg:block"
        />
      </button>
    </article>
  );
}
