"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "destructive" | "white";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
  > {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#6C63FF] text-white hover:bg-[#8B84FF] shadow-[0_0_12px_rgba(108,99,255,0.18)] hover:shadow-[0_0_20px_rgba(108,99,255,0.30)]",
  secondary:
    "bg-transparent text-white border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.24)] hover:bg-[rgba(255,255,255,0.04)]",
  tertiary:
    "bg-transparent text-[#A1A1AA] hover:text-white",
  destructive:
    "bg-[#EF4444] text-white hover:bg-[#F87171] shadow-[0_0_12px_rgba(239,68,68,0.18)]",
  white:
    "bg-white text-[#0C0C0C] hover:bg-[rgba(255,255,255,0.90)] shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "h-7 px-[10px] text-[11px] gap-1.5 rounded-[6px]",
  sm: "h-8 px-[14px] text-[12px] gap-2 rounded-[8px]",
  md: "h-10 px-5 text-[14px] gap-2 rounded-[10px]",
  lg: "h-12 px-7 text-[15px] gap-2.5 rounded-[12px]",
  xl: "h-14 px-9 text-[16px] gap-3 rounded-full",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  trailingIcon,
  children,
  className,
  disabled,
  asChild = false,
  ...props
}: ButtonProps): React.JSX.Element {
  const isDisabled = disabled || loading;
  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  const content = loading ? (
    <>
      <svg
        className="animate-spin"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
      <span className="sr-only">Loading</span>
    </>
  ) : (
    <>
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      {children}
      {trailingIcon && (
        <span className="shrink-0 flex items-center">{trailingIcon}</span>
      )}
    </>
  );

  const sharedClassName = cn(
    "inline-flex items-center justify-center font-semibold tracking-[0.025em] select-none",
    "transition-colors duration-[150ms]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]",
    variantStyles[variant],
    sizeStyles[size],
    isDisabled && "opacity-35 cursor-not-allowed pointer-events-none",
    className
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>;
    const childContent = child.props.children;

    return React.cloneElement(child, {
      className: cn(sharedClassName, child.props.className),
      ...(isDisabled ? { "aria-disabled": true } : {}),
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event);
      },
      children: childContent,
    } as React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode });
  }

  return (
    <button
      className={sharedClassName}
      disabled={isDisabled}
      type={buttonProps.type ?? "button"}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
