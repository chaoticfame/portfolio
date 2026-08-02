import {
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  IDENTITY                                                                  */
/* -------------------------------------------------------------------------- */

export const profile = {
  handle: "chaoticfame",
  name: "Demi Elago",
  role: "Full-Stack Developer & Software Engineer",
  location: "Available for collaboration",
  headline:
    "Software Engineer building robust backend structures, desktop applications, and data-driven systems.",
  focus: "Focused on code integrity and scalable architectures.",
  narrative:
    "I treat academic work and repository builds as production-grade implementations — enforcing clean git workflows, relational data integrity, and zero-overhead client interfaces across every layer of the stack.",
  email: "aaelago@gmail.com",
} as const;

/* -------------------------------------------------------------------------- */
/*  ABOUT PAGE                                                                */
/* -------------------------------------------------------------------------- */

export const about = {
  /** Optimized (WebP) portrait served via next/image. Regenerate with:
   *  node scripts/optimize-portrait.mjs  (reads public/portrait.png). */
  portrait: "/portrait.webp",
  /** Shown as a placeholder until a real photo is added. */
  initials: "DE",
  displayName: "Demi Elago",
  paragraphs: [
    "I'm an upcoming third year and an aspiring full-stack developer and software engineer. I build desktop applications, full-stack web platforms, and data-driven systems — with a deep focus on backend logic and relational database architecture.",
    "These days I'm going deeper into cybersecurity, AI/ML infrastructure, and AI Engineering. I treat every academic build like production: clean git workflows, strict version control, and interfaces with zero overhead.",
    "I love turning rough ideas into structured systems that actually hold up under real use.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  SOCIAL / DIRECT LINKS                                                     */
/* -------------------------------------------------------------------------- */

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    handle: "chaoticfame",
    href: "https://github.com/chaoticfame",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "Anton Demetrio Elago",
    href: "https://www.linkedin.com/in/anton-demetrio-elago-b3a167201/",
    icon: Linkedin,
  },
  {
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
];

/* -------------------------------------------------------------------------- */
/*  HERO METRICS                                                              */
/* -------------------------------------------------------------------------- */

export type Metric = {
  value: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: "2+", label: "Yrs. Architecture" },
  { value: "Full-Stack", label: "Engineering" },
  { value: "Git", label: "Workflows" },
  { value: "10+", label: "Tech Proficiencies" },
];

/* -------------------------------------------------------------------------- */
/*  PROJECTS                                                                  */
/* -------------------------------------------------------------------------- */

export type Project = {
  id: string;
  name: string;
  category: string;
  year: string;
  stack: string[];
  summary: string;
  /** Highlighted technical achievements, structured for scannability. */
  highlights: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "kiroku",
    name: "Kiroku",
    category: "Manga Tracker Desktop App",
    year: "2025",
    stack: ["Java Swing", "SQLite", "Git", "IntelliJ IDEA"],
    summary:
      "Architected a dedicated desktop tracking application with high-performance local persistence.",
    highlights: [
      "Integrated **structured relational data models** via **SQLite** to guarantee high-performance local data persistence and eliminate manual data handling.",
      "Optimized structural layout rendering to ship a responsive, **zero-overhead client interface** in **Java Swing**.",
      "Maintained a clean **Git** history in **IntelliJ IDEA** with disciplined commit hygiene.",
    ],
    repo: "https://github.com/chaoticfame",
  },
  {
    id: "jojos-bizarre-coffee",
    name: "JoJo's Bizarre Coffee",
    category: "Full-Stack Web Platform",
    year: "2025",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    summary:
      "Engineered an end-to-end dynamic e-commerce web architecture with clean server-side logic.",
    highlights: [
      "Designed **relational database schemas** in **MySQL** and integrated clean **backend transaction logic** to manage user sessions and state.",
      "Built dynamic, server-rendered views in **PHP** wired to an interactive **JavaScript** front end.",
      "Actively troubleshot application logic to maintain a **seamless, fully debugged** user experience.",
    ],
    repo: "https://github.com/chaoticfame",
  },
  {
    id: "hello-sage",
    name: "Hello Sage",
    category: "Academic Repository Ecosystem",
    year: "2024",
    stack: ["Git", "GitHub Ecosystem", "Markdown", "Core Programming"],
    summary:
      "Curated a comprehensive repository transitioning academic workflows into open-source assets.",
    highlights: [
      "Enforced strict **version control practices**, **branch separation**, and semantic code identifier refactoring.",
      "Transformed academic workflows into **structured open-source assets** with thorough **Markdown** documentation.",
      "Maintained **production-ready collaborative environments** across the GitHub ecosystem.",
    ],
    repo: "https://github.com/chaoticfame",
  },
];

/* -------------------------------------------------------------------------- */
/*  TECH STACK — modular engineering blocks                                   */
/* -------------------------------------------------------------------------- */

export type TechGroup = {
  title: string;
  index: string;
  items: string[];
};

export const techGroups: TechGroup[] = [
  {
    index: "A",
    title: "Languages",
    items: ["Java", "Python", "C++", "C"],
  },
  {
    index: "B",
    title: "Web & Backend",
    items: ["PHP", "JavaScript", "HTML", "CSS", "RESTful Architectures"],
  },
  {
    index: "C",
    title: "Database & Storage",
    items: ["MySQL", "SQLite", "Relational Database Modeling"],
  },
  {
    index: "D",
    title: "Developer Workflows",
    items: [
      "Git",
      "GitHub",
      "IntelliJ IDEA",
      "Automated Debugging",
      "Virtual Machines (openSUSE Linux)",
    ],
  },
  {
    index: "E",
    title: "Core Focus Areas",
    items: [
      "Cybersecurity Protocols",
      "Threat Mitigation",
      "AI / ML Infrastructure",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  GITHUB FOOTPRINT — mock activity board                                    */
/* -------------------------------------------------------------------------- */

export type RepoCard = {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updated: string;
};

export const repoCards: RepoCard[] = [
  {
    name: "kiroku",
    description: "Java Swing manga tracker with a local SQLite persistence layer.",
    language: "Java",
    languageColor: "#b07219",
    stars: 12,
    forks: 3,
    updated: "2 days ago",
  },
  {
    name: "jojos-bizarre-coffee",
    description: "Full-stack PHP + MySQL e-commerce platform with session management.",
    language: "PHP",
    languageColor: "#4F5D95",
    stars: 9,
    forks: 2,
    updated: "1 week ago",
  },
  {
    name: "hello-sage",
    description: "Curated academic repository ecosystem with strict version control.",
    language: "Markdown",
    languageColor: "#083fa1",
    stars: 6,
    forks: 1,
    updated: "3 weeks ago",
  },
];

export type CommitEntry = {
  hash: string;
  message: string;
  branch: string;
  time: string;
};

export const recentCommits: CommitEntry[] = [
  {
    hash: "a3f9c21",
    message: "feat(db): add indexed lookup for tracker entries",
    branch: "main",
    time: "12h",
  },
  {
    hash: "7e1b4d0",
    message: "refactor(ui): extract reusable panel primitives",
    branch: "feature/ui-pass",
    time: "1d",
  },
  {
    hash: "c0d52 af",
    message: "fix(auth): patch session state race condition",
    branch: "hotfix/session",
    time: "3d",
  },
  {
    hash: "9b820e4",
    message: "chore(repo): enforce semantic branch separation",
    branch: "main",
    time: "5d",
  },
];

export const contributionStats = [
  { label: "Commits / yr", value: "480+" },
  { label: "Active Repos", value: "12" },
  { label: "Longest Streak", value: "31d" },
  { label: "Pull Requests", value: "60+" },
];

/* -------------------------------------------------------------------------- */
/*  SECTION REGISTRY — numeric indexing                                       */
/* -------------------------------------------------------------------------- */

export const sections = [
  { id: "overview", index: "01", label: "Overview" },
  { id: "projects", index: "02", label: "Production Projects" },
  { id: "stack", index: "03", label: "Engineering Competencies" },
  { id: "activity", index: "04", label: "Open Source Activity" },
] as const;
