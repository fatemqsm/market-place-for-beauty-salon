"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useId, useRef, useState, type DragEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CameraIcon, StarIcon, TrashIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Textarea, inputClassName } from "@/components/ui/input";
import type { Review } from "@/features/salons/salon.types";
import { toDateKey } from "@/lib/persian-calendar";
import { cn } from "@/lib/utils";
import {
  acceptedReviewImageTypes,
  maxReviewImageBytes,
  maxReviewImages,
  reviewSchema,
  type ReviewFormValues,
  type ReviewImageValue,
} from "./review-schema";

type ReviewFormProps = {
  serviceNames: string[];
  onSubmitted: (review: Review) => void;
};

const ratingWords = ["", "ضعیف", "متوسط", "خوب", "خیلی خوب", "عالی"];
const labelClassName = "text-sm font-semibold text-ink";

// Not crypto.randomUUID: it is missing on plain-HTTP origins, such as testing on a phone over the LAN.
let lastId = 0;
const nextId = () => `${Date.now()}-${++lastId}`;

export function ReviewForm({ serviceNames, onSubmitted }: ReviewFormProps) {
  const id = useId();
  const submitted = useRef(false);
  const [imageMessage, setImageMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, author: "", serviceName: "", text: "", images: [] },
  });
  const rating = useWatch({ control, name: "rating" });
  const text = useWatch({ control, name: "text" });
  const images = useWatch({ control, name: "images" });

  // Previews of a review that was not sent are no longer needed once the form closes.
  useEffect(
    () => () => {
      if (!submitted.current) {
        getValues("images").forEach((image) => URL.revokeObjectURL(image.url));
      }
    },
    [getValues],
  );

  function addFiles(files: FileList | null) {
    if (!files) {
      return;
    }
    const current = getValues("images");
    const added: ReviewImageValue[] = [];
    const problems = new Set<string>();
    for (const file of Array.from(files)) {
      if (!acceptedReviewImageTypes.includes(file.type)) {
        problems.add("فقط تصویر JPG، PNG یا WebP پذیرفته می‌شود.");
      } else if (file.size > maxReviewImageBytes) {
        problems.add("حجم هر تصویر حداکثر ۵ مگابایت باشد.");
      } else if (current.length + added.length >= maxReviewImages) {
        problems.add("حداکثر ۴ تصویر می‌توانید اضافه کنید.");
      } else {
        added.push({ id: nextId(), file, url: URL.createObjectURL(file) });
      }
    }
    // Rejected files are explained right away rather than on submit.
    setImageMessage([...problems].join(" "));
    if (added.length) {
      setValue("images", [...current, ...added], { shouldValidate: true });
    }
  }

  function removeImage(imageId: string) {
    const current = getValues("images");
    const removed = current.find((image) => image.id === imageId);
    if (removed) {
      URL.revokeObjectURL(removed.url);
    }
    setImageMessage("");
    setValue(
      "images",
      current.filter((image) => image.id !== imageId),
      { shouldValidate: true },
    );
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  }

  function send(values: ReviewFormValues) {
    submitted.current = true;
    const author = values.author.trim();
    onSubmitted({
      id: `local-${nextId()}`,
      author,
      rating: values.rating,
      text: values.text.trim(),
      date: toDateKey(new Date()),
      serviceName: values.serviceName || undefined,
      images: values.images.map((image, index) => ({
        id: image.id,
        alt: `تصویر ${index + 1} از نظر ${author}`,
        plate: "ivory",
        src: image.url,
      })),
      local: true,
    });
  }

  const errorId = (field: string) => `${id}-${field}-error`;
  const imageError = imageMessage || errors.images?.message;

  return (
    <form noValidate onSubmit={(event) => handleSubmit(send)(event)} className="flex flex-col gap-6">
      <fieldset aria-describedby={errorId("rating")}>
        <legend className={cn(labelClassName, "mb-2")}>امتیاز شما به این سالن</legend>
        <div className="flex items-center gap-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((value) => (
              <label
                key={value}
                className="focus-ring-0 flex size-11 cursor-pointer items-center justify-center rounded-full transition-[scale] duration-fast ease-standard motion-safe:active:scale-90"
              >
                <input type="radio" value={value} {...register("rating", { valueAsNumber: true })} className="sr-only" />
                <span className="sr-only">{`${value} ستاره، ${ratingWords[value]}`}</span>
                <StarIcon width={34} height={34} className={value <= rating ? "text-stars" : "text-primary"} />
              </label>
            ))}
          </div>
          <span aria-hidden="true" className="text-sm font-semibold text-text-secondary">
            {ratingWords[rating]}
          </span>
        </div>
        <FieldError id={errorId("rating")} message={errors.rating?.message} className="mt-1" />
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-author`} className={labelClassName}>
          نام شما
        </label>
        <Input
          id={`${id}-author`}
          autoComplete="given-name"
          placeholder="مثلاً سارا"
          invalid={Boolean(errors.author)}
          aria-describedby={errorId("author")}
          {...register("author")}
        />
        <FieldError id={errorId("author")} message={errors.author?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-service`} className={labelClassName}>
          خدمتی که گرفتید <span className="font-normal text-text-muted">(اختیاری)</span>
        </label>
        <select id={`${id}-service`} {...register("serviceName")} className={inputClassName(false, "h-12 px-4 text-base")}>
          <option value="">انتخاب نشده</option>
          {serviceNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={`${id}-text`} className={labelClassName}>
            متن نظر
          </label>
          <span id={`${id}-count`} className="text-xs text-text-muted">
            <span dir="ltr">{text.length} / 1000</span>
          </span>
        </div>
        <Textarea
          id={`${id}-text`}
          rows={5}
          maxLength={1000}
          placeholder="از کیفیت کار، برخورد پرسنل و فضای سالن بنویسید."
          invalid={Boolean(errors.text)}
          aria-describedby={`${errorId("text")} ${id}-count`}
          {...register("text")}
        />
        <FieldError id={errorId("text")} message={errors.text?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <p id={`${id}-images-label`} className={labelClassName}>
          تصاویر <span className="font-normal text-text-muted">(اختیاری، حداکثر ۴ تصویر تا ۵ مگابایت)</span>
        </p>
        {images.length > 0 && (
          <ul aria-labelledby={`${id}-images-label`} className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <li key={image.id} className="relative aspect-square overflow-hidden rounded-lg bg-surface">
                {/* An object URL from this browser; the image optimizer cannot fetch it. */}
                <Image src={image.url} alt={`تصویر ${index + 1}`} fill unoptimized sizes="25vw" className="object-cover" />
                <button
                  type="button"
                  aria-label={`حذف تصویر ${index + 1}`}
                  onClick={() => removeImage(image.id)}
                  className="focus-ring-2 absolute inset-e-1 top-1 flex size-8 cursor-pointer items-center justify-center rounded-full bg-background/90 text-error shadow-box hover:bg-background"
                >
                  <TrashIcon width={18} height={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
        {images.length < maxReviewImages && (
          <label
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "focus-ring-2 flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-4 py-4 text-center transition-colors duration-fast ease-standard",
              dragging ? "border-accent bg-accent/5" : "border-border hover:border-accent-soft hover:bg-hover",
            )}
          >
            <input
              type="file"
              accept={acceptedReviewImageTypes.join(",")}
              multiple
              aria-describedby={errorId("images")}
              onChange={(event) => {
                addFiles(event.target.files);
                // Lets the same file be chosen again after it is removed.
                event.target.value = "";
              }}
              className="sr-only"
            />
            <CameraIcon className="text-accent" />
            <span className="text-sm font-semibold text-ink">افزودن تصویر</span>
            <span className="text-xs text-text-muted max-lg:hidden">یا تصویر را اینجا رها کنید</span>
          </label>
        )}
        <FieldError id={errorId("images")} message={imageError} />
      </div>

      {/*
        Stays in reach on phones while the sheet scrolls. The negative offset and matching padding cover
        the dialog's bottom padding, so the form never shows through below the button.
      */}
      <div className="sticky -bottom-[max(1rem,env(safe-area-inset-bottom))] -mx-4 flex flex-col gap-2 border-t border-border bg-background px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] lg:-bottom-6 lg:-mx-6 lg:px-6 lg:pb-6">
        <Button type="submit" aria-busy={isSubmitting} disabled={isSubmitting} className="h-12 w-full">
          ثبت نظر
        </Button>
        <p className="text-center text-xs text-text-muted">تا اتصال به سرور، نظر فقط در همین صفحه نمایش داده می‌شود.</p>
      </div>
    </form>
  );
}
