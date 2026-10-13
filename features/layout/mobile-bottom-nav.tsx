import Link from "next/link";
import { HomeIcon, LoginIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const itemClassName =
  "focus-ring-2 flex h-15 flex-col items-center justify-end transition-colors duration-fast ease-standard";
const activeClassName = "border-t-2 border-accent text-accent";
const labelClassName = "flex h-5.75 items-end text-sm leading-loose whitespace-nowrap";

type MobileBottomNavProps = {
  active: "home" | "search";
};

export function MobileBottomNav({ active }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="ناوبری پایین صفحه"
      className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-between rounded-t-lg border-t border-border bg-background px-6 pb-2 text-text-secondary drop-shadow-nav lg:hidden"
    >
      <Link
        href="/"
        aria-current={active === "home" ? "page" : undefined}
        className={cn(itemClassName, "w-16 gap-2", active === "home" ? activeClassName : "hover:text-ink")}
      >
        <HomeIcon />
        <span className={labelClassName}>خانه</span>
      </Link>
      <Link
        href="/search"
        aria-current={active === "search" ? "page" : undefined}
        className={cn(itemClassName, "w-16 gap-2", active === "search" ? activeClassName : "hover:text-ink")}
      >
        <span className="flex size-6 items-center justify-center">
          <SearchIcon />
        </span>
        <span className={labelClassName}>جستجو</span>
      </Link>
      <Link href="/#for-business" className={cn(itemClassName, "w-19 gap-2 hover:text-ink")}>
        <PlusIcon />
        <span className={labelClassName}>افزودن کسب‌وکار</span>
      </Link>
      <button
        type="button"
        aria-disabled="true"
        title="ورود به‌زودی فعال می‌شود"
        className={cn(itemClassName, "w-14.25 cursor-not-allowed gap-1")}
      >
        <span className="flex size-5.25 items-center justify-center">
          <LoginIcon width={16} height={18} />
        </span>
        <span className={labelClassName}>ورود</span>
      </button>
    </nav>
  );
}
