import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFlow } from "@/features/booking/booking-flow";
import { getSalonProfile } from "@/features/salons/salon-profile";

export const metadata: Metadata = {
  title: "رزرو نوبت | VeriFAM",
};

export default function Book(props: PageProps<"/salons/[salonId]/book">) {
  return (
    <Suspense
      fallback={
        <p
          role="status"
          className="grid min-h-dvh place-items-center bg-background p-8 text-center text-base font-semibold text-text-secondary"
        >
          در حال آماده‌سازی رزرو…
        </p>
      }
    >
      <BookingFromParams params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}

// The id and the preselected service are request data, so they are read inside the Suspense boundary.
async function BookingFromParams({ params, searchParams }: Pick<PageProps<"/salons/[salonId]/book">, "params" | "searchParams">) {
  const [{ salonId }, query] = await Promise.all([params, searchParams]);
  const service = typeof query.service === "string" ? query.service : null;
  return <BookingFlow salon={getSalonProfile(salonId)} initialServiceId={service} />;
}
