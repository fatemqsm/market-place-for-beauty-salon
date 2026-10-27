import type { SalonProfile, SalonService } from "@/features/salons/salon.types";

export const bookingSteps = ["services", "professional", "time", "confirm"] as const;
export type BookingStep = (typeof bookingSteps)[number];

export const stepTitles: Record<BookingStep, string> = {
  services: "انتخاب خدمات",
  professional: "انتخاب متخصص",
  time: "انتخاب زمان",
  confirm: "بررسی و تأیید",
};

/** `any` lets the salon assign whoever is free. */
export const anyProfessional = "any";

export type BookingItem = { serviceId: string; variantId?: string };

export type BookingState = {
  items: BookingItem[];
  professionalId: string | null;
  /** `yyyy-mm-dd` from `toDateKey`. */
  date: string | null;
  /** `HH:mm`, Tehran time. */
  time: string | null;
};

export type BookingAction =
  | { type: "add"; item: BookingItem }
  | { type: "remove"; serviceId: string }
  | { type: "professional"; professionalId: string }
  | { type: "date"; date: string }
  | { type: "time"; time: string };

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "add":
      return {
        ...state,
        items: [...state.items.filter((item) => item.serviceId !== action.item.serviceId), action.item],
        // A longer appointment may no longer fit the chosen time.
        time: null,
      };
    case "remove":
      return { ...state, items: state.items.filter((item) => item.serviceId !== action.serviceId), time: null };
    case "professional":
      return { ...state, professionalId: action.professionalId, time: null };
    case "date":
      return { ...state, date: action.date, time: null };
    case "time":
      return { ...state, time: action.time };
  }
}

/** Starts with the service picked on the salon page, if any. A service with options waits for its option. */
export function initialBookingState(salon: SalonProfile, serviceId: string | null): BookingState {
  const service = salon.services.find((candidate) => candidate.id === serviceId);
  return {
    items: service && !service.variants?.length ? [{ serviceId: service.id }] : [],
    professionalId: null,
    date: null,
    time: null,
  };
}

export type PricedItem = {
  service: SalonService;
  label: string;
  price: number;
  durationMin: number;
};

export function priceItems(salon: SalonProfile, items: BookingItem[]): PricedItem[] {
  return items.flatMap((item) => {
    const service = salon.services.find((candidate) => candidate.id === item.serviceId);
    if (!service) {
      return [];
    }
    const variant = service.variants?.find((candidate) => candidate.id === item.variantId);
    return [
      {
        service,
        label: variant ? `${service.name} · ${variant.label}` : service.name,
        price: variant?.price ?? service.price,
        durationMin: variant?.durationMin ?? service.durationMin,
      },
    ];
  });
}

/** The furthest step the current choices allow; a later step in the URL falls back to it. */
export function furthestStep(state: BookingState): BookingStep {
  if (!state.items.length) {
    return "services";
  }
  if (!state.professionalId) {
    return "professional";
  }
  if (!state.date || !state.time) {
    return "time";
  }
  return "confirm";
}
