"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowIcon, MapPinMinusIcon, MapPinPlusIcon, SettingsIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CompactSearchBar } from "./compact-search-bar";
import { FilterSidebar } from "./filter-sidebar";
import { MobileFilters } from "./mobile-filters";
import { MobileSearchHeader } from "./mobile-search-header";
import { useSearch } from "./search-context";
import { SearchResults } from "./search-results";
import { toSearchHref } from "./search-url";

// Below this width the sidebar, the results, and the map do not fit side by side.
const wideQuery = "(width >= 80rem)";

function MapPlaceholder({ id, className }: { id?: string; className?: string }) {
  return (
    <section
      id={id}
      aria-label="نقشه"
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-xl bg-primary",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-surface via-primary to-accent-soft/30"
      />
      <p className="relative px-6 text-center text-base font-semibold text-ink">نقشه هنوز در دسترس نیست.</p>
    </section>
  );
}

export function SearchView() {
  const { criteria } = useSearch();
  const sidebarId = useId();
  const mapId = useId();
  const mapAutoHidden = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mapHidden, setMapHidden] = useState(false);
  const [mobileMap, setMobileMap] = useState(false);

  // Filters apply as they change, so the URL follows them without another navigation.
  useEffect(() => {
    window.history.replaceState(null, "", toSearchHref(criteria));
  }, [criteria]);

  function toggleSidebar() {
    const open = !sidebarOpen;
    setSidebarOpen(open);
    if (open && !mapHidden && !matchMedia(wideQuery).matches) {
      mapAutoHidden.current = true;
      setMapHidden(true);
    } else if (!open && mapAutoHidden.current) {
      mapAutoHidden.current = false;
      setMapHidden(false);
    }
  }

  function toggleMap() {
    mapAutoHidden.current = false;
    if (mapHidden && sidebarOpen && !matchMedia(wideQuery).matches) {
      setSidebarOpen(false);
    }
    setMapHidden(!mapHidden);
  }

  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col gap-4 bg-surface px-6 pt-8.25 pb-24 lg:gap-16 lg:p-8",
        mobileMap && "max-lg:bg-primary",
      )}
    >
      <h1 className="sr-only">جستجوی سالن</h1>
      <header>
        <div className="max-lg:hidden">
          <CompactSearchBar />
        </div>
        <MobileSearchHeader mapView={mobileMap} onToggleMap={() => setMobileMap(!mobileMap)} />
      </header>
      <MobileFilters className={cn(mobileMap && "hidden")} />

      <main className={cn("flex items-start gap-8", mobileMap && "max-lg:hidden")}>
        {sidebarOpen && (
          <div className="max-lg:hidden">
            <FilterSidebar id={sidebarId} />
          </div>
        )}
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col gap-4",
            !mapHidden && (sidebarOpen ? "lg:w-144.5 lg:flex-none" : "lg:w-148.25 lg:flex-none"),
          )}
        >
          <div className="flex items-center justify-between gap-4 max-lg:hidden">
            <Button
              variant="pill"
              aria-expanded={sidebarOpen}
              aria-controls={sidebarOpen ? sidebarId : undefined}
              aria-label={sidebarOpen ? "جستجو پیشرفته" : undefined}
              onClick={toggleSidebar}
              className="h-12 px-6"
            >
              {sidebarOpen ? (
                <ArrowIcon />
              ) : (
                <>
                  <SettingsIcon width={18} height={21} />
                  جستجو پیشرفته
                </>
              )}
            </Button>
            <Button variant="pill" aria-controls={mapHidden ? undefined : mapId} onClick={toggleMap} className="h-12 px-6">
              <span className="flex size-6 items-center justify-center">
                {mapHidden ? <MapPinPlusIcon /> : <MapPinMinusIcon />}
              </span>
              {mapHidden ? "نمایش نقشه" : "پنهان کردن نقشه"}
            </Button>
          </div>
          <SearchResults />
        </div>
        {!mapHidden && (
          <MapPlaceholder id={mapId} className="h-206.25 min-w-0 flex-1 shadow-card max-lg:hidden" />
        )}
      </main>

      {mobileMap && <MapPlaceholder className="min-h-80 flex-1 lg:hidden" />}
    </div>
  );
}
