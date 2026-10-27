"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ActionDispatch } from "react";
import { PinIcon } from "@/components/icons";
import { Button, buttonClassName } from "@/components/ui/button";
import { BookingDetails } from "@/features/booking/booking-details";
import { SalonPhoto } from "@/features/salons/salon-photo";
import { cn } from "@/lib/utils";
import type { AccountBooking } from "./account.types";
import type { AccountAction } from "./account-state";
import { ContactActions } from "./appointment-actions";
import {
  bookingStart,
  cancelState,
  describeBookingDate,
  describeTimeLeft,
  freeCancelDeadline,
  shownStatus,
  tehranSlot,
} from "./booking-time";
import { summarizeBooking } from "./booking-summary";
import { downloadCalendarFile } from "./calendar-file";
import { CancelDialog } from "./cancel-dialog";
import { RescheduleDialog } from "./reschedule-dialog";
import { ReviewDialog } from "./review-dialog";
import { StatusBadge } from "./status-badge";
import { ViewHeader } from "./view-header";

type AppointmentDetailsProps = {
  booking: AccountBooking;
  now: Date;
  dispatch: ActionDispatch<[AccountAction]>;
  onBack: () => void;
  onChat: () => void;
};

type OpenDialog = "cancel" | "reschedule" | "review" | null;

const footerButtonClassName = "h-12 flex-1 px-4 text-base";

export function AppointmentDetails({ booking, now, dispatch, onBack, onChat }: AppointmentDetailsProps) {
  const summaryTitleId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [dialog, setDialog] = useState<OpenDialog>(null);
  const [notice, setNotice] = useState("");
  const { salon, items, professionalName, durationMin, serviceLabel, plate } = summarizeBooking(booking);
  const start = bookingStart(booking);
  const status = shownStatus(booking, now);
  const cancel = cancelState(booking, now);
  const upcoming = cancel !== "closed";
  const deadline = tehranSlot(freeCancelDeadline(booking));

  // A new view replaces the page, so focus moves to its heading for screen readers.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  function addToCalendar() {
    downloadCalendarFile({
      id: booking.id,
      title: `نوبت ${salon.name}`,
      start,
      durationMin,
      location: salon.address,
      description: professionalName ? `${serviceLabel} · ${professionalName}` : serviceLabel,
    });
  }

  const manageButtons = upcoming && (
    <>
      <Button variant="secondary" onClick={() => setDialog("reschedule")} className={footerButtonClassName}>
        تغییر زمان
      </Button>
      <Button variant="secondary" onClick={() => setDialog("cancel")} className={cn(footerButtonClassName, "text-error")}>
        لغو نوبت
      </Button>
    </>
  );

  return (
    <>
      <ViewHeader title="جزئیات نوبت" headingRef={headingRef} onBack={onBack}>
        <p className="truncate text-xs text-text-muted">{salon.name}</p>
      </ViewHeader>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-5 pt-5 pb-32 lg:pb-16">
        <p role="status" className="rounded-lg bg-success/10 px-4 py-3 text-sm/relaxed font-semibold text-success empty:hidden">
          {notice}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={status} />
          {upcoming && (
            <span className="inline-flex h-6 items-center rounded-full bg-accent/10 px-2.5 text-xs/none font-semibold text-accent">
              {describeTimeLeft(start, now)}
            </span>
          )}
        </div>

        <section aria-label="سالن" className="flex items-start gap-3">
          <SalonPhoto plate={plate} className="size-16 shrink-0 rounded-xl" />
          <div className="flex min-w-0 flex-col gap-1">
            <h2 className="text-lg/snug font-bold text-ink">
              <Link href={`/salons/${salon.id}`} className="focus-ring-2 rounded-sm hover:text-accent">
                {salon.name}
              </Link>
            </h2>
            <address className="flex items-start gap-1.5 text-sm/relaxed text-text-secondary not-italic">
              <PinIcon className="mt-1.5 shrink-0 text-accent" />
              {salon.address}
            </address>
          </div>
        </section>

        <ContactActions salon={salon} onChat={onChat} onAddToCalendar={upcoming ? addToCalendar : undefined} />

        <section aria-labelledby={summaryTitleId} className="flex flex-col gap-3">
          <h2 id={summaryTitleId} className="text-base font-bold text-ink">
            خلاصه رزرو
          </h2>
          <BookingDetails
            items={items}
            professionalName={professionalName}
            date={booking.date}
            time={booking.time}
            className="rounded-xl border border-border p-4"
          />
        </section>

        {upcoming && (
          <div className="rounded-lg bg-surface px-4 py-3 text-sm/relaxed text-text-secondary">
            <p className="font-semibold text-ink">قوانین لغو</p>
            <p>{salon.cancellationPolicy}</p>
            <p className={cancel === "free" ? "mt-1 font-semibold text-success" : "mt-1 font-semibold text-warning"}>
              {cancel === "free" ? (
                <>
                  لغو رایگان تا {describeBookingDate(deadline.date)}، ساعت <span dir="ltr">{deadline.time}</span>
                </>
              ) : (
                "مهلت لغو رایگان این نوبت گذشته است."
              )}
            </p>
          </div>
        )}

        {!upcoming && (
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/salons/${salon.id}/book?service=${items[0]?.service.id ?? ""}`}
              className={buttonClassName("primary", "h-12 flex-1 text-base")}
            >
              رزرو دوباره
            </Link>
            {status === "completed" && !booking.review && (
              <Button variant="secondary" onClick={() => setDialog("review")} className="h-12 flex-1 text-base">
                ثبت نظر
              </Button>
            )}
          </div>
        )}

        {upcoming && <div className="flex gap-3 max-lg:hidden">{manageButtons}</div>}
      </main>

      {/* Phones: changing or cancelling stays within thumb reach. */}
      {upcoming && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-border bg-background px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] drop-shadow-nav lg:hidden">
          {manageButtons}
        </div>
      )}

      {upcoming && (
        <CancelDialog
          open={dialog === "cancel"}
          booking={booking}
          salonName={salon.name}
          serviceLabel={serviceLabel}
          cancellationPolicy={salon.cancellationPolicy}
          state={cancel}
          onClose={() => setDialog(null)}
          onConfirm={() => {
            dispatch({ type: "cancel", bookingId: booking.id });
            setDialog(null);
            setNotice("نوبت لغو شد. تا اتصال به سرور، این تغییر فقط در همین مرورگر ثبت می‌شود.");
          }}
        />
      )}
      <RescheduleDialog
        open={dialog === "reschedule"}
        booking={booking}
        hours={salon.hours}
        durationMin={durationMin}
        onClose={() => setDialog(null)}
        onConfirm={(date, time) => {
          dispatch({ type: "reschedule", bookingId: booking.id, date, time });
          setDialog(null);
          setNotice("زمان جدید ثبت شد و در انتظار تأیید سالن است.");
        }}
      />
      <ReviewDialog
        booking={dialog === "review" ? booking : null}
        onClose={() => setDialog(null)}
        onSubmitted={(bookingId, review) => {
          dispatch({ type: "review", bookingId, review });
          setDialog(null);
          setNotice("نظر شما ثبت شد. تا اتصال به سرور، فقط در همین مرورگر می‌ماند.");
        }}
      />
    </>
  );
}
