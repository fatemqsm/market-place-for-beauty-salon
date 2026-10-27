import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Filled text inputs, textareas, and selects. Size and type stay at the call site. */
export function inputClassName(invalid: boolean, className?: string) {
  return cn(
    "focus-ring-0 rounded-lg bg-surface text-ink shadow-box transition-[background-color,box-shadow] duration-fast ease-standard",
    "focus-visible:bg-background",
    invalid && "outline-2 outline-error",
    className,
  );
}

export const fieldErrorClassName = "text-sm/normal font-semibold text-error";

// A separate `cn()` argument, so the placeholder color never merges with the text color.
const placeholderClassName = "placeholder:text-text-muted";

type InputProps = ComponentProps<"input"> & { invalid?: boolean };

export function Input({ invalid = false, className, ...props }: InputProps) {
  return (
    <input aria-invalid={invalid || undefined} className={inputClassName(invalid, cn("h-12 px-4 text-base", placeholderClassName, className))} {...props} />
  );
}

type TextareaProps = ComponentProps<"textarea"> & { invalid?: boolean };

export function Textarea({ invalid = false, className, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={inputClassName(invalid, cn("min-h-28 resize-y px-4 py-3 text-base/relaxed", placeholderClassName, className))}
      {...props}
    />
  );
}

type FieldErrorProps = { id: string; message?: string; className?: string };

/** Always rendered, so `aria-describedby` never points at a missing element. */
export function FieldError({ id, message, className }: FieldErrorProps) {
  return (
    <p id={id} role="alert" className={cn(fieldErrorClassName, "empty:hidden", className)}>
      {message}
    </p>
  );
}
