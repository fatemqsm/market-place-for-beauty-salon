import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountPage } from "@/features/account/account-page";

export const metadata: Metadata = {
  title: "حساب من | VeriFAM",
};

// The open booking or chat comes from the URL, so the client page is read inside the Suspense boundary.
export default function Account() {
  return (
    <Suspense
      fallback={
        <p
          role="status"
          className="grid min-h-dvh place-items-center bg-background p-8 text-center text-base font-semibold text-text-secondary"
        >
          در حال بارگذاری حساب…
        </p>
      }
    >
      <AccountPage />
    </Suspense>
  );
}
