"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CheckIcon } from "@/components/icons";
import { buttonClassName } from "@/components/ui/button";
import { BookingDetails } from "./booking-details";
import type { BookingContact } from "./booking-schema";
import type { PricedItem } from "./booking-state";

type BookingSuccessProps = {
  salonId: string;
  salonName: string;
  contact: BookingContact;
  items: PricedItem[];
  professionalName: string | null;
  date: string | null;
  time: string | null;
};

export function BookingSuccess({ salonId, salonName, contact, ...details }: BookingSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col gap-6 px-5 py-12 lg:py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-success/10 text-success motion-safe:animate-pop">
          <CheckIcon width={34} height={34} />
        </span>
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl/snug font-bold text-ink outline-none">
          رزرو شما ثبت شد
        </h1>
        <p className="text-base/relaxed text-text-secondary">
          {contact.name} عزیز، نوبت شما در {salonName} ثبت شد.
        </p>
        <p className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-text-secondary">
          نمایشی: تا اتصال به سرور، این رزرو برای سالن ارسال نمی‌شود.
        </p>
      </div>
      <BookingDetails {...details} className="rounded-xl border border-border p-5" />
      <div className="flex flex-col gap-3">
        <Link href={`/salons/${salonId}`} className={buttonClassName("primary", "h-12 w-full")}>
          بازگشت به صفحه سالن
        </Link>
        <Link href="/" className={buttonClassName("secondary", "h-12 w-full")}>
          صفحه اصلی
        </Link>
      </div>
    </main>
  );
}
