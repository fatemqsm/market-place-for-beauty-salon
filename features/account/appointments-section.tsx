"use client";

import Link from "next/link";
import { useId, useState, type ActionDispatch, type KeyboardEvent } from "react";
import { buttonClassName } from "@/components/ui/button";
import type { Review } from "@/features/salons/salon.types";
import { cn } from "@/lib/utils";
import type { AccountBooking } from "./account.types";
import { splitBookings, type AccountAction } from "./account-state";
import { AppointmentCard } from "./appointment-card";
import { NextBookingCard } from "./next-booking-card";
import { ReviewDialog } from "./review-dialog";

export type AppointmentsTab = "upcoming" | "past";
type Tab = AppointmentsTab;

const tabs: { id: Tab; label: string }[] = [
  { id: "upcoming", label: "پیش رو" },
  { id: "past", label: "گذشته" },
];

function tabClassName(selected: boolean) {
  return cn(
    "focus-ring-2 flex h-11 cursor-pointer items-center justify-center gap-1 rounded-lg text-sm font-semibold transition-[background-color,color,box-shadow] duration-fast ease-standard",
    selected ? "bg-background text-ink shadow-box" : "text-text-secondary hover:text-ink",
  );
}

type AppointmentsSectionProps = {
  bookings: AccountBooking[];
  now: Date;
  dispatch: ActionDispatch<[AccountAction]>;
  /** Owned by the page, so the chosen tab survives opening a booking and coming back. */
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  onOpen: (bookingId: string) => void;
  onChat: (bookingId: string) => void;
  className?: string;
};

export function AppointmentsSection({
  bookings,
  now,
  dispatch,
  tab,
  onTabChange: setTab,
  onOpen,
  onChat,
  className,
}: AppointmentsSectionProps) {
  const id = useId();
  const [reviewing, setReviewing] = useState<AccountBooking | null>(null);
  const [notice, setNotice] = useState("");
  const { upcoming, past } = splitBookings(bookings, now);
  const [next, ...later] = upcoming;
  const counts: Record<Tab, number> = { upcoming: upcoming.length, past: past.length };

  // Two tabs, so either arrow key moves to the other one, as the ARIA tabs pattern expects.
  function handleTabKey(event: KeyboardEvent) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }
    event.preventDefault();
    const other: Tab = tab === "upcoming" ? "past" : "upcoming";
    setTab(other);
    document.getElementById(`${id}-${other}-tab`)?.focus();
  }

  function handleReviewed(bookingId: string, review: Review) {
    dispatch({ type: "review", bookingId, review });
    setReviewing(null);
    setNotice("نظر شما ثبت شد. تا اتصال به سرور، فقط در همین مرورگر می‌ماند.");
  }

  const emptyState = (message: string) => (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-surface px-4 py-10 text-center">
      <p className="text-base font-semibold text-ink">{message}</p>
      <Link href="/search" className={buttonClassName("primary", "h-11 px-6 text-base")}>
        رزرو نوبت جدید
      </Link>
    </div>
  );

  return (
    <section aria-labelledby={`${id}-title`} className={className}>
      <h2 id={`${id}-title`} className="text-lg/snug font-bold text-ink">
        نوبت‌های من
      </h2>
      <div role="tablist" aria-label="نوبت‌ها" className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-surface p-1">
        {tabs.map((item) => {
          const selected = item.id === tab;
          return (
            <button
              key={item.id}
              id={`${id}-${item.id}-tab`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(item.id)}
              onKeyDown={handleTabKey}
              className={tabClassName(selected)}
            >
              {item.label}
              <span className="text-xs font-normal text-text-muted">
                (<span dir="ltr">{counts[item.id]}</span>)
              </span>
            </button>
          );
        })}
      </div>

      <p role="status" className="mt-3 rounded-lg bg-success/10 px-4 py-3 text-sm font-semibold text-success empty:hidden">
        {notice}
      </p>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${tab}-tab`} className="mt-4 flex flex-col gap-3">
        {tab === "upcoming" ? (
          next ? (
            <>
              <NextBookingCard booking={next} now={now} onOpen={() => onOpen(next.id)} onChat={() => onChat(next.id)} />
              {later.map((booking) => (
                <AppointmentCard key={booking.id} booking={booking} now={now} onOpen={() => onOpen(booking.id)} />
              ))}
            </>
          ) : (
            emptyState("نوبت پیش رویی ندارید.")
          )
        ) : past.length > 0 ? (
          past.map((booking) => (
            <AppointmentCard
              key={booking.id}
              booking={booking}
              now={now}
              onOpen={() => onOpen(booking.id)}
              onReview={() => setReviewing(booking)}
            />
          ))
        ) : (
          emptyState("هنوز نوبتی نداشته‌اید.")
        )}
      </div>

      <ReviewDialog booking={reviewing} onClose={() => setReviewing(null)} onSubmitted={handleReviewed} />
    </section>
  );
}
