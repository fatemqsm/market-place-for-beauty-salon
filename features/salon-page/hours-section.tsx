"use client";

import { CheckIcon } from "@/components/icons";
import { tehranTime, weekdayNames } from "@/features/salons/opening-hours";
import type { DayHours } from "@/features/salons/salon.types";
import { useCurrentMinute } from "@/features/salons/use-current-minute";
import { cn } from "@/lib/utils";
import { ProfileSection } from "./profile-section";

type HoursSectionProps = {
  hours: (DayHours | null)[];
  amenities: string[];
};

export function HoursSection({ hours, amenities }: HoursSectionProps) {
  const now = useCurrentMinute();
  const today = now ? tehranTime(now).day : null;

  return (
    <ProfileSection id="hours" title="ساعات کاری و اطلاعات تکمیلی">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="mb-3 text-base font-bold text-ink">ساعات کاری</h3>
          <ul className="flex flex-col">
            {hours.map((day, index) => {
              const isToday = index === today;
              return (
                <li
                  key={weekdayNames[index]}
                  aria-current={isToday ? "date" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm/normal",
                    isToday ? "bg-surface font-bold text-ink" : "text-text-secondary",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={cn("size-2 rounded-full", day ? "bg-success" : "bg-text-muted/40")}
                    />
                    {weekdayNames[index]}
                    {isToday && <span className="text-xs font-semibold text-accent">(امروز)</span>}
                  </span>
                  {day ? (
                    <span dir="ltr">
                      {day.open} – {day.close}
                    </span>
                  ) : (
                    <span>تعطیل</span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-2 px-3 text-xs text-text-muted">ساعت‌ها به وقت تهران است.</p>
        </div>
        <div>
          <h3 className="mb-3 text-base font-bold text-ink">اطلاعات تکمیلی</h3>
          <ul className="flex flex-col gap-3">
            {amenities.map((amenity) => (
              <li key={amenity} className="flex items-center gap-3 text-sm/normal text-text-secondary">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <CheckIcon width={16} height={16} />
                </span>
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProfileSection>
  );
}
