import Image from "next/image";
import { BusinessCta } from "./business-cta";
import { HeroSection } from "./hero-section";
import { SalonCarousel } from "./salon-carousel";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { createSalonItems } from "./salons";
import { HeroSearch } from "./search/hero-search";
import { SearchProvider } from "./search/search-context";
import { StickySearchHeader } from "./search/sticky-search-header";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomePage() {
  return (
    <SearchProvider>
      <StickySearchHeader />
      <div className="relative isolate overflow-clip">
        <div aria-hidden="true" className="pointer-events-none absolute -top-2.75 -right-12.25 -left-15.25 -z-10 h-215.5 lg:hidden">
          <Image src="/home/mobile-hero-bg.svg" alt="" fill preload sizes="100vw" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-310.75 max-lg:hidden">
          <Image src="/home/hero-bg.svg" alt="" fill preload sizes="100vw" className="object-cover object-top" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-143.25 -z-10 aspect-[1442/842.7] @container max-lg:hidden"
        >
          <div className="absolute top-1/2 left-1/2 h-[100cqw] w-[58.23cqw] -translate-x-1/2 -translate-y-1/2 rotate-[-90.16deg]">
            <Image src="/home/mid-bg.svg" alt="" fill sizes="100vw" />
          </div>
        </div>

        <div className="px-6.75 pt-8 lg:px-18 lg:pt-16">
          <SiteHeader />
        </div>

        <main className="pb-4.75 lg:pb-16 xl:pb-0">
          <div className="px-6.75 lg:px-18">
            <HeroSection />
            <HeroSearch />
          </div>
          <div className="mt-20 flex flex-col gap-12 px-6.75 lg:mt-40.75 lg:gap-15 lg:ps-22 lg:pe-18">
            <SalonCarousel title="پیشنهادهای ویژه وریفام" items={createSalonItems("featured", 8, 2)} gradientTitle />
            <SalonCarousel title="تازه‌های وریفام" items={createSalonItems("new", 8)} className="max-lg:order-1" />
            <SalonCarousel title="محبوب‌ترین‌ها از نگاه کاربران" items={createSalonItems("popular", 8)} />
          </div>
          <BusinessCta />
        </main>
      </div>
      <SiteFooter />
      <MobileBottomNav />
    </SearchProvider>
  );
}
