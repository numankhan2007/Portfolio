"use client";

import { useState, useRef } from "react";
import { motion, useSpring, useMotionTemplate } from "framer-motion";

interface DualPersonaMaskProps {
  childrenFront: React.ReactNode;
  childrenBack: React.ReactNode;
}

export function DualPersonaMask({ childrenFront, childrenBack }: DualPersonaMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // High stiffness spring for zero-latency feeling
  const mouseX = useSpring(0, { stiffness: 700, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 700, damping: 40 });
  const maskSize = useSpring(0, { stiffness: 500, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    maskSize.set(400); // 400px mask diameter when hovering
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    maskSize.set(0); // Shrink to 0 when leaving
  };

  // Create motion templates for the mask CSS properties
  const maskSizeStr = useMotionTemplate`${maskSize}px`;
  // Center the mask around the mouse position
  const maskPositionStr = useMotionTemplate`calc(${mouseX}px - (${maskSize}px / 2)) calc(${mouseY}px - (${maskSize}px / 2))`;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Persona (Logic / Backend) */}
      <div className="absolute inset-0 w-full h-full bg-bg-panel flex flex-col items-center justify-center p-8 md:p-16 border border-glass">
        <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />
        <div className="w-full h-full relative z-10">
          {childrenBack}
        </div>
      </div>

      {/* Foreground Persona (Imagination / Spider-Verse Masked) */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-bg-deep flex flex-col items-center justify-center p-8 md:p-16 border-2 border-red-accent/50 z-20 pointer-events-none"
        style={{
          WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: maskSizeStr,
          WebkitMaskPosition: maskPositionStr,
          maskImage: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
          maskRepeat: "no-repeat",
          maskSize: maskSizeStr,
          maskPosition: maskPositionStr,
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-red-accent/30 via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-web-lines opacity-40" />
        
        <div className="w-full h-full relative z-10 text-white">
          {childrenFront}
        </div>
      </motion.div>

      {/* Custom Cursor Dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-red-accent z-50 pointer-events-none shadow-[0_0_10px_rgba(230,36,41,1)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovered ? 1 : 0
        }}
      />
    </div>
  );
}
