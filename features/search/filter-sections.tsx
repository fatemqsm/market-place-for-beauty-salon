"use client";

import { useId, type ReactNode } from "react";
import { CalendarIcon, LocationIcon, PencilIcon, PriceTagIcon, SearchIcon, StarOutlineIcon } from "@/components/icons";
import { fieldErrorClassName } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FilterTags } from "./filter-tags";
import { myLocationLabel, useLocateMe } from "./location-field";
import { PriceRangeSlider, sliderValues } from "./price-filter";
import { ratingTagOptions } from "./rating-filter";
import { searchOptionClassName } from "./search-classes";
import { useSearch } from "./search-context";
import { formatPrice, serviceOptions, sortOptions } from "./search-criteria";
import { TimePanelContent } from "./time-field";

/** The desktop sidebar and the mobile bottom sheet show the same sections at different sizes. */
export type SectionVariant = "sidebar" | "sheet";

const headingClassName = "flex h-5 items-center gap-2 text-base/none font-semibold text-text-muted";

function HeadingContent({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <>
      <span className="flex size-5 shrink-0 items-center justify-center">{icon}</span>
      {label}
    </>
  );
}

function FilterFieldset({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className={cn(headingClassName, "mb-4")}>
        <HeadingContent icon={icon} label={label} />
      </legend>
      {children}
    </fieldset>
  );
}

function textInputClassName(variant: SectionVariant) {
  return cn(
    "w-full rounded-lg px-4 text-base text-ink shadow-box outline-none transition-shadow duration-fast ease-standard",
    variant === "sidebar" ? "h-9 bg-background/70" : "h-13.5 bg-background",
    // The design marks a focused text input with the accent glow instead of an outline.
    "focus:shadow-glow",
  );
}

export function SalonNameSection({ variant }: { variant: SectionVariant }) {
  const { criteria, update } = useSearch();

  return (
    <label className="flex flex-col gap-4">
      <span className={headingClassName}>
        <HeadingContent icon={<PencilIcon width={16.5} height={16.5} />} label="نام سالن" />
      </span>
      <input
        type="search"
        autoComplete="off"
        autoFocus={variant === "sheet"}
        maxLength={100}
        value={criteria.salonName}
        onChange={(event) => update({ salonName: event.target.value })}
        className={textInputClassName(variant)}
      />
    </label>
  );
}

export function PriceSection() {
  const { criteria, errors } = useSearch();
  const { from, to } = sliderValues(criteria);

  return (
    <FilterFieldset icon={<PriceTagIcon width={18.17} height={18.17} />} label="قیمت">
      <PriceRangeSlider className="h-7.5 py-0" />
      <p dir="ltr" className="mt-1 flex justify-between text-xs/none text-text-muted">
        <span>{formatPrice(String(from))}</span>
        <span>{formatPrice(String(to))}</span>
      </p>
      <p role="alert" className={cn(fieldErrorClassName, "mt-2 empty:hidden")}>
        {errors.price}
      </p>
    </FilterFieldset>
  );
}

export function RatingSection() {
  const { criteria, update } = useSearch();

  return (
    <FilterFieldset icon={<StarOutlineIcon width={20} height={20} />} label="امتیاز">
      <FilterTags
        options={ratingTagOptions}
        value={criteria.minRating}
        onChange={(minRating) => update({ minRating })}
        clearable
      />
    </FilterFieldset>
  );
}

const sortTagOptions = sortOptions.map((option) => ({ value: option.id, label: option.label }));

export function SortSection({ variant }: { variant: SectionVariant }) {
  const { criteria, update } = useSearch();

  return (
    <FilterFieldset icon={<StarOutlineIcon width={20} height={20} />} label="مرتب‌سازی">
      <FilterTags
        options={sortTagOptions}
        value={criteria.sort}
        onChange={(sort) => sort && update({ sort })}
        // In the sidebar the first two tags overhang the section padding so they share a row.
        className={variant === "sidebar" ? "-me-4" : undefined}
      />
    </FilterFieldset>
  );
}

export function ServiceSection() {
  const { criteria, update } = useSearch();
  const name = useId();

  return (
    <FilterFieldset icon={<SearchIcon />} label="خدمات">
      <div className="flex flex-col gap-1">
        {serviceOptions.map((option) => {
          const selected = option === criteria.service;
          return (
            <label key={option} className={searchOptionClassName({ highlighted: false, selected, className: "focus-ring-0" })}>
              <input
                type="radio"
                name={name}
                checked={selected}
                onChange={() => update({ service: option })}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </FilterFieldset>
  );
}

export function TimeSection({ onDone }: { onDone: () => void }) {
  const id = useId();

  return (
    <div className="flex flex-col gap-4">
      <p className={headingClassName}>
        <HeadingContent icon={<CalendarIcon width={20} height={20} />} label="زمان" />
      </p>
      <TimePanelContent idPrefix={id} onDone={onDone} />
    </div>
  );
}

export function LocationSection({ onDone }: { onDone: () => void }) {
  const { criteria, update } = useSearch();
  const { locating, locateError, locateMe } = useLocateMe(onDone);

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-4">
        <span className={headingClassName}>
          <HeadingContent icon={<LocationIcon width={20} height={20} />} label="مکان" />
        </span>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          maxLength={100}
          placeholder="موقعیت مکانی"
          value={criteria.location}
          onChange={(event) => update({ location: event.target.value, coordinates: null })}
          className={cn(textInputClassName("sheet"), "placeholder:text-text-muted")}
        />
      </label>
      <button
        type="button"
        aria-busy={locating}
        onClick={locateMe}
        className={searchOptionClassName({
          highlighted: false,
          selected: criteria.coordinates !== null,
          className: "focus-ring-0 min-h-15 justify-center",
        })}
      >
        {locating ? "در حال دریافت موقعیت…" : myLocationLabel}
      </button>
      <p role="alert" className={cn(fieldErrorClassName, "empty:hidden")}>
        {locateError}
      </p>
    </div>
  );
}
