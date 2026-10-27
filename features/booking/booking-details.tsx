import { CalendarIcon, ClockIcon, StarIcon } from "@/components/icons";
import { formatDuration, formatToman } from "@/features/salons/format";
import { weekdayNames } from "@/features/salons/opening-hours";
import { fromDateKey, weekColumn } from "@/lib/persian-calendar";
import { cn } from "@/lib/utils";
import type { PricedItem } from "./booking-state";

const dayFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", { day: "numeric", month: "long", year: "numeric" });

// Built by hand: with Latin digits, Intl puts a Latin comma after the weekday, which reorders the line in RTL.
function describeDate(key: string) {
  const date = fromDateKey(key);
  return `${weekdayNames[weekColumn(date)]}، ${dayFormatter.format(date)}`;
}

type BookingDetailsProps = {
  items: PricedItem[];
  professionalName: string | null;
  date: string | null;
  time: string | null;
  className?: string;
};

/** What has been chosen so far, with the total; used beside the steps, on review, and after confirming. */
export function BookingDetails({ items, professionalName, date, time, className }: BookingDetailsProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const duration = items.reduce((sum, item) => sum + item.durationMin, 0);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {(professionalName || (date && time)) && (
        <ul className="flex flex-col gap-2 text-sm/normal text-text-secondary">
          {date && time && (
            <li className="flex items-center gap-2">
              <CalendarIcon width={18} height={18} className="shrink-0 text-accent" />
              <span>
                {describeDate(date)}، ساعت <span dir="ltr">{time}</span>
              </span>
            </li>
          )}
          {professionalName && (
            <li className="flex items-center gap-2">
              <StarIcon width={18} height={18} className="shrink-0 text-accent" />
              {professionalName}
            </li>
          )}
          {duration > 0 && (
            <li className="flex items-center gap-2">
              <ClockIcon width={18} height={18} className="shrink-0 text-accent" />
              {formatDuration(duration)}
            </li>
          )}
        </ul>
      )}
      {items.length > 0 ? (
        <ul className="flex flex-col gap-3 border-t border-border pt-4">
          {items.map((item) => (
            <li key={item.service.id} className="flex items-start justify-between gap-4 text-sm/normal">
              <span className="flex min-w-0 flex-col">
                <span className="font-semibold text-ink">{item.label}</span>
                <span className="text-xs text-text-muted">{formatDuration(item.durationMin)}</span>
              </span>
              <span className="shrink-0 font-semibold text-ink">{formatToman(item.price)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-t border-border pt-4 text-sm text-text-muted">هنوز خدمتی انتخاب نشده است.</p>
      )}
      <p className="flex items-center justify-between gap-4 border-t border-border pt-4 text-base font-bold text-ink">
        <span>جمع کل</span>
        <span>{formatToman(total)}</span>
      </p>
    </div>
  );
}
