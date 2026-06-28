// === DATA LAYER: Education ===
// Source of truth: Master prompt §5 — 4 entries, verified

export interface EducationEntry {
  institution: string;
  program: string;
  years: string;
  result: string;
  isCurrent: boolean;
}

export const education: EducationEntry[] = [
  {
    institution: "Arignar Anna Govt. Arts College, Villupuram",
    program: "BCA",
    years: "2023–2026",
    result: "3rd Year (Pursuing)",
    isCurrent: true,
  },
  {
    institution: "Siga Higher Secondary School, Kappiyampuliyur",
    program: "Higher Secondary",
    years: "2022–2023",
    result: "84.3%",
    isCurrent: false,
  },
  {
    institution: "Siga Higher Secondary School, Kappiyampuliyur",
    program: "Secondary",
    years: "2021–2022",
    result: "76.67%",
    isCurrent: false,
  },
  {
    institution: "Evergreen English High School",
    program: "Schooling",
    years: "Completed 2021",
    result: "72.6%",
    isCurrent: false,
  },
];
