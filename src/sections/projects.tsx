"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/constants/config";
import { useTranslation } from "@/lib/i18n";
import MagneticButton from "@/components/magnetic-button";
import Badge from "@/components/ui/badge";

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transform -rotate-45"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function ProjectsSection(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <section
      id="works"
      className="relative z-10 py-24 md:py-36 px-6 md:px-12 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.40)]"
      aria-label="Selected works and case studies"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="overline mb-4">{t("projects_overline")}</p>
            <h2 className="text-[clamp(32px,5vw,56px)] font-bold text-white tracking-[-0.02em] leading-[1.1]">
              {t("projects_heading")}
            </h2>
          </div>
          <p className="text-[14px] text-[#A1A1AA] max-w-[280px] leading-relaxed font-light md:text-right">
            {t("projects_lead")}
          </p>
        </div>

        {/* Asymmetric 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => {
            const isOffset = index % 2 !== 0;
            const locTitleKey = `project_${project.id}_title`;
            const locDescKey = `project_${project.id}_description`;
            const localizedTitle = t(locTitleKey);
            const localizedDesc = t(locDescKey);
            const title =
              localizedTitle === locTitleKey ? project.title : localizedTitle;
            const description =
              localizedDesc === locDescKey
                ? project.description
                : localizedDesc;
            return (
              <motion.article
                key={project.id}
                className={[
                  // Feature card
                  "group relative bg-[#181818] border border-[rgba(255,255,255,0.06)]",
                  "rounded-[24px] p-10 overflow-hidden",
                  "flex flex-col justify-between min-h-[460px] md:min-h-[520px]",
                  "transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "hover:border-[rgba(255,255,255,0.14)] hover:-translate-y-1",
                  "hover:shadow-[0_8px_48px_rgba(0,0,0,0.65)]",
                  isOffset ? "md:translate-y-12" : "",
                ].join(" ")}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: isOffset ? 48 : 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 18,
                  delay: index * 0.09,
                }}
              >
                {/* Accent ambient glow */}
                <div
                  className={`absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full bg-gradient-to-br ${project.accent} opacity-[0.06] blur-[90px] pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.12]`}
                  aria-hidden="true"
                />

                {/* Project preview image */}
                <div className="relative z-10 mb-8 overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#121212]">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                {/* Top meta */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <Badge variant="default">{project.category}</Badge>
                    <span className="text-[11px] font-semibold text-[rgba(255,255,255,0.20)] tracking-[0.12em] uppercase">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-[22px] md:text-[26px] font-semibold text-white tracking-[-0.01em] leading-tight mb-3">
                    {title}
                  </h3>

                  <p className="text-[14px] text-[#A1A1AA] leading-relaxed max-w-[320px] font-light">
                    {description}
                  </p>
                </div>

                {/* Bottom row */}
                <div className="relative z-10 flex items-end justify-between mt-12">
                  <span
                    className="text-[64px] font-black text-[rgba(255,255,255,0.04)] leading-none select-none"
                    aria-hidden="true"
                  >
                    {project.id}
                  </span>

                  <MagneticButton strength={0.28} range={44}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        "flex items-center justify-center",
                        "w-14 h-14 rounded-full",
                        "border border-[rgba(255,255,255,0.10)]",
                        "bg-transparent text-white",
                        "hover:bg-white hover:text-[#0C0C0C]",
                        "hover:border-white",
                        "transition-all duration-200",
                      ].join(" ")}
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowIcon />
                    </a>
                  </MagneticButton>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
