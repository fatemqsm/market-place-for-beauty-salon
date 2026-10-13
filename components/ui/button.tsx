import type { ComponentProps } from "react";

export type ButtonVariant = "primary" | "secondary" | "glass";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

export function buttonClassName(variant: ButtonVariant = "primary", className = "") {
  return `button button-${variant} ${className}`;
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClassName(variant, className)} {...props} />;
}
