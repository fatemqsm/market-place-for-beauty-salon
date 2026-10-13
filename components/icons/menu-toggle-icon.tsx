import type { SVGProps } from "react";

type MenuToggleVariant = "header" | "compact" | "mobile";

type MenuToggleIconProps = SVGProps<SVGSVGElement> & {
  variant?: MenuToggleVariant;
  open?: boolean;
};

type Frame = {
  width: number;
  height: number;
  radius: number;
  outlined?: boolean;
  chevronTransform: string;
  glyphTransform: string;
};

// Glyph paths in the coordinates of the closed header toggle.
const chevronUp =
  "M15.3848 27.0843C15.6315 27.3505 15.9659 27.5 16.3145 27.5C16.6632 27.5 16.9976 27.3505 17.2443 27.0843L22.0158 21.9292L26.7874 27.0843C27.0368 27.3354 27.3667 27.4721 27.7075 27.4656C28.0484 27.4591 28.3736 27.3099 28.6146 27.0495C28.8557 26.789 28.9938 26.4377 28.9998 26.0694C29.0058 25.7012 28.8793 25.3448 28.6469 25.0753L22.9456 18.9157C22.6989 18.6495 22.3645 18.5 22.0158 18.5C21.6672 18.5 21.3328 18.6495 21.0861 18.9157L15.3848 25.0753C15.1384 25.3418 15 25.7031 15 26.0798C15 26.4565 15.1384 26.8178 15.3848 27.0843Z";
const menuLines =
  "M40.5 20.4C40.5 20.0552 40.6317 19.7246 40.8661 19.4808C41.1005 19.237 41.4185 19.1 41.75 19.1H54.635C54.9665 19.1 55.2845 19.237 55.5189 19.4808C55.7533 19.7246 55.885 20.0552 55.885 20.4C55.885 20.7448 55.7533 21.0754 55.5189 21.3192C55.2845 21.563 54.9665 21.7 54.635 21.7H41.75C41.4185 21.7 41.1005 21.563 40.8661 21.3192C40.6317 21.0754 40.5 20.7448 40.5 20.4ZM40.5 15.2C40.5 14.8552 40.6317 14.5246 40.8661 14.2808C41.1005 14.037 41.4185 13.9 41.75 13.9H59.25C59.5815 13.9 59.8995 14.037 60.1339 14.2808C60.3683 14.5246 60.5 14.8552 60.5 15.2C60.5 15.5448 60.3683 15.8754 60.1339 16.1192C59.8995 16.363 59.5815 16.5 59.25 16.5H41.75C41.4185 16.5 41.1005 16.363 40.8661 16.1192C40.6317 15.8754 40.5 15.5448 40.5 15.2ZM40.5 25.6C40.5 25.2552 40.6317 24.9246 40.8661 24.6808C41.1005 24.437 41.4185 24.3 41.75 24.3H59.25C59.5815 24.3 59.8995 24.437 60.1339 24.6808C60.3683 24.9246 60.5 25.2552 60.5 25.6C60.5 25.9448 60.3683 26.2754 60.1339 26.5192C59.8995 26.763 59.5815 26.9 59.25 26.9H41.75C41.4185 26.9 41.1005 26.763 40.8661 26.5192C40.6317 26.2754 40.5 25.9448 40.5 25.6ZM40.5 30.8C40.5 30.4552 40.6317 30.1246 40.8661 29.8808C41.1005 29.637 41.4185 29.5 41.75 29.5H54.635C54.9665 29.5 55.2845 29.637 55.5189 29.8808C55.7533 30.1246 55.885 30.4552 55.885 30.8C55.885 31.1448 55.7533 31.4754 55.5189 31.7192C55.2845 31.963 54.9665 32.1 54.635 32.1H41.75C41.4185 32.1 41.1005 31.963 40.8661 31.7192C40.6317 31.4754 40.5 31.1448 40.5 30.8Z";
const cross = "M41.75 18.75L54.25 31.25M41.75 31.25L54.25 18.75";

// Frame sizes and glyph offsets from the five Figma toggle exports. The desktop open state is shared by both desktop variants.
const desktopOpen: Frame = { width: 78, height: 50, radius: 24, chevronTransform: "translate(0 48) scale(1 -1)", glyphTransform: "" };

const frames: Record<MenuToggleVariant, { closed: Frame; open: Frame }> = {
  header: {
    closed: { width: 78, height: 46, radius: 23, chevronTransform: "", glyphTransform: "" },
    open: desktopOpen,
  },
  compact: {
    closed: { width: 80, height: 48, radius: 23.5, outlined: true, chevronTransform: "translate(1 1)", glyphTransform: "translate(1 1)" },
    open: desktopOpen,
  },
  mobile: {
    closed: { width: 85, height: 50, radius: 24, chevronTransform: "translate(1 2)", glyphTransform: "translate(6 2)" },
    open: { width: 85, height: 54, radius: 24, chevronTransform: "translate(1 4)", glyphTransform: "translate(6 2)" },
  },
};

export function MenuToggleIcon({ variant = "header", open = false, ...props }: MenuToggleIconProps) {
  const frame = frames[variant][open ? "open" : "closed"];
  const inset = frame.outlined ? 0.5 : 0;
  return (
    <svg
      width={frame.width}
      height={frame.height}
      viewBox={`0 0 ${frame.width} ${frame.height}`}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <rect
        x={inset}
        y={inset}
        width={frame.width - inset * 2}
        height={frame.height - inset * 2}
        rx={frame.radius}
        fill="white"
        fillOpacity={0.5}
        stroke={frame.outlined ? "currentColor" : undefined}
      />
      <path d={chevronUp} transform={frame.chevronTransform || undefined} />
      {open ? (
        <path
          d={cross}
          transform={frame.glyphTransform || undefined}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path d={menuLines} transform={frame.glyphTransform || undefined} fillRule="evenodd" clipRule="evenodd" />
      )}
    </svg>
  );
}
