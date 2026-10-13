import type { SVGProps } from "react";

/** Points right; mirror it with `-scale-x-100` to point left. */
export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M2 12H22M13 21L22 12L13 3" />
    </svg>
  );
}
