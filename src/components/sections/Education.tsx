"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { education } from "@/data/education";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Education() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title="Education" eyebrow="02. TIMELINE" />

        <div className="max-w-4xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {education.map((item, index) => (
              <motion.div key={`${item.institution}-${index}`} variants={staggerItem}>
                <GlassPanel className="p-6 md:p-8 relative group">
                  {/* Timeline connecting line visual hint */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-accent/0 via-red-accent/20 to-red-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-muted">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-bold">
                          {item.program}
                        </h3>
                      </div>
                      <p className="text-muted md:pl-8">
                        {item.institution}
                      </p>
                    </div>
                    
                    <div className="md:text-right md:pl-4 space-y-1">
                      <p className="font-mono text-red-accent">
                        {item.years}
                      </p>
                      <p className={`font-medium ${item.isCurrent ? "text-foreground" : "text-muted"}`}>
                        {item.result}
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
