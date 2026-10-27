"use client";

import { useState } from "react";
import { SalonPhoto } from "@/features/salons/salon-photo";
import type { SalonImage } from "@/features/salons/salon.types";
import { PhotoViewer, type PhotoViewerState } from "./photo-viewer";
import { ProfileSection } from "./profile-section";

export function PortfolioSection({ portfolio }: { portfolio: SalonImage[] }) {
  const [viewer, setViewer] = useState<PhotoViewerState>(null);

  return (
    <ProfileSection id="portfolio" title="نمونه‌کارها">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3">
        {portfolio.map((work, index) => (
          <li key={work.id}>
            <button
              type="button"
              aria-label={`${work.alt}، بزرگ‌نمایی`}
              onClick={() => setViewer({ images: portfolio, index })}
              className="group focus-ring-2 relative block w-full cursor-pointer overflow-hidden rounded-xl"
            >
              <SalonPhoto plate={work.plate} src={work.src} className="aspect-square w-full" />
              {work.caption && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/70 to-transparent px-3 pt-6 pb-2 text-start text-xs font-semibold text-on-accent"
                >
                  {work.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <PhotoViewer title="نمونه‌کارها" state={viewer} onClose={() => setViewer(null)} />
    </ProfileSection>
  );
}
