import { Button } from "@/components/ui/button";
import { BookingPreview } from "./booking-preview";

export function BusinessCta() {
  return (
    <section className="mx-auto grid w-[min(1120px,calc(100%-2rem))] items-center gap-12 py-20 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-10">
      <div className="text-center">
        <h2 className="text-balance text-3xl leading-snug font-bold text-[#2a2426] sm:text-[2.4rem]">
          کسب‌وکارت رو متحول کن!
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#3f3938] sm:text-base">
          با وریفام، نوبت‌دهی رو خودکار کن،
          <br />
          مشتریان وفادار بساز
          <br />
          و درآمدت رو افزایش بده.
        </p>
        <Button className="mt-6 px-6">اطلاعات بیشتر</Button>
      </div>
      <BookingPreview />
    </section>
  );
}
