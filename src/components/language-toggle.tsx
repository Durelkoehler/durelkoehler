"use client";

import React from "react";
import Button from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

export default function LanguageToggle(): React.JSX.Element {
  const { locale, setLocale } = useTranslation();
  const next = locale === "en" ? "fr" : "en";
  return (
    <Button size="sm" variant="white" onClick={() => setLocale(next)}>
      {locale === "en" ? "FR" : "EN"}
    </Button>
  );
}
