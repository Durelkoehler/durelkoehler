import React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  helper?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function FormField({
  label,
  htmlFor,
  children,
  helper,
  error,
  required = false,
  className,
}: FormFieldProps): React.JSX.Element {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[12px] font-medium text-[#A1A1AA] tracking-[0.03em]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#EF4444]" aria-hidden="true">*</span>
        )}
      </label>

      {children}

      {error ? (
        <p className="text-[12px] text-[#EF4444]" role="alert">{error}</p>
      ) : helper ? (
        <p className="text-[12px] text-[#52525B]">{helper}</p>
      ) : null}
    </div>
  );
}
