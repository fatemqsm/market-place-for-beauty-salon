import type { SVGProps } from "react";

export function CameraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 7.5H7.5L9.5 4.5H14.5L16.5 7.5H20C20.55 7.5 21 7.95 21 8.5V18.5C21 19.05 20.55 19.5 20 19.5H4C3.45 19.5 3 19.05 3 18.5V8.5C3 7.95 3.45 7.5 4 7.5Z" />
      <circle cx="12" cy="13.25" r="3.5" />
    </svg>
  );
}
