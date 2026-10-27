import { HeroTypewriter } from "./hero-typewriter";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto mt-10 flex w-full max-w-229 flex-col items-center gap-5 text-center lg:mt-36 lg:gap-6"
    >
      <p className="flex items-center gap-3 text-sm font-semibold tracking-wide text-accent motion-safe:animate-fade-up lg:text-base">
        <span aria-hidden="true" className="h-px w-8 bg-accent-soft" />
        رزرو آنلاین سالن‌های زیبایی
        <span aria-hidden="true" className="h-px w-8 bg-accent-soft" />
      </p>
      <h1
        id="hero-title"
        className="text-gradient-title lg:text-gradient-hero text-balance text-3xl leading-snug font-bold motion-safe:animate-fade-up motion-safe:[animation-delay:90ms] lg:text-6xl lg:leading-tight"
      >
        تجربه‌ای متفاوت از <br className="lg:hidden" />
        خدمات زیبایی در نزدیکی شما
      </h1>
      <HeroTypewriter />
    </section>
  );
}
