import Link from "next/link";
import { HomeIcon, LoginIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const itemClassName =
  "focus-ring-2 relative flex h-15 flex-col items-center justify-end gap-1.5 rounded-lg pb-1 transition-colors duration-fast ease-standard";
// The active item sits on a soft plum pill behind its icon; the heavier label is a second, color-free cue.
const activeClassName =
  "font-bold text-accent before:absolute before:top-1 before:h-8 before:w-12 before:rounded-full before:bg-accent/10 before:content-['']";
const labelClassName = "flex items-end text-xs leading-none whitespace-nowrap";
const iconClassName = "relative flex size-6 items-center justify-center";

type MobileBottomNavProps = {
  active: "home" | "search" | "account";
};

export function MobileBottomNav({ active }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="ناوبری پایین صفحه"
      className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-between rounded-t-2xl border-t border-border bg-background/95 px-5 pb-2 pt-1 text-text-secondary drop-shadow-nav backdrop-blur-md lg:hidden"
    >
      <Link
        href="/"
        aria-current={active === "home" ? "page" : undefined}
        className={cn(itemClassName, "w-16", active === "home" ? activeClassName : "hover:text-ink")}
      >
        <span className={iconClassName}>
          <HomeIcon />
        </span>
        <span className={labelClassName}>خانه</span>
      </Link>
      <Link
        href="/search"
        aria-current={active === "search" ? "page" : undefined}
        className={cn(itemClassName, "w-16", active === "search" ? activeClassName : "hover:text-ink")}
      >
        <span className={iconClassName}>
          <SearchIcon />
        </span>
        <span className={labelClassName}>جستجو</span>
      </Link>
      <Link href="/#for-business" className={cn(itemClassName, "w-20 hover:text-ink")}>
        <span className={iconClassName}>
          <PlusIcon />
        </span>
        <span className={labelClassName}>افزودن کسب‌وکار</span>
      </Link>
      <Link
        href="/account"
        aria-current={active === "account" ? "page" : undefined}
        className={cn(itemClassName, "w-16", active === "account" ? activeClassName : "hover:text-ink")}
      >
        <span className={iconClassName}>
          <LoginIcon width={16} height={18} />
        </span>
        <span className={labelClassName}>حساب من</span>
      </Link>
    </nav>
  );
}
