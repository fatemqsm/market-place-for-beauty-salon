"use client";

import { useEffect, useState } from "react";

const HERO_LINE = "بهترین سالن‌های زیبایی نزدیک خود را پیدا کنید و آنلاین وقت رزرو کنید.";

const TYPE_MS = 48;
/** How long the finished line stays on screen before it clears. */
const HOLD_FULL_MS = 3000;
const HOLD_EMPTY_MS = 350;

/**
 * Loops a typewriter on the hero subtitle. After a short hold the line clears at once
 * and typing restarts. Reduced-motion users see the full line at once.
 */
export function HeroTypewriter() {
  const [text, setText] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setText(HERO_LINE);
      return;
    }

    const chars = Array.from(HERO_LINE);
    let index = 0;
    let timer = 0;

    const typeNext = () => {
      index += 1;
      setText(chars.slice(0, index).join(""));
      if (index >= chars.length) {
        timer = window.setTimeout(() => {
          setText("");
          index = 0;
          timer = window.setTimeout(typeNext, HOLD_EMPTY_MS);
        }, HOLD_FULL_MS);
        return;
      }
      timer = window.setTimeout(typeNext, TYPE_MS);
    };

    timer = window.setTimeout(typeNext, TYPE_MS);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <p className="relative max-w-74.5 text-base leading-relaxed font-medium text-text-secondary motion-safe:animate-fade-up motion-safe:[animation-delay:180ms] lg:max-w-xl lg:text-xl">
      <span className="invisible" aria-hidden="true">
        {HERO_LINE}
      </span>
      <span className="sr-only">{HERO_LINE}</span>
      <span aria-hidden="true" className="absolute inset-0">
        {text}
        {!reducedMotion ? (
          <span
            className="ms-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-accent align-[-0.1em] motion-safe:animate-pulse"
            aria-hidden="true"
          />
        ) : null}
      </span>
    </p>
  );
}
