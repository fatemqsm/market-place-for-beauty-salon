import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SalonPlate } from "./salons";

const plateClassNames: Record<SalonPlate, string> = {
  rose: "from-accent-soft/70 via-surface to-accent/25",
  sand: "from-surface via-primary to-surface-strong",
  plum: "from-accent/35 via-accent-soft/40 to-surface",
  ivory: "from-background via-surface to-primary",
};

export function PhotoWash({ plate }: { plate: SalonPlate }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-linear-to-br transition-[scale] duration-slow ease-standard motion-safe:group-hover:scale-105",
        plateClassNames[plate],
      )}
    >
      {/* A soft arc gives each empty plate a focal point, the way a photo would. */}
      <div className="absolute -end-10 -bottom-16 size-40 rounded-full bg-background/35" />
    </div>
  );
}

type SalonPhotoProps = {
  plate: SalonPlate;
  /** An object URL of an uploaded photo. Without it, the tonal plate stands in for the photo. */
  src?: string;
  /** Leave empty when a surrounding control already names the photo. */
  alt?: string;
  sizes?: string;
  className?: string;
  children?: ReactNode;
};

export function SalonPhoto({ plate, src, alt = "", sizes = "100vw", className, children }: SalonPhotoProps) {
  return (
    <div className={cn("relative overflow-hidden bg-primary", className)}>
      <PhotoWash plate={plate} />
      {src ? (
        // Object URLs exist only in this browser, so the image optimizer cannot fetch them.
        <Image src={src} alt={alt} fill unoptimized sizes={sizes} className="object-cover" />
      ) : (
        alt && <span role="img" aria-label={alt} className="absolute inset-0" />
      )}
      {children}
    </div>
  );
}
