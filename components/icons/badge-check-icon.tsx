import type { SVGProps } from "react";

export function BadgeCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.75L14.5 4.6L17.6 4.4L18.5 7.4L21 9.2L20 12L21 14.8L18.5 16.6L17.6 19.6L14.5 19.4L12 21.25L9.5 19.4L6.4 19.6L5.5 16.6L3 14.8L4 12L3 9.2L5.5 7.4L6.4 4.4L9.5 4.6L12 2.75Z" />
      <path d="M8.75 12L11 14.25L15.5 9.75" />
    </svg>
  );
}
