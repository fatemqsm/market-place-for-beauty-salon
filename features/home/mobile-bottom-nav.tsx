import Image from "next/image";
import Link from "next/link";
import { heroSearchId } from "./search/search-criteria";

const itemClassName =
  "flex h-[60px] flex-col items-center justify-end focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
const labelClassName = "flex h-[23px] items-end text-sm leading-[2] whitespace-nowrap";

export function MobileBottomNav() {
  return (
    <nav
      aria-label="ناوبری پایین صفحه"
      className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-between rounded-t-lg bg-white px-6 text-text-secondary pb-2 drop-shadow-[7px_-3px_17px_rgba(0,0,0,0.25)] lg:hidden"
    >
      <Link href="/" aria-current="page" className={`${itemClassName} w-16 gap-2 border-t-2 border-accent text-accent`}>
        <Image src="/home/nav-home.svg" alt="" width={24} height={24} />
        <span className={labelClassName}>خانه</span>
      </Link>
      <Link href={`/#${heroSearchId}`} className={`${itemClassName} w-16 gap-2`}>
        <span className="flex size-6 items-center justify-center">
          <Image src="/home/search.svg" alt="" width={18} height={18} />
        </span>
        <span className={labelClassName}>جستجو</span>
      </Link>
      <Link href="/#for-business" className={`${itemClassName} w-[76px] gap-2`}>
        <Image src="/home/nav-plus.svg" alt="" width={25} height={26} />
        <span className={labelClassName}>افزودن کسب‌وکار</span>
      </Link>
      <button
        type="button"
        aria-disabled="true"
        title="ورود به‌زودی فعال می‌شود"
        className={`${itemClassName} w-[57px] cursor-not-allowed gap-1`}
      >
        <span className="flex size-[21px] items-center justify-center">
          <Image src="/home/nav-login.svg" alt="" width={16} height={18} />
        </span>
        <span className={labelClassName}>ورود</span>
      </button>
    </nav>
  );
}
