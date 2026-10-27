"use client";

import type { ActionDispatch } from "react";
import { Button } from "@/components/ui/button";
import { chipClassName } from "@/components/ui/chip";
import { tehranTime, weekdayNames } from "@/features/salons/opening-hours";
import type { DayHours } from "@/features/salons/salon.types";
import { useCurrentMinute } from "@/features/salons/use-current-minute";
import {
  addDays,
  fromDateKey,
  fullDateFormatter,
  monthLabelFormatter,
  persianParts,
  startOfDay,
  toDateKey,
  weekColumn,
} from "@/lib/persian-calendar";
import { cn } from "@/lib/utils";
import type { BookingAction } from "./booking-state";
import { freeSlots, groupSlots } from "./time-slots";

const bookableDays = 14;

type StepTimeProps = {
  hours: (DayHours | null)[];
  durationMin: number;
  professionalId: string;
  date: string | null;
  time: string | null;
  dispatch: ActionDispatch<[BookingAction]>;
};

function dayClassName(selected: boolean, closed: boolean) {
  if (closed) {
    return "border-border text-text-muted opacity-60";
  }
  return selected
    ? "cursor-pointer border-selected bg-selected text-on-accent"
    : "cursor-pointer border-border text-ink hover:border-accent-soft hover:bg-hover";
}

export function StepTime({ hours, durationMin, professionalId, date, time, dispatch }: StepTimeProps) {
  const now = useCurrentMinute();

  if (!now) {
    return (
      <p role="status" className="py-10 text-center text-sm text-text-secondary">
        در حال آماده‌سازی زمان‌های آزاد…
      </p>
    );
  }

  const today = startOfDay(now);
  const todayKey = toDateKey(today);
  const days = Array.from({ length: bookableDays }, (_, index) => addDays(today, index));
  const isOpen = (day: Date) => hours[weekColumn(day)] !== null;
  // Until a day is chosen, the first open day is shown.
  const selectedKey = date ?? toDateKey(days.find(isOpen) ?? today);
  const selectedDay = fromDateKey(selectedKey);
  const selectedHours = hours[weekColumn(selectedDay)];
  const slots = selectedHours
    ? freeSlots(
        selectedHours,
        durationMin,
        selectedKey,
        professionalId,
        selectedKey === todayKey ? tehranTime(now).minutes : undefined,
      )
    : [];
  const nextOpenDay = days.find((day) => toDateKey(day) > selectedKey && isOpen(day));

  function pickTime(slot: string) {
    if (!date) {
      dispatch({ type: "date", date: selectedKey });
    }
    dispatch({ type: "time", time: slot });
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex flex-col gap-3">
        <p aria-live="polite" className="text-base font-bold text-ink">
          {monthLabelFormatter.format(selectedDay)}
        </p>
        <div className="scrollbar-none relative -mx-5 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0">
          <ul aria-label="روز" className="flex w-max gap-2">
            {days.map((day, index) => {
              const key = toDateKey(day);
              const closed = !isOpen(day);
              const selected = key === selectedKey;
              return (
                <li key={key}>
                  <button
                    type="button"
                    disabled={closed}
                    aria-pressed={selected}
                    aria-label={`${fullDateFormatter.format(day)}${closed ? "، تعطیل" : ""}`}
                    onClick={() => dispatch({ type: "date", date: key })}
                    className={cn(
                      "focus-ring-2 flex h-20 w-16 flex-col items-center justify-center gap-1 rounded-xl border transition-[background-color,border-color,color] duration-fast ease-standard",
                      dayClassName(selected, closed),
                    )}
                  >
                    <span className="text-xs font-semibold">
                      {index === 0 ? "امروز" : index === 1 ? "فردا" : weekdayNames[weekColumn(day)]}
                    </span>
                    <span className="text-xl/none font-bold">{persianParts(day).day}</span>
                    {closed && <span className="text-xs/none">تعطیل</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {slots.length > 0 ? (
        <div className="flex flex-col gap-5">
          {groupSlots(slots).map((group) => (
            <fieldset key={group.label}>
              <legend className="mb-2 text-sm font-semibold text-text-secondary">{group.label}</legend>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                {group.times.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    aria-pressed={date === selectedKey && time === slot}
                    onClick={() => pickTime(slot)}
                    className={chipClassName(date === selectedKey && time === slot, "focus-ring-2 h-11 w-full text-base")}
                  >
                    <span dir="ltr">{slot}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-surface px-4 py-8 text-center">
          <p className="text-base font-semibold text-ink">برای این روز وقت آزادی نمانده است.</p>
          {nextOpenDay && (
            <Button
              variant="secondary"
              onClick={() => dispatch({ type: "date", date: toDateKey(nextOpenDay) })}
              className="h-11 text-base"
            >
              نزدیک‌ترین روز بعدی
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
