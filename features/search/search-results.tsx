"use client";

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
      <p role="status" className="text-base/none font-semibold text-text-muted max-lg:sr-only">
        {`${results.length} نتیجه یافت شد.`}
      </p>
      <p role="alert" className="text-base font-semibold text-error empty:hidden">
        {errors.form}
      </p>
      <ul aria-label="نتایج جستجو" className="grid grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] gap-2 lg:mt-4 lg:gap-4">
        {results.map((item) => (
          <li key={item.id}>
            <SalonCard
              imageCount={item.imageCount}
              saved={savedIds.has(item.id)}
              onToggleSave={() => toggleSaved(item.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
