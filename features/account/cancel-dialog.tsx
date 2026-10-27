"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { AccountBooking } from "./account.types";
import { describeBookingDate, type CancelState } from "./booking-time";

type CancelDialogProps = {
  open: boolean;
  booking: AccountBooking;
  salonName: string;
  serviceLabel: string;
  cancellationPolicy: string;
  /** `late`: inside the salon's notice window, so the visitor is warned about a possible fee first. */
  state: Exclude<CancelState, "closed">;
  onClose: () => void;
  onConfirm: () => void;
};

export function CancelDialog({
  open,
  booking,
  salonName,
  serviceLabel,
  cancellationPolicy,
  state,
  onClose,
  onConfirm,
}: CancelDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="لغو نوبت">
      <div className="flex flex-col gap-4 pt-1">
        <p className="text-base/relaxed text-ink">
          نوبت {serviceLabel} در {salonName}، {describeBookingDate(booking.date)} ساعت <span dir="ltr">{booking.time}</span>{" "}
          لغو شود؟
        </p>
        {state === "late" && (
          <p className="rounded-lg bg-warning/10 px-4 py-3 text-sm/relaxed font-semibold text-warning">
            کمتر از <span dir="ltr">{booking.freeCancelHours}</span> ساعت به نوبت مانده است. طبق قوانین سالن ممکن است هزینه لغو
            دریافت شود.
          </p>
        )}
        <div className="rounded-lg bg-surface px-4 py-3 text-sm/relaxed text-text-secondary">
          <p className="font-semibold text-ink">قوانین لغو</p>
          <p>{cancellationPolicy}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={onConfirm} className="h-12 w-full text-base sm:flex-1">
            لغو نوبت
          </Button>
          <Button variant="secondary" onClick={onClose} className="h-12 w-full text-base sm:flex-1">
            منصرف شدم
          </Button>
        </div>
        <p className="text-center text-xs text-text-muted">تا اتصال به سرور، لغو فقط در همین مرورگر ثبت می‌شود.</p>
      </div>
    </Dialog>
  );
}
