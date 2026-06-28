"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { community } from "@/data/community";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/lib/motion";

export function OpenSource() {
  return (
    <section id="open-source" className="py-24 relative z-10 bg-black/5">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title="Community & Open Source" eyebrow="05. IDENTITY" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {/* Identity Statement */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center space-y-6"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              Building in the open, <br className="hidden lg:block" />
              <span className="text-red-accent">learning together.</span>
            </h3>
            
            <p className="text-lg text-muted leading-relaxed">
              Open source is more than just code—it's a mindset of collaboration and continuous learning. 
              My involvement with the Villupuram GNU/Linux User Group (VGLUG) and global events like 
              Hacktoberfest has shaped my approach to software engineering.
            </p>
            
            <div className="pt-6">
              <a
                href="https://github.com/numankhan2007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-red-accent transition-colors font-mono tracking-tight group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-accent rounded-sm"
              >
                View GitHub Profile
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transform group-hover:translate-x-1 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Community Points Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {community.map((item, index) => (
              <motion.div key={index} variants={staggerItem} className="h-full">
                <GlassPanel className="p-6 h-full flex flex-col group">
                  <div className="w-10 h-10 rounded-full bg-black/5 border border-black/10 flex items-center justify-center mb-4 text-red-accent group-hover:scale-110 group-hover:bg-black/10 transition-all duration-300">
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
                  <h4 className="font-display font-bold text-lg mb-2 text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted">
                    {item.description}
                  </p>
                </GlassPanel>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
