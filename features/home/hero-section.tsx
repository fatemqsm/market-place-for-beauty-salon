export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto mt-[34px] flex w-full max-w-[916px] flex-col items-center gap-[18px] text-center lg:mt-[163px] lg:gap-2"
    >
      <h1
        id="hero-title"
        className="text-gradient-title lg:text-gradient-hero flex h-[183px] w-full flex-col justify-center text-[30px] leading-normal font-medium lg:block lg:h-auto lg:text-[48px] lg:leading-[91px] lg:font-bold"
      >
        <span>
          تجربه‌ای متفاوت از <br className="lg:hidden" />
          خدمات زیبایی در نزدیکی شما
        </span>
      </h1>
      <p className="flex h-[90px] max-w-[298px] items-center text-base leading-normal font-semibold text-ink lg:max-w-none lg:text-xl lg:leading-[49.3px]">
        بهترین سالن‌های زیبایی نزدیک خود را پیدا کنید و آنلاین وقت رزرو کنید.
      </p>
    </section>
  );
}
