import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: "var(--color-bg-deep)",
          dark: "var(--color-bg-dark)",
          panel: "var(--color-bg-panel)",
          elevated: "var(--color-bg-elevated)",
        },
        red: {
          accent: "var(--color-red-accent)",
          bright: "var(--color-red-bright)",
          dark: "var(--color-red-dark)",
        },
        blue: {
          accent: "var(--color-blue-accent)",
          bright: "var(--color-blue-bright)",
          dark: "var(--color-blue-dark)",
        },
        foreground: "var(--color-text)",
        secondary: "var(--color-text-secondary)",
        muted: "var(--color-text-muted)",
        glass: "var(--glass-border)",
        "glass-hover": "var(--glass-border-hover)",
        ring: "var(--color-ring)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scroll-indicator": "bounce 2s infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "marquee": "marquee 40s linear infinite",
        shine: "shine 1.5s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shine: {
          "100%": { left: "125%" },
        },
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
