import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "./icons";
import { heroSearchId } from "./search/search-criteria";

const itemClassName = "focus-ring-2 flex h-15 flex-col items-center justify-end";
const labelClassName = "flex h-5.75 items-end text-sm leading-loose whitespace-nowrap";

export function MobileBottomNav() {
  return (
    <nav
      aria-label="ناوبری پایین صفحه"
      className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-between rounded-t-lg bg-white px-6 text-text-secondary pb-2 drop-shadow-nav lg:hidden"
    >
      <Link href="/" aria-current="page" className={`${itemClassName} w-16 gap-2 border-t-2 border-accent text-accent`}>
        <Image src="/home/nav-home.svg" alt="" width={24} height={24} />
        <span className={labelClassName}>خانه</span>
      </Link>
      <Link href={`/#${heroSearchId}`} className={`${itemClassName} w-16 gap-2`}>
        <span className="flex size-6 items-center justify-center">
          <SearchIcon />
        </span>
        <span className={labelClassName}>جستجو</span>
      </Link>
      <Link href="/#for-business" className={`${itemClassName} w-19 gap-2`}>
        <Image src="/home/nav-plus.svg" alt="" width={25} height={26} />
        <span className={labelClassName}>افزودن کسب‌وکار</span>
      </Link>
      <button
        type="button"
        aria-disabled="true"
        title="ورود به‌زودی فعال می‌شود"
        className={`${itemClassName} w-14.25 cursor-not-allowed gap-1`}
      >
        <span className="flex size-5.25 items-center justify-center">
          <Image src="/home/nav-login.svg" alt="" width={16} height={18} />
        </span>
        <span className={labelClassName}>ورود</span>
      </button>
    </nav>
  );
}
