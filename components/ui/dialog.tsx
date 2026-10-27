"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { CloseIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type DialogSize = "sheet" | "full";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Keeps the title for screen readers only, as the photo viewer does. */
  hideTitle?: boolean;
  size?: DialogSize;
  children: ReactNode;
  className?: string;
};

// A modal <dialog> sits in the browser's top layer, so it needs no z-index, traps focus, closes on
// Escape, and returns focus to the control that opened it.
const sizeClassNames: Record<DialogSize, string> = {
  // A bottom sheet on phones; a centered panel from `lg`.
  sheet:
    "mx-0 mt-auto mb-0 max-h-[92dvh] w-full max-w-none rounded-t-2xl bg-background text-ink shadow-sheet motion-safe:open:animate-sheet lg:m-auto lg:max-h-[85dvh] lg:w-full lg:max-w-lg lg:rounded-xl lg:shadow-popover",
  full: "m-0 size-full max-h-none max-w-none bg-ink text-on-accent",
};

const closeButtonClassNames: Record<DialogSize, string> = {
  sheet: "text-ink hover:bg-hover",
  full: "bg-background/10 text-on-accent hover:bg-background/20",
};

export function Dialog({ open, onClose, title, hideTitle = false, size = "sheet", children, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return;
    }
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // A modal dialog does not stop the page behind it from scrolling on touch devices.
  useEffect(() => {
    if (!open) {
      return;
    }
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // A click on the dialog element itself, not its content, landed on the backdrop.
        if (event.target === event.currentTarget) {
          ref.current?.close();
        }
      }}
      className={cn("overflow-hidden p-0 backdrop:bg-ink/55 open:flex open:flex-col", sizeClassNames[size], className)}
    >
      {open && (
        <>
          <div className={cn("flex shrink-0 items-center justify-between gap-4 px-4 pt-4 pb-2 lg:px-6", hideTitle && "absolute inset-x-0 top-0 z-10")}>
            <h2 id={titleId} className={cn("text-lg/snug font-bold", hideTitle && "sr-only")}>
              {title}
            </h2>
            <button
              type="button"
              aria-label="بستن"
              onClick={() => ref.current?.close()}
              className={cn(
                "focus-ring-2 relative ms-auto size-10 shrink-0 cursor-pointer rounded-full transition-colors duration-fast ease-standard",
                closeButtonClassNames[size],
              )}
            >
              {/* CloseIcon pads its cross; this size draws an 18px cross centered in the button. */}
              <CloseIcon width={48} height={33} strokeWidth={2.4} className="absolute top-1/2 left-1/2 max-w-none -translate-1/2" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:px-6 lg:pb-6">
            {children}
          </div>
        </>
      )}
    </dialog>
  );
}
