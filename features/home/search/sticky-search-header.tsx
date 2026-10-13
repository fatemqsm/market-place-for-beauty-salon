"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SiteMenu } from "../site-menu";
import { useDismiss } from "../use-dismiss";
import { Wordmark } from "../wordmark";
import { heroSearchId } from "./search-criteria";
import { LocationField } from "./location-field";
import { useSearch } from "./search-context";
import { ServiceField } from "./service-field";
import { describeTime, TimeField } from "./time-field";

type Panel = "service" | "time" | "location";

export function StickySearchHeader() {
  const { heroInView } = useSearch();
  // Unmounting while the hero search is visible resets the bar to its compact state.
  return heroInView ? null : <StickyBar />;
}

function StickyBar() {
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
    submit();
    document.getElementById(heroSearchId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search();
  }

  function panelProps(panel: Panel) {
    return {
      open: openPanel === panel,
      onOpenChange: (open: boolean) => setOpenPanel((current) => (open ? panel : current === panel ? null : current)),
      size: "compact" as const,
      autoFocus: openPanel === panel,
      className: "flex-1",
    };
  }

  const segments: { panel: Panel; label: string }[] = [
    { panel: "service", label: criteria.service || "انتخاب خدمات" },
    { panel: "time", label: describeTime(criteria) || "انتخاب زمان" },
    { panel: "location", label: criteria.location || "موقعیت مکانی" },
  ];

  return (
    <div className="fixed inset-x-0 top-8 z-50 hidden px-8 lg:block">
      <div
        ref={rootRef}
        className="mx-auto flex min-h-[78px] max-w-[1376px] items-center justify-between gap-4 rounded-2xl bg-white/50 px-4 backdrop-blur-md"
      >
        <Link
          href="/"
          aria-label="وریفام، صفحه اصلی"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <Wordmark />
        </Link>

        {expanded ? (
          <form
            role="search"
            aria-label="جستجوی سالن"
            noValidate
            onSubmit={handleSubmit}
            className="flex w-full min-w-0 max-w-[1046px] items-center gap-2 rounded-[32px] bg-white/50 py-[6px] pe-[6px] shadow-box"
          >
            <ServiceField {...panelProps("service")} />
            <TimeField {...panelProps("time")} />
            <LocationField {...panelProps("location")} />
            <Button type="submit" className="h-[45px] shrink-0 rounded-3xl px-6">
              جستجو
            </Button>
          </form>
        ) : (
          <div className="flex h-12 w-full min-w-0 max-w-[797px] items-center rounded-3xl bg-white p-1 drop-shadow-[0_0_8px_rgba(0,0,0,0.16)]">
            {segments.map((segment, index) => (
              <button
                key={segment.panel}
                ref={index === 0 ? pillRef : undefined}
                type="button"
                aria-label={`جستجو: ${segment.label}`}
                onClick={() => expand(segment.panel)}
                className={`flex h-10 min-w-0 flex-1 cursor-pointer items-center justify-center px-4 text-lg font-semibold whitespace-nowrap text-text-muted hover:bg-surface focus-visible:outline-2 focus-visible:outline-ink ${index < segments.length - 1 ? "border-l border-text-muted" : "rounded-e-3xl"}`}
              >
                <span className="truncate">{segment.label}</span>
              </button>
            ))}
            <Button aria-label="جستجو" onClick={search} className="h-10 w-16 shrink-0 rounded-[32px] px-0">
              <Image src="/home/search-white.svg" alt="" width={16} height={16} />
            </Button>
          </div>
        )}

        <SiteMenu variant="compact" />
      </div>
    </div>
  );
}
