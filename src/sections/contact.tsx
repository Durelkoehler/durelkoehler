"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { SOCIALS } from "@/constants/config";
import { useTranslation } from "@/lib/i18n";
import ContactForm from "@/components/contact-form";

export default function ContactSection(): React.JSX.Element {

  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="relative z-10 py-24 md:py-36 px-6 md:px-12 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.65)]"
      aria-label="Contact form"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left — Editorial CTA */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        >
          <p className="overline mb-4">{t("contact_overline")}</p>
          <h2 className="text-[clamp(36px,5vw,64px)] font-black text-white tracking-[-0.03em] leading-[0.95] mb-6">
            {t("contact_heading")
              .split("\n")
              .map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
          </h2>
          <p className="text-[14px] text-[#A1A1AA] max-w-[300px] leading-relaxed font-light mb-10">
            {t("contact_lead")}
          </p>

          {/* Direct email */}
          <div className="flex flex-col gap-1.5 mb-10">
            <span className="text-[11px] font-semibold text-[#52525B] tracking-[0.10em] uppercase">
              {t("directContact")}
            </span>
            <a
              href="mailto:durelkoehler26@gmail.com"
              className="text-[16px] font-medium text-white hover:text-[#6C63FF] transition-colors duration-200"
            >
              durelkoehler26@gmail.com
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-[#52525B] hover:text-white uppercase tracking-[0.06em] transition-colors duration-200"
              >
                {s.name}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Glass form card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 18,
            delay: 0.08,
          }}
        >
          <Card variant="glass" className="p-8 md:p-10">
            <ContactForm />
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
