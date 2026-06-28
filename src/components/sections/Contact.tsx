"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/data/contact";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative z-10 bg-transparent section-fade-top">
      {/* Intense ambient lighting for the finale */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gradient-radial from-red-accent/10 via-red-accent/5 to-transparent pointer-events-none blur-3xl opacity-70" />
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-red-accent/30 bg-red-accent/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-red-accent animate-pulse-glow" />
            <span className="font-mono text-xs text-white tracking-[0.2em] uppercase">
              Secure Channel Open
            </span>
          </div>

          <h2 className="font-display text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tight uppercase">
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-accent to-red-dark">Contact</span>
          </h2>
          
          <p className="text-xl text-secondary mb-12 font-body max-w-2xl mx-auto leading-relaxed">
            Currently open for new opportunities. Whether you have a question, a project proposal, or just want to connect, my inbox is always monitored.
          </p>

          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-red-accent rounded opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity duration-300 pointer-events-none" />
            <a 
              href="mailto:m.numankhan2007@gmail.com"
              className="relative flex items-center gap-3 bg-red-accent text-white font-mono uppercase tracking-widest text-lg px-10 py-6 rounded shadow-[0_0_40px_rgba(230,36,41,0.3)] hover:shadow-[0_0_80px_rgba(230,36,41,0.6)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine pointer-events-none" />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Transmit Message
            </a>
          </div>
        </motion.div>

        {/* Social Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {contact.filter(c => c.type !== 'mailto').map((item) => (
            <motion.a
              key={item.label}
              variants={staggerItem}
              href={item.href}
              target={item.type === "external" ? "_blank" : "_self"}
              rel={item.type === "external" ? "noopener noreferrer" : ""}
              className="group flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-bg-panel/40 border border-glass backdrop-blur-md hover:bg-bg-elevated hover:border-red-accent/40 hover:shadow-[0_0_30px_rgba(230,36,41,0.1)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-accent"
              aria-label={`Visit my ${item.label}`}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-bg-dark border border-glass text-muted group-hover:text-red-accent group-hover:border-red-accent/30 group-hover:bg-red-accent/5 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.type === "tel" ? (
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  ) : item.label === "GitHub" ? (
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  ) : item.label === "LinkedIn" ? (
                    <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></>
                  ) : item.label === "Instagram" ? (
                    <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>
                  ) : (
                    <><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></>
                  )}
                </svg>
              </div>
              <span className="font-mono text-sm uppercase tracking-widest font-bold text-secondary group-hover:text-white transition-colors">
                {item.label === item.href.replace("tel:", "") ? "Direct Line" : item.label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
      
      {/* Cinematic Skyline Continuation */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-64 pointer-events-none overflow-hidden opacity-30 mix-blend-screen z-0">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full fill-current text-red-accent/20">
          <path d="M0,100 L0,80 L20,80 L20,40 L40,40 L40,70 L60,70 L60,30 L80,30 L80,60 L120,60 L120,20 L150,20 L150,50 L200,50 L200,10 L250,10 L250,45 L300,45 L300,25 L350,25 L350,65 L400,65 L400,35 L450,35 L450,85 L500,85 L500,15 L550,15 L550,55 L600,55 L600,25 L650,25 L650,75 L700,75 L700,45 L750,45 L750,15 L800,15 L800,50 L850,50 L850,30 L900,30 L900,60 L950,60 L950,20 L1000,20 L1000,100 Z" />
        </svg>
      </div>
    </section>
  );
}
