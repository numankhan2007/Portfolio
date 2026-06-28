"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { community } from "@/data/community";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/lib/motion";

export function OpenSource() {
  return (
    <section id="open-source" className="py-32 relative z-10 bg-transparent overflow-hidden">
      {/* Network web abstract background */}
      <div className="absolute inset-0 bg-web-strands opacity-50 pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-blue-accent/5 via-transparent to-transparent opacity-60 pointer-events-none blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading title="Network Alliance" eyebrow="05. COMMUNITY" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-16 items-center">
          
          {/* Living Ecosystem Interactive Visualization */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 relative aspect-square flex items-center justify-center group"
          >
            {/* Core Node */}
            <motion.div 
              className="absolute w-24 h-24 rounded-full bg-blue-accent/10 border-2 border-blue-accent flex items-center justify-center shadow-[0_0_50px_rgba(26,107,255,0.4)] z-20"
              animate={{ boxShadow: ["0 0 30px rgba(26,107,255,0.2)", "0 0 60px rgba(26,107,255,0.6)", "0 0 30px rgba(26,107,255,0.2)"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </motion.div>

            {/* Orbiting Ring 1 */}
            <motion.div 
              className="absolute w-[60%] h-[60%] rounded-full border border-dashed border-blue-accent/30 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-bg-dark border border-glass rounded-full flex items-center justify-center text-xs font-mono text-white hover:text-blue-accent hover:border-blue-accent transition-all cursor-pointer pointer-events-auto group/node focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-accent"
                tabIndex={0}
              >
                VGLUG
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-opacity bg-bg-panel px-2 py-1 rounded text-[10px] whitespace-nowrap border border-blue-accent/50 text-blue-accent">Community</div>
              </div>
            </motion.div>

            {/* Orbiting Ring 2 */}
            <motion.div 
              className="absolute w-[90%] h-[90%] rounded-full border border-blue-accent/10 pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="absolute bottom-1/4 -left-4 w-14 h-14 bg-bg-dark border border-glass rounded-full flex items-center justify-center text-xs font-mono text-white hover:text-blue-accent hover:border-blue-accent transition-all cursor-pointer pointer-events-auto group/node focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-accent"
                tabIndex={0}
              >
                PRs
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-opacity bg-bg-panel px-2 py-1 rounded text-[10px] whitespace-nowrap border border-blue-accent/50 text-blue-accent">Contributions</div>
              </div>
              <div 
                className="absolute top-1/4 -right-4 w-12 h-12 bg-bg-dark border border-glass rounded-full flex items-center justify-center text-xs font-mono text-white hover:text-blue-accent hover:border-blue-accent transition-all cursor-pointer pointer-events-auto group/node focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-accent"
                tabIndex={0}
              >
                HFest
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-opacity bg-bg-panel px-2 py-1 rounded text-[10px] whitespace-nowrap border border-blue-accent/50 text-blue-accent">Hacktoberfest</div>
              </div>
            </motion.div>

            {/* Connection SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <motion.line x1="50%" y1="50%" x2="50%" y2="20%" stroke="#1a6bff" strokeWidth="1" strokeDasharray="4 4" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.line x1="50%" y1="50%" x2="15%" y2="70%" stroke="#1a6bff" strokeWidth="1" strokeDasharray="4 4" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }} />
              <motion.line x1="50%" y1="50%" x2="85%" y2="30%" stroke="#1a6bff" strokeWidth="1" strokeDasharray="4 4" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2.5, repeat: Infinity }} />
            </svg>

          </motion.div>

          {/* Community Points Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            {community.map((item, index) => (
              <motion.div key={index} variants={staggerItem}>
                <GlassPanel className="p-6 md:p-8 group relative overflow-hidden transition-all hover:bg-bg-panel/60" variant="interactive" glowColor="blue">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-accent/5 rounded-bl-full pointer-events-none group-hover:bg-blue-accent/10 transition-colors" />
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-bg-dark border border-glass flex items-center justify-center text-blue-accent group-hover:bg-blue-accent/20 group-hover:border-blue-accent/50 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(26,107,255,0.4)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl mb-2 text-foreground group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-secondary leading-relaxed font-body">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
            
            <motion.div variants={staggerItem} className="pt-6 pl-4">
              <a
                href="https://github.com/numankhan2007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-blue-accent transition-colors group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-accent group-hover:animate-pulse-glow" />
                Initialize Sync with Github
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
