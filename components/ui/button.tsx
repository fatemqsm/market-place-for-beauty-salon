import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass = variant === "primary" ? "button-primary" : "button-secondary";

  return (
    <button type={type} className={`button ${variantClass} ${className}`} {...props} />
  );
}
