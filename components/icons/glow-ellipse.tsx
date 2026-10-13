import { useId, type SVGProps } from "react";

export function GlowEllipse(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  const smallBlurId = `${id}-small`;
  const largeBlurId = `${id}-large`;
  return (
    <svg width={1962.5} height={1869} viewBox="0 0 1962.5 1869" fill="none" overflow="visible" aria-hidden="true" {...props}>
      <g filter={`url(#${smallBlurId})`}>
        <circle cx="140" cy="140" r="140" transform="matrix(-1 0 0 1 1115 772.99)" fill="#C4A484" />
      </g>
      <g filter={`url(#${largeBlurId})`} fill="#E4D5C8">
        <path d="M500 1162C500 1276.32 592.677 1369 707 1369C821.323 1369 914 1276.32 914 1162C914 1047.68 821.323 955 707 955C592.677 955 500 1047.68 500 1162Z" />
        <path d="M1048.5 707C1048.5 821.323 1141.18 914 1255.5 914C1369.82 914 1462.5 821.323 1462.5 707C1462.5 592.677 1369.82 500 1255.5 500C1141.18 500 1048.5 592.677 1048.5 707Z" />
      </g>
      <defs>
        <filter id={smallBlurId} x="535" y="472.99" width="880" height="880" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" />
        </filter>
        <filter id={largeBlurId} x="0" y="0" width="1962.5" height="1869" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="250" />
        </filter>
      </defs>
    </svg>
  );
}
