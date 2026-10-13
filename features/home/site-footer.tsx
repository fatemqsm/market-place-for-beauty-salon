import Link from "next/link";
import { LinkedinIcon, PhoneIcon, TelegramIcon } from "@/components/icons";
import { Wordmark } from "./wordmark";

const aboutItems = ["فرصت‌های شغلی", "بلاگ", "تماس با ما"];
const businessItems = ["تعرفه‌ها", "پشتیبانی", "شروع همکاری"];

const contactClassName = "flex h-6 items-center gap-2 text-base font-semibold text-text-secondary";

export function SiteFooter() {
  // On mobile the bottom padding keeps the footer background visible behind the fixed bottom nav.
  return (
    <footer className="bg-surface max-lg:pb-17">
      <div className="mx-auto w-full max-w-page px-4 max-lg:flex max-lg:h-128 max-lg:flex-col max-lg:items-center max-lg:justify-between max-lg:pt-20 max-lg:pb-14.25 lg:ps-39.25 lg:pe-35 lg:pt-17.25 lg:pb-22.5">
        <div className="flex w-full items-center justify-center p-2.5 max-lg:h-12.25 lg:justify-start">
          <Link
            href="/"
            aria-label="وریفام، صفحه اصلی"
            className="focus-ring-4 rounded-sm"
          >
            <Wordmark />
          </Link>
        </div>
        <div className="max-lg:contents lg:mt-8.5 lg:flex lg:items-start lg:justify-between lg:ps-1.25">
          <address className="flex w-35 flex-col items-start gap-2 not-italic max-lg:order-last max-lg:h-25.75">
            <a
              href="tel:02176901531"
              className={`${contactClassName} focus-ring-2 rounded-sm`}
            >
              <PhoneIcon width={19} height={21} className="mx-0.5" />
              <span dir="ltr">02176901531</span>
            </a>
            <p className={contactClassName}>
              <LinkedinIcon />
              <span className="sr-only">لینکدین:</span>
              <span dir="ltr">@VeriFam</span>
            </p>
            <p className={contactClassName}>
              <TelegramIcon />
              <span className="sr-only">تلگرام:</span>
              <span dir="ltr">@VeriFam</span>
            </p>
          </address>
          <div className="flex w-full max-w-81 justify-between lg:contents">
            <FooterList title="برای کسب‌وکارها" items={businessItems} className="w-38" />
            <FooterList title="درباره وریفام" items={aboutItems} className="w-40.25" />
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
      <ul className="mt-6.25 list-disc ps-6 text-base font-semibold">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
