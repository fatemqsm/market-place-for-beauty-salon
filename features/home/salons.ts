export const salonListing = {
  name: "سالن زیبایی رویا",
  rating: "4.8",
  area: "تهران، ولنجک",
  views: "312",
};

export type SalonCarouselItem = {
  id: string;
  saved: boolean;
};

export function createSalonItems(
  prefix: string,
  count: number,
  savedIndex?: number,
): SalonCarouselItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index}`,
    saved: index === savedIndex,
  }));
}
