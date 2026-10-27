import type { ReactNode, RefObject } from "react";
import { ArrowIcon } from "@/components/icons";

type ViewHeaderProps = {
  title: string;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
  /** A line under the title, such as the salon name. */
  children?: ReactNode;
};

/** Sticky, 64px tall: the back button and title of a booking's details or chat. */
export function ViewHeader({ title, headingRef, onBack, children }: ViewHeaderProps) {
  return (
    <header className="sticky top-0 z-40 shrink-0 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-2xl items-center gap-2 px-2 lg:px-5">
        <button
          type="button"
          aria-label="بازگشت"
          onClick={onBack}
          className="focus-ring-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-fast ease-standard hover:bg-hover"
        >
          <ArrowIcon width={20} height={20} />
        </button>
        <div className="flex min-w-0 flex-1 flex-col">
          <h1 ref={headingRef} tabIndex={-1} className="truncate text-base/snug font-bold text-ink outline-none lg:text-lg/snug">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </header>
  );
}
