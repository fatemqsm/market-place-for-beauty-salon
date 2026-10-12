import { BusinessCta } from "./business-cta";
import { HeroSection } from "./hero-section";
import { SalonCarousel } from "./salon-carousel";
import { SalonSearch } from "./salon-search";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { createSalonItems } from "./salons";

export function HomePage() {
  return (
    <>
      <div className="home-surface">
        <SiteHeader />
        <HeroSection />
        <div className="pb-24">
          <SalonSearch />
        </div>
      </div>
      <div className="space-y-14 bg-white py-4">
        <SalonCarousel title="پیشنهادهای ویژه وریفام" items={createSalonItems("featured", 6, 2)} />
        <SalonCarousel title="تازه‌های وریفام" items={createSalonItems("new", 6)} />
        <SalonCarousel title="محبوب‌ترین‌ها از نگاه کاربران" items={createSalonItems("popular", 6)} />
      </div>
      <BusinessCta />
      <SiteFooter />
    </>
  );
}
