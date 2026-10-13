"use client";

import { CheckboxIcon, StarOutlineIcon } from "@/components/icons";
import { useId, useRef } from "react";
import { useSearch } from "./search-context";
import { ratingOptions } from "./search-criteria";
import { SearchPopover, type SearchFieldProps } from "./search-popover";

export function RatingFilter({ open, onOpenChange, className }: SearchFieldProps) {
  const { criteria, update } = useSearch();
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const summary = criteria.ratings.length ? `${criteria.ratings.join("، ")} ستاره` : "همه";

  function toggleRating(rating: number) {
    const ratings = criteria.ratings.includes(rating)
      ? criteria.ratings.filter((item) => item !== rating)
      : [...criteria.ratings, rating].sort();
    update({ ratings });
  }

  return (
    <SearchPopover open={open} onOpenChange={onOpenChange} triggerRef={triggerRef} className={className}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
        data-filled={criteria.ratings.length ? "" : undefined}
        data-active={open ? "" : undefined}
        className="search-field text-text-secondary"
      >
        <StarOutlineIcon className="shrink-0 text-text-secondary" />
        <span className="sr-only">امتیاز: </span>
        <span className="search-field-label">{summary}</span>
      </button>
      <fieldset
        id={panelId}
        hidden={!open}
        tabIndex={-1}
        className="search-panel w-84.5 max-w-full px-16 outline-none"
      >
        <legend className="sr-only">امتیاز سالن</legend>
        <div className="flex flex-col gap-6">
          <RatingOption label="همه" checked={criteria.ratings.length === 0} onChange={() => update({ ratings: [] })} />
          {ratingOptions.map((rating) => (
            <RatingOption
              key={rating}
              label={String(rating)}
              checked={criteria.ratings.includes(rating)}
              onChange={() => toggleRating(rating)}
            />
          ))}
        </div>
      </fieldset>
    </SearchPopover>
  );
}

type RatingOptionProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

function RatingOption({ label, checked, onChange }: RatingOptionProps) {
  return (
    <label
      className={`focus-ring-4 flex cursor-pointer items-center gap-2 rounded-sm text-base font-semibold ${checked ? "text-selected" : "text-text-secondary"}`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <CheckboxIcon checked={checked} />
      {label}
    </label>
  );
}
