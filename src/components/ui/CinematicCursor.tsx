"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CinematicCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Interactive element detection (100x productivity approach vs complex context)
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      }
    };
    
    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Magnetic Core */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-red-accent rounded-full pointer-events-none z-[999] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Expanding Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-red-accent/50 rounded-full pointer-events-none z-[998]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(230, 36, 41, 0.8)" : "rgba(230, 36, 41, 0.3)",
          backgroundColor: isHovering ? "rgba(230, 36, 41, 0.1)" : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
