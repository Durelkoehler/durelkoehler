"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function Tag({
  children,
  active = false,
  onClick,
  className,
  icon,
}: TagProps): React.JSX.Element {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      onClick={onClick}
      className={cn(
        // Base
        "inline-flex items-center gap-1.5 h-7 px-3 rounded-full",
        "text-[12px] font-medium select-none cursor-pointer",
        "border transition-all duration-[200ms]",
        // Default
        !active && [
          "bg-[#1E1E1E] border-[rgba(255,255,255,0.08)]",
          "text-[#A1A1AA] hover:border-[rgba(255,255,255,0.18)] hover:text-white",
        ],
        // Active
        active && [
          "bg-[rgba(108,99,255,0.15)] border-[rgba(108,99,255,0.40)]",
          "text-[#8B84FF]",
        ],
        className
      )}
      type="button"
      aria-pressed={active}
    >
      {icon && <span className="shrink-0 flex items-center" aria-hidden="true">{icon}</span>}
      {children}
    </motion.button>
  );
}
