"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface WorldEnvironmentProps {
  children: React.ReactNode;
}

export function WorldEnvironment({ children }: WorldEnvironmentProps) {
  const { scrollYProgress } = useScroll();
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Lighting Progression mapping based on scroll position (0 to 1)
  // 0.0 - Hero: Deep Space Blue / Red Skyline
  // 0.15 - About: Cool High-tech Blue
  // 0.3 - Education: Clean White/Blue
  // 0.5 - Skills: Electric Blue Glow
  // 0.7 - Projects: Dark Zinc / Tactical Red
  // 0.85 - Certificates: Cold Vault Grey
  // 1.0 - Contact: Warm Sunset Red/Orange

  const bgGradient = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
    [
      "radial-gradient(100% 100% at 50% 0%, rgba(230,36,41,0.08) 0%, rgba(2,2,5,1) 100%)", // Hero
      "radial-gradient(100% 100% at 50% 50%, rgba(26,107,255,0.05) 0%, rgba(10,10,15,1) 100%)", // About
      "radial-gradient(100% 100% at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(17,17,24,1) 100%)", // Education
      "radial-gradient(100% 100% at 50% 50%, rgba(26,107,255,0.08) 0%, rgba(2,2,5,1) 100%)", // Skills
      "radial-gradient(100% 100% at 50% 50%, rgba(230,36,41,0.05) 0%, rgba(10,10,15,1) 100%)", // Projects
      "radial-gradient(100% 100% at 50% 50%, rgba(255,255,255,0.02) 0%, rgba(17,17,24,1) 100%)", // Certs
      "radial-gradient(100% 100% at 50% 100%, rgba(230,36,41,0.15) 0%, rgba(2,2,5,1) 100%)", // Contact
    ]
  );

  // Parallax layers
  const yParallaxFar = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yParallaxMid = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* Dynamic Global Background Lighting */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none transition-colors duration-700"
        style={{ background: bgGradient }}
      />

      {/* Atmospheric Layers (Disabled if reduced motion) */}
      {!isReducedMotion && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Far layer (slow parallax) */}
          <motion.div 
            className="absolute inset-0 bg-grid-subtle opacity-10"
            style={{ y: yParallaxFar }}
          />
          
          {/* Mid layer (floating dust/embers) */}
          <motion.div 
            className="absolute inset-0 opacity-20 mix-blend-screen"
            style={{ y: yParallaxMid }}
          >
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-accent rounded-full animate-float blur-[1px]" />
            <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-blue-accent rounded-full animate-float blur-[1px]" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-red-accent rounded-full animate-float blur-[2px]" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white rounded-full animate-float blur-[1px]" style={{ animationDelay: "0.5s" }} />
          </motion.div>
        </div>
      )}

      {/* Global Foreground Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
