import { z } from "zod";

export const maxReviewImages = 4;
export const maxReviewImageBytes = 5 * 1024 * 1024;
export const acceptedReviewImageTypes = ["image/jpeg", "image/png", "image/webp"];

/** A chosen photo and the object URL that previews it. */
const reviewImageSchema = z.object({ id: z.string(), file: z.instanceof(File), url: z.string() });

export const reviewSchema = z.object({
  rating: z.number().int().min(1, "امتیاز خود را انتخاب کنید.").max(5),
  author: z.string().trim().min(2, "نام دست‌کم ۲ حرف باشد.").max(40, "نام حداکثر ۴۰ حرف باشد."),
  serviceName: z.string(),
  text: z.string().trim().min(10, "نظرتان را دست‌کم در ۱۰ حرف بنویسید.").max(1000, "متن نظر حداکثر ۱۰۰۰ حرف باشد."),
  images: z
    .array(reviewImageSchema)
    .max(maxReviewImages, "حداکثر ۴ تصویر می‌توانید اضافه کنید.")
    .refine((images) => images.every(({ file }) => acceptedReviewImageTypes.includes(file.type)), "فقط تصویر JPG، PNG یا WebP.")
    .refine((images) => images.every(({ file }) => file.size <= maxReviewImageBytes), "حجم هر تصویر حداکثر ۵ مگابایت باشد."),
});

export type ReviewFormValues = z.input<typeof reviewSchema>;
export type ReviewImageValue = z.infer<typeof reviewImageSchema>;
