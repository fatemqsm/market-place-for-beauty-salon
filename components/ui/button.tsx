import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "glass";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
  // The solid color is the gradient's darkest stop, shown until the image loads.
  primary:
    "rounded-lg bg-[#1d1518] bg-(image:--gradient-button) bg-size-[100%_100%] bg-center bg-no-repeat text-white hover:not-unavailable:brightness-118",
  secondary: "rounded-lg bg-background text-ink hover:not-unavailable:bg-hover",
  // Figma rounds only the top-right corner of this button, regardless of direction.
  glass: "rounded-tr-3xl bg-white/50 text-ink shadow-glass hover:not-unavailable:bg-white/80",
};

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "focus-ring-2 inline-flex cursor-pointer items-center justify-center gap-2 px-8 text-lg/none font-semibold whitespace-nowrap transition-[filter,background-color]",
    "unavailable:cursor-not-allowed",
    variantClassNames[variant],
    className,
  );
}

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClassName(variant, className)} {...props} />;
}
