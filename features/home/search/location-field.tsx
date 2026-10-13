"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { useSearch } from "./search-context";
import { SearchPopover, type SearchFieldProps } from "./search-popover";

const myLocationLabel = "موقعیت من";

const geolocationErrors: Record<number, string> = {
  1: "اجازه دسترسی به موقعیت مکانی داده نشد.",
  2: "موقعیت مکانی شما در دسترس نیست.",
  3: "دریافت موقعیت مکانی بیش از حد طول کشید.",
};

export function LocationField({ open, onOpenChange, size = "default", autoFocus, className }: SearchFieldProps) {
  const { criteria, update } = useSearch();
  const id = useId();
  const listId = `${id}-list`;
  const optionId = `${id}-option`;
  const messageId = `${id}-message`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [highlighted, setHighlighted] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);

  function openList() {
    setHighlighted(false);
    onOpenChange(true);
  }

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
          coordinates: { latitude: position.coords.latitude, longitude: position.coords.longitude },
        });
        onOpenChange(false);
        inputRef.current?.focus();
      },
      (error) => {
        setLocating(false);
        setLocateError(geolocationErrors[error.code] ?? geolocationErrors[2]);
      },
      { timeout: 10_000, maximumAge: 60_000 },
    );
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
    <SearchPopover open={open} onOpenChange={onOpenChange} triggerRef={inputRef} className={className}>
      <label
        data-size={size}
        data-filled={criteria.location ? "" : undefined}
        data-active={open ? "" : undefined}
        className="search-field cursor-text"
      >
        <Image src="/home/location.svg" alt="" width={25} height={25} className="shrink-0" />
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
          onChange={(event) => update({ location: event.target.value, coordinates: null })}
          onClick={() => !open && openList()}
          onKeyDown={handleKeyDown}
        />
      </label>
      <div hidden={!open} className="search-panel w-full min-w-[240px] p-2">
        <ul id={listId} role="listbox" aria-label="پیشنهاد موقعیت">
          <li
            id={optionId}
            role="option"
            aria-selected={criteria.coordinates !== null}
            aria-busy={locating}
            data-highlighted={highlighted ? "" : undefined}
            onMouseDown={(event) => event.preventDefault()}
            onMouseEnter={() => setHighlighted(true)}
            onClick={locateMe}
            className="search-option min-h-[60px] justify-center"
          >
            {locating ? "در حال دریافت موقعیت…" : myLocationLabel}
          </li>
        </ul>
        <p id={messageId} role="alert" className="search-error px-3 empty:hidden">
          {locateError}
        </p>
      </div>
    </SearchPopover>
  );
}
