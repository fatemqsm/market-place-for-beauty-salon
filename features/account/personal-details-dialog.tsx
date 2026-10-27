"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FieldError, Input } from "@/components/ui/input";
import type { CustomerProfile } from "./account.types";
import { personalDetailsSchema, type PersonalDetails, type PersonalDetailsInput } from "./account-schema";

type PersonalDetailsDialogProps = {
  open: boolean;
  profile: CustomerProfile;
  onClose: () => void;
  onSave: (details: PersonalDetails) => void;
};

const labelClassName = "text-sm font-semibold text-ink";
const switchRowClassName =
  "focus-ring-0 flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-3 transition-colors duration-fast ease-standard hover:bg-hover";

export function PersonalDetailsDialog({ open, onClose, ...props }: PersonalDetailsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="اطلاعات شخصی و اعلان‌ها">
      {/* Dialog renders its content only while open, so the form always starts from the saved profile. */}
      <PersonalDetailsForm {...props} />
    </Dialog>
  );
}

function PersonalDetailsForm({ profile, onSave }: Pick<PersonalDetailsDialogProps, "profile" | "onSave">) {
  const id = useId();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalDetailsInput, unknown, PersonalDetails>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      smsReminders: profile.smsReminders,
      offers: profile.offers,
    },
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSave)} className="flex flex-col gap-5 pt-1">
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
          dir="ltr"
          readOnly
          value={profile.phone}
          aria-describedby={`${id}-phone-note`}
          className="text-start text-text-secondary"
        />
        <p id={`${id}-phone-note`} className="text-xs text-text-muted">
          تغییر شماره پس از فعال شدن ورود ممکن می‌شود.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-email`} className={labelClassName}>
          ایمیل <span className="font-normal text-text-muted">(اختیاری)</span>
        </label>
        <Input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          placeholder="name@example.com"
          invalid={Boolean(errors.email)}
          aria-describedby={`${id}-email-error`}
          className="text-start"
          {...register("email")}
        />
        <FieldError id={`${id}-email-error`} message={errors.email?.message} />
      </div>

      <fieldset className="flex flex-col gap-1">
        <legend className={labelClassName}>اعلان‌ها</legend>
        <label className={switchRowClassName}>
          <span className="flex flex-col">
            <span className="text-base font-semibold text-ink">یادآوری پیامکی نوبت</span>
            <span className="text-xs text-text-muted">یک روز و دو ساعت پیش از هر نوبت</span>
          </span>
          <input type="checkbox" className="size-5 shrink-0 cursor-pointer accent-accent" {...register("smsReminders")} />
        </label>
        <label className={switchRowClassName}>
          <span className="flex flex-col">
            <span className="text-base font-semibold text-ink">پیشنهادها و تخفیف‌ها</span>
            <span className="text-xs text-text-muted">از سالن‌های ذخیره‌شده و وریفام</span>
          </span>
          <input type="checkbox" className="size-5 shrink-0 cursor-pointer accent-accent" {...register("offers")} />
        </label>
      </fieldset>

      {/* Sticky like the review form's submit bar, covering the sheet's bottom padding. */}
      <div className="sticky -bottom-[max(1rem,env(safe-area-inset-bottom))] -mx-4 flex flex-col gap-2 border-t border-border bg-background px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] lg:-bottom-6 lg:-mx-6 lg:px-6 lg:pb-6">
        <Button type="submit" aria-busy={isSubmitting} disabled={isSubmitting} className="h-12 w-full text-base">
          ذخیره
        </Button>
        <p className="text-center text-xs text-text-muted">تا اتصال به سرور، تغییرات فقط در همین مرورگر می‌ماند.</p>
      </div>
    </form>
  );
}
