"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useReducer, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDuration, formatToman } from "@/features/salons/format";
import type { SalonProfile } from "@/features/salons/salon.types";
import { BookingDetails } from "./booking-details";
import { BookingHeader } from "./booking-header";
import type { BookingContact } from "./booking-schema";
import {
  anyProfessional,
  bookingReducer,
  bookingSteps,
  furthestStep,
  initialBookingState,
  priceItems,
  type BookingStep,
} from "./booking-state";
import { BookingSuccess } from "./booking-success";
import { StepConfirm } from "./step-confirm";
import { StepProfessional } from "./step-professional";
import { StepServices } from "./step-services";
import { StepTime } from "./step-time";

const missingChoice: Record<BookingStep, string> = {
  services: "دست‌کم یک خدمت انتخاب کنید.",
  professional: "یک متخصص انتخاب کنید.",
  time: "روز و ساعت را انتخاب کنید.",
  confirm: "",
};

function isStep(value: string | null): value is BookingStep {
  return bookingSteps.includes(value as BookingStep);
}

type BookingFlowProps = {
  salon: SalonProfile;
  /** From `?service=` on links in the salon page. */
  initialServiceId: string | null;
};

export function BookingFlow({ salon, initialServiceId }: BookingFlowProps) {
  const formId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [state, dispatch] = useReducer(bookingReducer, null, () => initialBookingState(salon, initialServiceId));
  const [contact, setContact] = useState<BookingContact | null>(null);

  // The step lives in the URL, so the browser and Android back buttons move one step back.
  // A step the current choices cannot reach yet (after a reload, for example) falls back to the furthest one.
  const searchParams = useSearchParams();
  const requested = searchParams.get("step");
  const furthest = furthestStep(state);
  const step =
    bookingSteps[Math.min(bookingSteps.indexOf(isStep(requested) ? requested : "services"), bookingSteps.indexOf(furthest))];

  const stepIndex = bookingSteps.indexOf(step);
  const items = priceItems(salon, state.items);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const duration = items.reduce((sum, item) => sum + item.durationMin, 0);
  const professionalName =
    state.professionalId === anyProfessional
      ? "هر متخصصی"
      : (salon.team.find((member) => member.id === state.professionalId)?.name ?? null);
  const canContinue = step === "confirm" || bookingSteps.indexOf(furthest) > stepIndex;

  // Moves focus to the new step's heading, so screen readers announce it; skipped on first load.
  const shownStep = useRef(step);
  useEffect(() => {
    if (shownStep.current !== step) {
      shownStep.current = step;
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [step]);

  function goNext() {
    const next = bookingSteps[stepIndex + 1];
    if (next) {
      window.history.pushState(null, "", `?step=${next}`);
      window.scrollTo({ top: 0 });
    }
  }

  function goBack() {
    window.history.back();
  }

  if (contact) {
    return (
      <BookingSuccess
        salonId={salon.id}
        salonName={salon.name}
        contact={contact}
        items={items}
        professionalName={professionalName}
        date={state.date}
        time={state.time}
      />
    );
  }

  const continueButton = (
    <Button
      type={step === "confirm" ? "submit" : "button"}
      form={step === "confirm" ? formId : undefined}
      aria-disabled={!canContinue}
      title={canContinue ? undefined : missingChoice[step]}
      onClick={step !== "confirm" && canContinue ? goNext : undefined}
      className="h-12 w-full px-6 max-lg:w-auto max-lg:shrink-0"
    >
      {step === "confirm" ? "تأیید رزرو" : "ادامه"}
    </Button>
  );

  return (
    <>
      <BookingHeader salonId={salon.id} salonName={salon.name} step={step} headingRef={headingRef} onBack={goBack} />
      <main className="mx-auto w-full max-w-5xl px-5 pb-36 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10 lg:pb-16">
        <div className="min-w-0">
          {step === "services" && (
            <StepServices
              salon={salon}
              items={state.items}
              dispatch={dispatch}
              pendingServiceId={state.items.length ? null : initialServiceId}
            />
          )}
          {step === "professional" && (
            <StepProfessional team={salon.team} professionalId={state.professionalId} dispatch={dispatch} />
          )}
          {step === "time" && (
            <StepTime
              hours={salon.hours}
              durationMin={duration}
              professionalId={state.professionalId ?? anyProfessional}
              date={state.date}
              time={state.time}
              dispatch={dispatch}
            />
          )}
          {step === "confirm" && (
            <>
              <BookingDetails
                items={items}
                professionalName={professionalName}
                date={state.date}
                time={state.time}
                className="mt-4 rounded-xl border border-border p-4 lg:hidden"
              />
              <StepConfirm formId={formId} cancellationPolicy={salon.cancellationPolicy} onConfirm={setContact} />
            </>
          )}
        </div>

        <aside aria-label="خلاصه رزرو" className="pt-4 max-lg:hidden">
          <div className="sticky top-22 flex flex-col gap-5 rounded-xl border border-border bg-background p-5 shadow-card">
            <p className="text-lg/snug font-bold text-ink">{salon.name}</p>
            <BookingDetails items={items} professionalName={professionalName} date={state.date} time={state.time} />
            {continueButton}
            {!canContinue && <p className="-mt-2 text-center text-xs text-text-muted">{missingChoice[step]}</p>}
          </div>
        </aside>
      </main>

      {/* Phones: the total and the next action stay within thumb reach. */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-background px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] drop-shadow-nav lg:hidden">
        {items.length > 0 ? (
          <p className="flex min-w-0 flex-col text-sm/snug">
            <span className="truncate font-bold text-ink">{formatToman(total)}</span>
            <span className="text-xs text-text-muted">
              {canContinue ? (
                <>
                  <span dir="ltr">{items.length}</span> خدمت · {formatDuration(duration)}
                </>
              ) : (
                missingChoice[step]
              )}
            </span>
          </p>
        ) : (
          <p className="min-w-0 text-sm/snug font-semibold text-text-secondary">{missingChoice[step]}</p>
        )}
        {continueButton}
      </div>
    </>
  );
}
