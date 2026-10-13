"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  addDays,
  fromDateKey,
  fullDateFormatter,
  monthLabelFormatter,
  persianMonthDays,
  shiftPersianMonth,
  startOfDay,
  startOfPersianMonth,
  toDateKey,
  weekColumn,
  weekdayLabels,
} from "./persian-calendar";

type PersianCalendarProps = {
  value: string | null;
  onChange: (date: string) => void;
};

// In RTL, the left arrow moves forward in time and the right arrow moves back.
const keyOffsets: Record<string, number> = { ArrowLeft: 1, ArrowRight: -1, ArrowDown: 7, ArrowUp: -7 };

export function PersianCalendar({ value, onChange }: PersianCalendarProps) {
  const [today] = useState(() => startOfDay(new Date()));
  const todayKey = toDateKey(today);
  const [monthStart, setMonthStart] = useState(() => startOfPersianMonth(value ? fromDateKey(value) : today));
  const [focusKey, setFocusKey] = useState(value ?? todayKey);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  const days = persianMonthDays(monthStart);
  const dayKeys = days.map(toDateKey);
  const firstSelectable = dayKeys.find((key) => key >= todayKey) ?? dayKeys[0];
  const tabbableKey = dayKeys.includes(focusKey) && focusKey >= todayKey ? focusKey : firstSelectable;
  const isCurrentMonth = monthStart <= today;

  useEffect(() => {
    if (shouldFocus.current) {
      shouldFocus.current = false;
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${focusKey}"]`)?.focus();
    }
  }, [focusKey, monthStart]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, key: string) {
    const offset = keyOffsets[event.key];
    if (offset === undefined) {
      return;
    }
    event.preventDefault();
    const next = addDays(fromDateKey(key), offset);
    if (next < today) {
      return;
    }
    shouldFocus.current = true;
    setFocusKey(toDateKey(next));
    if (!dayKeys.includes(toDateKey(next))) {
      setMonthStart(startOfPersianMonth(next));
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="ماه قبل"
          disabled={isCurrentMonth}
          onClick={() => setMonthStart(shiftPersianMonth(monthStart, -1))}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full text-lg text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-ink disabled:cursor-default disabled:opacity-30"
        >
          ›
        </button>
        <p aria-live="polite" className="text-base font-semibold text-ink">
          {monthLabelFormatter.format(monthStart)}
        </p>
        <button
          type="button"
          aria-label="ماه بعد"
          onClick={() => setMonthStart(shiftPersianMonth(monthStart, 1))}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full text-lg text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-ink"
        >
          ‹
        </button>
      </div>
      <div ref={gridRef} className="grid grid-cols-7 gap-1 text-center">
        {weekdayLabels.map((label) => (
          <span key={label} aria-hidden="true" className="text-xs font-semibold text-text-muted">
            {label}
          </span>
        ))}
        {days.map((day, index) => {
          const key = dayKeys[index];
          const past = key < todayKey;
          return (
            <button
              key={key}
              type="button"
              data-date={key}
              disabled={past}
              tabIndex={key === tabbableKey ? 0 : -1}
              aria-pressed={key === value}
              aria-label={fullDateFormatter.format(day)}
              aria-current={key === todayKey ? "date" : undefined}
              onClick={() => {
                setFocusKey(key);
                onChange(key);
              }}
              onKeyDown={(event) => handleKeyDown(event, key)}
              style={index === 0 ? { gridColumnStart: weekColumn(day) + 1 } : undefined}
              className="mx-auto flex size-9 cursor-pointer items-center justify-center rounded-full text-sm font-semibold text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-ink disabled:cursor-default disabled:text-text-muted disabled:opacity-50 disabled:hover:bg-transparent aria-[current=date]:border aria-[current=date]:border-accent aria-pressed:bg-accent aria-pressed:text-white"
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
