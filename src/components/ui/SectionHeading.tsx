"use client";

import { motion } from "framer-motion";
import { fadeUpVariants } from "@/lib/motion";

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  eyebrow,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-16 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}>
          <div className="accent-line" />
          <span className="text-red-accent font-mono text-xs uppercase tracking-[0.2em]">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight font-bold">
        {title}
      </h2>
    </motion.div>
  );
}
