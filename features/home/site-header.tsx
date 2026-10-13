import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { SiteMenu } from "./site-menu";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  return (
    <header className="flex h-[50px] w-full items-center justify-between gap-4 max-lg:ps-[9px] lg:h-[76px] lg:rounded-2xl lg:bg-white/50 lg:px-20">
      <Link
        href="/"
        aria-label="وریفام، صفحه اصلی"
        className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <Wordmark />
      </Link>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-disabled="true"
          title="ورود به‌زودی فعال می‌شود"
          className={buttonClassName("glass", "hidden h-[46px] lg:inline-flex")}
        >
          ورود
        </button>
        <Link href="/#for-business" className={buttonClassName("primary", "hidden h-[46px] lg:inline-flex")}>
          افزودن کسب‌وکار
        </Link>
        <SiteMenu />
      </div>
    </header>
  );
}
