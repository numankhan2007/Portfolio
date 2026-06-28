"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { allSkills } from "@/data/skills";

// Hardcoded positions for a beautiful spider-web layout (x, y percentages)
const nodeLayout = [
  { id: "HTML5", x: 50, y: 15, group: "frontend" },
  { id: "CSS3", x: 75, y: 25, group: "frontend" },
  { id: "JavaScript", x: 85, y: 50, group: "frontend" },
  { id: "Python", x: 75, y: 75, group: "backend" },
  { id: "FastAPI", x: 50, y: 85, group: "backend" },
  { id: "REST APIs", x: 25, y: 75, group: "backend" },
  { id: "PostgreSQL", x: 15, y: 50, group: "database" },
  { id: "Redis", x: 25, y: 25, group: "database" },
  { id: "Git", x: 35, y: 40, group: "tools" },
  { id: "GitHub", x: 65, y: 40, group: "tools" },
  { id: "VS Code", x: 65, y: 60, group: "tools" },
  { id: "Linux", x: 35, y: 60, group: "tools" },
];

// Define relationships (which nodes connect to which)
const connections = [
  ["HTML5", "CSS3"], ["CSS3", "JavaScript"], ["JavaScript", "HTML5"], // Frontend triangle
  ["Python", "FastAPI"], ["FastAPI", "REST APIs"], ["REST APIs", "Python"], // Backend triangle
  ["PostgreSQL", "Redis"], ["Python", "PostgreSQL"], ["FastAPI", "Redis"], // Data connections
  ["JavaScript", "REST APIs"], // Fullstack connection
  ["Git", "GitHub"], ["GitHub", "VS Code"], ["VS Code", "Linux"], ["Linux", "Git"], // Tools inner ring
  ["HTML5", "VS Code"], ["Python", "Linux"], ["JavaScript", "GitHub"] // Cross-ring connections
];

export function Skills() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Helper to check if a node is connected to the hovered node
  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode === nodeId) return true;
    return connections.some(c => (c[0] === nodeId && c[1] === hoveredNode) || (c[1] === nodeId && c[0] === hoveredNode));
  };

  return (
    <section id="skills" className="py-32 relative z-10 bg-transparent min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <SectionHeading title="Neural Network" eyebrow="03. COMBAT CAPABILITIES" align="center" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto aspect-square md:aspect-video rounded-3xl border border-glass bg-bg-panel/20 backdrop-blur-sm overflow-hidden flex items-center justify-center p-4">
        
        {/* Background Radar / Web Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[30%] h-[30%] md:w-[20%] md:h-[40%] rounded-full border border-blue-accent/30 animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[60%] h-[60%] md:w-[50%] md:h-[80%] rounded-full border border-red-accent/20 animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute w-[90%] h-[90%] md:w-[80%] md:h-[120%] rounded-full border border-blue-accent/10" />
        </div>

        {/* The SVG Connection Web */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(([sourceId, targetId], idx) => {
            const source = nodeLayout.find(n => n.id === sourceId);
            const target = nodeLayout.find(n => n.id === targetId);
            if (!source || !target) return null;

            const isHighlighted = hoveredNode && (
              (sourceId === hoveredNode && targetId === hoveredNode) || // Should not happen, but safe
              (sourceId === hoveredNode || targetId === hoveredNode)
            );
            
            const isDimmed = hoveredNode && !isHighlighted;

            return (
              <motion.line
                key={idx}
                x1={`${source.x}%`}
                y1={`${source.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={isHighlighted ? "rgba(230,36,41,0.8)" : "rgba(255,255,255,0.1)"}
                strokeWidth={isHighlighted ? 2 : 1}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: idx * 0.05 }}
                animate={{
                  opacity: isDimmed ? 0.05 : isHighlighted ? 1 : 0.4,
                }}
                className={isHighlighted ? "filter drop-shadow-[0_0_8px_rgba(230,36,41,0.8)]" : ""}
              />
            );
          })}
        </svg>

        {/* The Nodes */}
        {nodeLayout.map((node) => {
          const skillData = allSkills.find(s => s.name === node.id);
          const highlighted = hoveredNode === node.id;
          const connected = isConnected(node.id);
          const dimmed = hoveredNode && !connected;

          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep rounded-full"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onFocus={() => setHoveredNode(node.id)}
              onBlur={() => setHoveredNode(null)}
              tabIndex={0}
              role="button"
              aria-label={`Highlight relationships for ${node.id}`}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: Math.random() * 0.5 }}
              animate={{
                scale: highlighted ? 1.2 : connected ? 1.1 : 1,
                opacity: dimmed ? 0.3 : 1,
                zIndex: highlighted ? 50 : connected ? 40 : 10
              }}
            >
              <div className={`relative flex flex-col items-center group`}>
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center bg-bg-dark transition-all duration-300 ${
                  highlighted 
                    ? "border-red-accent shadow-[0_0_20px_rgba(230,36,41,0.6)]" 
                    : connected && hoveredNode
                      ? "border-blue-accent shadow-[0_0_15px_rgba(26,107,255,0.4)]"
                      : "border-glass hover:border-white/50"
                }`}>
                  {skillData?.icon ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={skillData.icon} alt={node.id} className={`w-6 h-6 md:w-8 md:h-8 object-contain transition-all duration-300 ${highlighted ? 'scale-110' : ''}`} />
                  ) : (
                    <span className={`font-mono font-bold text-lg md:text-xl ${highlighted ? 'text-red-accent' : 'text-white'}`}>{node.id.charAt(0)}</span>
                  )}
                </div>
                
                {/* Node Label */}
                <div className={`absolute top-full mt-2 font-mono text-[10px] md:text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                  highlighted ? "text-red-accent font-bold opacity-100" : connected && hoveredNode ? "text-blue-accent opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
                }`}>
                  {node.id}
                </div>
                
                {/* Ambient pulse when highlighted */}
                {highlighted && (
                  <motion.div 
                    layoutId="nodeHighlight"
                    className="absolute inset-0 rounded-full border border-red-accent pointer-events-none"
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Dynamic Info Panel below the network */}
      <div className="container mx-auto px-4 md:px-8 mt-12 flex justify-center">
        <div className="h-12 flex items-center justify-center">
          {hoveredNode ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-6 py-2 rounded-full border border-glass bg-bg-panel/50 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-red-accent animate-pulse-glow" />
              <span className="font-mono text-sm text-white tracking-widest uppercase">
                Accessing Node: <span className="text-red-accent font-bold">{hoveredNode}</span>
              </span>
            </motion.div>
          ) : (
            <div className="font-mono text-sm text-muted tracking-widest uppercase">
              Hover over a node to establish connection
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
