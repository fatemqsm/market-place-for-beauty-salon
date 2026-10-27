import type { Metadata } from "next";
import { Suspense } from "react";
import { SalonPage } from "@/features/salon-page/salon-page";
import { getSalonProfile } from "@/features/salons/salon-profile";

export const metadata: Metadata = {
  title: "سالن | VeriFAM",
};

export default function Salon(props: PageProps<"/salons/[salonId]">) {
  return (
    <Suspense
      fallback={
        <p
          role="status"
          className="grid min-h-dvh place-items-center bg-background p-8 text-center text-base font-semibold text-text-secondary"
        >
          در حال بارگذاری سالن…
        </p>
      }
    >
      <SalonFromParams params={props.params} />
    </Suspense>
  );
}

// Without generateStaticParams the id is request data, so it is read inside the Suspense boundary.
async function SalonFromParams({ params }: Pick<PageProps<"/salons/[salonId]">, "params">) {
  const { salonId } = await params;
  return <SalonPage salon={getSalonProfile(salonId)} />;
}
