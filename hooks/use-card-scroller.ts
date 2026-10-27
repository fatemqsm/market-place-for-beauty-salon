"use client";

import { useRef, useState } from "react";

/** Previous/next paging for a horizontal track of equal-width cards. */
export function useCardScroller<T extends HTMLElement>() {
  const scrollerRef = useRef<T>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** Call from the track's `onScroll`. */
  function updateEdges() {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    // In RTL, scrollLeft starts at 0 and grows negative toward the end.
    const offset = Math.abs(scroller.scrollLeft);
    setAtStart(offset <= 1);
    setAtEnd(offset + scroller.clientWidth >= scroller.scrollWidth - 1);
  }

  function scrollByCards(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    const card = scroller?.firstElementChild;
    if (!scroller || !card) {
      return;
    }
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(scroller).columnGap);
    // No `behavior`: the track's motion-safe:scroll-smooth decides, so reduced motion jumps instantly.
    scroller.scrollBy({ left: -direction * step });
  }

  return { scrollerRef, atStart, atEnd, updateEdges, scrollByCards };
}
