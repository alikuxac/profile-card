export interface CvSkillGroup {
  label: string;
  items: string;
}

export interface CvExperience {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface CvProject {
  title: string;
  period?: string;
  bullets: string[];
}

export interface CvEducation {
  institution: string;
  period: string;
  degree: string;
}

export interface CvData {
  header: {
    name: string;
    title: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    phone: string;
  };
  summary: string;
  skills: CvSkillGroup[];
  experiences: CvExperience[];
  projects: CvProject[];
  education: CvEducation[];
}

export const cvData: CvData = {
  header: {
    name: "Alikuxac",
    title: "Backend & Systems Developer",
    location: "Ho Chi Minh City, Viet Nam",
    email: "son.letranxuan@gmail.com",
    github: "github.com/alikuxac",
    linkedin: "linkedin.com/in/alikuxac",
    phone: "Available upon request",
  },
  summary:
    "Backend and systems developer working with Java (JVM), TypeScript, and distributed architectures. Builds multi-platform server plugins, multi-loader mod architectures (Forge and NeoForge), custom Netty network payloads, and tiered database storage backed by memory caching. Ships open-source tools and backend services with verified production deployments.",
  skills: [
    {
      label: "Languages",
      items: "Java, Kotlin, TypeScript, JavaScript, Python, SQL",
    },
    {
      label: "Frameworks & Platforms",
      items:
        "Node.js, NestJS, Netty, Socket.io, Paper/Spigot API, Sponge API, NeoForge, Forge",
    },
    {
      label: "Databases & Cache",
      items: "MySQL, SQLite, PostgreSQL, MongoDB, Redis",
    },
    {
      label: "Cloud & DevOps",
      items:
        "Cloudflare (Workers, Pages, R2, D1), Linux/VPS, Docker, GitHub Actions (CI/CD)",
    },
    {
      label: "Tools & Build Systems",
      items: "Git, Gradle (multi-project), Jira, Confluence",
    },
  ],
  experiences: [
    {
      title: "Backend Developer",
      company: "Community Project",
      period: "03/2024 – 08/2024",
      bullets: [
        "Built REST APIs for web and game integrations with Node.js and TypeScript.",
        "Maintained Linux VPS environments, deployment pipelines, and server runtime configurations.",
      ],
    },
    {
      title: "Backend Planning & Research Intern",
      company: "Vietnam Blockchain Corporation",
      period: "09/2022 – 11/2022",
      bullets: [
        "Evaluated system requirements and drafted architecture proposals recommending NestJS for production services.",
        "Wrote module boundary specifications and database interface drafts for the engineering team.",
      ],
    },
  ],
  projects: [
    {
      title: "MachineMetrics — Multi-Loader Telemetry & Inspection Mod",
      bullets: [
        "Built a multi-loader inspection mod (Forge and NeoForge) using a shared Gradle module, polling tile entities without stalling server ticks.",
        "Implemented on-demand Netty packet sync to stream machine delta states only when inspected, minimizing network overhead.",
        "Shipped to CurseForge and Modrinth (50+ downloads) with automated GitHub Actions CI/CD release pipelines.",
      ],
    },
    {
      title: "Vortexia Core — Multi-Platform Server Infrastructure",
      bullets: [
        "Engineered a cross-platform core sharing validation and security rules across game servers (Paper, Sponge) and proxies (Velocity, BungeeCord).",
        "Implemented an in-game citizen identity system (CCCD) with unique IDs, PIN auth, and automated inventory rollbacks on disconnect.",
        "Built a pluggable storage layer (MySQL and SQLite) with in-memory caching and runtime extension loading without server restarts.",
      ],
    },
    {
      title: "Real-time Flood Relief Coordination Platform",
      period: "10/2025 – 01/2026",
      bullets: [
        "Built an API gateway and WebSocket service to process emergency SOS alerts and track rescue teams in real time.",
        "Integrated GeoJSON queries with the VietMap API for flood zone spatial lookups and automated shelter routing.",
      ],
    },
    {
      title: "Discord Incident Worker",
      bullets: [
        "Built a serverless monitor on Cloudflare Workers tracking Discord infrastructure incidents with automated webhook alerts.",
      ],
    },
  ],
  education: [
    {
      institution:
        "University of Transport and Communications Campus in Ho Chi Minh City (UTC2)",
      period: "2018 – 2026",
      degree: "Bachelor of Information Technology (Graduated)",
    },
  ],
};
