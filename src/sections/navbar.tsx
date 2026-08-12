"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import MagneticButton from "@/components/magnetic-button";
import LanguageToggle from "@/components/language-toggle";
import { useTranslation } from "@/lib/i18n";

export default function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { t } = useTranslation();

  const links = [
    { label: t("about"), href: "#intro" },
    { label: t("works"), href: "#works" },
    { label: t("experience"), href: "#experience" },
    { label: t("contact"), href: "#contact" },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "flex items-center justify-between",
        "px-12 md:px-12 h-16",
        "transition-all duration-300",
        // scrolled
        //   ? "bg-[rgba(18,18,18,0.85)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.06)]"
        //   : "bg-transparent border-b border-transparent",
      ].join(" ")}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
    >
      {/* Brand */}
      <MagneticButton strength={0.18} range={40}>
        <a
          href="#main-content"
          className="text-[13px] font-semibold tracking-[0.14em] text-white uppercase select-none"
          aria-label="KOEHLER Durel — home"
        >
          KOEHLER Durel
        </a>
      </MagneticButton>

      {/* Floating pill nav — desktop */}
      <nav
        className="hidden md:flex items-center gap-8 bg-[rgba(24,24,24,0.80)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] px-8 h-11 rounded-full"
        aria-label="Primary navigation"
      >
        {links.map((link) => (
          <MagneticButton key={link.label} strength={0.25} range={32}>
            <a
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-[12px] font-medium tracking-[0.05em] text-[#8991a9] hover:text-white transition-colors duration-200 uppercase select-none"
            >
              {link.label}
            </a>
          </MagneticButton>
        ))}
      </nav>

      {/* CTA + language toggle */}
      <div className="flex items-center gap-3">
        <LanguageToggle />
        <MagneticButton strength={0.2} range={48}>
          <Button variant="white" size="sm" asChild>
            <a href="#contact" onClick={(e) => handleNav(e, "#contact")}>
              {t("sayHello")}
            </a>
          </Button>
        </MagneticButton>
      </div>
    </motion.header>
  );
}
