"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

// Flatten all skills to one array
const allSkills = skillGroups.flatMap(g => g.skills);
// Duplicate for seamless loop
const marqueeSkills = [...allSkills, ...allSkills, ...allSkills, ...allSkills];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <SectionHeading title="Skills & Tech Stack" eyebrow="03. CAPABILITIES" />
      </div>

      <div className="relative w-full flex items-center h-32 overflow-hidden bg-bg-panel/30 border-y border-glass">
        {/* Left/Right fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex whitespace-nowrap gap-8 md:gap-16 items-center px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30, // Adjust speed here
            repeat: Infinity,
          }}
        >
          {marqueeSkills.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`} 
              className="flex items-center gap-3 text-muted hover:text-foreground transition-colors cursor-default group"
            >
              <div className="w-12 h-12 rounded-lg bg-black/5 border border-black/10 flex items-center justify-center font-display font-bold text-xl overflow-hidden group-hover:bg-black/10 group-hover:border-red-accent group-hover:box-glow-red transition-all p-2">
                {skill.icon ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" />
                ) : (
                  skill.name.charAt(0)
                )}
              </div>
              <span className="font-display font-medium text-xl md:text-2xl tracking-tight">
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
