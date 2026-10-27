import Link from "next/link";
import { CalendarIcon, PinIcon, StarIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { AccountBooking } from "./account.types";
import { ContactActions } from "./appointment-actions";
import { bookingStart, describeBookingDate, describeTimeLeft } from "./booking-time";
import { summarizeBooking } from "./booking-summary";
import { StatusBadge } from "./status-badge";

type NextBookingCardProps = {
  booking: AccountBooking;
  now: Date;
  onOpen: () => void;
  onChat: () => void;
};

/** The nearest upcoming booking, with the countdown and the actions needed on the way there. */
export function NextBookingCard({ booking, now, onOpen, onChat }: NextBookingCardProps) {
  const { salon, professionalName, serviceLabel, plate } = summarizeBooking(booking);

  return (
    <article className="overflow-hidden rounded-xl border border-accent-soft bg-background shadow-card">
      <div className="flex items-center justify-between gap-3 bg-accent px-4 py-3 text-on-accent">
        <p className="text-sm font-semibold">نوبت بعدی</p>
        <p className="text-sm font-bold">{describeTimeLeft(bookingStart(booking), now)}</p>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-start gap-3">
          <SalonPhoto plate={plate} className="size-14 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1">
            <h3 className="text-base/snug font-bold text-ink">
              <Link href={`/salons/${salon.id}`} className="focus-ring-2 rounded-sm hover:text-accent">
                {salon.name}
              </Link>
            </h3>
            <p className="text-sm/normal text-text-secondary">{serviceLabel}</p>
          </div>
          <StatusBadge status={booking.status} />
        </div>
        <ul className="flex flex-col gap-2 text-sm/normal text-text-secondary">
          <li className="flex items-center gap-2">
            <CalendarIcon width={18} height={18} className="shrink-0 text-accent" />
            <span>
              {describeBookingDate(booking.date)}، ساعت <span dir="ltr">{booking.time}</span>
            </span>
          </li>
          {professionalName && (
            <li className="flex items-center gap-2">
              <StarIcon width={18} height={18} className="shrink-0 text-accent" />
              {professionalName}
            </li>
          )}
          <li className="flex items-center gap-2">
            <span className="flex w-4.5 shrink-0 justify-center">
              <PinIcon className="text-accent" />
            </span>
            {salon.area}
          </li>
        </ul>
        <ContactActions salon={salon} onChat={onChat} />
        <Button onClick={onOpen} className="h-12 w-full text-base">
          مدیریت نوبت
        </Button>
      </div>
    </article>
  );
}
