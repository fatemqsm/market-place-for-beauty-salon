const partsFormatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export const monthLabelFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
  month: "long",
  year: "numeric",
});

export const shortDateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
  day: "numeric",
  month: "long",
});

export const fullDateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const weekdayLabels = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export function persianParts(date: Date) {
  const parts = partsFormatter.formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value);
  return { year: read("year"), month: read("month"), day: read("day") };
}

// Dates are pinned to midday so daylight-saving shifts never move them to another day.
export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 12);
}

export function startOfPersianMonth(date: Date) {
  return addDays(startOfDay(date), 1 - persianParts(date).day);
}

export function shiftPersianMonth(monthStart: Date, offset: number) {
  return startOfPersianMonth(offset > 0 ? addDays(monthStart, 32) : addDays(monthStart, -1));
}

export function persianMonthDays(monthStart: Date) {
  const { month } = persianParts(monthStart);
  const days: Date[] = [];
  for (let day = monthStart; persianParts(day).month === month; day = addDays(day, 1)) {
    days.push(day);
  }
  return days;
}

/** Saturday is the first column of a Persian week. */
export function weekColumn(date: Date) {
  return (date.getDay() + 1) % 7;
}

export function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromDateKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}
