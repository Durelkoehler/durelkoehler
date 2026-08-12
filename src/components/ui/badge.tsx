import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "warning" | "error" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[rgba(255,255,255,0.12)] text-white/90 border border-[rgba(255,255,255,0.16)]",
  accent:
    "bg-[rgba(108,99,255,0.15)] text-[#8B84FF]",
  success:
    "bg-[rgba(34,197,94,0.12)] text-[#4ADE80]",
  warning:
    "bg-[rgba(245,158,11,0.12)] text-[#FBB439]",
  error:
    "bg-[rgba(239,68,68,0.12)] text-[#F87171]",
  outline:
    "bg-transparent border border-[rgba(255,255,255,0.12)] text-[#A1A1AA]",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-[#A1A1AA]",
  accent:  "bg-[#6C63FF]",
  success: "bg-[#22C55E]",
  warning: "bg-[#F59E0B]",
  error:   "bg-[#EF4444]",
  outline: "bg-[#A1A1AA]",
};

export default function Badge({
  variant = "default",
  children,
  className,
  dot = false,
}: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-5 px-2 rounded-[6px]",
        "text-[11px] font-semibold uppercase tracking-[0.05em]",
        "whitespace-nowrap select-none",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
