import type { SVGProps } from "react";

type HeartIconProps = SVGProps<SVGSVGElement> & { filled?: boolean };

export function HeartIcon({ filled = false, ...props }: HeartIconProps) {
  return (
    <svg width={25} height={25} viewBox="0 0 25 25" aria-hidden="true" {...props}>
      <path
        d="M19.3334 13.913C15.0176 17.8696 12.5 19 12.5 19C12.5 19 9.98242 17.8696 5.66657 13.913C1.35073 9.95652 4.22796 6 7.8245 6C11.421 6 12.5 9.3913 12.5 9.3913C12.5 9.3913 13.579 6 17.1755 6C20.772 6 23.6493 9.95652 19.3334 13.913Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
