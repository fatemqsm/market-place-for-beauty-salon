import { useId, type SVGProps } from "react";

export function MobileHeroBackground(props: SVGProps<SVGSVGElement>) {
  const gradientId = useId();
  return (
    <svg width={512} height={862} viewBox="0 0 512 862" fill="none" aria-hidden="true" {...props}>
      <path d="M0 0H512V862H0V0Z" fill={`url(#${gradientId})`} />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="599.604" y2="65.9886" gradientUnits="userSpaceOnUse">
          <stop offset="0.0267961" stopColor="#C4A494" stopOpacity="0.45" />
          <stop offset="0.30501" stopColor="#F3E6DC" />
          <stop offset="0.575453" stopColor="#FBF7F2" stopOpacity="0.8" />
          <stop offset="1" stopColor="#E7D9CC" />
        </linearGradient>
      </defs>
    </svg>
  );
}
