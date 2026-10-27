import { fromMinutes, toMinutes } from "@/features/salons/opening-hours";
import type { DayHours } from "@/features/salons/salon.types";

const slotStep = 30;
/** A same-day booking needs at least this much notice. */
const minimumNoticeMin = 30;

export type SlotGroup = { label: string; times: string[] };

// Placeholder availability until a booking API exists: a fixed pattern marks some slots as taken,
// so the same day shows the same free times on every visit.
function isTaken(key: string) {
  let hash = 0;
  for (const char of key) {
    hash = (hash * 31 + char.charCodeAt(0)) % 997;
  }
  return hash % 4 === 0;
}

/**
 * Start times that leave room for the whole appointment before closing.
 * `nowMinutes` is set only for today, to drop times that have passed.
 */
export function freeSlots(day: DayHours, durationMin: number, dateKey: string, professionalId: string, nowMinutes?: number) {
  const open = toMinutes(day.open);
  const lastStart = toMinutes(day.close) - durationMin;
  const earliest = nowMinutes === undefined ? open : Math.max(open, nowMinutes + minimumNoticeMin);
  const times: string[] = [];
  for (let start = open; start <= lastStart; start += slotStep) {
    const time = fromMinutes(start);
    if (start >= earliest && !isTaken(`${dateKey}-${time}-${professionalId}`)) {
      times.push(time);
    }
  }
  return times;
}

export function groupSlots(times: string[]): SlotGroup[] {
  const groups: SlotGroup[] = [
    { label: "صبح", times: times.filter((time) => time < "12:00") },
    { label: "بعدازظهر", times: times.filter((time) => time >= "12:00" && time < "17:00") },
    { label: "عصر", times: times.filter((time) => time >= "17:00") },
  ];
  return groups.filter((group) => group.times.length > 0);
}
