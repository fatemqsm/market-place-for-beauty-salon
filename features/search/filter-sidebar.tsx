import { PriceSection, RatingSection, SalonNameSection, SortSection } from "./filter-sections";

export function FilterSidebar({ id }: { id: string }) {
  return (
    <aside
      id={id}
      aria-label="جستجوی پیشرفته"
      className="h-206.25 w-64 shrink-0 rounded-xl border border-border bg-background p-4 shadow-card motion-safe:animate-overlay"
    >
      <div className="flex flex-col gap-8 px-4">
        <SalonNameSection variant="sidebar" />
        <PriceSection />
        <RatingSection />
        <SortSection variant="sidebar" />
      </div>
    </aside>
  );
}
