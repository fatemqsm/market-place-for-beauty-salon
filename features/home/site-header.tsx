import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronUpIcon, MenuIcon } from "./icons";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  return (
    <header className="mx-auto mt-5 flex w-[min(1120px,calc(100%-2rem))] items-center justify-between gap-3 rounded-[20px] bg-white/95 px-3 py-2 shadow-[0_10px_30px_rgba(80,40,50,0.06)] sm:px-4">
      <Link href="/" aria-label="وریفام، صفحه اصلی" className="px-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24181c]">
        <Wordmark />
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="px-4">
          ورود
        </Button>
        <Button className="px-4">افزودن کسب‌وکار</Button>
        <button
          type="button"
          aria-label="منو"
          className="inline-flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-2 text-[#24181c] shadow-[0_0_0_1px_rgba(36,24,28,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24181c]"
        >
          <MenuIcon className="size-4" />
          <ChevronUpIcon className="size-4" />
        </button>
      </div>
    </header>
  );
}
