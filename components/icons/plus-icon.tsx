import type { SVGProps } from "react";

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={25} height={26} viewBox="0 0 25 26" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.75 5.2C13.75 4.48094 13.1914 3.9 12.5 3.9C11.8086 3.9 11.25 4.48094 11.25 5.2V11.7H5C4.30859 11.7 3.75 12.2809 3.75 13C3.75 13.7191 4.30859 14.3 5 14.3H11.25V20.8C11.25 21.5191 11.8086 22.1 12.5 22.1C13.1914 22.1 13.75 21.5191 13.75 20.8V14.3H20C20.6914 14.3 21.25 13.7191 21.25 13C21.25 12.2809 20.6914 11.7 20 11.7H13.75V5.2Z" />
    </svg>
  );
}
