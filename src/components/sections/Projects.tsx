"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { projects, GITHUB_PROFILE, Project } from "@/data/projects";
import { fadeUpVariants } from "@/lib/motion";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative z-10 bg-transparent section-fade-top section-fade-bottom">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-red-accent/5 via-transparent to-transparent opacity-50 pointer-events-none blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading title="Declassified Operations" eyebrow="04. MISSION LOG" align="center" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={index}
              className="h-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-accent rounded-2xl"
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project) }}
              tabIndex={0}
              role="button"
              aria-label={`Open mission briefing for ${project.name}`}
            >
              <TiltCard3D className="group">
                <GlassPanel className="relative h-full flex flex-col p-0 overflow-hidden bg-bg-elevated/40 border-glass transition-all duration-500 hover:border-red-accent/50 hover:shadow-[0_0_40px_rgba(230,36,41,0.15)] shadow-2xl">
                  
                  {/* Dossier Top Bar */}
                  <div 
                    className="flex justify-between items-center px-6 py-3 border-b border-glass bg-bg-panel/50 backdrop-blur-md relative z-30"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-red-accent animate-pulse-glow" />
                      <span className="font-mono text-xs text-muted uppercase tracking-[0.2em]">Status: Verified</span>
                    </div>
                    <span className="font-mono text-xs text-secondary opacity-50">FILE_ID: {project.slug.toUpperCase()}</span>
                  </div>

                  {/* Project Visual Area */}
                  <div className="w-full aspect-[4/3] bg-bg-dark flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />
                    <div className="absolute inset-0 bg-red-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-color z-10 pointer-events-none" />
                    
                    <div 
                      className="text-center relative z-20 pointer-events-none"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto mb-3 text-glass-hover group-hover:text-red-accent/80 transition-colors duration-500 drop-shadow-2xl"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                      <p className="font-mono text-[10px] text-muted tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">Expand Briefing</p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div 
                    className="p-6 md:p-8 flex flex-col flex-grow relative z-30 bg-bg-elevated/20"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <div className="absolute top-0 right-8 w-px h-12 bg-gradient-to-b from-red-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <h3 className="font-display text-2xl font-bold mb-1 text-foreground group-hover:text-white transition-colors uppercase tracking-wide">
                      {project.name}
                    </h3>
                    <p className="font-body text-red-accent text-sm font-medium mb-4">{project.tagline}</p>
                    
                    <p className="font-body text-secondary text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-glass flex items-center justify-between">
                      <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Click to decrypt</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-accent group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </div>
                </GlassPanel>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Immersive Deep-Dive Dossier Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-bg-deep/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-bg-panel border border-red-accent/30 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(230,36,41,0.15)] flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white border border-white/10 hover:bg-red-accent hover:border-red-accent transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {/* Sidebar: Data / Tech */}
              <div className="w-full md:w-1/3 bg-bg-elevated p-8 border-r border-glass flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-subtle opacity-20" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded bg-red-accent/10 border border-red-accent/30 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-accent animate-pulse-glow" />
                    <span className="font-mono text-[10px] text-red-accent uppercase tracking-[0.2em]">Decrypted Briefing</span>
                  </div>
                  
                  <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white mb-2">{selectedProject.name}</h2>
                  <p className="font-body text-red-accent text-sm font-bold mb-12">{selectedProject.tagline}</p>

                  <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Architecture Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-12">
                    {selectedProject.stack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-bg-dark border border-glass rounded text-xs font-mono text-secondary">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Mission Links</h4>
                  <div className="space-y-3">
                    <a href={selectedProject.repo.url!} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 border border-glass bg-bg-dark hover:border-red-accent/50 group transition-all rounded">
                      <span className="font-mono text-xs text-white uppercase tracking-widest">Repository Source</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted group-hover:text-red-accent group-hover:translate-x-1 transition-all"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </a>
                    {selectedProject.liveUrl && (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 border border-red-accent/30 bg-red-accent/10 hover:bg-red-accent/20 group transition-all rounded">
                        <span className="font-mono text-xs text-red-accent uppercase tracking-widest">Live Deployment</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-accent group-hover:translate-x-1 transition-all"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content: Story / Highlights */}
              <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto max-h-[80vh] custom-scrollbar">
                <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Executive Summary</h4>
                <p className="text-lg text-secondary leading-relaxed font-body mb-12">
                  {selectedProject.description}
                </p>

                <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-6 border-b border-glass pb-2">Key Technical Achievements</h4>
                <ul className="space-y-6">
                  {selectedProject.highlights?.map((highlight, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded bg-bg-dark border border-glass flex items-center justify-center text-red-accent font-mono text-[10px]">
                        0{idx + 1}
                      </div>
                      <p className="text-white font-body leading-relaxed">{highlight}</p>
                    </li>
                  ))}
                </ul>

                {selectedProject.stages && (
                  <div className="mt-12">
                    <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-6 border-b border-glass pb-2">Lifecycle Tracking</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stages.map(stage => (
                        <div key={stage.index} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-glass bg-bg-dark">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent opacity-50" />
                          <span className="font-mono text-xs text-secondary">{stage.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
