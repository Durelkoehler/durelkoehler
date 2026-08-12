"use client";

import React from "react";
import TextReveal from "@/components/text-reveal";
import Tag from "@/components/ui/tag";
import { useTranslation } from "@/lib/i18n";

const tags = [
  "Figma",
  "Photoshop",
  "Wordpress",
  "Illustrator",
  "Adobe XD",
  "Affinity",
  "Spline",
  "Stitch",
  "Webflow",
];

export default function IntroSection(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <section
      id="intro"
      className="relative z-10 py-24 md:py-36 px-6 md:px-12 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.35)]"
      aria-label="About and introduction"
    >
      <div className="max-w-6xl mx-auto">
        {/* Overline */}
        <p className="overline mb-12">{t("intro_overline")}</p>

        {/* Statement — scroll-revealed */}
        <div className="max-w-4xl mb-20">
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-6">
            {t("intro_heading")}
          </h2>
          <TextReveal
            text={t("intro_statement")}
            className="text-[clamp(26px,4vw,52px)] font-bold text-white leading-[1.1] tracking-[-0.02em]"
          />
        </div>

        {/* Tech tag row */}
        <div className="flex flex-wrap gap-2.5 mb-20">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {/* Specialization grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[rgba(255,255,255,0.05)]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <span className="text-[11px] font-semibold text-[rgba(255,255,255,0.20)] tracking-[0.12em] uppercase block mb-4">
                {i.toString().padStart(2, "0")}
              </span>
              <h3 className="text-[17px] font-semibold text-white mb-3 tracking-[-0.01em]">
                {t(`spec0${i}_title`)}
              </h3>
              <p className="text-[14px] text-[#A1A1AA] leading-relaxed font-light">
                {t(`spec0${i}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
