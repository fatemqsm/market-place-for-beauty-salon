import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProfileSectionProps = {
  id: string;
  title: string;
  /** A control beside the heading, such as "write a review". */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** A page section the section nav can jump to; the scroll margin clears the sticky bars. */
export function ProfileSection({ id, title, action, children, className }: ProfileSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-28 border-t border-border pt-7 first:border-t-0 first:pt-0 lg:scroll-mt-16 lg:pt-10", className)}
    >
      <div className="mb-4 flex items-center justify-between gap-4 lg:mb-6">
        <h2 id={`${id}-title`} className="text-xl/snug font-bold text-ink lg:text-2xl/snug">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
