"use client";

import { ClockIcon } from "@/components/icons";
import { describeOpenStatus } from "@/features/salons/opening-hours";
import type { DayHours } from "@/features/salons/salon.types";
import { useCurrentMinute } from "@/features/salons/use-current-minute";
import { cn } from "@/lib/utils";

type OpenStatusProps = {
  hours: (DayHours | null)[];
  className?: string;
};

export function OpenStatus({ hours, className }: OpenStatusProps) {
  const now = useCurrentMinute();
  const status = now && describeOpenStatus(hours, now);

  return (
    <p className={cn("flex min-h-5 items-center gap-1.5 text-sm/normal text-text-secondary", className)}>
      <ClockIcon width={18} height={18} className="shrink-0 text-text-muted" />
      {status ? (
        <span>
          <span className={cn("font-bold", status.open ? "text-success" : "text-error")}>
            {status.open ? "باز است" : "بسته است"}
          </span>
          {status.detail && ` · ${status.detail}`}
        </span>
      ) : (
        // Reserves the line until the visitor's clock is known.
        <span aria-hidden="true" className="h-4 w-32 rounded-sm bg-surface motion-safe:animate-pulse" />
      )}
    </p>
  );
}
