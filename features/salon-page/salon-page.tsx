import { SiteFooter } from "@/features/layout/site-footer";
import { SiteHeader } from "@/features/layout/site-header";
import type { SalonProfile } from "@/features/salons/salon.types";
import { AboutSection } from "./about-section";
import { BookingCard } from "./booking-card";
import { CertificatesSection } from "./certificates-section";
import { HoursSection } from "./hours-section";
import { LocationSection } from "./location-section";
import { MobileBookingBar } from "./mobile-booking-bar";
import { PortfolioSection } from "./portfolio-section";
import { ReviewsSection } from "./reviews-section";
import { SalonGallery } from "./salon-gallery";
import { SalonSummary } from "./salon-summary";
import { SalonTopBar } from "./salon-top-bar";
import { SectionNav, type SectionNavItem } from "./section-nav";
import { ServicesSection } from "./services-section";
import { TeamSection } from "./team-section";

export function SalonPage({ salon }: { salon: SalonProfile }) {
  const navItems: SectionNavItem[] = [
    { id: "services", label: "خدمات" },
    { id: "portfolio", label: "نمونه‌کارها" },
    { id: "reviews", label: "نظرات" },
    ...(salon.about ? [{ id: "about", label: "درباره ما" }] : []),
    { id: "hours", label: "ساعات کاری" },
    ...(salon.certificates.length ? [{ id: "certificates", label: "مدارک" }] : []),
    { id: "location", label: "آدرس" },
  ];

  return (
    <>
      <SalonTopBar salonName={salon.name} />
      <div className="mx-auto w-full max-w-page px-18 pt-8 max-lg:hidden">
        <SiteHeader />
      </div>

      <main className="mx-auto w-full max-w-page lg:px-18 lg:pt-10">
        <div className="flex flex-col gap-5 lg:gap-6">
          <SalonSummary salon={salon} className="px-6.75 lg:px-0" />
          <SalonGallery salonName={salon.name} photos={salon.photos} className="max-lg:order-first" />
        </div>

        <SectionNav items={navItems} className="mt-4 lg:mt-8" />

        {/* Columns stretch to the same height, so the booking card can stay sticky to the end. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12 xl:gap-16">
          <div className="flex min-w-0 flex-col gap-7 px-6.75 pt-6 lg:gap-10 lg:px-0 lg:pt-8">
            <ServicesSection salonId={salon.id} categories={salon.categories} services={salon.services} />
            <TeamSection team={salon.team} />
            <PortfolioSection portfolio={salon.portfolio} />
            <ReviewsSection salon={salon} />
            {salon.about && <AboutSection about={salon.about} />}
            <HoursSection hours={salon.hours} amenities={salon.amenities} />
            {salon.certificates.length > 0 && <CertificatesSection certificates={salon.certificates} />}
            <LocationSection salon={salon} />
          </div>
          <aside aria-label="رزرو" className="pt-8 max-lg:hidden">
            <BookingCard salon={salon} />
          </aside>
        </div>
      </main>

      <SiteFooter />
      <MobileBookingBar
        salonId={salon.id}
        serviceCount={salon.services.length}
        lowestPrice={Math.min(...salon.services.map((service) => service.price))}
      />
    </>
  );
}
