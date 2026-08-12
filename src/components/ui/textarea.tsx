"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          // Base
          "w-full min-h-[140px] px-4 py-3.5 rounded-[10px]",
          "bg-[#181818] text-white text-[14px] font-normal",
          "border transition-all duration-[150ms]",
          "placeholder:text-[#52525B]",
          "resize-vertical outline-none leading-relaxed",
          // Default
          !error && "border-[rgba(255,255,255,0.10)] focus:border-[#6C63FF] focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)]",
          // Error
          error && "border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
