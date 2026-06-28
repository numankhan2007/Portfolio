"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { education } from "@/data/education";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Education() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="education" className="py-24 relative z-10 bg-transparent">
      {/* Spider-web background overlay */}
      <div className="absolute inset-0 bg-web-lines opacity-[0.015] pointer-events-none mix-blend-screen" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading title="Training Records" eyebrow="02. TIMELINE" />

        <div className="max-w-4xl mx-auto mt-16 relative">
          {/* Main Timeline Trunk */}
          <div className="absolute left-4 md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-accent/30 to-transparent transform md:-translate-x-1/2" />
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {education.map((item, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedIndex === index;
              
              return (
                <motion.div 
                  key={`${item.institution}-${index}`} 
                  variants={staggerItem}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Center Node (Glowing Spider Tracer) */}
                  <div className={`absolute left-4 md:left-[50%] top-6 transform -translate-x-1/2 w-3 h-3 rounded-full border z-10 transition-all duration-300 ${isExpanded ? "bg-red-accent border-red-accent scale-150 shadow-[0_0_15px_rgba(230,36,41,0.8)]" : "bg-bg-deep border-red-accent box-glow-red hover:scale-150"}`}>
                    {item.isCurrent && !isExpanded && (
                      <div className="absolute inset-0 bg-red-accent rounded-full animate-ping opacity-50" />
                    )}
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div 
                      onClick={() => toggleExpand(index)} 
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpand(index) }}
                      className="cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-accent rounded-xl"
                      tabIndex={0}
                      role="button"
                      aria-expanded={isExpanded}
                      aria-label={`Decrypt records for ${item.program}`}
                    >
                      <GlassPanel className={`p-6 md:p-8 group transition-all duration-500 ${isExpanded ? 'border-red-accent shadow-[0_0_30px_rgba(230,36,41,0.15)] bg-bg-panel/80' : ''}`} variant="interactive" glowColor="red">
                        {/* Sub-line connecting trunk to card */}
                        <div className={`absolute top-6 h-px w-8 md:w-12 pointer-events-none transition-all duration-300 ${isExpanded ? 'bg-red-accent' : 'bg-red-accent/20 group-hover:bg-red-accent/50'} ${isEven ? '-right-12 hidden md:block' : '-left-12'}`} />

                        <div className="space-y-4 relative z-10">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className={`font-mono text-sm px-3 py-1 rounded-sm border transition-colors ${isExpanded ? 'text-white bg-red-accent border-red-accent' : 'text-red-accent bg-red-accent/10 border-red-accent/20'}`}>
                              {item.years}
                            </span>
                            <span className={`font-mono text-sm uppercase tracking-widest ${item.isCurrent ? "text-blue-accent animate-pulse-glow" : "text-muted"}`}>
                              {item.result}
                            </span>
                          </div>
                          
                          <div>
                            <h3 className={`font-display text-xl md:text-2xl font-bold mb-1 transition-colors ${isExpanded ? 'text-white' : 'text-foreground group-hover:text-white'}`}>
                              {item.program}
                            </h3>
                            <p className="text-secondary text-sm md:text-base">
                              {item.institution}
                            </p>
                          </div>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-6 mt-4 border-t border-glass">
                                  <div className="flex items-center gap-2 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-accent"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    <span className="font-mono text-[10px] text-blue-accent uppercase tracking-[0.2em]">Record Decrypted</span>
                                  </div>
                                  <div className="font-mono text-xs text-secondary leading-relaxed space-y-2">
                                    <p>&gt; SYSTEM.VERIFY_CREDENTIAL(ID: {item.program.substring(0, 3).toUpperCase()}_{item.years.substring(0, 4)})</p>
                                    <p className="text-white">&gt; STATUS: {item.isCurrent ? 'ACTIVE_TRAINING_IN_PROGRESS' : 'COMPLETED_SUCCESSFULLY'}</p>
                                    <p>&gt; LOCATION_HASH: [{item.institution.length * 14}, {item.institution.charCodeAt(0) * 8}]</p>
                                    <p>&gt; DOWNLOADING_SYLLABUS_DATA... <span className="text-red-accent blink">OK</span></p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {!isExpanded && (
                            <div className="flex justify-end pt-2">
                              <span className="font-mono text-[10px] text-muted opacity-50 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                Click to decrypt <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                              </span>
                            </div>
                          )}
                        </div>
                      </GlassPanel>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
