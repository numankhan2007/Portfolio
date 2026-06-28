"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { identity } from "@/data/contact";
import { staggerContainer, staggerItem } from "@/lib/motion";

/* ─── Web Particle Canvas ─── */
function WebCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number; size: number; alpha: number;
  }>>([]);
  const rafRef = useRef<number>(0);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 12000), 80);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * Math.min(window.devicePixelRatio, 1.5);
      canvas.height = h * Math.min(window.devicePixelRatio, 1.5);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(Math.min(window.devicePixelRatio, 1.5), Math.min(window.devicePixelRatio, 1.5));
      initParticles(w, h);
    };

    resize();

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / w;
      mouseRef.current.y = e.clientY / h;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x * w;
      const my = mouseRef.current.y * h;
      const particles = particlesRef.current;

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 36, 41, ${p.alpha})`;
        ctx.fill();
      }

      // Draw web connections
      const connectionDist = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(230, 36, 41, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse attraction web lines
        const dxm = particles[i].x - mx;
        const dym = particles[i].y - my;
        const distm = Math.sqrt(dxm * dxm + dym * dym);
        if (distm < 300) {
          const alpha = (1 - distm / 300) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(230, 36, 41, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      draw();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ─── Hero Section ─── */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-transparent"
    >
      {/* Particle Web Canvas */}
      <WebCanvas />

      {/* Ambient lighting orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-red-accent/15 via-red-accent/5 to-transparent rounded-full blur-[100px] pointer-events-none animate-float mix-blend-screen" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-blue-accent/15 via-blue-accent/5 to-transparent rounded-full blur-[100px] pointer-events-none animate-float mix-blend-screen" style={{ animationDelay: "-3s" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" style={{ transform: "perspective(1000px) rotateX(60deg) scale(2) translateY(20%)" }} />

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg-deep via-bg-deep/80 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ y: yText, opacity: opacityText, scale: scaleText }}
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div variants={staggerItem} className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-red-accent/20 bg-red-accent/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-accent animate-pulse-glow" />
              <span className="font-mono text-xs text-red-accent tracking-[0.15em] uppercase">
                Web-Slinging Protocol Initiated
              </span>
            </div>
          </motion.div>

          {/* Name — massive cinematic type */}
          <motion.div variants={staggerItem}>
            <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] tracking-tighter leading-[0.85] mb-2 uppercase">
              <span className="block text-foreground">
                {identity.name.split(" ")[0]}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-accent via-red-bright to-blue-accent">
                {identity.name.split(" ")[1] || ""}
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={staggerItem} className="mt-6 md:mt-8">
            <p className="font-body text-secondary text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
              {identity.role}
              <span className="text-muted"> — crafting the next generation of interactive web experiences.</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="mt-12 flex flex-wrap gap-6 items-center">
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-red-accent text-white font-mono uppercase tracking-widest text-sm rounded hover:bg-red-bright transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              <span className="relative z-10 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                Access Archives
              </span>
            </a>
            
            <a
              href="#contact"
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-accent group-hover:animate-pulse-glow" />
              Initiate Contact
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ opacity: [0.3, 0.7, 0.3], y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] text-muted tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-red-accent/60 to-transparent" />
      </motion.div>
    </section>
  );
}
