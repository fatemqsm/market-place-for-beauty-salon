"use client";

import { PriceTagIcon } from "@/components/icons";
import { useId, useRef } from "react";
import { useSearch } from "./search-context";
import { formatPrice, priceRange, toLatinDigits } from "./search-criteria";
import { SearchPopover, type SearchFieldProps } from "./search-popover";

function clamp(value: number) {
  return Math.min(Math.max(value, priceRange.min), priceRange.max);
}

function percent(value: number) {
  return ((value - priceRange.min) / (priceRange.max - priceRange.min)) * 100;
}

export function PriceFilter({ open, onOpenChange, className }: SearchFieldProps) {
  const { criteria, update, errors } = useSearch();
  const id = useId();
  const panelId = `${id}-panel`;
  const errorId = `${id}-error`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const invalid = Boolean(errors.price);

  const from = criteria.priceFrom ? formatPrice(criteria.priceFrom) : "";
  const to = criteria.priceTo ? formatPrice(criteria.priceTo) : "";
  const summary = [from && `از ${from}`, to && `تا ${to}`].filter(Boolean).join(" ");

  const sliderFrom = clamp(criteria.priceFrom ? Number(criteria.priceFrom) : priceRange.min);
  const sliderTo = clamp(criteria.priceTo ? Number(criteria.priceTo) : priceRange.max);

  return (
    <SearchPopover open={open} onOpenChange={onOpenChange} triggerRef={triggerRef} className={className}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        aria-describedby={invalid ? errorId : undefined}
        onClick={() => onOpenChange(!open)}
        data-filled={summary ? "" : undefined}
        data-active={open ? "" : undefined}
        data-invalid={invalid ? "" : undefined}
        className="search-field data-invalid:text-error"
      >
        <PriceTagIcon width={22} height={22} className="shrink-0 text-text-secondary" />
        <span className="sr-only">قیمت: </span>
        <span dir="auto" className="search-field-label">
          {summary || "قیمت"}
        </span>
      </button>
      <fieldset
        id={panelId}
        hidden={!open}
        tabIndex={-1}
        className="search-panel w-full min-w-75 px-16 outline-none"
      >
        <legend className="sr-only">بازه قیمت</legend>
        <div className="flex flex-col gap-4">
          <PriceInput
            label="از"
            value={criteria.priceFrom}
            invalid={invalid}
            errorId={errorId}
            onChange={(priceFrom) => update({ priceFrom })}
          />
          <PriceInput
            label="تا"
            value={criteria.priceTo}
            invalid={invalid}
            errorId={errorId}
            onChange={(priceTo) => update({ priceTo })}
          />
          <div dir="ltr" className="relative h-3.5 py-4">
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-surface" />
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-accent"
              style={{ left: `${percent(sliderFrom)}%`, right: `${100 - percent(sliderTo)}%` }}
            />
            <input
              type="range"
              aria-label="حداقل قیمت"
              min={priceRange.min}
              max={priceRange.max}
              step={priceRange.step}
              value={sliderFrom}
              aria-valuetext={formatPrice(String(sliderFrom))}
              onChange={(event) => update({ priceFrom: String(Math.min(Number(event.target.value), sliderTo)) })}
              className="price-range"
            />
            <input
              type="range"
              aria-label="حداکثر قیمت"
              min={priceRange.min}
              max={priceRange.max}
              step={priceRange.step}
              value={sliderTo}
              aria-valuetext={formatPrice(String(sliderTo))}
              onChange={(event) => update({ priceTo: String(Math.max(Number(event.target.value), sliderFrom)) })}
              className="price-range"
            />
          </div>
          <p id={errorId} role="alert" className="search-error empty:hidden">
            {errors.price}
          </p>
        </div>
      </fieldset>
    </SearchPopover>
  );
}

type PriceInputProps = {
  label: string;
  value: string;
  invalid: boolean;
  errorId: string;
  onChange: (value: string) => void;
};

function PriceInput({ label, value, invalid, errorId, onChange }: PriceInputProps) {
  return (
    <label className="flex flex-col gap-2 text-base font-semibold text-ink">
      {label}
      <input
        type="text"
        inputMode="numeric"
        dir="ltr"
        autoComplete="off"
        maxLength={12}
        value={value}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        onChange={(event) => onChange(toLatinDigits(event.target.value))}
        className="search-input h-10.75 px-4 text-start text-base"
      />
    </label>
  );
}
