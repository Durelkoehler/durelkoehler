"use client";

import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/constants/config";
import { useTranslation } from "@/lib/i18n";

export default function ExperienceSection(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <section
      id="experience"
      className="relative z-10 py-24 md:py-36 px-6 md:px-12 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.50)]"
      aria-label="Work experience timeline"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <p className="overline mb-4">{t("experience_overline")}</p>
        <h2 className="text-[clamp(32px,5vw,56px)] font-bold text-white tracking-[-0.02em] leading-[1.1] mb-20">
          {t("experience_heading")}
        </h2>

        {/* Timeline */}
        <div
          className="relative pl-8 border-l border-[rgba(255,255,255,0.08)]"
          role="list"
          aria-label="Career timeline"
        >
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              role="listitem"
              className="relative mb-14 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 18,
                delay: index * 0.1,
              }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[41px] top-[5px] w-[10px] h-[10px] rounded-full bg-[#6C63FF] shadow-[0_0_0_3px_rgba(108,99,255,0.20)]"
                aria-hidden="true"
              />

              {/* Period overline */}
              <p className="text-[11px] font-semibold text-[#c5c5c5] tracking-[0.10em] uppercase mb-2">
                {exp.period}
              </p>

              {/* Role + Company */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 mb-4">
                <h3 className="text-[18px] md:text-[20px] font-semibold text-white tracking-[-0.01em]">
                  {(() => {
                    const roleKey = `exp_${exp.id}_role`;
                    const companyKey = `exp_${exp.id}_company`;
                    const role = t(roleKey) === roleKey ? exp.role : t(roleKey);
                    const company =
                      t(companyKey) === companyKey
                        ? exp.company
                        : t(companyKey);
                    return role;
                  })()}
                </h3>
                <span className="text-[12px] font-medium text-[#6C63FF] tracking-[0.04em] uppercase">
                  {(() => {
                    const companyKey = `exp_${exp.id}_company`;
                    return t(companyKey) === companyKey
                      ? exp.company
                      : t(companyKey);
                  })()}
                </span>
              </div>

              {/* Detail bullets */}
              <ul className="flex flex-col gap-2.5" aria-label="Role details">
                {exp.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14px] text-[#A1A1AA] leading-relaxed font-light"
                  >
                    <span
                      className="mt-[0.55rem] w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.18)] shrink-0"
                      aria-hidden="true"
                    />
                    {(() => {
                      const key = `exp_${exp.id}_detail_${i + 1}`;
                      const v = t(key);
                      return v === key ? detail : v;
                    })()}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
