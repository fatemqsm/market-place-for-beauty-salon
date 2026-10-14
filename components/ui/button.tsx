import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "glass" | "pill";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
  // The solid color is the gradient's darkest stop, shown until the image loads.
  primary:
    "rounded-lg bg-brand bg-(image:--gradient-button) bg-size-[100%_100%] bg-center bg-no-repeat text-on-accent shadow-button hover:not-unavailable:brightness-110 motion-safe:hover:not-unavailable:-translate-y-px",
  secondary:
    "rounded-lg border border-border bg-background text-ink hover:not-unavailable:border-accent-soft hover:not-unavailable:bg-hover",
  // Figma rounds only the top-right corner of this button, regardless of direction.
  glass: "rounded-tr-3xl bg-background/60 text-ink shadow-glass hover:not-unavailable:bg-background/85",
  pill: "rounded-4xl border border-border bg-background text-ink shadow-box hover:not-unavailable:border-accent-soft hover:not-unavailable:bg-hover",
};

/*
 * Primary hover fill: an accent circle on `::before` grows from the center until it covers the button.
 * `circle(75%)` reaches the corners, since a centered circle needs about 71% of clip-path's
 * diagonal reference. `isolate` makes the button its own stacking context, so the `-z-10` layer
 * paints above the button's background and below its text and icons. `overflow-hidden` clips it
 * to the corner radius but not the focus outline or shadows.
 */
const fillClassName = cn(
  "relative isolate overflow-hidden",
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-accent before:opacity-0 before:transition-[opacity,clip-path] before:duration-(--duration-slow) before:ease-standard motion-safe:before:[clip-path:circle(0%)]",
  "hover:not-unavailable:before:opacity-100 motion-safe:hover:not-unavailable:before:[clip-path:circle(75%)]",
);

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "focus-ring-2 inline-flex cursor-pointer items-center justify-center gap-2 px-8 text-lg/none font-semibold whitespace-nowrap transition-[filter,background-color,border-color,box-shadow,color,translate,scale] duration-fast ease-standard motion-safe:active:not-unavailable:scale-[0.98]",
    "unavailable:cursor-not-allowed unavailable:opacity-60 unavailable:shadow-none",
    variant === "primary" && fillClassName,
    variantClassNames[variant],
    className,
  );
}

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClassName(variant, className)} {...props} />;
}
