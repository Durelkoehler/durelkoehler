"use client";

import React from "react";
import CustomCursor from "@/components/custom-cursor";
import { LanguageProvider } from "@/lib/i18n";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps): React.JSX.Element {
  return (
    <LanguageProvider>
      {/* Global interactive cursor */}
      <CustomCursor />
      {children}
    </LanguageProvider>
  );
}
