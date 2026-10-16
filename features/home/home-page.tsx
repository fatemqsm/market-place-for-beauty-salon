import {
  HeroBackground,
  MidBackground,
  MobileHeroBackground,
} from "@/components/icons";
import { MobileBottomNav } from "@/features/layout/mobile-bottom-nav";
import { createSalonItems } from "@/features/salons/salons";
import { SearchProvider } from "@/features/search/search-context";
import { BusinessCta } from "./business-cta";
import { HeroSearch } from "./hero-search";
import { HeroSection } from "./hero-section";
import { SalonCarousel } from "./salon-carousel";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { StickySearchHeader } from "./sticky-search-header";

export function HomePage() {
  return (
    <SearchProvider>
      <StickySearchHeader />
      <div className="relative isolate overflow-clip">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-2.75 -right-12.25 -left-15.25 -z-10 h-215.5 lg:hidden"
        >
          <MobileHeroBackground
            preserveAspectRatio="none"
            className="size-full"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-310.75 max-lg:hidden"
        >
          <HeroBackground
            preserveAspectRatio="xMidYMin slice"
            className="size-full"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-143.25 -z-10 aspect-[1442/842.7] @container max-lg:hidden"
        >
          <div className="absolute top-1/2 left-1/2 h-[100cqw] w-[58.23cqw] -translate-x-1/2 -translate-y-1/2 rotate-[-90.16deg]">
            <MidBackground preserveAspectRatio="none" className="size-full" />
          </div>
        </div>

        <div className="px-6.75 pt-8 lg:px-18 lg:pt-16">
          <SiteHeader />
        </div>

        <main className="pb-4.75 lg:pb-16 xl:pb-0">
          <div className="px-6.75 lg:px-24">
            <HeroSection />
            <HeroSearch />
          </div>
          <div className="mt-20 flex flex-col gap-14 px-6.75 lg:mt-36 lg:gap-20 lg:px-18">
            <SalonCarousel
              eyebrow="انتخاب سردبیر"
              title="پیشنهادهای ویژه وریفام"
              items={createSalonItems("featured", 8, 2)}
              gradientTitle
            />
            <SalonCarousel
              eyebrow="به‌تازگی پیوسته‌اند"
              title="تازه‌های وریفام"
              items={createSalonItems("new", 8)}
              className="max-lg:order-1"
            />
            <SalonCarousel
              eyebrow="بیشترین امتیاز"
              title="محبوب‌ترین‌ها از نگاه کاربران"
              items={createSalonItems("popular", 8)}
            />
          </div>
          <BusinessCta />
        </main>
      </div>
      <SiteFooter />
      <MobileBottomNav active="home" />
    </SearchProvider>
  );
}
