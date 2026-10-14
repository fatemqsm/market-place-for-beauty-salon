import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Registers the project's theme keys and custom utilities from app/globals.css, so tailwind-merge
// resolves them like built-ins. Keep it in sync when @theme gains a shadow, drop shadow, container,
// duration, or easing token.
const twMerge = extendTailwindMerge<"text-gradient" | "focus-ring">({
  extend: {
    theme: {
      shadow: ["box", "card", "card-hover", "popover", "sheet", "glass", "glow", "button"],
      "drop-shadow": ["box", "nav"],
      container: ["page", "search"],
      animate: ["rise", "overlay", "sheet", "fade-up", "pop"],
      ease: ["standard", "exit"],
    },
    classGroups: {
      "text-gradient": [{ "text-gradient": ["button", "title", "hero"] }],
      "focus-ring": [{ "focus-ring": [(value: string) => /^\d+$/.test(value)] }],
      // `duration` is a class group, not a theme scale, in the installed tailwind-merge.
      duration: [{ duration: ["fast", "base", "slow"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
