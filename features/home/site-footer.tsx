import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "./wordmark";

const aboutItems = ["فرصت‌های شغلی", "بلاگ", "تماس با ما"];
const businessItems = ["تعرفه‌ها", "پشتیبانی", "شروع همکاری"];

const contactClassName = "flex h-6 items-center gap-2 text-base font-semibold text-text-secondary";

export function SiteFooter() {
  // On mobile the bottom padding keeps the footer background visible behind the fixed bottom nav.
  return (
    <footer className="bg-surface max-lg:pb-[68px]">
      <div className="mx-auto w-full max-w-[1440px] px-4 max-lg:flex max-lg:h-[512px] max-lg:flex-col max-lg:items-center max-lg:justify-between max-lg:pt-20 max-lg:pb-[57px] lg:ps-[157px] lg:pe-[140px] lg:pt-[69px] lg:pb-[90px]">
        <div className="flex w-full items-center justify-center p-2.5 max-lg:h-[49px] lg:justify-start">
          <Link
            href="/"
            aria-label="وریفام، صفحه اصلی"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <Wordmark />
          </Link>
        </div>
        <div className="max-lg:contents lg:mt-[34px] lg:flex lg:items-start lg:justify-between lg:ps-[5px]">
          <address className="flex w-[140px] flex-col items-start gap-2 not-italic max-lg:order-last max-lg:h-[103px]">
            <a
              href="tel:02176901531"
              className={`${contactClassName} rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`}
            >
              <Image src="/home/phone.svg" alt="" width={19} height={21} className="mx-0.5" />
              <span dir="ltr">02176901531</span>
            </a>
            <p className={contactClassName}>
              <Image src="/home/linkedin.svg" alt="" width={22} height={22} />
              <span className="sr-only">لینکدین:</span>
              <span dir="ltr">@VeriFam</span>
            </p>
            <p className={contactClassName}>
              <Image src="/home/telegram.svg" alt="" width={23} height={23} />
              <span className="sr-only">تلگرام:</span>
              <span dir="ltr">@VeriFam</span>
            </p>
          </address>
          <div className="flex w-full max-w-[324px] justify-between lg:contents">
            <FooterList title="برای کسب‌وکارها" items={businessItems} className="w-[152px]" />
            <FooterList title="درباره وریفام" items={aboutItems} className="w-[161px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterListProps = {
  title: string;
  items: string[];
  className: string;
};

function FooterList({ title, items, className }: FooterListProps) {
  return (
    <section className={`text-text-secondary ${className}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-[25px] list-disc ps-6 text-base font-semibold">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
