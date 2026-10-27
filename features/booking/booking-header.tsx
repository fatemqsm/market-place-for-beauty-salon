import Link from "next/link";
import type { RefObject } from "react";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { bookingSteps, stepTitles, type BookingStep } from "./booking-state";

type BookingHeaderProps = {
  salonId: string;
  salonName: string;
  step: BookingStep;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
};

const iconButtonClassName =
  "focus-ring-2 relative flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-fast ease-standard hover:bg-hover";

/** Sticky, 68px tall (`top-17` below it). */
export function BookingHeader({ salonId, salonName, step, headingRef, onBack }: BookingHeaderProps) {
  const index = bookingSteps.indexOf(step);
  const salonHref = `/salons/${salonId}`;

  return (
    <header className="sticky top-0 z-40 h-17 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-2 px-2 lg:px-5">
        {index === 0 ? (
          <Link href={salonHref} aria-label="بازگشت به صفحه سالن" className={iconButtonClassName}>
            <ArrowIcon width={20} height={20} />
          </Link>
        ) : (
          <button type="button" aria-label="مرحله قبل" onClick={onBack} className={iconButtonClassName}>
            <ArrowIcon width={20} height={20} />
          </button>
        )}
        <div className="flex min-w-0 flex-1 flex-col items-center text-center">
          <p className="max-w-full truncate text-xs text-text-muted">
            مرحله <span dir="ltr">{index + 1}</span> از <span dir="ltr">{bookingSteps.length}</span> · {salonName}
          </p>
          <h1 ref={headingRef} tabIndex={-1} className="text-base/snug font-bold text-ink outline-none lg:text-lg/snug">
            {stepTitles[step]}
          </h1>
        </div>
        <Link href={salonHref} aria-label="انصراف از رزرو" className={iconButtonClassName}>
          {/* CloseIcon pads its cross; this size draws an 18px cross centered in the button. */}
          <CloseIcon width={48} height={33} strokeWidth={2.4} className="absolute top-1/2 left-1/2 max-w-none -translate-1/2" />
        </Link>
      </div>
      <div aria-hidden="true" className="mx-auto flex h-1 max-w-5xl gap-1 px-2 lg:px-5">
        {bookingSteps.map((item, position) => (
          <span
            key={item}
            className={cn(
              "flex-1 rounded-full transition-colors duration-base ease-standard",
              position <= index ? "bg-accent" : "bg-surface-strong",
            )}
          />
        ))}
      </div>
    </header>
  );
}
