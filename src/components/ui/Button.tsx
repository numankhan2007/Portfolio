"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { buttonVariants } from "@/lib/motion";
import { ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  asChild?: boolean; // if we want to pass a Next.js Link
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  asChild, // destructure asChild out so it doesn't get passed to the DOM
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-display font-bold uppercase tracking-wider overflow-hidden group transition-all duration-300 comic-border";

  const variants = {
    primary: "bg-transparent text-white", // Red sliding background is added inside
    secondary: "bg-transparent text-blue-accent border-2 border-blue-accent",
    ghost: "bg-transparent text-foreground hover:bg-black/5",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return (
    <motion.button
      variants={buttonVariants}
      initial="rest"
      whileHover={disabled ? "rest" : "hover"}
      whileTap={disabled ? "rest" : "tap"}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {/* Background sliding effect based on variant */}
      {variant === "primary" && (
        <span className="absolute inset-0 w-full h-full bg-red-accent transition-all duration-300 ease-out group-hover:bg-blue-accent"></span>
      )}
      {variant === "secondary" && (
        <span className="absolute inset-0 w-full h-full bg-blue-accent/10 transition-all duration-300 ease-out group-hover:bg-blue-accent/20"></span>
      )}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
}
