"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { projects, GITHUB_PROFILE } from "@/data/projects";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/lib/motion";

export function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title="Selected Projects" eyebrow="04. WORK" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="h-full"
            >
              <GlassPanel className="relative h-full flex flex-col p-0 overflow-hidden border-2 border-red-accent/20 bg-bg-panel hover:border-red-accent transition-all duration-300 group comic-border comic-border-hover">
                
                {/* Project Visual / Image Area */}
                <div className="w-full aspect-[4/3] bg-bg-dark/80 flex items-center justify-center relative overflow-hidden border-b border-black/5">
                  <div className="text-center group-hover:scale-105 transition-transform duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto mb-3 text-black/20 group-hover:text-red-accent/50 transition-colors"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <p className="font-mono text-xs text-muted/50">Project Screenshot Placeholder</p>
                  </div>
                </div>

                {/* Project Details Area */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="font-display text-2xl font-bold mb-2 text-foreground">
                    {project.name}
                  </h3>
                  <p className="font-mono text-sm text-muted mb-4 line-clamp-3 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full border border-black/10 bg-black/5 text-xs font-mono text-muted">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-3 py-1 rounded-full border border-black/10 bg-black/5 text-xs font-mono text-muted">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-auto">
                    <a
                      href={project.repo.verified ? project.repo.url! : GITHUB_PROFILE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 comic-border border-2 border-red-accent/30 bg-bg-dark hover:bg-red-accent/20 transition-colors font-bold uppercase tracking-wider text-xs text-red-accent"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      GitHub
                    </a>
                    
                    <a
                      href={project.liveUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 comic-border bg-red-accent hover:bg-blue-accent text-white transition-colors font-bold uppercase tracking-wider text-xs"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      Live Demo
                    </a>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
