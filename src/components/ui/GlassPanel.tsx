"use client";

import { motion } from "framer-motion";
import { interactiveCard } from "@/lib/motion";
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  variant?: "default" | "interactive" | "elevated";
  className?: string;
  glowColor?: "red" | "blue" | "none";
}

export function GlassPanel({
  children,
  variant = "default",
  className = "",
  glowColor = "none",
}: GlassPanelProps) {
  const glowStyles = {
    red: "hover:shadow-[0_0_30px_rgba(230,36,41,0.1)] hover:border-red-accent/30",
    blue: "hover:shadow-[0_0_30px_rgba(26,107,255,0.1)] hover:border-blue-accent/30",
    none: "hover:border-glass-hover",
  };

  const variantStyles = {
    default: "rounded-xl",
    interactive: "rounded-xl cursor-pointer transition-all duration-300",
    elevated: "rounded-2xl shadow-2xl",
  };

  const Component = variant === "interactive" ? motion.div : "div";
  const motionProps =
    variant === "interactive"
      ? {
          variants: interactiveCard,
          initial: "rest" as const,
          whileHover: "hover" as const,
          whileTap: "tap" as const,
        }
      : {};

  return (
    <Component
      className={`glass-panel ${variantStyles[variant]} ${glowColor !== "none" ? glowStyles[glowColor] : glowStyles.none} transition-all duration-300 ${className}`}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
