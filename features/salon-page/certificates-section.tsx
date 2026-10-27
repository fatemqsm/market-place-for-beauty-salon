"use client";

import { useState } from "react";
import { BadgeCheckIcon } from "@/components/icons";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { Certificate, SalonImage } from "@/features/salons/salon.types";
import { PhotoViewer, type PhotoViewerState } from "./photo-viewer";
import { ProfileSection } from "./profile-section";

export function CertificatesSection({ certificates }: { certificates: Certificate[] }) {
  const [viewer, setViewer] = useState<PhotoViewerState>(null);
  const images: SalonImage[] = certificates.map((certificate) => ({
    id: certificate.id,
    plate: certificate.plate,
    alt: `تصویر ${certificate.title}`,
    caption: `${certificate.title} · ${certificate.issuer}`,
  }));

  return (
    <ProfileSection id="certificates" title="مدارک و گواهی‌ها">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <li key={certificate.id}>
            <button
              type="button"
              aria-label={`${certificate.title}، ${certificate.issuer}، سال ${certificate.year}. مشاهده تصویر مدرک`}
              onClick={() => setViewer({ images, index })}
              className="group focus-ring-2 flex w-full cursor-pointer items-center gap-4 rounded-xl border border-border bg-background p-3 text-start transition-[border-color,box-shadow] duration-fast ease-standard hover:border-accent-soft hover:shadow-card lg:flex-col lg:items-stretch"
            >
              <SalonPhoto plate={certificate.plate} className="aspect-4/3 w-24 shrink-0 rounded-lg lg:w-full" />
              <span className="flex min-w-0 flex-col gap-1">
                <span className="flex items-start gap-1.5 text-sm/snug font-bold text-ink">
                  <BadgeCheckIcon width={18} height={18} className="mt-px shrink-0 text-accent" />
                  {certificate.title}
                </span>
                <span className="text-xs/normal text-text-secondary">{certificate.issuer}</span>
                <span className="text-xs text-text-muted">
                  سال <span dir="ltr">{certificate.year}</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <PhotoViewer title="مدارک و گواهی‌ها" state={viewer} onClose={() => setViewer(null)} />
    </ProfileSection>
  );
}
