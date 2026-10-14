import Link from "next/link";
import { LinkedinIcon, PhoneIcon, TelegramIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/features/layout/wordmark";

const aboutItems = ["فرصت‌های شغلی", "بلاگ", "تماس با ما"];
const businessItems = ["تعرفه‌ها", "پشتیبانی", "شروع همکاری"];

const contactClassName =
  "flex min-h-6 items-center gap-2 text-base font-medium text-text-secondary transition-colors duration-fast ease-standard";

export function SiteFooter() {
  // On mobile the bottom padding keeps the footer background visible behind the fixed bottom nav.
  return (
    <footer className="mt-20 border-t border-border bg-surface max-lg:pb-17 lg:mt-32">
      <div className="mx-auto w-full max-w-page px-6.75 pt-14 pb-10 lg:px-18 lg:pt-20 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))] lg:gap-10">
          <div className="flex flex-col gap-6 max-lg:items-center max-lg:text-center">
            <Link href="/" aria-label="وریفام، صفحه اصلی" className="focus-ring-4 w-fit rounded-sm">
              <Wordmark />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
              رزرو آنلاین سالن‌های زیبایی؛ سالن‌های نزدیک خودت را پیدا کن و وقتت را همین‌جا رزرو کن.
            </p>
            <address className="flex flex-col gap-2 not-italic max-lg:items-center">
              <a href="tel:02176901531" className={cn(contactClassName, "focus-ring-2 rounded-sm hover:text-ink")}>
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
          </div>
          <div className="grid grid-cols-2 gap-8 max-lg:text-center lg:contents">
            <FooterList title="برای کسب‌وکارها" items={businessItems} />
            <FooterList title="درباره وریفام" items={aboutItems} />
          </div>
        </div>
        <p className="mt-12 border-t border-border pt-6 text-center text-xs text-text-muted lg:mt-16 lg:text-start">
          © وریفام. همه حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}

type FooterListProps = {
  title: string;
  items: string[];
};

function FooterList({ title, items }: FooterListProps) {
  return (
    <section>
      <h2 className="text-sm font-bold tracking-wide text-ink">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3 text-base font-medium text-text-secondary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
