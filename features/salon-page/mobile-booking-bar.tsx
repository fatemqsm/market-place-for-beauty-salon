import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { formatToman } from "@/features/salons/format";

type MobileBookingBarProps = {
  salonId: string;
  serviceCount: number;
  lowestPrice: number;
};

/** Phones only. It replaces the bottom navigation on this page, so two fixed bars never stack. */
export function MobileBookingBar({ salonId, serviceCount, lowestPrice }: MobileBookingBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-4 border-t border-border bg-background px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] drop-shadow-nav lg:hidden">
      <p className="flex min-w-0 flex-col text-sm/snug">
        <span className="truncate font-bold text-ink">از {formatToman(lowestPrice)}</span>
        <span className="text-xs text-text-muted">
          <span dir="ltr">{serviceCount}</span> خدمت
        </span>
      </p>
      <Link href={`/salons/${salonId}/book`} className={buttonClassName("primary", "h-11.5 shrink-0 px-8")}>
        رزرو نوبت
      </Link>
    </div>
  );
}
