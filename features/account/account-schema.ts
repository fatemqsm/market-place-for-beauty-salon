import { z } from "zod";

export const personalDetailsSchema = z.object({
  name: z.string().trim().min(2, "نام دست‌کم ۲ حرف باشد.").max(40, "نام حداکثر ۴۰ حرف باشد."),
  // Optional: an empty field is kept as "".
  email: z.string().trim().pipe(z.union([z.literal(""), z.email("ایمیل معتبر نیست.")])),
  smsReminders: z.boolean(),
  offers: z.boolean(),
});

export type PersonalDetailsInput = z.input<typeof personalDetailsSchema>;
export type PersonalDetails = z.output<typeof personalDetailsSchema>;
