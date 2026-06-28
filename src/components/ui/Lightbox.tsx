"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CertificateItem } from "@/data/certificates";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  cert: CertificateItem | null;
}

export function Lightbox({ isOpen, onClose, cert }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && cert && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep/95 backdrop-blur-xl p-4 md:p-12 overflow-y-auto"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-bg-dark border border-glass text-white hover:border-red-accent hover:text-red-accent transition-all z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-center bg-bg-panel/40 border border-glass rounded-2xl overflow-hidden shadow-2xl p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual Scan Area */}
            <div className="w-full lg:w-2/3 relative rounded-xl overflow-hidden bg-black border border-glass shadow-[0_0_50px_rgba(26,107,255,0.1)] group">
              <div className="absolute inset-0 bg-blue-accent/5 mix-blend-screen pointer-events-none z-10" />
              {/* Scanline animation */}
              <motion.div 
                className="absolute left-0 right-0 h-1 bg-blue-accent/30 shadow-[0_0_20px_rgba(26,107,255,0.5)] z-20 pointer-events-none"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              />
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.thumbnailPath}
                alt={cert.title}
                className="w-full h-auto object-contain max-h-[70vh] relative z-0"
              />
            </div>

            {/* Metadata Archive Panel */}
            <div className="w-full lg:w-1/3 flex flex-col space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-sm bg-blue-accent animate-pulse-glow" />
                  <span className="font-mono text-xs text-blue-accent uppercase tracking-widest">Verified Record</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-2 leading-tight">
                  {cert.title}
                </h3>
                {cert.issuer && (
                  <p className="font-body text-secondary text-lg border-b border-glass pb-6">
                    Issued by <span className="text-white font-medium">{cert.issuer}</span>
                  </p>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">Decrypted Analysis</h4>
                  <p className="font-body text-secondary text-sm leading-relaxed">
                    This document represents certified competency in corresponding technology domains. Record verified and securely archived within the central repository.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-glass pt-6">
                  <div>
                    <h4 className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">Clearance</h4>
                    <span className="font-mono text-xs text-white">Level 4</span>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">Format</h4>
                    <span className="font-mono text-xs text-white">Digital Core</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
