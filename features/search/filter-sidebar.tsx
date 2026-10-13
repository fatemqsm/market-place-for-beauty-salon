import { PriceSection, RatingSection, SalonNameSection, SortSection } from "./filter-sections";

export function FilterSidebar({ id }: { id: string }) {
  return (
    <aside id={id} aria-label="جستجوی پیشرفته" className="h-206.25 w-64 shrink-0 rounded-lg bg-background p-4">
      <div className="flex flex-col gap-8 px-4">
        <SalonNameSection variant="sidebar" />
        <PriceSection />
        <RatingSection />
        <SortSection variant="sidebar" />
      </div>
    </aside>
  );
}
