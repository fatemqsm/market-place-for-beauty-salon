"use client";

import { Reveal } from "@/components/ui/reveal";
import { SalonCard } from "@/features/salons/salon-card";
import { createSalonItems } from "@/features/salons/salons";
import { useSavedSalons } from "@/features/salons/use-saved-salons";
import { useSearch } from "./search-context";

// Placeholder listings until a search API exists, so filters do not change them yet.
// The first card has several photos, as in the design.
const results = createSalonItems("result", 8).map((item, index) => (index === 0 ? { ...item, imageCount: 3 } : item));

export function SearchResults() {
  const { errors } = useSearch();
  const { savedIds, toggleSaved } = useSavedSalons(results);

  return (
    <>
      <p role="status" className="flex items-baseline gap-1.5 text-sm/normal text-text-secondary lg:text-base/none">
        <span dir="ltr" className="text-lg leading-none font-bold text-ink lg:text-2xl">
          {results.length}
        </span>
        نتیجه یافت شد.
      </p>
      <p
        role="alert"
        className="w-fit rounded-lg border border-error/20 bg-error/5 px-4 py-2 text-base font-semibold text-error empty:hidden"
      >
        {errors.form}
      </p>
      <ul aria-label="نتایج جستجو" className="grid grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] gap-3 lg:mt-4 lg:gap-5">
        {results.map((item, index) => (
          <li key={item.id}>
            <Reveal delay={Math.min(index, 5) * 60}>
              <SalonCard
                plate={item.plate}
                imageCount={item.imageCount}
                saved={savedIds.has(item.id)}
                onToggleSave={() => toggleSaved(item.id)}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}
