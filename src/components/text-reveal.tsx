"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
}: TextRevealProps): React.JSX.Element {
  // Split text into words
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 16,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block py-1 mr-[0.25em] select-none overflow-visible"
        >
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform will-change-opacity"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
