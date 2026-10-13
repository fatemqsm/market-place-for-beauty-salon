"use client";

import { useRef, type FocusEvent, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { useDismiss } from "../use-dismiss";

export type FieldSize = "default" | "compact";

export type SearchFieldProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: FieldSize;
  autoFocus?: boolean;
  className?: string;
};

type SearchPopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  className?: string;
  children: ReactNode;
};

export function SearchPopover({ open, onOpenChange, triggerRef, className, children }: SearchPopoverProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useDismiss(rootRef, open, (reason) => {
    onOpenChange(false);
    if (reason === "escape") {
      triggerRef.current?.focus();
    }
  });

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (open && !event.currentTarget.contains(event.relatedTarget)) {
      onOpenChange(false);
    }
  }

  return (
    <div ref={rootRef} onBlur={handleBlur} className={cn("relative min-w-0", className)}>
      {children}
    </div>
  );
}
