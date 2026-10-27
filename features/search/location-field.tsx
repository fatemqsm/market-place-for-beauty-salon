"use client";

import { LocationIcon } from "@/components/icons";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { fieldErrorClassName } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  searchFieldClassName,
  searchFieldInputClassName,
  searchOptionClassName,
  searchPanelClassName,
} from "./search-classes";
import { useSearch } from "./search-context";
import { SearchPopover, type SearchFieldProps } from "./search-popover";

export const myLocationLabel = "موقعیت من";

const geolocationErrors: Record<number, string> = {
  1: "اجازه دسترسی به موقعیت مکانی داده نشد.",
  2: "موقعیت مکانی شما در دسترس نیست.",
  3: "دریافت موقعیت مکانی بیش از حد طول کشید.",
};

/** Fills the location with the browser's position; `onLocated` runs after a successful lookup. */
export function useLocateMe(onLocated: () => void) {
  const { update } = useSearch();
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);

  function locateMe() {
    if (locating) {
      return;
    }
    if (!("geolocation" in navigator)) {
      setLocateError("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند.");
      return;
    }
    setLocating(true);
    setLocateError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        update({
          location: myLocationLabel,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        onLocated();
      },
      (error) => {
        setLocating(false);
        setLocateError(geolocationErrors[error.code] ?? geolocationErrors[2]);
      },
      { timeout: 10_000, maximumAge: 60_000 },
    );
  }

  return { locating, locateError, locateMe };
}

export function LocationField({
  open,
  onOpenChange,
  size = "default",
  autoFocus,
  className,
}: SearchFieldProps) {
  const { criteria, update } = useSearch();
  const id = useId();
  const listId = `${id}-list`;
  const optionId = `${id}-option`;
  const messageId = `${id}-message`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [highlighted, setHighlighted] = useState(false);
  const { locating, locateError, locateMe } = useLocateMe(() => {
    onOpenChange(false);
    inputRef.current?.focus();
  });

  function openList() {
    setHighlighted(false);
    onOpenChange(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (open) {
        setHighlighted(true);
      } else {
        openList();
      }
    } else if (event.key === "Enter" && open && highlighted) {
      event.preventDefault();
      locateMe();
    } else if (event.key === "Tab" && open) {
      onOpenChange(false);
    }
  }

  return (
    <SearchPopover
      open={open}
      onOpenChange={onOpenChange}
      triggerRef={inputRef}
      className={className}
    >
      <label
        className={searchFieldClassName({
          size,
          filled: Boolean(criteria.location),
          active: open,
          className: "cursor-text",
        })}
      >
        <LocationIcon className="shrink-0 text-text-secondary " />
        <span className="sr-only">موقعیت مکانی</span>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          autoFocus={autoFocus}
          autoComplete="off"
          maxLength={100}
          placeholder="موقعیت مکانی"
          aria-autocomplete="none"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && highlighted ? optionId : undefined}
          aria-describedby={locateError ? messageId : undefined}
          value={criteria.location}
          onChange={(event) =>
            update({ location: event.target.value, coordinates: null })
          }
          onClick={() => !open && openList()}
          onKeyDown={handleKeyDown}
          className={searchFieldInputClassName}
        />
      </label>
      <div
        hidden={!open}
        className={searchPanelClassName("w-full min-w-60 p-2")}
      >
        <ul id={listId} role="listbox" aria-label="پیشنهاد موقعیت">
          <li
            id={optionId}
            role="option"
            aria-selected={criteria.coordinates !== null}
            aria-busy={locating}
            onMouseDown={(event) => event.preventDefault()}
            onMouseEnter={() => setHighlighted(true)}
            onClick={locateMe}
            className={searchOptionClassName({
              highlighted,
              selected: criteria.coordinates !== null,
              className: "min-h-15 justify-center",
            })}
          >
            {locating ? "در حال دریافت موقعیت…" : myLocationLabel}
          </li>
        </ul>
        <p
          id={messageId}
          role="alert"
          className={cn(fieldErrorClassName, "px-3 empty:hidden")}
        >
          {locateError}
        </p>
      </div>
    </SearchPopover>
  );
}
