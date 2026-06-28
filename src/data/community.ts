// === DATA LAYER: Community & Open Source ===
// Source of truth: Master prompt §5

export interface CommunityItem {
  title: string;
  description: string;
  icon: string;
}

export const community: CommunityItem[] = [
  {
    title: "VGLUG Foundation Member",
    description:
      "Active student member of the Villupuram GNU/Linux User Group (VGLUG)",
    icon: "linux",
  },
  {
    title: "Workshops & Technical Talks",
    description:
      "Participated in workshops, technical talks, and community-driven development sprints",
    icon: "presentation",
  },
  {
    title: "Hacktoberfest Contributor",
    description:
      "Contributed to open-source repositories through DigitalOcean Hacktoberfest with merged pull requests",
    icon: "gitPullRequest",
  },
  {
    title: "Collaboration & Code Review",
    description:
      "Gained experience in collaboration, code review, and upstream contribution workflow",
    icon: "code",
  },
];
