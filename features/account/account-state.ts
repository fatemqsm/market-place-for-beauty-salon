import type { Review } from "@/features/salons/salon.types";
import type { AccountBooking, ChatMessage, CustomerProfile } from "./account.types";
import { bookingStart, isActive } from "./booking-time";

export type AccountState = {
  profile: CustomerProfile;
  bookings: AccountBooking[];
  messages: ChatMessage[];
};

export type AccountAction =
  | { type: "cancel"; bookingId: string }
  | { type: "reschedule"; bookingId: string; date: string; time: string }
  | { type: "review"; bookingId: string; review: Review }
  | { type: "send"; bookingId: string; text: string; sentAt: number }
  | { type: "profile"; profile: CustomerProfile };

// Not crypto.randomUUID: it is missing on plain-HTTP origins, such as testing on a phone over the LAN.
let lastId = 0;
const nextId = () => `local-${Date.now()}-${++lastId}`;

/** Stamps the message with the send time here, so components stay free of clock reads during render. */
export function sendMessage(bookingId: string, text: string): AccountAction {
  return { type: "send", bookingId, text, sentAt: Date.now() };
}

function updateBooking(state: AccountState, bookingId: string, change: Partial<AccountBooking>): AccountState {
  return {
    ...state,
    bookings: state.bookings.map((booking) => (booking.id === bookingId ? { ...booking, ...change } : booking)),
  };
}

export function accountReducer(state: AccountState, action: AccountAction): AccountState {
  switch (action.type) {
    case "cancel":
      return updateBooking(state, action.bookingId, { status: "cancelled" });
    case "reschedule":
      // A new time waits for the salon to accept it, as a new booking would.
      return updateBooking(state, action.bookingId, { date: action.date, time: action.time, status: "pending" });
    case "review":
      return updateBooking(state, action.bookingId, { review: action.review });
    case "send":
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: nextId(), bookingId: action.bookingId, from: "customer", text: action.text, sentAt: action.sentAt },
        ],
      };
    case "profile":
      return { ...state, profile: action.profile };
  }
}

/** Upcoming bookings nearest first; past ones (ended, cancelled, or missed) newest first. */
export function splitBookings(bookings: AccountBooking[], now: Date) {
  const upcoming: AccountBooking[] = [];
  const past: AccountBooking[] = [];
  for (const booking of bookings) {
    (isActive(booking.status) && bookingStart(booking) > now ? upcoming : past).push(booking);
  }
  const byStart = (a: AccountBooking, b: AccountBooking) => bookingStart(a).getTime() - bookingStart(b).getTime();
  // Both arrays were built here, so sorting them in place is safe (and works on older iOS).
  return { upcoming: upcoming.sort(byStart), past: past.sort((a, b) => byStart(b, a)) };
}
