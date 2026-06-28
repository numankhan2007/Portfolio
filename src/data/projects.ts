// === DATA LAYER: Projects ===
// Source of truth: Master prompt §5 + user-verified repo URLs

export interface ProjectLink {
  url: string | null;
  verified: boolean;
}

export interface ProjectStage {
  label: string;
  index: number;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  repo: ProjectLink;
  stages?: ProjectStage[];
  screenshot?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "unimart",
    name: "UNIMART",
    tagline: "Identity-Verified Campus Marketplace",
    description:
      "A full-stack, identity-verified campus marketplace where only registry-confirmed students can trade goods, reducing fraud and scams.",
    highlights: [
      "Multi-step registration pipeline with CSV master-registry verification and SMTP OTP authentication",
      "4-stage order lifecycle: Pending → Confirmed → Completed/Cancelled",
      "OTP-based physical delivery verification",
      "Matrix-themed admin panel with analytics, moderation, suspension controls, and audit logging",
      "JWT + refresh token auth",
      "Real-time per-order chat with 24-hour deletion after completion",
      "Redis-backed rate limiting",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "JWT", "SMTP"],
    repo: {
      url: "https://github.com/numankhan2007/UNIMART",
      verified: true,
    },
    stages: [
      { label: "Pending", index: 1 },
      { label: "Confirmed", index: 2 },
      { label: "Completed", index: 3 },
      { label: "Cancelled", index: 4 },
    ],
  },
  {
    slug: "careeros",
    name: "CareerOS",
    tagline: "Career Management SaaS Platform",
    description:
      "A modern SaaS platform for students to discover, track, and manage internships and hackathons.",
    highlights: [
      "5-stage Kanban tracker: Not Applied → Applied → Interview → Rejected → Selected",
      "Interactive analytics dashboard with timeline charts and status distribution",
      "Tag-based recommendation engine that scores opportunities against the skill profile",
      "Secure httpOnly cookie sessions with JWT and bcrypt password hashing",
      "401 auto-interceptor for token refresh",
    ],
    stack: ["JavaScript", "REST APIs", "JWT", "bcrypt"],
    repo: {
      url: "https://github.com/numankhan2007/CareerOS",
      verified: true,
    },
    stages: [
      { label: "Not Applied", index: 1 },
      { label: "Applied", index: 2 },
      { label: "Interview", index: 3 },
      { label: "Rejected", index: 4 },
      { label: "Selected", index: 5 },
    ],
  },
  {
    slug: "sharenova",
    name: "ShareNova",
    tagline: "Secure Digital Sharing Platform",
    description:
      "A next-generation platform for secure, seamless transfer of files, media, and sensitive data across devices and users.",
    highlights: [
      "Secure file transfer modules supporting documents, videos, audio, and encrypted payloads",
      "Cross-platform sharing workflows with real-time transfer status",
      "Access control mechanisms",
    ],
    stack: ["JavaScript", "REST APIs", "Encryption"],
    repo: {
      url: "https://github.com/numankhan2007/ShareNova",
      verified: true,
    },
  },
];

export const GITHUB_PROFILE = "https://github.com/numankhan2007";
