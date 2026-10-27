"use client";

import { useReducer } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { bookingReducer } from "@/features/booking/booking-state";
import { StepTime } from "@/features/booking/step-time";
import type { DayHours } from "@/features/salons/salon.types";
import type { AccountBooking } from "./account.types";
import { describeBookingDate } from "./booking-time";

type RescheduleDialogProps = {
  open: boolean;
  booking: AccountBooking;
  hours: (DayHours | null)[];
  durationMin: number;
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
};

export function RescheduleDialog({ open, onClose, ...props }: RescheduleDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="تغییر زمان نوبت">
      {/* Dialog renders its content only while open, so every opening starts with no time chosen. */}
      <ReschedulePicker {...props} />
    </Dialog>
  );
}

function ReschedulePicker({ booking, hours, durationMin, onConfirm }: Omit<RescheduleDialogProps, "open" | "onClose">) {
  // The booking flow's own time step, with the booking's services and specialist kept.
  const [state, dispatch] = useReducer(bookingReducer, {
    items: booking.items,
    professionalId: booking.professionalId,
    date: null,
    time: null,
  });
  const { date, time } = state;

  return (
    <div className="flex flex-col">
      <p className="text-sm/normal text-text-secondary">
        زمان فعلی: {describeBookingDate(booking.date)}، ساعت <span dir="ltr">{booking.time}</span>
      </p>
      {/* StepTime bleeds its day strip 20px past its box; this keeps that bleed inside the sheet's 16px padding. */}
      <div className="px-1 lg:px-0">
        <StepTime
          hours={hours}
          durationMin={durationMin}
          professionalId={booking.professionalId}
          date={date}
          time={time}
          dispatch={dispatch}
        />
      </div>
      {/* Sticky like the review form's submit bar, covering the sheet's bottom padding. */}
      <div className="sticky -bottom-[max(1rem,env(safe-area-inset-bottom))] -mx-4 mt-6 flex flex-col gap-2 border-t border-border bg-background px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] lg:-bottom-6 lg:-mx-6 lg:px-6 lg:pb-6">
        <Button
          aria-disabled={!date || !time}
          title={date && time ? undefined : "روز و ساعت را انتخاب کنید."}
          onClick={date && time ? () => onConfirm(date, time) : undefined}
          className="h-12 w-full text-base"
        >
          ثبت زمان جدید
        </Button>
        <p className="text-center text-xs text-text-muted">زمان جدید پس از تأیید سالن قطعی می‌شود.</p>
      </div>
    </div>
  );
}
