"use client";

import React from "react";
import { motion } from "framer-motion";
import Badge from "@/components/ui/badge";
import MagneticButton from "@/components/magnetic-button";
import { useTranslation } from "@/lib/i18n";

export default function HeroSection(): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const { t } = useTranslation();

  React.useEffect(() => {
    const updateScrollProgress = () => {
      if (typeof window === "undefined") return;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        maxScroll > 0
          ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
          : 0;
      setScrollProgress(nextProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  const fadeProgress = Math.min(1, scrollProgress / 0.45);
  const opacity = 1 - fadeProgress;
  const y = -80 * fadeProgress;

  const scrollDown = () =>
    document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      style={{ opacity, y }}
      className="relative w-full h-screen flex flex-col justify-center items-center text-center px-6 select-none pointer-events-none overflow-hidden"
      aria-label="Hero introduction"
    >
      <div className="relative z-10 flex flex-col items-center max-w-5xl">
        {/* Overline badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.9,
          }}
        >
          <Badge
            dot
            className="mb-8 border border-white/20 bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.08)]"
          >
            {t("hero_badge")}
          </Badge>
        </motion.div>

        {/* H1 — cinematic display */}
        <motion.h1
          className="text-[clamp(52px,9vw,120px)] font-black text-white tracking-[-0.04em] leading-[0.95] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 16,
            delay: 1.05,
          }}
        >
          KOEHLER Durel
        </motion.h1>

        {/* Descriptor */}
        <motion.p
          className="text-[15px] md:text-[17px] text-white/85 max-w-md leading-relaxed font-medium mb-12 drop-shadow-[0_0_16px_rgba(255,255,255,0.14)]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 16,
            delay: 1.2,
          }}
        >
          {t("hero_descriptor")}
        </motion.p>

        {/* Stat row */}
        <motion.div
          className="flex items-center gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 16,
            delay: 1.35,
          }}
        >
          {[
            { value: "04+", label: t("hero_stat_years") },
            { value: "60+", label: t("hero_stat_projects") },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-[22px] text-white tracking-tight">
                {s.value}
              </span>
              <span className="text-[11px] font-normal text-[#f1f1f1] tracking-[0.08em] uppercase mt-0.5">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — pointer-events restored */}
      <div className="absolute bottom-10 pointer-events-auto z-10">
        <MagneticButton strength={0.25} range={44}>
          <button
            onClick={scrollDown}
            className="flex flex-col items-center gap-2.5 text-[#e0e0e0] hover:text-white transition-colors duration-300 cursor-pointer"
            aria-label="Scroll down to introduction"
          >
            <motion.div
              className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.30)] to-transparent rounded-full"
              animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <span className="text-[10px] font-medium tracking-[0.18em] uppercase">
              {t("hero_scroll")}
            </span>
          </button>
        </MagneticButton>
      </div>
    </motion.section>
  );
}
