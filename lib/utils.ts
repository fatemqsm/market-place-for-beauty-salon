import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Registers the project's theme keys and custom utilities from app/globals.css, so tailwind-merge
// resolves them like built-ins. Keep it in sync when @theme gains a shadow, drop shadow, or container.
const twMerge = extendTailwindMerge<"text-gradient" | "focus-ring">({
  extend: {
    theme: {
      shadow: ["box", "card", "popover", "glass"],
      "drop-shadow": ["box", "nav"],
      container: ["page", "search"],
    },
    classGroups: {
      "text-gradient": [{ "text-gradient": ["button", "title", "hero"] }],
      "focus-ring": [{ "focus-ring": [(value: string) => /^\d+$/.test(value)] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
