import React from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "glass" | "stat" | "feature";

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: React.ElementType;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-[#181818] border border-[rgba(255,255,255,0.08)] rounded-[16px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)]",
  glass:
    "bg-[rgba(24,24,24,0.65)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]",
  stat:
    "bg-[rgba(108,99,255,0.04)] border border-[rgba(108,99,255,0.15)] rounded-[16px] p-8 text-center",
  feature:
    "bg-[#181818] border border-[rgba(255,255,255,0.06)] rounded-[24px] p-10 overflow-hidden relative shadow-[0_4px_24px_rgba(0,0,0,0.55)]",
};

const hoverStyles: Record<CardVariant, string> = {
  default:
    "hover:border-[rgba(255,255,255,0.16)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)] hover:-translate-y-[2px] transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer",
  glass:
    "hover:border-[rgba(255,255,255,0.14)] hover:-translate-y-[2px] transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer",
  stat:
    "hover:border-[rgba(108,99,255,0.30)] hover:-translate-y-[2px] transition-all duration-[300ms] cursor-pointer",
  feature:
    "hover:border-[rgba(255,255,255,0.14)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.08)] hover:-translate-y-[4px] transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer",
};

export default function Card({
  variant = "default",
  children,
  className,
  hover = false,
  as: Tag = "div",
}: CardProps): React.JSX.Element {
  return (
    <Tag
      className={cn(
        variantStyles[variant],
        hover && hoverStyles[variant],
        className
      )}
    >
      {children}
    </Tag>
  );
}
