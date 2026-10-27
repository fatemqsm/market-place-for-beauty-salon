import { anyProfessional, priceItems } from "@/features/booking/booking-state";
import { getSalonProfile } from "@/features/salons/salon-profile";
import type { AccountBooking } from "./account.types";

/** The salon, priced services, and names a booking card or page shows. */
export function summarizeBooking(booking: AccountBooking) {
  const salon = getSalonProfile(booking.salonId);
  const items = priceItems(salon, booking.items);
  const professionalName =
    booking.professionalId === anyProfessional
      ? "هر متخصصی"
      : (salon.team.find((member) => member.id === booking.professionalId)?.name ?? null);

  return {
    salon,
    items,
    professionalName,
    durationMin: items.reduce((sum, item) => sum + item.durationMin, 0),
    serviceLabel: items.map((item) => item.label).join("، "),
    plate: salon.photos[0]?.plate ?? "ivory",
  };
}
