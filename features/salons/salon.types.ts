import type { SalonPlate } from "./salons";

/** A photo. Placeholder photos have only a tonal plate; uploaded ones also carry an object URL. */
export type SalonImage = {
  id: string;
  alt: string;
  plate: SalonPlate;
  src?: string;
  caption?: string;
};

export type ServiceCategory = { id: string; label: string };

/** One priced option of a service, such as a hair length. */
export type ServiceVariant = {
  id: string;
  label: string;
  price: number;
  durationMin: number;
};

export type SalonService = {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  /** With variants, the lowest variant price and duration; shown as "from". */
  price: number;
  durationMin: number;
  variants?: ServiceVariant[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  rating: number;
  plate: SalonPlate;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  /** `yyyy-mm-dd`, the format of `toDateKey` in lib/persian-calendar. */
  date: string;
  serviceName?: string;
  images: SalonImage[];
  /** Written in this browser session and never sent anywhere. */
  local?: boolean;
};

/** Times are `HH:mm`, in Tehran time. */
export type DayHours = { open: string; close: string };

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: number;
  plate: SalonPlate;
};

export type SalonProfile = {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  /** Review counts for 5 down to 1 stars. */
  ratingCounts: [number, number, number, number, number];
  area: string;
  address: string;
  phone: string;
  coordinates: { latitude: number; longitude: number };
  photos: SalonImage[];
  categories: ServiceCategory[];
  services: SalonService[];
  team: TeamMember[];
  portfolio: SalonImage[];
  reviews: Review[];
  /** Saturday first, matching the Persian week; `null` is a closed day. */
  hours: (DayHours | null)[];
  amenities: string[];
  certificates: Certificate[];
  /** Optional: a salon may leave its description empty. */
  about?: string;
  cancellationPolicy: string;
};
