import type { DayHours } from "./salon.types";

export const weekdayNames = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

// Opening hours are Tehran time, whatever the visitor's own time zone is.
const tehranFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tehran",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const weekdayIndex: Record<string, number> = { Sat: 0, Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6 };

export function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function fromMinutes(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** The Persian weekday (Saturday is 0) and minutes since midnight, in Tehran. */
export function tehranTime(date: Date) {
  const parts = tehranFormatter.formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return { day: weekdayIndex[read("weekday")], minutes: Number(read("hour")) * 60 + Number(read("minute")) };
}

/** Whether the salon is open now, and when it closes or next opens. */
export function describeOpenStatus(hours: (DayHours | null)[], date: Date) {
  const now = tehranTime(date);
  const today = hours[now.day];
  if (today && now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close)) {
    return { open: true, detail: `تا ${today.close}` };
  }
  if (today && now.minutes < toMinutes(today.open)) {
    return { open: false, detail: `امروز از ${today.open}` };
  }
  for (let offset = 1; offset <= 7; offset++) {
    const day = (now.day + offset) % 7;
    const next = hours[day];
    if (next) {
      return { open: false, detail: `${offset === 1 ? "فردا" : weekdayNames[day]} از ${next.open}` };
    }
  }
  return { open: false, detail: "" };
}
