import { useId, type SVGProps } from "react";

export function MidBackground(props: SVGProps<SVGSVGElement>) {
  const gradientId = useId();
  return (
    <svg width={838.568} height={1440.01} viewBox="0 0 838.568 1440.01" fill="none" aria-hidden="true" {...props}>
      <path d="M0 0H838.568V1440.01H0V0Z" fill={`url(#${gradientId})`} />
      <defs>
        <linearGradient id={gradientId} x1="789.351" y1="991.862" x2="324.301" y2="1075.07" gradientUnits="userSpaceOnUse">
          <stop offset="0.1286" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}
