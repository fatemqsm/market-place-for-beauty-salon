"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import { buttonClassName } from "@/components/ui/button";
import { useDismiss } from "./use-dismiss";

type SiteMenuProps = {
  variant?: "header" | "compact";
};

type Icon = { src: string; width: number; height: number };

const closedIcons: Record<NonNullable<SiteMenuProps["variant"]>, Icon> = {
  header: { src: "/home/menu-toggle.svg", width: 78, height: 46 },
  compact: { src: "/home/menu-toggle-compact.svg", width: 80, height: 48 },
};

const openIcon: Icon = { src: "/home/menu-toggle-open.svg", width: 78, height: 50 };
const mobileClosedIcon: Icon = { src: "/home/menu-toggle-mobile.svg", width: 85, height: 50 };
const mobileOpenIcon: Icon = { src: "/home/menu-toggle-mobile-open.svg", width: 85, height: 54 };

const mobileQuery = "(width < 64rem)";
// Distance from the bottom of the toggle to the top of the mobile sheet in the mobile Figma frame.
const sheetOffset = 37;

const itemClassName =
  "focus-ring-4 flex h-9.5 items-center rounded-sm";

export function SiteMenu({ variant = "header" }: SiteMenuProps) {
  const pathname = usePathname();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Tying the open state to the path closes the menu after any navigation.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const [sheetTop, setSheetTop] = useState(0);
  const open = openOnPath === pathname;
  const responsive = variant === "header";
  const desktopIcon = open ? openIcon : closedIcons[variant];
  const mobileIcon = open ? mobileOpenIcon : mobileClosedIcon;

  useDismiss(rootRef, open, (reason) => {
    setOpenOnPath(null);
    if (reason === "escape") {
      toggleRef.current?.focus();
    }
  });

  // On small screens the menu is a full-width sheet, so the page behind it must not scroll.
  useEffect(() => {
    if (!open || !responsive) {
      return;
    }
    const query = window.matchMedia(mobileQuery);
    const root = document.documentElement;
    const sync = () => {
      root.style.overflow = query.matches ? "hidden" : "";
    };
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      root.style.overflow = "";
    };
  }, [open, responsive]);

  function toggle() {
    if (open) {
      setOpenOnPath(null);
      return;
    }
    const bottom = rootRef.current?.getBoundingClientRect().bottom ?? 0;
    setSheetTop(bottom + sheetOffset);
    setOpenOnPath(pathname);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (open && !event.currentTarget.contains(event.relatedTarget)) {
      setOpenOnPath(null);
    }
  }

  return (
    <div ref={rootRef} className="relative shrink-0" onBlur={handleBlur}>
      <button
        ref={toggleRef}
        type="button"
        aria-label="منو"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className={`focus-ring-2 flex cursor-pointer items-center justify-center rounded-full ${responsive ? "h-12.5 lg:h-11.5" : "h-12"}`}
      >
        {responsive && (
          <Image src={mobileIcon.src} alt="" width={mobileIcon.width} height={mobileIcon.height} className="max-w-none lg:hidden" />
        )}
        <Image
          src={desktopIcon.src}
          alt=""
          width={desktopIcon.width}
          height={desktopIcon.height}
          className={`max-w-none ${responsive ? "hidden lg:block" : ""}`}
        />
      </button>
      <nav
        id={panelId}
        aria-label="منوی سایت"
        hidden={!open}
        style={{ "--sheet-top": `${sheetTop}px` } as CSSProperties}
        className="z-40 bg-white shadow-popover max-lg:fixed max-lg:inset-x-0 max-lg:top-(--sheet-top) max-lg:bottom-0 max-lg:overflow-y-auto max-lg:p-8 lg:absolute lg:inset-e-0 lg:top-[calc(100%+16px)] lg:z-50 lg:w-78.25 lg:rounded-lg lg:px-16 lg:py-8"
      >
        {responsive && (
          <div className="mb-8 flex flex-col items-start gap-8 lg:hidden">
            <button
              type="button"
              aria-disabled="true"
              title="ورود به‌زودی فعال می‌شود"
              className={buttonClassName("glass", "h-11.5")}
            >
              ورود
            </button>
            <div className="w-full border-b border-primary pb-8">
              <Link href="/#for-business" onClick={() => setOpenOnPath(null)} className={buttonClassName("primary", "h-11.5")}>
                افزودن کسب‌وکار
              </Link>
            </div>
          </div>
        )}
        <ul className="flex flex-col gap-8 text-lg font-semibold text-ink lg:gap-4">
          <li>
            <span aria-disabled="true" title="این بخش به‌زودی اضافه می‌شود" className="flex h-9.5 cursor-not-allowed items-center">
              چرا وریفام
            </span>
          </li>
          <li>
            <Link href="/#for-business" onClick={() => setOpenOnPath(null)} className={itemClassName}>
              وریفام برای کسب‌وکارها
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
