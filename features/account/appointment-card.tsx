import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { buttonClassName } from "@/components/ui/button";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { AccountBooking } from "./account.types";
import { describeBookingDate, shownStatus } from "./booking-time";
import { summarizeBooking } from "./booking-summary";
import { StatusBadge } from "./status-badge";

type AppointmentCardProps = {
  booking: AccountBooking;
  now: Date;
  onOpen: () => void;
  /** Past bookings only: offers to review a completed visit. */
  onReview?: () => void;
};

const actionClassName = buttonClassName("secondary", "h-10 px-4 text-sm");

export function AppointmentCard({ booking, now, onOpen, onReview }: AppointmentCardProps) {
  const { salon, items, serviceLabel, plate } = summarizeBooking(booking);
  const status = shownStatus(booking, now);
  const past = status === "completed" || status === "cancelled" || status === "no-show";

  return (
    <article className="relative flex flex-col gap-3 rounded-xl border border-border bg-background p-4 shadow-card transition-[border-color,box-shadow] duration-fast ease-standard hover:border-accent-soft hover:shadow-card-hover">
      <div className="flex items-start gap-3">
        <SalonPhoto plate={plate} className="size-12 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1">
          <h3 className="text-base/snug font-bold text-ink">
            {/* The overlay covers the whole card; the actions below sit above it. */}
            <button
              type="button"
              onClick={onOpen}
              className="focus-ring-2 cursor-pointer rounded-sm text-start after:absolute after:inset-0 after:rounded-xl after:content-['']"
            >
              {salon.name}
            </button>
          </h3>
          <p className="truncate text-sm/normal text-text-secondary">{serviceLabel}</p>
          <p className="mt-1 text-xs/normal text-text-muted">
            {describeBookingDate(booking.date)}، ساعت <span dir="ltr">{booking.time}</span>
          </p>
        </div>
        <StatusBadge status={status} />
      </div>
      {past && (
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <Link href={`/salons/${salon.id}/book?service=${items[0]?.service.id ?? ""}`} className={actionClassName}>
            رزرو دوباره
          </Link>
          {status === "completed" &&
            (booking.review ? (
              <p className="flex items-center gap-1 text-sm font-semibold text-success">
                <CheckIcon width={16} height={16} />
                نظر شما ثبت شده
              </p>
            ) : (
              onReview && (
                <button type="button" onClick={onReview} className={actionClassName}>
                  ثبت نظر
                </button>
              )
            ))}
        </div>
      )}
    </article>
  );
}
