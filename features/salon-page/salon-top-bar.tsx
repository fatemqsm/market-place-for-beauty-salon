"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SalonActions } from "./salon-actions";

// Past this scroll offset the photo strip is mostly gone, so the bar turns solid and shows the name.
const solidAfter = 220;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/**
 * Phone header: back, share, and save over the photos. No backdrop filter: it would make the bar
 * the containing block of the fixed share toast inside it.
 */
export function SalonTopBar({ salonName }: { salonName: string }) {
  const router = useRouter();
  const solid = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > solidAfter,
    () => false,
  );

  function goBack() {
    // A visitor who opened the link directly has no page to return to.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-3 px-3 transition-[background-color,box-shadow] duration-base ease-standard lg:hidden",
        solid ? "bg-background shadow-box" : "bg-transparent",
      )}
    >
      <button
        type="button"
        aria-label="بازگشت"
        onClick={goBack}
        className={cn(
          "focus-ring-2 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink transition-[background-color,box-shadow] duration-fast ease-standard",
          solid ? "hover:bg-hover" : "bg-background/90 shadow-box",
        )}
      >
        <ArrowIcon width={20} height={20} />
      </button>
      <p
        aria-hidden={!solid}
        className={cn(
          "min-w-0 flex-1 truncate text-base font-bold text-ink transition-opacity duration-fast ease-standard",
          !solid && "opacity-0",
        )}
      >
        {salonName}
      </p>
      <SalonActions salonName={salonName} variant={solid ? "plain" : "overlay"} />
    </div>
  );
}
