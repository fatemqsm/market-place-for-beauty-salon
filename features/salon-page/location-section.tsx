"use client";

import { useState } from "react";
import { LocationIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Button, buttonClassName } from "@/components/ui/button";
import type { SalonProfile } from "@/features/salons/salon.types";
import { ProfileSection } from "./profile-section";

type LocationSectionProps = {
  salon: Pick<SalonProfile, "name" | "address" | "phone" | "coordinates">;
};

const actionPlacement = "h-11.5 flex-1 px-4 text-base sm:flex-none";
const actionClassName = buttonClassName("secondary", actionPlacement);

export function LocationSection({ salon }: LocationSectionProps) {
  const [copied, setCopied] = useState("");
  const { latitude, longitude } = salon.coordinates;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(salon.address);
      setCopied("آدرس کپی شد.");
    } catch {
      setCopied("کپی آدرس ممکن نشد.");
    }
  }

  return (
    <ProfileSection id="location" title="آدرس و راه‌های ارتباطی">
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="relative grid h-44 place-items-center bg-primary lg:h-60">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-surface via-primary to-accent-soft/30"
          />
          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-accent text-on-accent shadow-button">
              <LocationIcon width={24} height={24} />
            </span>
            <p className="text-sm font-semibold text-ink">نقشه هنوز در دسترس نیست.</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 lg:p-5">
          <address className="flex items-start gap-2 text-base/relaxed text-ink not-italic">
            <PinIcon className="mt-1.5 shrink-0 text-accent" />
            {salon.address}
          </address>
          <div className="flex flex-wrap gap-2">
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={actionClassName}>
              مسیریابی
            </a>
            <Button variant="secondary" onClick={copyAddress} className={actionPlacement}>
              کپی آدرس
            </Button>
            <a href={`tel:${salon.phone}`} className={actionClassName}>
              <PhoneIcon width={17} height={18} />
              <span className="sr-only">تماس:</span>
              <span dir="ltr">{salon.phone}</span>
            </a>
          </div>
          <p role="status" className="text-sm font-semibold text-success empty:hidden">
            {copied}
          </p>
        </div>
      </div>
    </ProfileSection>
  );
}
