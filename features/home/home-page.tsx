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
        <div aria-hidden="true" className="pointer-events-none absolute top-[-11px] right-[-49px] left-[-61px] -z-10 h-[862px] lg:hidden">
          <Image src="/home/mobile-hero-bg.svg" alt="" fill preload sizes="100vw" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1243px] max-lg:hidden">
          <Image src="/home/hero-bg.svg" alt="" fill preload sizes="100vw" className="object-cover object-top" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[573px] -z-10 aspect-[1442/842.7] [container-type:inline-size] max-lg:hidden"
        >
          <div className="absolute top-1/2 left-1/2 h-[100cqw] w-[58.23cqw] -translate-x-1/2 -translate-y-1/2 -rotate-[90.16deg]">
            <Image src="/home/mid-bg.svg" alt="" fill sizes="100vw" />
          </div>
        </div>

        <div className="px-[27px] pt-8 lg:px-[72px] lg:pt-16">
          <SiteHeader />
        </div>

        <main className="pb-[19px] lg:pb-16 xl:pb-0">
          <div className="px-[27px] lg:px-[72px]">
            <HeroSection />
            <HeroSearch />
          </div>
          <div className="mt-20 flex flex-col gap-12 px-[27px] lg:mt-[163px] lg:gap-[60px] lg:ps-[88px] lg:pe-[72px]">
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
