import Image from "next/image";
import { GlowEllipse } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const promises = ["نوبت‌دهی خودکار", "مشتریان وفادار", "درآمد بیشتر"];

export function BusinessCta() {
  return (
    <section
      id="for-business"
      aria-labelledby="for-business-title"
      className="relative mx-auto mt-20 w-full max-w-page scroll-mt-8 px-6.75 lg:mt-32 lg:px-18"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-208.75 -left-159.5 -z-10 h-[1869px] w-[1962.5px] -scale-y-100 lg:-top-189.75 lg:-left-61.75"
      >
        <GlowEllipse className="size-full" />
      </div>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-start">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-accent lg:text-sm">
            <span aria-hidden="true" className="h-px w-6 bg-accent-soft" />
            وریفام برای کسب‌وکارها
          </p>
          <h2
            id="for-business-title"
            className="text-gradient-title text-balance text-3xl leading-tight font-bold lg:text-5xl"
          >
            کسب‌وکارت رو متحول کن!
          </h2>
          <p className="text-base leading-relaxed font-medium text-text-secondary lg:text-xl">
            با وریفام، نوبت‌دهی رو خودکار کن، مشتریان وفادار بساز و درآمدت رو
            افزایش بده.
          </p>
          <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {promises.map((promise) => (
              <li
                key={promise}
                className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm font-semibold text-ink"
              >
                {promise}
              </li>
            ))}
          </ul>
          <Button
            aria-disabled="true"
            title="این بخش به‌زودی اضافه می‌شود"
            className="h-12"
          >
            اطلاعات بیشتر
          </Button>
        </Reveal>
        {/* Decorative product shot; kept in reading direction so the UI inside it stays legible. */}
        <Reveal delay={120} className="max-lg:hidden">
          <div aria-hidden="true" className="relative overflow-hidden   p-2 ">
            <div className="relative aspect-4/3 overflow-hidden ">
              <Image
                src="/home/for-business.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-[68%_50%]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
