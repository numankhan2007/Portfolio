"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Community", href: "#open-source" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [motionActive, setMotionActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((link) => link.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  const toggleMotion = () => {
    if (reducedMotion) return;
    const nextState = !motionActive;
    setMotionActive(nextState);
    window.dispatchEvent(
      new CustomEvent("portfolio:swarm", { detail: { active: nextState } })
    );
  };

  const motionButton = (
    <button
      type="button"
      onClick={toggleMotion}
      disabled={reducedMotion}
      aria-pressed={motionActive}
      aria-label={reducedMotion ? "Motion disabled by reduced-motion setting" : motionActive ? "Turn Motion effect off" : "Turn Motion effect on"}
      title={reducedMotion ? "Motion is disabled by your reduced-motion preference" : motionActive ? "Turn Motion off" : "Activate Motion"}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-accent ${
        motionActive
          ? "border-red-accent/60 bg-red-accent/15 text-white shadow-[0_0_22px_rgba(230,36,41,0.2)]"
          : "border-glass bg-white/[0.03] text-muted hover:border-red-accent/40 hover:text-foreground"
      } ${reducedMotion ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <span className="relative flex h-2 w-2">
        {motionActive && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-accent opacity-70" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            motionActive ? "bg-red-accent" : "bg-muted"
          }`}
        />
      </span>
      {reducedMotion ? "Motion reduced" : "Motion"}
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6 ${
            scrolled
              ? "bg-bg-dark/80 backdrop-blur-xl border border-glass shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          <a
            href="#hero"
            className="relative group font-display text-xl font-black text-foreground transition-colors hover:text-red-accent"
            aria-label="Scroll to top"
          >
            NK<span className="text-red-accent">.</span>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-accent transition-all duration-300 group-hover:w-full" />
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? "text-foreground"
                    : "text-muted hover:text-secondary"
                }`}
              >
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-lg border border-glass bg-white/5"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">{motionButton}</div>
            <button
              className="p-2 text-foreground md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <div className="relative flex h-5 w-6 flex-col justify-between">
                <span className={`h-0.5 w-full origin-center rounded bg-current transition-all duration-300 ${
                  isOpen ? "translate-y-[9px] rotate-45" : ""
                }`} />
                <span
                  className={`h-0.5 w-full rounded bg-current transition-all duration-300 ${
                    isOpen ? "scale-0 opacity-0" : ""
                  }`}
                />
                <span className={`h-0.5 w-full origin-center rounded bg-current transition-all duration-300 ${
                  isOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-full mt-2 rounded-2xl border border-glass bg-bg-panel/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="mb-3 flex items-center justify-between border-b border-glass px-2 pb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Interactive effects
              </span>
              {motionButton}
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl p-3 text-base font-medium transition-all ${
                    activeSection === link.href.substring(1)
                      ? "border border-glass bg-white/5 text-foreground"
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
