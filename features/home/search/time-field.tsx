"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PersianCalendar } from "./persian-calendar-grid";
import { fromDateKey, shortDateFormatter, startOfDay, addDays, toDateKey } from "./persian-calendar";
import { useSearch } from "./search-context";
import { customHours, timeSlots, type SearchCriteria } from "./search-criteria";
import { SearchPopover, type SearchFieldProps } from "./search-popover";

export function describeTime(criteria: SearchCriteria) {
  const parts: string[] = [];
  if (criteria.date) {
    parts.push(shortDateFormatter.format(fromDateKey(criteria.date)));
  }
  if (criteria.timeSlot === "custom") {
    parts.push(`${criteria.customFrom} تا ${criteria.customTo}`);
  } else if (criteria.timeSlot !== "any") {
    parts.push(timeSlots.find((slot) => slot.id === criteria.timeSlot)?.label ?? "");
  }
  return parts.join("، ");
}

export function TimeField({ open, onOpenChange, size = "default", autoFocus, className }: SearchFieldProps) {
  const { criteria } = useSearch();
  const id = useId();
  const panelId = `${id}-panel`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const summary = describeTime(criteria);

  function close() {
    onOpenChange(false);
    triggerRef.current?.focus();
  }

  return (
    <SearchPopover open={open} onOpenChange={onOpenChange} triggerRef={triggerRef} className={className}>
      <button
        ref={triggerRef}
        type="button"
        autoFocus={autoFocus}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => onOpenChange(!open)}
        data-size={size}
        data-filled={summary ? "" : undefined}
        data-active={open ? "" : undefined}
        className="search-field"
      >
        <Image src="/home/calendar.svg" alt="" width={24} height={24} className="shrink-0" />
        <span className="sr-only">زمان: </span>
        <span className="search-field-label">{summary || "انتخاب زمان"}</span>
      </button>
      {open && <TimePanel id={panelId} onDone={close} />}
    </SearchPopover>
  );
}

function TimePanel({ id, onDone }: { id: string; onDone: () => void }) {
  const { criteria, update, errors } = useSearch();
  const errorId = `${id}-error`;
  const today = startOfDay(new Date());
  const quickDays = [
    { label: "امروز", key: toDateKey(today) },
    { label: "فردا", key: toDateKey(addDays(today, 1)) },
  ];

  return (
    <div
      id={id}
      role="dialog"
      aria-label="انتخاب زمان"
      tabIndex={-1}
      className="search-panel flex w-full flex-col gap-5 p-6 outline-none lg:w-[392px]"
    >
      <div className="flex gap-2">
        {quickDays.map((day) => (
          <button
            key={day.key}
            type="button"
            aria-pressed={criteria.date === day.key}
            onClick={() => update({ date: day.key })}
            className="h-9 cursor-pointer rounded-full border border-primary px-4 text-sm font-semibold text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-white"
          >
            {day.label}
          </button>
        ))}
      </div>

      <PersianCalendar value={criteria.date} onChange={(date) => update({ date })} />

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink">بازه زمانی</legend>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((slot) => (
            <label
              key={slot.id}
              className="flex h-9 cursor-pointer items-center gap-1 rounded-full border border-primary px-3 text-sm font-semibold text-text-secondary has-checked:border-accent has-checked:bg-accent has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
            >
              <input
                type="radio"
                name={`${id}-slot`}
                value={slot.id}
                checked={criteria.timeSlot === slot.id}
                onChange={() => update({ timeSlot: slot.id })}
                className="sr-only"
              />
              {slot.label}
              {slot.hours && <span className="text-xs font-normal">({slot.hours})</span>}
            </label>
          ))}
        </div>
      </fieldset>

      {criteria.timeSlot === "custom" && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <HourSelect
              label="از ساعت"
              value={criteria.customFrom}
              invalid={Boolean(errors.time)}
              errorId={errorId}
              onChange={(customFrom) => update({ customFrom })}
            />
            <HourSelect
              label="تا ساعت"
              value={criteria.customTo}
              invalid={Boolean(errors.time)}
              errorId={errorId}
              onChange={(customTo) => update({ customTo })}
            />
          </div>
          <p id={errorId} role="alert" className="search-error empty:hidden">
            {errors.time}
          </p>
        </div>
      )}

      <div className="flex justify-between gap-2">
        <Button
          variant="secondary"
          className="h-10 shadow-box"
          onClick={() => update({ date: null, timeSlot: "any" })}
        >
          پاک کردن
        </Button>
        <Button className="h-10" onClick={onDone}>
          تأیید
        </Button>
      </div>
    </div>
  );
}

type HourSelectProps = {
  label: string;
  value: string;
  invalid: boolean;
  errorId: string;
  onChange: (value: string) => void;
};

function HourSelect({ label, value, invalid, errorId, onChange }: HourSelectProps) {
  return (
    <label className="flex flex-1 flex-col gap-1 text-sm font-semibold text-ink">
      {label}
      <select
        value={value}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        dir="ltr"
        className="h-10 rounded-lg bg-surface px-3 text-base text-text-secondary shadow-box focus-visible:outline-2 focus-visible:outline-ink aria-invalid:outline-2 aria-invalid:outline-error"
      >
        {customHours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
    </label>
  );
}
