"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CinematicLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    // Simulate asset loading / cinematic delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-deep"
        >
          {/* Subtle atmospheric background in loader */}
          <div className="absolute inset-0 bg-gradient-radial from-red-accent/10 to-transparent opacity-50 blur-3xl" />
          
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-16 h-16"
            >
              {/* Spinning Web/Tracer Animation */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-t-red-accent border-r-blue-accent border-b-transparent border-l-transparent rounded-full opacity-70"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border border-t-transparent border-r-transparent border-b-red-accent border-l-red-accent rounded-full opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-2 h-2 bg-red-accent rounded-full animate-pulse-glow" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center"
            >
              <h2 className="font-mono text-xs text-red-accent uppercase tracking-[0.3em] mb-2">
                Initializing Protocol
              </h2>
              <div className="flex gap-1 justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 bg-white rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
