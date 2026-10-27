import type { SVGProps } from "react";

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M20 12C20 16.4 16.4 20 12 20C10.7 20 9.4 19.7 8.3 19.1L4 20L4.9 15.7C4.3 14.6 4 13.3 4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12Z" />
      <path d="M8.5 12H8.51M12 12H12.01M15.5 12H15.51" strokeWidth={2.4} />
    </svg>
  );
}
