import { weekdayNames } from "@/features/salons/opening-hours";
import { fromDateKey, shortDateFormatter, weekColumn } from "@/lib/persian-calendar";
import type { AccountBooking, BookingStatus } from "./account.types";

// Booking times are Tehran time. Iran has stayed on UTC+03:30 all year since it dropped daylight saving in 2022.
const tehranOffset = "+03:30";

const minute = 60_000;
const hour = 60 * minute;
const day = 24 * hour;

const tehranSlotFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Tehran",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function bookingStart({ date, time }: Pick<AccountBooking, "date" | "time">) {
  return new Date(`${date}T${time}:00${tehranOffset}`);
}

/** The Tehran date key and `HH:mm` of a moment. */
export function tehranSlot(moment: Date) {
  const parts = tehranSlotFormatter.formatToParts(moment);
  const read = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return { date: `${read("year")}-${read("month")}-${read("day")}`, time: `${read("hour")}:${read("minute")}` };
}

/** "سه‌شنبه، ۶ آبان". Built by hand, as in booking-details: Intl's Latin comma would reorder the line in RTL. */
export function describeBookingDate(dateKey: string) {
  const date = fromDateKey(dateKey);
  return `${weekdayNames[weekColumn(date)]}، ${shortDateFormatter.format(date)}`;
}

/** How soon an upcoming booking starts, for the countdown chip. */
export function describeTimeLeft(start: Date, now: Date) {
  const left = start.getTime() - now.getTime();
  if (left <= 0) {
    return "زمان نوبت رسیده";
  }
  if (left < hour) {
    return `${Math.max(1, Math.round(left / minute))} دقیقه دیگر`;
  }
  const startDay = tehranSlot(start).date;
  if (startDay === tehranSlot(now).date) {
    return `امروز، ${Math.floor(left / hour)} ساعت دیگر`;
  }
  if (startDay === tehranSlot(new Date(now.getTime() + day)).date) {
    return "فردا";
  }
  return `${Math.ceil(left / day)} روز دیگر`;
}

export function isActive(status: BookingStatus) {
  return status === "confirmed" || status === "pending";
}

/** An active booking whose time has passed is shown as done until the salon reports otherwise. */
export function shownStatus(booking: AccountBooking, now: Date): BookingStatus {
  return isActive(booking.status) && bookingStart(booking) <= now ? "completed" : booking.status;
}

/** `free` before the policy window, `late` inside it, `closed` once the booking has started or ended. */
export type CancelState = "free" | "late" | "closed";

export function cancelState(booking: AccountBooking, now: Date): CancelState {
  const left = bookingStart(booking).getTime() - now.getTime();
  if (!isActive(booking.status) || left <= 0) {
    return "closed";
  }
  return left > booking.freeCancelHours * hour ? "free" : "late";
}

export function freeCancelDeadline(booking: AccountBooking) {
  return new Date(bookingStart(booking).getTime() - booking.freeCancelHours * hour);
}
