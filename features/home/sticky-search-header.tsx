"use client";

import { CompactSearchBar } from "@/features/search/compact-search-bar";
import { useSearch } from "@/features/search/search-context";
import { heroSearchId } from "./hero-search";

function scrollToHeroSearch() {
  const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  document.getElementById(heroSearchId)?.scrollIntoView({ behavior, block: "start" });
}

export function StickySearchHeader() {
  const { heroInView } = useSearch();
  // Unmounting while the hero search is visible resets the bar to its compact state.
  if (heroInView) {
    return null;
  }
  return (
    <div className="fixed inset-x-0 top-8 z-50 hidden px-8 motion-safe:animate-rise lg:block">
      {/* The hero form shows the validation message, so a blocked search scrolls back to it. */}
      <CompactSearchBar onInvalid={scrollToHeroSearch} />
    </div>
  );
}
