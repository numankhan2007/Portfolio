"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { DualPersonaMask } from "@/components/ui/DualPersonaMask";
import { professionalSummary, identity } from "@/data/contact";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="py-24 relative z-10 section-fade-top section-fade-bottom">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading title="Identity / Protocol" eyebrow="01. PROFILE" />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-12">
          {/* Main Dual Persona Interactive Panel */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="xl:col-span-8"
          >
            <DualPersonaMask 
              childrenBack={
                <div className="h-full flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-3 mb-4 opacity-50">
                    <span className="w-2 h-2 bg-foreground" />
                    <span className="font-mono text-sm uppercase tracking-widest">Logic / Architecture</span>
                  </div>
                  {professionalSummary.map((paragraph, idx) => (
                    <p key={`back-${idx}`} className="text-lg md:text-xl text-secondary leading-relaxed font-body">
                      {paragraph}
                    </p>
                  ))}
                  <div className="absolute bottom-4 right-4 font-mono text-xs opacity-20">SYSTEM_NOMINAL_X86</div>
                </div>
              }
              childrenFront={
                <div className="h-full flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 bg-red-accent animate-pulse-glow shadow-[0_0_10px_rgba(230,36,41,1)]" />
                    <span className="font-mono text-sm uppercase tracking-widest text-red-accent">Imagination / UX</span>
                  </div>
                  {professionalSummary.map((paragraph, idx) => (
                    <p key={`front-${idx}`} className="text-lg md:text-xl text-white leading-relaxed font-body font-medium drop-shadow-md">
                      {paragraph}
                    </p>
                  ))}
                  <div className="absolute bottom-4 right-4 font-mono text-xs text-red-accent">WEB_SHOOTER_ACTIVE</div>
                </div>
              }
            />
          </motion.div>

          {/* Stats / Info Panel */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="xl:col-span-4"
          >
            <GlassPanel className="p-8 md:p-12 h-full flex flex-col justify-center bg-gradient-to-br from-bg-panel to-bg-deep group" glowColor="blue">
              <div className="space-y-10 relative z-10">
                <div className="group/item">
                  <h3 className="font-mono text-xs text-red-accent uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-accent rounded-full group-hover/item:animate-pulse-glow" />
                    Base of Operations
                  </h3>
                  <p className="font-display text-2xl font-bold text-foreground group-hover/item:text-white transition-colors">{identity.location}</p>
                </div>
                
                <div className="group/item">
                  <h3 className="font-mono text-xs text-blue-accent uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-accent rounded-full group-hover/item:animate-pulse-glow" />
                    Primary Directive
                  </h3>
                  <p className="font-display text-2xl font-bold text-foreground group-hover/item:text-white transition-colors">Full-Stack Architecture</p>
                </div>
                
                <div className="group/item">
                  <h3 className="font-mono text-xs text-red-accent uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-accent rounded-full group-hover/item:animate-pulse-glow" />
                    Network Alliance
                  </h3>
                  <p className="font-display text-2xl font-bold text-foreground group-hover/item:text-white transition-colors">VGLUG Foundation</p>
                </div>
              </div>

              {/* Spider-web corner decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="1"/>
                  <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="1"/>
                  <line x1="16" y1="16" x2="84" y2="84" stroke="currentColor" strokeWidth="1"/>
                  <line x1="16" y1="84" x2="84" y2="16" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
