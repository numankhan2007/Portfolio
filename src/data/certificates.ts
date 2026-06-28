// === DATA LAYER: Certificates Gallery ===
// Source of truth: Master prompt §7.8
// Build-time manifest generator for the CERTIFICATE/ folder
// Supports optional sidecar JSON (<filename>.json)

export interface CertificateItem {
  filename: string;
  title: string;
  issuer?: string;
  date?: string;
  category: string;
  relatedCertification?: string;
  thumbnailPath: string;
}

// Sidecar JSON shape (optional file alongside each certificate)
export interface CertificateSidecar {
  title?: string;
  issuer?: string;
  date?: string;
  category?: string;
  relatedCertification?: string;
}

/**
 * Derive a human-readable title from a filename.
 * "NM -Web development.pdf" → "NM Web Development"
 */
function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "") // remove extension
    .replace(/[-_]+/g, " ") // dashes/underscores → spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase split
    .replace(/\s+/g, " ") // collapse whitespace
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Static certificate data — generated from analyzing the CERTIFICATE/ folder.
 * In production this could be generated at build time via a script reading fs.
 * For now, we pre-populate from the known file listing.
 */
export const certificates: CertificateItem[] = [
  {
    filename: "IBMDesign20250830-31-9xzql1.pdf",
    title: "IBM Enterprise Design Thinking — Practitioner",
    issuer: "IBM",
    category: "Design Thinking",
    relatedCertification: "Professional Development Program",
    thumbnailPath: "/certificates/IBMDesign20250830-31-9xzql1.png",
  },
  {
    filename: "IBMDesign20260615-31-ubb4w2.pdf",
    title: "IBM Enterprise Design Thinking — Co-Creator",
    issuer: "IBM",
    category: "Design Thinking",
    relatedCertification: "Professional Development Program",
    thumbnailPath: "/certificates/IBMDesign20260615-31-ubb4w2.png",
  },
  {
    filename: "NM -Web development.pdf",
    title: "Web Application Development",
    issuer: "Govt. of Tamil Nadu — Naan Mudhalvan",
    category: "Web Development",
    relatedCertification: "Naan Mudhalvan",
    thumbnailPath: "/certificates/NM -Web development.png",
  },
  {
    filename: "NM_Certificate.pdf",
    title: "Naan Mudhalvan Program Certificate",
    issuer: "Govt. of Tamil Nadu",
    category: "Web Development",
    relatedCertification: "Naan Mudhalvan",
    thumbnailPath: "/certificates/NM_Certificate.png",
  },
  {
    filename: "FULL STACK DEVELOPMENT.pdf",
    title: "Full Stack Development",
    issuer: "Professional Development",
    category: "Full Stack",
    thumbnailPath: "/certificates/FULL STACK DEVELOPMENT.png",
  },
  {
    filename: "Simplilearn Certificate.pdf",
    title: "Introduction to Software Development",
    issuer: "Simplilearn SkillUp",
    category: "Software Development",
    relatedCertification: "Industry Skills Certification",
    thumbnailPath: "/certificates/Simplilearn Certificate.png",
  },
  {
    filename: "Certificate.pdf",
    title: "Technical Certificate",
    category: "Uncategorized",
    thumbnailPath: "/certificates/Certificate.png",
  },
  {
    filename: "NUMAN KHAN.pdf",
    title: "Numan Khan — Certificate",
    category: "Uncategorized",
    thumbnailPath: "/certificates/NUMAN KHAN.png",
  },
  {
    filename: "Forage.pdf",
    title: "Forage Virtual Experience",
    issuer: "Forage",
    category: "Virtual Experience",
    thumbnailPath: "/certificates/Forage.png",
  },
  {
    filename: "AI work tools.pdf",
    title: "AI Work Tools",
    category: "AI & Productivity",
    thumbnailPath: "/certificates/AI work tools.png",
  },
  {
    filename: "Excel using AI workshop.pdf",
    title: "Excel Using AI Workshop",
    category: "AI & Productivity",
    thumbnailPath: "/certificates/Excel using AI workshop.png",
  },
  {
    filename: "Power BI.pdf",
    title: "Power BI",
    issuer: "Microsoft",
    category: "Data & Analytics",
    thumbnailPath: "/certificates/Power BI.png",
  },
  {
    filename: "ATS-RESUME.pdf",
    title: "ATS Resume Building",
    category: "Professional Development",
    thumbnailPath: "/certificates/ATS-RESUME.png",
  },
  {
    filename: "MODERN-RESUME.pdf",
    title: "Modern Resume Building",
    category: "Professional Development",
    thumbnailPath: "/certificates/MODERN-RESUME.png",
  },
];

/** Get certificates grouped by category */
export function getCertificatesByCategory(): Record<string, CertificateItem[]> {
  const grouped: Record<string, CertificateItem[]> = {};
  for (const cert of certificates) {
    if (!grouped[cert.category]) {
      grouped[cert.category] = [];
    }
    grouped[cert.category].push(cert);
  }
  return grouped;
}

/** Find certificate(s) related to a certification program name */
export function findRelatedCertificates(
  certificationProgram: string
): CertificateItem[] {
  return certificates.filter(
    (c) => c.relatedCertification === certificationProgram
  );
}

// Re-export the utility
export { titleFromFilename };
