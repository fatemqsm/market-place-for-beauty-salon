import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { SiteMenu } from "@/features/layout/site-menu";
import { Wordmark } from "@/features/layout/wordmark";

export function SiteHeader() {
  return (
    <header className="flex h-12.5 w-full items-center justify-between gap-4 max-lg:ps-2.25 lg:h-19 lg:rounded-2xl lg:bg-white/50 lg:px-20">
      <Link
        href="/"
        aria-label="وریفام، صفحه اصلی"
        className="focus-ring-4 shrink-0 rounded-sm"
      >
        <Wordmark />
      </Link>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-disabled="true"
          title="ورود به‌زودی فعال می‌شود"
          className={buttonClassName("glass", "hidden h-11.5 lg:inline-flex")}
        >
          ورود
        </button>
        <Link href="/#for-business" className={buttonClassName("primary", "hidden h-11.5 lg:inline-flex")}>
          افزودن کسب‌وکار
        </Link>
        <SiteMenu />
      </div>
    </header>
  );
}
