import { CalendarIcon, ChatIcon, LocationIcon, PhoneIcon } from "@/components/icons";
import { buttonClassName } from "@/components/ui/button";
import type { SalonProfile } from "@/features/salons/salon.types";
import { cn } from "@/lib/utils";

type ContactActionsProps = {
  salon: Pick<SalonProfile, "phone" | "coordinates">;
  onChat: () => void;
  /** Shown only for upcoming bookings. */
  onAddToCalendar?: () => void;
  className?: string;
};

// Icon over label, so four actions fit side by side on a 402px phone.
const actionClassName = buttonClassName("secondary", "h-16 w-full flex-col gap-1.5 px-1 text-sm/none");

/** Chat, directions, call, and add to calendar: the actions a visitor reaches for on the way to a booking. */
export function ContactActions({ salon, onChat, onAddToCalendar, className }: ContactActionsProps) {
  const { latitude, longitude } = salon.coordinates;

  return (
    <ul className={cn("grid gap-2", onAddToCalendar ? "grid-cols-4" : "grid-cols-3", className)}>
      <li>
        <button type="button" onClick={onChat} className={actionClassName}>
          <ChatIcon className="text-accent" />
          چت
        </button>
      </li>
      <li>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className={actionClassName}
        >
          <LocationIcon width={20} height={20} className="text-accent" />
          مسیریابی
        </a>
      </li>
      <li>
        <a href={`tel:${salon.phone}`} className={actionClassName}>
          <PhoneIcon width={17} height={18} className="text-accent" />
          تماس
        </a>
      </li>
      {onAddToCalendar && (
        <li>
          <button type="button" onClick={onAddToCalendar} className={actionClassName}>
            <CalendarIcon width={20} height={20} className="text-accent" />
            تقویم
          </button>
        </li>
      )}
    </ul>
  );
}
