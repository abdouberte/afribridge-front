"use client";

import { InputHTMLAttributes, ReactNode, useId } from "react";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "prefix"
> {
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  success?: string;
  leftIcon?: ReactNode;
  suffix?: string;
}

export default function Input({
  label,
  required,
  hint,
  error,
  success,
  leftIcon,
  suffix,
  className = "",
  ...props
}: InputProps) {
  const id = useId();

  const borderClass = error
    ? "border-afri-error focus:border-afri-error focus:ring-4 focus:ring-afri-error-light"
    : success
      ? "border-afri-green focus:border-afri-green focus:ring-4 focus:ring-afri-green-light"
      : "border-afri-border focus:border-afri-terra focus:ring-4 focus:ring-afri-terra-light";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-extrabold text-afri-text-2 uppercase tracking-wide"
        >
          {label}
          {required && <span className="text-afri-terra ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-afri-text-3 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={id}
          className={[
            "w-full h-[46px] bg-white text-afri-text",
            "border-2 rounded-[10px] outline-none",
            "font-semibold text-sm placeholder:text-afri-text-3",
            "transition-all duration-150",
            borderClass,
            leftIcon ? "pl-11" : "pl-3.5",
            suffix ? "pr-20" : "pr-3.5",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {suffix && (
          <span className="absolute right-0 top-0 h-full flex items-center px-3 text-xs font-extrabold text-afri-terra bg-afri-cream-2 border-l-2 border-afri-border rounded-r-[9px] pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {/* Messages — priorité : error > success > hint */}
      {error ? (
        <p className="text-[11px] font-semibold text-afri-error flex items-center gap-1">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      ) : success ? (
        <p className="text-[11px] font-semibold text-afri-green flex items-center gap-1">
          <span aria-hidden="true">✓</span>
          {success}
        </p>
      ) : hint ? (
        <p className="text-[11px] text-afri-text-3">{hint}</p>
      ) : null}
    </div>
  );
}
