import Image from "next/image";
import { Button } from "@/components/ui/button";

export function BusinessCta() {
  return (
    <section
      id="for-business"
      aria-labelledby="for-business-title"
      className="relative mx-auto mt-12 flex w-full max-w-[1440px] scroll-mt-8 flex-col gap-10 max-lg:h-[394px] max-lg:justify-center lg:mt-24 xl:mt-[172px] xl:block xl:h-[637px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-835px] left-[-638px] -z-10 h-[1869px] w-[1962.5px] -scale-y-100 lg:top-[-759px] lg:left-[-247px]"
      >
        <Image src="/home/glow-ellipse.svg" alt="" fill sizes="1963px" />
      </div>
      <div className="flex flex-col items-center gap-9 px-[27px] text-center lg:items-start lg:px-4 lg:text-start xl:absolute xl:top-0 xl:right-[103px] xl:z-10 xl:h-[394px] xl:w-[497px] xl:justify-center xl:px-0">
        <h2
          id="for-business-title"
          className="text-gradient-title flex h-[58px] w-[333px] max-w-full items-center text-[30px] leading-normal font-medium lg:block lg:h-auto lg:w-full lg:text-4xl lg:leading-[58px] lg:font-bold"
        >
          کسب‌وکارت رو متحول کن!
        </h2>
        <p className="flex h-[90px] items-center text-base leading-normal font-semibold text-ink lg:block lg:h-auto lg:text-xl lg:leading-[49.3px]">
          <span>
            با وریفام، نوبت‌دهی رو خودکار کن،
            <br />
            مشتریان وفادار بساز
            <br />
            و درآمدت رو افزایش بده.
          </span>
        </p>
        <Button aria-disabled="true" title="این بخش به‌زودی اضافه می‌شود" className="h-[46px]">
          اطلاعات بیشتر
        </Button>
      </div>
      <div
        aria-hidden="true"
        className="relative aspect-[1596/595] w-full overflow-hidden -scale-x-100 max-lg:hidden xl:absolute xl:top-[42px] xl:left-[-188px] xl:h-[595px] xl:w-[1596px]"
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
