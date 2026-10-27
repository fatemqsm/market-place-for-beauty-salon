"use client";

import { Dialog } from "@/components/ui/dialog";
import { ReviewForm } from "@/features/salon-page/review-form";
import type { Review } from "@/features/salons/salon.types";
import type { AccountBooking } from "./account.types";
import { summarizeBooking } from "./booking-summary";

type ReviewDialogProps = {
  /** The visit being reviewed; `null` keeps the dialog closed. */
  booking: AccountBooking | null;
  onClose: () => void;
  onSubmitted: (bookingId: string, review: Review) => void;
};

export function ReviewDialog({ booking, onClose, onSubmitted }: ReviewDialogProps) {
  const summary = booking ? summarizeBooking(booking) : null;

  return (
    <Dialog open={booking !== null} onClose={onClose} title={summary ? `نظر شما درباره ${summary.salon.name}` : "ثبت نظر"}>
      {booking && summary && (
        <ReviewForm
          serviceNames={summary.items.map((item) => item.service.name)}
          onSubmitted={(review) => onSubmitted(booking.id, review)}
        />
      )}
    </Dialog>
  );
}
