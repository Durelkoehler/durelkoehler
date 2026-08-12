"use client";

import React from "react";
import { SOCIALS } from "@/constants/config";
import MagneticButton from "@/components/magnetic-button";

export default function Footer(): React.JSX.Element {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative z-10 border-t border-[rgba(255,255,255,0.05)] bg-[#0C0C0C] px-6 md:px-12 py-10"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Copyright */}
        <div className="text-center md:text-left">
          <p className="text-[11px] font-semibold text-[rgba(255,255,255,0.20)] tracking-[0.14em] uppercase">
            © 2026 Durel Koehler
          </p>
          <p className="text-[10px] text-[rgba(255,255,255,0.12)] tracking-widest uppercase mt-1">
            Cinematic Scroll Portfolio · All Rights Reserved
          </p>
        </div>

        {/* Socials */}
        <nav className="flex gap-6" aria-label="Social links">
          {SOCIALS.map((s) => (
            <MagneticButton key={s.name} strength={0.25} range={28}>
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-[#52525B] hover:text-white uppercase tracking-[0.08em] transition-colors duration-200"
              >
                {s.name}
              </a>
            </MagneticButton>
          ))}
        </nav>

        {/* Back to top */}
        <MagneticButton strength={0.2} range={32}>
          <button
            onClick={scrollTop}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#181818] text-[#52525B] hover:bg-white hover:text-[#0C0C0C] hover:border-white transition-all duration-200 cursor-pointer"
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </MagneticButton>

      </div>
    </footer>
  );
}
