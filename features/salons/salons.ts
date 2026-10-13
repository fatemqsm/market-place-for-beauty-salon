export const salonListing = {
  name: "سالن زیبایی رویا",
  rating: "4.8",
  area: "تهران، ولنجک",
  reviews: "312",
};

export type SalonItem = {
  id: string;
  saved: boolean;
  /** Number of placeholder photos; the card shows image controls only when there is more than one. */
  imageCount: number;
};

export function createSalonItems(prefix: string, count: number, savedIndex?: number): SalonItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index}`,
    saved: index === savedIndex,
    imageCount: 1,
  }));
}
