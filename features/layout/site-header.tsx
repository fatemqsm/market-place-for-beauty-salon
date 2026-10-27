import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";
import { SiteMenu } from "@/features/layout/site-menu";
import { Wordmark } from "@/features/layout/wordmark";

export function SiteHeader() {
  return (
    <header className="flex h-12.5 w-full items-center justify-between gap-4 motion-safe:animate-fade-up max-lg:ps-2.25 lg:h-19 lg:rounded-2xl lg:border lg:border-border lg:bg-background/70 lg:px-20 lg:shadow-glass lg:backdrop-blur-md">
      <Link
        href="/"
        aria-label="وریفام، صفحه اصلی"
        className="focus-ring-4 shrink-0 rounded-sm"
      >
        <Wordmark />
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/account" className={buttonClassName("glass", "hidden h-11.5 lg:inline-flex")}>
          حساب من
        </Link>
        <Link href="/#for-business" className={buttonClassName("primary", "hidden h-11.5 lg:inline-flex")}>
          افزودن کسب‌وکار
        </Link>
        <SiteMenu />
      </div>
    </header>
  );
}
