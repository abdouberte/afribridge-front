"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "green"
  | "danger"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-afri-terra text-white border-2 border-afri-terra-dark " +
    "shadow-[3px_3px_0px_#A8481A] hover:bg-afri-terra-dark " +
    "active:shadow-[1px_1px_0px_#A8481A] active:translate-x-0.5 active:translate-y-0.5",
  secondary:
    "bg-white text-afri-terra border-2 border-afri-terra " +
    "shadow-[3px_3px_0px_#E8D0B0] hover:bg-afri-terra-light " +
    "active:shadow-[1px_1px_0px_#E8D0B0] active:translate-x-0.5 active:translate-y-0.5",
  green:
    "bg-afri-green text-white border-2 border-afri-green-dark " +
    "shadow-[3px_3px_0px_#155E3F] hover:bg-afri-green-dark " +
    "active:shadow-[1px_1px_0px_#155E3F] active:translate-x-0.5 active:translate-y-0.5",
  danger:
    "bg-afri-error-light text-afri-error border-2 border-afri-error " +
    "shadow-[3px_3px_0px_#E8D0B0] hover:bg-red-50 " +
    "active:shadow-[1px_1px_0px_#E8D0B0] active:translate-x-0.5 active:translate-y-0.5",
  ghost:
    "bg-white text-afri-text-3 border-2 border-afri-border " +
    "shadow-[3px_3px_0px_#E8D0B0] hover:bg-afri-cream " +
    "active:shadow-[1px_1px_0px_#E8D0B0] active:translate-x-0.5 active:translate-y-0.5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-[7px] text-xs rounded-lg",
  md: "px-[22px] py-[10px] text-sm rounded-[10px]",
  lg: "px-7 py-[13px] text-base rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center gap-2",
        "font-extrabold transition-all duration-150 select-none",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        isDisabled
          ? "opacity-40 cursor-not-allowed !shadow-none pointer-events-none"
          : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-blink [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-blink [animation-delay:200ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-blink [animation-delay:400ms]" />
          <span className="ml-1">Traitement…</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
