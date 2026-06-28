"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { certificates, CertificateItem } from "@/data/certificates";

export function Certificates() {
  const [lightboxData, setLightboxData] = useState<{ isOpen: boolean; cert: CertificateItem | null }>({
    isOpen: false,
    cert: null,
  });

  const handleOpenLightbox = (cert: CertificateItem) => {
    setLightboxData({ isOpen: true, cert });
  };

  const handleCloseLightbox = () => {
    setLightboxData({ isOpen: false, cert: null });
  };

  if (certificates.length === 0) {
    return (
      <section id="certificates" className="py-24 relative z-10 overflow-hidden bg-transparent">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <SectionHeading title="Secure Archive" eyebrow="06. CREDENTIALS" align="center" />
          <div className="mt-12 py-16 border border-glass border-dashed rounded-xl bg-bg-panel/30">
            <p className="font-mono text-muted">Archive records empty.</p>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate for seamless infinite scrolling loop
  const marqueeCertificates = [...certificates, ...certificates, ...certificates];

  return (
    <section id="certificates" className="py-24 relative z-10 overflow-hidden bg-transparent border-y border-glass">
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <SectionHeading title="Secure Archive" eyebrow="06. CREDENTIALS" />
      </div>

      <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden flex items-center">
        {/* Cinematic fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-bg-deep to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-bg-deep to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee whitespace-nowrap gap-6 md:gap-8 items-center px-8 w-[400%]">
          {marqueeCertificates.map((cert, index) => (
            <div 
              key={`${cert.filename}-${index}`}
              className="relative flex-shrink-0 w-[300px] h-[220px] md:w-[450px] md:h-[320px] border border-glass bg-bg-elevated overflow-hidden group cursor-pointer rounded-xl transition-all duration-500 hover:border-blue-accent/50 hover:shadow-[0_0_30px_rgba(26,107,255,0.15)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-accent"
              onClick={() => handleOpenLightbox(cert)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenLightbox(cert) }}
              tabIndex={0}
              role="button"
              aria-label={`Open secure archive for ${cert.title}`}
            >
              <div className="absolute inset-0 bg-bg-dark flex items-center justify-center p-1">
                <div className="w-full h-full relative rounded-lg overflow-hidden border border-glass">
                  {/* Monochromatic base state -> full color on hover */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={cert.thumbnailPath} 
                    alt={cert.title}
                    className="w-full h-full object-cover filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105"
                  />
                  
                  {/* CRT Scanline overlay effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 pointer-events-none group-hover:opacity-0 transition-opacity" />
                </div>
              </div>

              {/* Hover Details Pop-up Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-accent animate-pulse-glow" />
                    <span className="font-mono text-[10px] text-blue-accent uppercase tracking-widest">Decrypted</span>
                  </div>
                  <h4 className="font-display font-bold text-lg md:text-xl text-white mb-1 whitespace-normal line-clamp-2 leading-tight">
                    {cert.title}
                  </h4>
                  {cert.issuer && (
                    <p className="text-secondary text-sm font-medium mb-3">{cert.issuer}</p>
                  )}
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-white transition-colors">
                    <span>Click to view</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={lightboxData.isOpen}
        onClose={handleCloseLightbox}
        cert={lightboxData.cert}
      />
    </section>
  );
}
