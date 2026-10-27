"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SectionNavItem = { id: string; label: string };

type SectionNavProps = {
  items: SectionNavItem[];
  className?: string;
};

/** Sticky jump links; the link of the section under the bars is highlighted as the page scrolls. */
export function SectionNav({ items, className }: SectionNavProps) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);
    // A thin band a third of the way down the viewport decides which section is current.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    const list = listRef.current?.parentElement;
    if (!link || !list) {
      return;
    }
    // Centers the chip by scrolling only the chip row, never the page. Rect math works in RTL too.
    const linkRect = link.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    list.scrollBy({ left: linkRect.left + linkRect.width / 2 - (listRect.left + listRect.width / 2) });
  }, [active]);

  return (
    <nav
      aria-label="بخش‌های صفحه سالن"
      className={cn("sticky top-14 z-40 border-b border-border bg-background lg:top-0", className)}
    >
      <div className="scrollbar-none relative overflow-x-auto px-4 motion-safe:scroll-smooth lg:px-0">
        <ul ref={listRef} className="flex w-max">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-section={item.id}
                aria-current={item.id === active ? "location" : undefined}
                onClick={() => setActive(item.id)}
                className={cn(
                  "focus-ring-0 relative flex h-12 items-center px-3 text-sm font-semibold whitespace-nowrap transition-colors duration-fast ease-standard after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors after:duration-fast after:content-['']",
                  item.id === active ? "text-accent after:bg-accent" : "text-text-secondary after:bg-transparent hover:text-ink",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
