"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in milliseconds, applied once the element enters the viewport. */
  delay?: number;
};

/**
 * Fades content up the first time it scrolls into view. The visible state lives in a DOM data
 * attribute rather than React state so the observer never re-renders the subtree.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.dataset.revealed = "";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.dataset.revealed = "";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn(
        "motion-safe:not-data-revealed:opacity-0 motion-safe:data-revealed:animate-fade-up motion-safe:data-revealed:[animation-delay:var(--reveal-delay)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
