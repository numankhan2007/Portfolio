import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-mono font-medium tracking-tight";

  const variants = {
    default: "bg-badge-bg text-white border border-white/5",
    outline: "bg-transparent text-white border border-white/20",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
