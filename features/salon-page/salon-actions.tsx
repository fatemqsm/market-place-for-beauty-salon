"use client";

import { useState } from "react";
import { HeartIcon, ShareIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type SalonActionsProps = {
  salonName: string;
  /** `overlay` sits on the photo strip; `plain` sits on the page background. */
  variant: "overlay" | "plain";
  className?: string;
};

const buttonVariantClassNames = {
  overlay: "bg-background/90 text-ink shadow-box backdrop-blur-sm hover:bg-background",
  plain: "border border-border bg-background text-ink hover:border-accent-soft hover:bg-hover",
};

/** Share and save. Saving stays in this page until accounts exist. */
export function SalonActions({ salonName, variant, className }: SalonActionsProps) {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const buttonClassName = cn(
    "focus-ring-2 flex size-10 cursor-pointer items-center justify-center rounded-full transition-[background-color,border-color,color,scale] duration-fast ease-standard motion-safe:active:scale-90",
    buttonVariantClassNames[variant],
  );

  function announce(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: salonName, url });
      } catch {
        // The visitor closed the share sheet.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      announce("پیوند صفحه کپی شد.");
    } catch {
      announce("کپی پیوند ممکن نشد.");
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button type="button" aria-label={`اشتراک‌گذاری ${salonName}`} onClick={share} className={buttonClassName}>
        <ShareIcon />
      </button>
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? `حذف ${salonName} از علاقه‌مندی‌ها` : `افزودن ${salonName} به علاقه‌مندی‌ها`}
        onClick={() => setSaved(!saved)}
        className={cn(buttonClassName, saved && "text-selected")}
      >
        <HeartIcon filled={saved} width={22} height={22} className={cn("-scale-x-100", saved && "motion-safe:animate-pop")} />
      </button>
      <p
        role="status"
        className="fixed inset-x-0 bottom-24 z-50 mx-auto w-fit rounded-full bg-ink px-4 py-2 text-sm font-semibold text-on-accent shadow-popover empty:hidden motion-safe:animate-overlay lg:bottom-8"
      >
        {message}
      </p>
    </div>
  );
}
