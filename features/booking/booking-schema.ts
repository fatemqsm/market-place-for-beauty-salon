import { z } from "zod";
import { toLatinDigits } from "@/lib/digits";

export const bookingContactSchema = z.object({
  name: z.string().trim().min(2, "نام دست‌کم ۲ حرف باشد.").max(40, "نام حداکثر ۴۰ حرف باشد."),
  // Persian and Arabic digits are accepted and stored as Latin digits.
  phone: z
    .string()
    .transform(toLatinDigits)
    .pipe(z.string().regex(/^09\d{9}$/, "شماره موبایل را ۱۱ رقمی و با ۰۹ وارد کنید.")),
  note: z.string().trim().max(300, "یادداشت حداکثر ۳۰۰ حرف باشد."),
});

export type BookingContactInput = z.input<typeof bookingContactSchema>;
export type BookingContact = z.output<typeof bookingContactSchema>;
