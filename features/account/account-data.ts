import { anyProfessional } from "@/features/booking/booking-state";
import { createSalonItems } from "@/features/salons/salons";
import { fromDateKey, weekColumn } from "@/lib/persian-calendar";
import type { AccountState } from "./account-state";
import { tehranSlot } from "./booking-time";

// Placeholder account until login and a bookings API exist. Dates are relative to the visitor's clock,
// so the page always has a booking a few hours away, one later this week, and a history.

const hour = 3_600_000;
const day = 24 * hour;
const friday = 6;

export const sampleSavedSalons = createSalonItems("saved", 4).map((item) => ({ ...item, saved: true }));

/** The date key `offset` days from now, moved one more day away from today when it is a Friday. */
function sampleDay(now: Date, offset: number) {
  const key = tehranSlot(new Date(now.getTime() + offset * day)).date;
  if (weekColumn(fromDateKey(key)) !== friday) {
    return key;
  }
  return tehranSlot(new Date(now.getTime() + (offset + (offset < 0 ? -1 : 1)) * day)).date;
}

/** About two and a half hours ahead, on the half hour; tomorrow morning when that is outside opening hours. */
function soonSlot(now: Date) {
  const halfHour = hour / 2;
  const slot = tehranSlot(new Date(Math.ceil((now.getTime() + 2.5 * hour) / halfHour) * halfHour));
  const startHour = Number(slot.time.slice(0, 2));
  if (weekColumn(fromDateKey(slot.date)) !== friday && startHour >= 10 && startHour < 18) {
    return slot;
  }
  return { date: sampleDay(now, 1), time: "11:00" };
}

export function createSampleAccount(now: Date): AccountState {
  const soon = soonSlot(now);
  const at = (hoursAgo: number) => now.getTime() - hoursAgo * hour;

  return {
    profile: {
      name: "سارا محمدی",
      phone: "09121234567",
      email: "",
      smsReminders: true,
      offers: false,
    },
    bookings: [
      {
        id: "booking-soon",
        salonId: "featured-0",
        items: [{ serviceId: "haircut", variantId: "medium" }, { serviceId: "blowdry" }],
        professionalId: "sara",
        ...soon,
        status: "confirmed",
        freeCancelHours: 24,
        review: null,
      },
      {
        id: "booking-week",
        salonId: "new-1",
        items: [{ serviceId: "manicure", variantId: "gel" }],
        professionalId: "neda",
        date: sampleDay(now, 4),
        time: "17:00",
        status: "pending",
        freeCancelHours: 24,
        review: null,
      },
      {
        id: "booking-color",
        salonId: "featured-0",
        items: [{ serviceId: "color", variantId: "roots" }],
        professionalId: "maryam",
        date: sampleDay(now, -12),
        time: "11:00",
        status: "completed",
        freeCancelHours: 24,
        review: null,
      },
      {
        id: "booking-facial",
        salonId: "popular-2",
        items: [{ serviceId: "facial" }],
        professionalId: "leila",
        date: sampleDay(now, -30),
        time: "16:00",
        status: "completed",
        freeCancelHours: 24,
        review: {
          id: "review-facial",
          author: "سارا محمدی",
          rating: 5,
          text: "پوستم بعد از فیشیال واقعاً شفاف‌تر شد. خانم محمدی قبل از شروع نوع پوستم را بررسی کرد و برای مراقبت در خانه هم توصیه داد. فضای سالن تمیز و آرام بود.",
          date: sampleDay(now, -29),
          serviceName: "فیشیال تخصصی",
          images: [{ id: "review-facial-1", alt: "تصویر 1 از نظر سارا محمدی", plate: "rose" }],
        },
      },
      {
        id: "booking-pedicure",
        salonId: "new-1",
        items: [{ serviceId: "pedicure" }],
        professionalId: anyProfessional,
        date: sampleDay(now, -45),
        time: "13:30",
        status: "cancelled",
        freeCancelHours: 24,
        review: null,
      },
      {
        id: "booking-brows",
        salonId: "popular-2",
        items: [{ serviceId: "brow-shape" }],
        professionalId: "neda",
        date: sampleDay(now, -60),
        time: "18:00",
        status: "no-show",
        freeCancelHours: 24,
        review: null,
      },
    ],
    messages: [
      {
        id: "message-1",
        bookingId: "booking-soon",
        from: "salon",
        text: "سلام سارا جان، نوبت شما ثبت شد. لطفاً ده دقیقه زودتر تشریف بیاورید.",
        sentAt: at(26),
      },
      { id: "message-2", bookingId: "booking-soon", from: "customer", text: "سلام، ممنون. حتماً.", sentAt: at(25) },
      {
        id: "message-3",
        bookingId: "booking-week",
        from: "salon",
        text: "درخواست شما رسید. تا چند ساعت آینده زمان را تأیید می‌کنیم.",
        sentAt: at(3),
      },
    ],
  };
}
