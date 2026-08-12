"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";

export default function StatsSection(): React.JSX.Element {
  const { t } = useTranslation();

  const stats = [
    { value: "100", label: t("stat_projects_realized"), suffix: "+" },
    { value: "04", label: t("stat_years_mastery"), suffix: "+" },
    { value: "100", label: t("stat_client_satisfaction"), suffix: "%" },
  ];

  return (
    <section
      id="stats"
      className="relative z-10 py-24 md:py-36 px-6 md:px-12 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.35)]"
      aria-label="Key metrics and statistics"
    >
      <div className="max-w-6xl mx-auto">
        <p className="overline mb-4">{t("stats_overline")}</p>
        <h2 className="text-[clamp(32px,5vw,56px)] font-bold text-white tracking-[-0.02em] leading-[1.1] mb-12">
          {t("stats_heading")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.07,
              }}
            >
              <Card
                variant="stat"
                className="group hover:border-[rgba(108,99,255,0.30)] hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 rounded-[16px] bg-[radial-gradient(circle_at_50%_0%,rgba(108,99,255,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-baseline gap-0.5 mb-3">
                    <span className="text-[clamp(36px,5vw,56px)] font-black text-white tracking-tight leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[18px] md:text-[24px] font-bold text-[#6C63FF] leading-none">
                      {stat.suffix}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#d5d5d5] tracking-[0.08em] uppercase text-center leading-tight">
                    {stat.label}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
