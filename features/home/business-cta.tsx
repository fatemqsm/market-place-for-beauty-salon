import Image from "next/image";
import { GlowEllipse } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function BusinessCta() {
  return (
    <section
      id="for-business"
      aria-labelledby="for-business-title"
      className="relative mx-auto mt-12 flex w-full max-w-page scroll-mt-8 flex-col gap-10 max-lg:h-98.5 max-lg:justify-center lg:mt-24 xl:mt-43 xl:block xl:h-159.25"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-208.75 -left-159.5 -z-10 h-[1869px] w-[1962.5px] -scale-y-100 lg:-top-189.75 lg:-left-61.75"
      >
        <GlowEllipse className="size-full" />
      </div>
      <div className="flex flex-col items-center gap-9 px-6.75 text-center lg:items-start lg:px-4 lg:text-start xl:absolute xl:top-0 xl:right-25.75 xl:z-10 xl:h-98.5 xl:w-124.25 xl:justify-center xl:px-0">
        <h2
          id="for-business-title"
          className="text-gradient-title flex h-14.5 w-83.25 max-w-full items-center text-3xl leading-normal font-medium lg:block lg:h-auto lg:w-full lg:text-4xl lg:leading-14.5 lg:font-bold"
        >
          کسب‌وکارت رو متحول کن!
        </h2>
        <p className="flex h-22.5 items-center text-base leading-normal font-semibold text-ink lg:block lg:h-auto lg:text-xl lg:leading-[49.3px]">
          <span>
            با وریفام، نوبت‌دهی رو خودکار کن،
            <br />
            مشتریان وفادار بساز
            <br />
            و درآمدت رو افزایش بده.
          </span>
        </p>
        <Button aria-disabled="true" title="این بخش به‌زودی اضافه می‌شود" className="h-11.5">
          اطلاعات بیشتر
        </Button>
      </div>
      <div
        aria-hidden="true"
        className="relative aspect-1596/595 w-full overflow-hidden -scale-x-100 max-lg:hidden xl:absolute xl:top-10.5 xl:-left-47 xl:h-148.75 xl:w-[1596px]"
      >
        <Image
          src="/home/for-business.png"
          alt=""
          width={3855}
          height={1437}
          sizes="(min-width: 1280px) 1596px, 100vw"
          className="absolute top-0 left-[-4.29%] h-full w-[100.01%] max-w-none"
        />
      </div>
    </section>
  );
}
