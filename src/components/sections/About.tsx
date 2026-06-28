"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { professionalSummary, identity } from "@/data/contact";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title="About" eyebrow="01. PROFILE" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8"
          >
            <GlassPanel className="p-8 md:p-12">
              <div className="space-y-6 text-lg md:text-xl text-muted leading-relaxed">
                {professionalSummary.map((paragraph, idx) => (
                  <motion.p key={idx} variants={staggerItem}>
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-4"
          >
            <GlassPanel className="p-8 md:p-12 h-full flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <h3 className="font-mono text-sm text-red-accent uppercase tracking-widest mb-2">
                    Location
                  </h3>
                  <p className="font-medium text-lg">{identity.location}</p>
                </div>
                <div>
                  <h3 className="font-mono text-sm text-red-accent uppercase tracking-widest mb-2">
                    Focus
                  </h3>
                  <p className="font-medium text-lg">Full-Stack Web Development</p>
                </div>
                <div>
                  <h3 className="font-mono text-sm text-red-accent uppercase tracking-widest mb-2">
                    Community
                  </h3>
                  <p className="font-medium text-lg">VGLUG Foundation</p>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
