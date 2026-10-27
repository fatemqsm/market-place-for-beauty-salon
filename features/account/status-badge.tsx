import { cn } from "@/lib/utils";
import type { BookingStatus } from "./account.types";

const statusLabels: Record<BookingStatus, string> = {
  confirmed: "تأیید شده",
  pending: "در انتظار تأیید سالن",
  completed: "انجام شده",
  cancelled: "لغو شده",
  "no-show": "حاضر نشدید",
};

const statusClassNames: Record<BookingStatus, string> = {
  confirmed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  completed: "bg-surface text-text-secondary",
  cancelled: "bg-error/10 text-error",
  "no-show": "bg-error/10 text-error",
};

export function StatusBadge({ status, className }: { status: BookingStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-xs/none font-semibold whitespace-nowrap",
        statusClassNames[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
