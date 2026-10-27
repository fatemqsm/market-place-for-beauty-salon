"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { FieldError, Input, Textarea } from "@/components/ui/input";
import { bookingContactSchema, type BookingContact, type BookingContactInput } from "./booking-schema";

type StepConfirmProps = {
  /** The submit button lives in the booking footer and points at this form by id. */
  formId: string;
  cancellationPolicy: string;
  onConfirm: (contact: BookingContact) => void;
};

const labelClassName = "text-sm font-semibold text-ink";

export function StepConfirm({ formId, cancellationPolicy, onConfirm }: StepConfirmProps) {
  const id = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingContactInput, unknown, BookingContact>({
    resolver: zodResolver(bookingContactSchema),
    defaultValues: { name: "", phone: "", note: "" },
  });

  return (
    <form id={formId} noValidate onSubmit={handleSubmit(onConfirm)} className="flex flex-col gap-5 pt-4">
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-name`} className={labelClassName}>
          نام و نام خانوادگی
        </label>
        <Input
          id={`${id}-name`}
          autoComplete="name"
          invalid={Boolean(errors.name)}
          aria-describedby={`${id}-name-error`}
          {...register("name")}
        />
        <FieldError id={`${id}-name-error`} message={errors.name?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-phone`} className={labelClassName}>
          شماره موبایل
        </label>
        <Input
          id={`${id}-phone`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder="09123456789"
          invalid={Boolean(errors.phone)}
          aria-describedby={`${id}-phone-error`}
          className="text-start"
          {...register("phone")}
        />
        <FieldError id={`${id}-phone-error`} message={errors.phone?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-note`} className={labelClassName}>
          یادداشت برای سالن <span className="font-normal text-text-muted">(اختیاری)</span>
        </label>
        <Textarea
          id={`${id}-note`}
          rows={3}
          maxLength={300}
          placeholder="مثلاً حساسیت پوستی یا رنگ دلخواه"
          invalid={Boolean(errors.note)}
          aria-describedby={`${id}-note-error`}
          {...register("note")}
        />
        <FieldError id={`${id}-note-error`} message={errors.note?.message} />
      </div>

      <div className="rounded-lg bg-surface px-4 py-3 text-sm/relaxed text-text-secondary">
        <p className="font-semibold text-ink">قوانین لغو</p>
        <p>{cancellationPolicy}</p>
      </div>
    </form>
  );
}
