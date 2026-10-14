"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SearchIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SiteMenu } from "@/features/layout/site-menu";
import { Wordmark } from "@/features/layout/wordmark";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/utils";
import { LocationField } from "./location-field";
import { useSearch } from "./search-context";
import { ServiceField } from "./service-field";
import { describeTime, TimeField } from "./time-field";

type Panel = "service" | "time" | "location";

type CompactSearchBarProps = {
  /** Runs when a search is blocked by validation, so the page can show the error. */
  onInvalid?: () => void;
};

/** Desktop header bar: wordmark, a collapsed search pill that expands into fields, and the menu. */
export function CompactSearchBar({ onInvalid }: CompactSearchBarProps) {
  const { criteria, submit } = useSearch();
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const focusPill = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [openPanel, setOpenPanel] = useState<Panel | null>(null);

  useEffect(() => {
    if (!expanded && focusPill.current) {
      focusPill.current = false;
      pillRef.current?.focus();
    }
  }, [expanded]);

  useDismiss(rootRef, expanded, (reason) => {
    if (reason === "escape" && openPanel) {
      return;
    }
    focusPill.current = reason === "escape";
    setExpanded(false);
    setOpenPanel(null);
  });

  function expand(panel: Panel) {
    setExpanded(true);
    setOpenPanel(panel);
  }

  function search() {
    setOpenPanel(null);
    if (submit()) {
      setExpanded(false);
    } else {
      onInvalid?.();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search();
  }

  function panelProps(panel: Panel) {
    return {
      open: openPanel === panel,
      onOpenChange: (open: boolean) =>
        setOpenPanel((current) =>
          open ? panel : current === panel ? null : current,
        ),
      size: "compact" as const,
      autoFocus: openPanel === panel,
      className: "flex-1",
    };
  }

  function segmentIsSet(panel: Panel) {
    if (panel === "service") {
      return criteria.service !== "";
    }
    if (panel === "time") {
      return describeTime(criteria) !== "";
    }
    return criteria.location.trim() !== "";
  }

  const segments: { panel: Panel; label: string }[] = [
    { panel: "service", label: criteria.service || "انتخاب خدمات" },
    { panel: "time", label: describeTime(criteria) || "انتخاب زمان" },
    { panel: "location", label: criteria.location || "موقعیت مکانی" },
  ];

  return (
    <div
      ref={rootRef}
      className="mx-auto flex min-h-19.5 max-w-344 items-center justify-between gap-4 rounded-2xl border border-border bg-background/75 px-4 shadow-glass backdrop-blur-md"
    >
      <Link
        href="/"
        aria-label="وریفام، صفحه اصلی"
        className="focus-ring-4 shrink-0 rounded-sm"
      >
        <Wordmark />
      </Link>

      {expanded ? (
        <form
          role="search"
          aria-label="جستجوی سالن"
          noValidate
          onSubmit={handleSubmit}
          className="flex w-full min-w-0 max-w-search items-center gap-2 rounded-4xl border border-border bg-background/80 py-1.5 pe-1.5 shadow-box"
        >
          <ServiceField {...panelProps("service")} />
          <TimeField {...panelProps("time")} />
          <LocationField {...panelProps("location")} />
          <Button type="submit" className="h-11.25 shrink-0 rounded-3xl px-6">
            جستجو
          </Button>
        </form>
      ) : (
        <div className="flex h-12 w-full min-w-0 max-w-199.25 items-center rounded-3xl border border-border bg-background p-1 drop-shadow-box">
          {segments.map((segment, index) => (
            <button
              key={segment.panel}
              ref={index === 0 ? pillRef : undefined}
              type="button"
              aria-label={`جستجو: ${segment.label}`}
              onClick={() => expand(segment.panel)}
              className={cn(
                "focus-ring-0 flex h-10 min-w-0 flex-1 cursor-pointer items-center justify-center px-4 text-lg font-semibold whitespace-nowrap transition-[color,background-color] duration-fast ease-standard hover:bg-hover hover:text-ink",
                segmentIsSet(segment.panel) ? "text-ink" : "text-text-muted",
                index < segments.length - 1
                  ? "border-l border-border"
                  : "rounded-e-3xl",
              )}
            >
              <span className="truncate">{segment.label}</span>
            </button>
          ))}
          <Button
            aria-label="جستجو"
            onClick={search}
            className="h-10 w-16 shrink-0 rounded-4xl px-0"
          >
            <SearchIcon width={16} height={16} />
          </Button>
        </div>
      )}

      <SiteMenu variant="compact" />
    </div>
  );
}
