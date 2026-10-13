"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { LocationField } from "./location-field";
import { PriceFilter } from "./price-filter";
import { RatingFilter } from "./rating-filter";
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
      <Image src="/home/settings.svg" alt="" width={18} height={21} />
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
      className="mx-auto mt-[18px] w-full max-w-[343px] scroll-mt-40 lg:mt-[230px] lg:max-w-[1046px]"
    >
      <div className="flex flex-col gap-2 rounded-lg bg-white/50 p-2 lg:flex-row lg:items-center lg:justify-between">
        <ServiceField {...panelProps("service")} className="lg:w-[297px]" />
        <TimeField {...panelProps("time")} className="lg:w-[297px]" />
        <LocationField {...panelProps("location")} className="lg:w-[297px]" />
        {/* Mobile has no advanced search; the design keeps only the salon name filter there. */}
        <SalonNameField className="lg:hidden" />
        <Button type="submit" className="h-[54px] lg:h-[58px]">
          جستجو
        </Button>
        <Button variant="secondary" onClick={clearFilters} className="h-[54px] gap-2 lg:hidden">
          پاک کردن تمام فیلترها
          <Image src="/home/trash.svg" alt="" width={22} height={22} />
        </Button>
      </div>

      {advanced ? (
        <div id={advancedId} className="mt-2 flex flex-col gap-2 max-lg:hidden">
          <div className="flex items-center justify-between gap-2 rounded-lg bg-white/50 p-2">
            <button
              type="button"
              aria-label="بستن جستجوی پیشرفته"
              onClick={() => setAdvancedOpen(false)}
              className="cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <Image src="/home/close.svg" alt="" width={51} height={35} />
            </button>
            <div className="flex flex-wrap justify-end gap-2">
              <Button variant="secondary" onClick={clearFilters} className="h-14">
                <Image src="/home/trash.svg" alt="" width={24} height={24} />
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

      <p role="status" className={`mt-4 text-center text-base font-semibold empty:hidden ${errors.form ? "text-error" : "text-ink"}`}>
        {message}
      </p>
    </form>
  );
}

function SalonNameField({ className = "" }: { className?: string }) {
  const { criteria, update } = useSearch();

  return (
    <label className={`search-field cursor-text ${className}`} data-filled={criteria.salonName ? "" : undefined}>
      <Image src="/home/pencil.svg" alt="" width={20} height={20} className="shrink-0" />
      <span className="sr-only">نام سالن</span>
      <input
        type="search"
        autoComplete="off"
        maxLength={100}
        placeholder="نام سالن"
        value={criteria.salonName}
        onChange={(event) => update({ salonName: event.target.value })}
      />
    </label>
  );
}
