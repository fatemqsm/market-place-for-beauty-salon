import type { BookingItem } from "@/features/booking/booking-state";
import type { Review } from "@/features/salons/salon.types";

/** `confirmed` and `pending` are active; the other three end a booking. */
export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled" | "no-show";

export type AccountBooking = {
  id: string;
  salonId: string;
  items: BookingItem[];
  /** A team member id, or `anyProfessional`. */
  professionalId: string;
  /** `yyyy-mm-dd` from `toDateKey`. */
  date: string;
  /** `HH:mm`, Tehran time. */
  time: string;
  status: BookingStatus;
  /** Cancelling is free until this many hours before the start. */
  freeCancelHours: number;
  /** What the customer wrote about a completed visit; `null` until they review it. */
  review: Review | null;
};

export type ChatMessage = {
  id: string;
  bookingId: string;
  from: "salon" | "customer";
  text: string;
  /** Milliseconds since the epoch. */
  sentAt: number;
};

export type CustomerProfile = {
  name: string;
  /** Latin digits, `09…`. */
  phone: string;
  email: string;
  smsReminders: boolean;
  offers: boolean;
};
