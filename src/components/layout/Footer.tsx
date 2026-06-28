"use client";

import { motion } from "framer-motion";
import { contact, identity } from "@/data/contact";
import { fadeUpVariants } from "@/lib/motion";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socials = contact.filter((link) => link.type === "external");

  return (
    <footer className="relative z-10 overflow-hidden">
      {/* Skyline silhouette top border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-accent/30 to-transparent" />
      
      <div className="relative bg-bg-deep py-16">
        {/* Ambient city glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-red-accent/5 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            {/* Brand mark */}
            <span className="font-display text-3xl font-black text-foreground mb-4">
              NK<span className="text-red-accent">.</span>
            </span>
            
            <p className="text-secondary text-sm max-w-md mb-8">
              {identity.name} — {identity.role}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-glass text-sm text-muted hover:text-foreground hover:border-red-accent/40 hover:bg-white/5 transition-all duration-300"
                  aria-label={`Visit ${link.label}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-glass flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
            <p>© {currentYear} {identity.name}. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Built with
              <span className="text-red-accent">♦</span>
              Next.js, Tailwind & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
