"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          // Base
          "w-full h-11 px-4 rounded-[10px]",
          "bg-[#181818] text-white text-[14px] font-normal",
          "border transition-all duration-[150ms]",
          "placeholder:text-[#52525B]",
          "outline-none",
          // Default border
          !error && "border-[rgba(255,255,255,0.10)] focus:border-[#6C63FF] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)]",
          // Error border
          error && "border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
