import Link from "next/link";
import { LinkedInIcon, PhoneIcon, SendIcon } from "./icons";
import { Wordmark } from "./wordmark";

const businessLinks = ["تعرفه‌ها", "پشتیبانی", "شروع همکاری"];
const aboutLinks = ["فرصت‌های شغلی", "بلاگ", "تماس با ما"];

export function SiteFooter() {
  return (
    <footer className="bg-[#f7f6f7]">
      <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col gap-10 py-14 sm:flex-row sm:items-start sm:gap-20">
        <div className="flex flex-col items-start gap-3 text-sm text-[#3f3938]">
          <Link href="/" aria-label="وریفام، صفحه اصلی" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24181c]">
            <Wordmark />
          </Link>
          <p className="inline-flex items-center gap-2">
            <PhoneIcon className="size-4" />
            <span dir="ltr">02176901531</span>
          </p>
          <p className="inline-flex items-center gap-2">
            <LinkedInIcon className="size-4" />
            <span dir="ltr">@VeriFam</span>
          </p>
          <p className="inline-flex items-center gap-2">
            <SendIcon className="size-4" />
            <span dir="ltr">@VeriFam</span>
          </p>
        </div>
        <nav aria-label="برای کسب‌وکارها">
          <h2 className="text-sm font-semibold text-[#2a2426]">برای کسب‌وکارها</h2>
          <ul className="mt-3 space-y-2">
            {businessLinks.map((label) => (
              <li key={label}>
                <FooterItem label={label} />
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="درباره وریفام">
          <h2 className="text-sm font-semibold text-[#2a2426]">درباره وریفام</h2>
          <ul className="mt-3 space-y-2">
            {aboutLinks.map((label) => (
              <li key={label}>
                <FooterItem label={label} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

function FooterItem({ label }: { label: string }) {
  return (
    <button type="button" className="inline-flex items-center gap-2 text-sm text-[#4e4849] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24181c]">
      <span aria-hidden="true" className="size-1 rounded-full bg-current" />
      {label}
    </button>
  );
}
