import type { SVGProps } from "react";

export function ShareIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 3V15M7.5 7.5L12 3L16.5 7.5M5 12V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V12" />
    </svg>
  );
}
