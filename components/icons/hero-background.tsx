import { useId, type SVGProps } from "react";

export function HeroBackground(props: SVGProps<SVGSVGElement>) {
  const gradientId = useId();
  return (
    <svg width={1440} height={1243} viewBox="0 0 1440 1243" fill="none" aria-hidden="true" {...props}>
      <path d="M0 0H1440V1243H0V0Z" fill={`url(#${gradientId})`} />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1631.63" y2="350.232" gradientUnits="userSpaceOnUse">
          <stop offset="0.0267961" stopColor="#D4A8B0" stopOpacity="0.75" />
          <stop offset="0.30501" stopColor="#F8E9E9" />
          <stop offset="0.575453" stopColor="#FFF8F2" stopOpacity="0.7" />
          <stop offset="1" stopColor="#B8B8C8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
