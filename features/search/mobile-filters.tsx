"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDownIcon, CloseIcon } from "@/components/icons";
import { buttonClassName } from "@/components/ui/button";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/utils";
import {
  LocationSection,
  PriceSection,
  RatingSection,
  SalonNameSection,
  ServiceSection,
  SortSection,
  TimeSection,
} from "./filter-sections";
import { useSearch } from "./search-context";
import type { SearchCriteria } from "./search-criteria";

type Filter = "service" | "time" | "location" | "name" | "price" | "rating" | "sort";

const filters: { id: Filter; label: string; isSet: (criteria: SearchCriteria) => boolean }[] = [
  { id: "service", label: "خدمات", isSet: (criteria) => criteria.service !== "" },
  { id: "time", label: "زمان", isSet: (criteria) => criteria.date !== null || criteria.timeSlot !== "any" },
  { id: "location", label: "مکان", isSet: (criteria) => criteria.location.trim() !== "" },
  { id: "name", label: "نام سالن", isSet: (criteria) => criteria.salonName.trim() !== "" },
  { id: "price", label: "قیمت", isSet: (criteria) => criteria.priceFrom !== "" || criteria.priceTo !== "" },
  { id: "rating", label: "امتیاز", isSet: (criteria) => criteria.minRating !== null },
  { id: "sort", label: "مرتب‌سازی", isSet: (criteria) => criteria.sort !== "default" },
];

const chipBaseClassName = "flex h-10 shrink-0 items-center gap-1 rounded-4xl px-3 text-base/none font-semibold whitespace-nowrap";

function chipClassName(set: boolean, open: boolean) {
  if (set) {
    return buttonClassName("primary", cn(chipBaseClassName, open && "shadow-glow"));
  }
  return cn(
    "focus-ring-2 cursor-pointer bg-background text-text-secondary",
    chipBaseClassName,
    open ? "shadow-glow" : "border border-text-muted",
  );
}

export function MobileFilters({ className }: { className?: string }) {
  const { criteria } = useSearch();
  const sheetId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef(new Map<Filter, HTMLButtonElement>());
  const [openFilter, setOpenFilter] = useState<Filter | null>(null);
  const active = filters.find((filter) => filter.id === openFilter);

  function close(returnFocus: boolean) {
    if (returnFocus && openFilter) {
      chipRefs.current.get(openFilter)?.focus();
    }
    setOpenFilter(null);
  }

  // The chips sit inside the dismiss area, so tapping a chip switches sheets instead of closing first.
  useDismiss(rootRef, openFilter !== null, (reason) => close(reason === "escape"));

  function sheetContent(filter: Filter): ReactNode {
    switch (filter) {
      case "service":
        return <ServiceSection />;
      case "time":
        return <TimeSection onDone={() => close(true)} />;
      case "location":
        return <LocationSection onDone={() => close(true)} />;
      case "name":
        return <SalonNameSection variant="sheet" />;
      case "price":
        return <PriceSection />;
      case "rating":
        return <RatingSection />;
      case "sort":
        return <SortSection variant="sheet" />;
    }
  }

  return (
    <div ref={rootRef} className={cn("lg:hidden", className)}>
      <div className="scrollbar-none overflow-x-auto px-1 py-2.5">
        <ul aria-label="فیلترها" className="flex w-max gap-2">
          {filters.map((filter) => {
            const open = filter.id === openFilter;
            return (
              <li key={filter.id}>
                <button
                  ref={(node) => {
                    if (node) {
                      chipRefs.current.set(filter.id, node);
                    } else {
                      chipRefs.current.delete(filter.id);
                    }
                  }}
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  aria-controls={open ? sheetId : undefined}
                  onClick={() => setOpenFilter(open ? null : filter.id)}
                  className={chipClassName(filter.isSet(criteria), open)}
                >
                  {filter.label}
                  <ChevronDownIcon className={cn("shrink-0", open && "-scale-y-100")} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {active && (
        <BottomSheet key={active.id} id={sheetId} label={active.label} onClose={() => close(true)}>
          {sheetContent(active.id)}
        </BottomSheet>
      )}
    </div>
  );
}

type BottomSheetProps = {
  id: string;
  label: string;
  onClose: () => void;
  children: ReactNode;
};

/** Non-modal, as in the design: the results stay visible and usable above it. */
function BottomSheet({ id, label, onClose, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (sheet && !sheet.contains(document.activeElement)) {
      sheet.focus();
    }
  }, []);

  return (
    <div
      ref={sheetRef}
      id={id}
      role="dialog"
      aria-label={label}
      tabIndex={-1}
      className="fixed inset-x-0 bottom-0 z-60 flex max-h-[85dvh] min-h-72.25 flex-col gap-8 overflow-y-auto rounded-t-2xl bg-background p-4 shadow-[4px_4px_24px_rgb(0_0_0/0.33)] outline-none"
    >
      <button
        type="button"
        aria-label="بستن"
        onClick={onClose}
        className="focus-ring-2 relative size-5 shrink-0 cursor-pointer self-start rounded-sm text-ink"
      >
        {/* CloseIcon pads its cross; this size draws the sheet's 15px cross centered in the 20px slot. */}
        <CloseIcon width={40} height={27.5} strokeWidth={3.2} className="absolute top-1/2 left-1/2 max-w-none -translate-1/2" />
      </button>
      {children}
    </div>
  );
}
