export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto mt-8.5 flex w-full max-w-229 flex-col items-center gap-4.5 text-center lg:mt-40.75 lg:gap-2"
    >
      <h1
        id="hero-title"
        className="text-gradient-title lg:text-gradient-hero flex h-45.75 w-full flex-col justify-center text-3xl leading-normal font-medium lg:block lg:h-auto lg:text-5xl lg:leading-22.75 lg:font-bold"
      >
        <span>
          تجربه‌ای متفاوت از <br className="lg:hidden" />
          خدمات زیبایی در نزدیکی شما
        </span>
      </h1>
      <p className="flex h-22.5 max-w-74.5 items-center text-base leading-normal font-semibold text-ink lg:max-w-none lg:text-xl lg:leading-[49.3px]">
        بهترین سالن‌های زیبایی نزدیک خود را پیدا کنید و آنلاین وقت رزرو کنید.
      </p>
    </section>
  );
}
