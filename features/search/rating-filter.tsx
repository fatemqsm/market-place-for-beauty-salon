"use client";

import { StarOutlineIcon } from "@/components/icons";
import { useId, useRef } from "react";
import { FilterTags } from "./filter-tags";
import { searchFieldClassName, searchFieldLabelClassName, searchPanelClassName } from "./search-classes";
import { useSearch } from "./search-context";
import { describeRating, ratingOptions } from "./search-criteria";
import { SearchPopover, type SearchFieldProps } from "./search-popover";

export const ratingTagOptions = ratingOptions.map((rating) => ({ value: rating, label: describeRating(rating) }));

export function RatingFilter({ open, onOpenChange, className }: SearchFieldProps) {
  const { criteria, update } = useSearch();
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const summary = criteria.minRating ? describeRating(criteria.minRating) : "همه";

  return (
    <SearchPopover open={open} onOpenChange={onOpenChange} triggerRef={triggerRef} className={className}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => onOpenChange(!open)}
        className={searchFieldClassName({
          filled: criteria.minRating !== null,
          active: open,
          className: "text-text-secondary",
        })}
      >
        <StarOutlineIcon className="shrink-0 text-text-secondary" />
        <span className="sr-only">امتیاز: </span>
        <span className={searchFieldLabelClassName}>{summary}</span>
      </button>
      <fieldset
        id={panelId}
        hidden={!open}
        tabIndex={-1}
        className={searchPanelClassName("w-84.5 max-w-full px-16 outline-none")}
      >
        <legend className="sr-only">حداقل امتیاز سالن</legend>
        <FilterTags
          options={ratingTagOptions}
          value={criteria.minRating}
          onChange={(minRating) => update({ minRating })}
          clearable
        />
      </fieldset>
    </SearchPopover>
  );
}
