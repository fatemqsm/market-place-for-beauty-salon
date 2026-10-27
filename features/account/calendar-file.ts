export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  durationMin: number;
  location: string;
  description: string;
};

/** `20261027T123000Z`: iCalendar UTC time. */
function icsTime(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

// RFC 5545 text: backslash, semicolon, and comma are escaped, and line breaks become `\n`.
function icsText(value: string) {
  return value.replace(/[\\;,]/g, (match) => `\\${match}`).replace(/\r?\n/g, "\\n");
}

/** An `.ics` file with one event and a reminder an hour before, which phone calendars can import. */
export function buildCalendarFile(event: CalendarEvent, now: Date) {
  const end = new Date(event.start.getTime() + event.durationMin * 60_000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VeriFAM//Booking//FA",
    "BEGIN:VEVENT",
    `UID:${event.id}@verifam`,
    `DTSTAMP:${icsTime(now)}`,
    `DTSTART:${icsTime(event.start)}`,
    `DTEND:${icsTime(end)}`,
    `SUMMARY:${icsText(event.title)}`,
    `LOCATION:${icsText(event.location)}`,
    `DESCRIPTION:${icsText(event.description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsText(event.title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

export function downloadCalendarFile(event: CalendarEvent) {
  const blob = new Blob([buildCalendarFile(event, new Date())], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "verifam-booking.ics";
  link.click();
  // Revoked on the next task, after the browser has started the download.
  setTimeout(() => URL.revokeObjectURL(url));
}
