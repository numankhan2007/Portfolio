// === DATA LAYER: Contact ===
// Source of truth: Master prompt §5 — use exactly as written

export interface ContactLink {
  label: string;
  href: string;
  type: "tel" | "mailto" | "external";
  icon: string; // icon identifier for rendering
}

export const contact: ContactLink[] = [
  {
    label: "+91 8610264946",
    href: "tel:+918610264946",
    type: "tel",
    icon: "phone",
  },
  {
    label: "m.numankhan2007@gmail.com",
    href: "mailto:m.numankhan2007@gmail.com",
    type: "mailto",
    icon: "mail",
  },
  {
    label: "GitHub",
    href: "https://github.com/numankhan2007",
    type: "external",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/numan-khan-a5396937b",
    type: "external",
    icon: "linkedin",
  },
  {
    label: "Portfolio",
    href: "https://numankhan2007.github.io/Portfolio",
    type: "external",
    icon: "globe",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/__mr_naruto_uzumaki__",
    type: "external",
    icon: "instagram",
  },
];

export const identity = {
  name: "Numan Khan",
  role: "BCA Student · Full-Stack Developer · Open-Source Contributor",
  location: "Villupuram, India",
} as const;

export const professionalSummary = [
  "Numan Khan is a 3rd-year BCA student and a self-taught full stack web developer focused on building practical, production-oriented web applications.",
  "His work emphasizes hands-on development, open-source contribution, Linux-based workflows, and community participation through the VGLUG Foundation.",
  "He enjoys solving real-world problems through code, collaborating with teams, and continuously improving technical depth.",
];

export const languages = [
  { level: "Native speaker", proficiency: "Proficient" },
  { level: "Additional language", proficiency: "Proficient conversational" },
];
