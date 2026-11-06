"use client";

import { useEffect, useRef } from "react";

type Agent = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  radius: number;
  hue: number;
  targetIndex: number;
  trail: Array<{ x: number; y: number }>;
};

const COLORS = [0, 8, 188, 198, 212];

function createAgent(width: number, height: number, index: number): Agent {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: 0,
    speed: 1.1 + Math.random() * 1.8,
    radius: 1.1 + Math.random() * 1.7,
    hue: COLORS[index % COLORS.length],
    targetIndex: index,
    trail: [],
  };
}

function getTargets(width: number, height: number) {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(
      "main h1, main h2, main h3, main a, main button, main article, main [data-motion-target]"
    )
  );

  const targets = elements
    .map((element) => {
      const rect = element.getBoundingClientRect();
      if (
        rect.width < 8 ||
        rect.height < 8 ||
        rect.bottom < -100 ||
        rect.top > height + 100 ||
        rect.right < 0 ||
        rect.left > width
      ) {
        return null;
      }

      return {
        x: Math.max(8, Math.min(width - 8, rect.left + rect.width * Math.random())),
        y: Math.max(8, Math.min(height - 8, rect.top + rect.height * Math.random())),
      };
    })
    .filter((point): point is { x: number; y: number } => point !== null);

  if (targets.length) return targets;

  return Array.from({ length: 24 }, (_, index) => ({
    x: width * (0.12 + (index % 6) * 0.15),
    y: height * (0.2 + Math.floor(index / 6) * 0.2),
  }));
}

/**
 * An original, decorative canvas swarm inspired by collaborative cursor motion.
 * It never hides, clones, or intercepts the portfolio DOM.
 */
export function SwarmMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    let active = false;
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let agents: Agent[] = [];
    let targets: Array<{ x: number; y: number }> = [];
    let lastTargetRefresh = 0;
    let lastFrame = 0;

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      targets = getTargets(width, height);
      agents = Array.from({ length: width < 640 ? 18 : 30 }, (_, index) =>
        createAgent(width, height, index)
      );
      context.clearRect(0, 0, width, height);
    };

    const draw = (timestamp: number) => {
      if (!active) return;
      const delta = Math.min((timestamp - (lastFrame || timestamp)) / 16.67, 2.2);
      lastFrame = timestamp;

      if (timestamp - lastTargetRefresh > 1800) {
        targets = getTargets(width, height);
        lastTargetRefresh = timestamp;
      }

      // A subtle decay leaves short motion trails without tinting the page.
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.105)";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      agents.forEach((agent, index) => {
        if (!targets.length) return;
        let target = targets[agent.targetIndex % targets.length];
        let dx = target.x - agent.x;
        let dy = target.y - agent.y;
        let distance = Math.hypot(dx, dy);

        if (distance < 18) {
          agent.targetIndex = (agent.targetIndex + 1 + (index % 3)) % targets.length;
          target = targets[agent.targetIndex];
          dx = target.x - agent.x;
          dy = target.y - agent.y;
          distance = Math.hypot(dx, dy);
        }

        const pull = 0.018 * delta;
        agent.vx += (dx / Math.max(distance, 1)) * pull * agent.speed;
        agent.vy += (dy / Math.max(distance, 1)) * pull * agent.speed;

        // Keep the movement organic, while damping velocity for stable rendering.
        agent.vx += Math.sin(timestamp * 0.0012 + index) * 0.018 * delta;
        agent.vy += Math.cos(timestamp * 0.001 + index * 1.7) * 0.018 * delta;
        agent.vx *= 0.982;
        agent.vy *= 0.982;

        const maxSpeed = 2.5 + agent.speed;
        const velocity = Math.hypot(agent.vx, agent.vy);
        if (velocity > maxSpeed) {
          agent.vx = (agent.vx / velocity) * maxSpeed;
          agent.vy = (agent.vy / velocity) * maxSpeed;
        }

        agent.x += agent.vx * delta;
        agent.y += agent.vy * delta;
        agent.trail.push({ x: agent.x, y: agent.y });
        if (agent.trail.length > 10) agent.trail.shift();

        const color = `hsla(${agent.hue}, 100%, ${agent.hue > 150 ? 66 : 62}%,`;
        if (agent.trail.length > 1) {
          context.beginPath();
          context.moveTo(agent.trail[0].x, agent.trail[0].y);
          for (let i = 1; i < agent.trail.length; i += 1) {
            context.lineTo(agent.trail[i].x, agent.trail[i].y);
          }
          context.strokeStyle = `${color}0.34)`;
          context.lineWidth = agent.radius * 1.1;
          context.lineCap = "round";
          context.stroke();
        }

        context.beginPath();
        context.arc(agent.x, agent.y, agent.radius, 0, Math.PI * 2);
        context.fillStyle = `${color}0.95)`;
        context.shadowBlur = 13;
        context.shadowColor = `${color}0.55)`;
        context.fill();
      });

      context.shadowBlur = 0;
      context.globalCompositeOperation = "source-over";
      frame = window.requestAnimationFrame(draw);
    };

    const handleMotion = (event: Event) => {
      const customEvent = event as CustomEvent<{ active: boolean }>;
      active = Boolean(customEvent.detail?.active);

      if (active) {
        resize();
        lastFrame = 0;
        lastTargetRefresh = 0;
        canvas.dataset.active = "true";
        frame = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(frame);
        canvas.dataset.active = "false";
        context.clearRect(0, 0, width, height);
      }
    };

    window.addEventListener("portfolio:swarm", handleMotion);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("portfolio:swarm", handleMotion);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="swarm-motion-canvas"
      data-active="false"
    />
  );
}
