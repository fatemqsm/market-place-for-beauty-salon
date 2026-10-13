"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CloseIcon, PencilIcon, SettingsIcon, TrashIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LocationField } from "./location-field";
import { PriceFilter } from "./price-filter";
import { RatingFilter } from "./rating-filter";
import { searchFieldClassName, searchFieldInputClassName } from "./search-classes";
import { useSearch } from "./search-context";
import { heroSearchId } from "./search-criteria";
import { ServiceField } from "./service-field";
import { TimeField } from "./time-field";

type Panel = "service" | "time" | "location" | "price" | "rating";

export function HeroSearch() {
  const { errors, status, submit, clearFilters, setHeroInView } = useSearch();
  const formRef = useRef<HTMLFormElement>(null);
  const advancedId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const focusToggle = useRef(false);
  const [openPanel, setOpenPanel] = useState<Panel | null>(null);
  const [advanced, setAdvanced] = useState(false);
  const message = errors.form ?? status;

  // The toggle moves between rows when advanced search opens or closes, so focus follows it.
  useEffect(() => {
    if (focusToggle.current) {
      focusToggle.current = false;
      toggleRef.current?.focus();
    }
  }, [advanced]);

  function setAdvancedOpen(open: boolean) {
    focusToggle.current = true;
    setAdvanced(open);
    setOpenPanel(null);
  }

  useEffect(() => {
    const form = formRef.current;
    if (!form) {
      return;
    }
    // The root extends far below the viewport, so the form stops intersecting only once it has
    // scrolled above the viewport; that is when the sticky bar replaces it.
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), {
      rootMargin: "0px 0px 100000px 0px",
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, [setHeroInView]);

  function panelProps(panel: Panel) {
    return {
      open: openPanel === panel,
      onOpenChange: (open: boolean) => setOpenPanel((current) => (open ? panel : current === panel ? null : current)),
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = submit();
    if (!valid && errors.price) {
      setAdvanced(true);
      setOpenPanel("price");
    } else if (!valid && errors.time) {
      setOpenPanel("time");
    } else {
      setOpenPanel(null);
    }
  }

  const advancedToggle = (
    <Button
      ref={toggleRef}
      variant="secondary"
      aria-expanded={advanced}
      aria-controls={advanced ? advancedId : undefined}
      onClick={() => setAdvancedOpen(!advanced)}
      className="h-14"
    >
      <SettingsIcon width={18} height={21} />
      جستجو پیشرفته
    </Button>
  );

  return (
    <form
      ref={formRef}
      id={heroSearchId}
      role="search"
      aria-label="جستجوی سالن"
      noValidate
      onSubmit={handleSubmit}
      className="mx-auto mt-4.5 w-full max-w-85.75 scroll-mt-40 lg:mt-57.5 lg:max-w-search"
    >
      <div className="flex flex-col gap-2 rounded-lg bg-white/50 p-2 lg:flex-row lg:items-center lg:justify-between">
        <ServiceField {...panelProps("service")} className="lg:w-74.25" />
        <TimeField {...panelProps("time")} className="lg:w-74.25" />
        <LocationField {...panelProps("location")} className="lg:w-74.25" />
        {/* Mobile has no advanced search; the design keeps only the salon name filter there. */}
        <SalonNameField className="lg:hidden" />
        <Button type="submit" className="h-13.5 lg:h-14.5">
          جستجو
        </Button>
        <Button variant="secondary" onClick={clearFilters} className="h-13.5 gap-2 lg:hidden">
          پاک کردن تمام فیلترها
          <TrashIcon width={22} height={22} />
        </Button>
      </div>

      {advanced ? (
        <div id={advancedId} className="mt-2 flex flex-col gap-2 max-lg:hidden">
          <div className="flex items-center justify-between gap-2 rounded-lg bg-white/50 p-2">
            <button
              type="button"
              aria-label="بستن جستجوی پیشرفته"
              onClick={() => setAdvancedOpen(false)}
              className="focus-ring-2 cursor-pointer rounded-lg"
            >
              <CloseIcon />
            </button>
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="secondary" onClick={clearFilters} className="h-14">
                <TrashIcon />
                پاک کردن تمام فیلترها
              </Button>
              {advancedToggle}
            </div>
          </div>
          <div className="grid gap-2 rounded-lg bg-white/50 p-2 lg:grid-cols-3">
            <SalonNameField />
            <PriceFilter {...panelProps("price")} />
            <RatingFilter {...panelProps("rating")} />
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-end max-lg:hidden">{advancedToggle}</div>
      )}

      <p
        role="status"
        className={cn("mt-4 text-center text-base font-semibold empty:hidden", errors.form ? "text-error" : "text-ink")}
      >
        {message}
      </p>
    </form>
  );
}

function SalonNameField({ className }: { className?: string }) {
  const { criteria, update } = useSearch();

  return (
    <label
      className={searchFieldClassName({
        filled: Boolean(criteria.salonName),
        active: false,
        className: cn("cursor-text", className),
      })}
    >
      <PencilIcon width={20} height={20} className="shrink-0 text-text-secondary" />
      <span className="sr-only">نام سالن</span>
      <input
        type="search"
        autoComplete="off"
        maxLength={100}
        placeholder="نام سالن"
        value={criteria.salonName}
        onChange={(event) => update({ salonName: event.target.value })}
        className={searchFieldInputClassName}
      />
    </label>
  );
}
