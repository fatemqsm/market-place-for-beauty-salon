"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { SearchIcon } from "../icons";
import { useSearch } from "./search-context";
import { serviceOptions } from "./search-criteria";
import { SearchPopover, type SearchFieldProps } from "./search-popover";

export function ServiceField({ open, onOpenChange, size = "default", autoFocus, className }: SearchFieldProps) {
  const { criteria, update } = useSearch();
  const id = useId();
  const listId = `${id}-list`;
  const labelId = `${id}-label`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [highlighted, setHighlighted] = useState(0);
  const lastIndex = serviceOptions.length - 1;

  function openList() {
    setHighlighted(Math.max(serviceOptions.indexOf(criteria.service), 0));
    onOpenChange(true);
  }

  function choose(index: number) {
    update({ service: serviceOptions[index] });
    onOpenChange(false);
    triggerRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const moves: Record<string, (index: number) => number> = {
      ArrowDown: (index) => Math.min(index + 1, lastIndex),
      ArrowUp: (index) => Math.max(index - 1, 0),
      Home: () => 0,
      End: () => lastIndex,
    };

    if (event.key in moves) {
      event.preventDefault();
      if (open) {
        setHighlighted(moves[event.key]);
      } else {
        openList();
      }
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) {
        choose(highlighted);
      } else {
        openList();
      }
    } else if (event.key === "Tab" && open) {
      onOpenChange(false);
    }
  }

  return (
    <SearchPopover open={open} onOpenChange={onOpenChange} triggerRef={triggerRef} className={className}>
      <span id={labelId} className="sr-only">
        خدمات
      </span>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        autoFocus={autoFocus}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${id}-option-${highlighted}` : undefined}
        onClick={() => (open ? onOpenChange(false) : openList())}
        onKeyDown={handleKeyDown}
        data-size={size}
        data-filled={criteria.service ? "" : undefined}
        data-active={open ? "" : undefined}
        className="search-field"
      >
        <SearchIcon className="shrink-0 text-text-secondary" />
        <span className="search-field-label">{criteria.service || "انتخاب خدمات"}</span>
      </button>
      <ul
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        hidden={!open}
        className="search-panel flex w-full min-w-60 flex-col gap-1 p-2"
      >
        {serviceOptions.map((option, index) => (
          <li
            key={option}
            id={`${id}-option-${index}`}
            role="option"
            aria-selected={option === criteria.service}
            data-highlighted={index === highlighted ? "" : undefined}
            onMouseDown={(event) => event.preventDefault()}
            onMouseEnter={() => setHighlighted(index)}
            onClick={() => choose(index)}
            className="search-option"
          >
            {option}
          </li>
        ))}
      </ul>
    </SearchPopover>
  );
}
