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
  skills: CvSkillGroup[];
  experiences: CvExperience[];
  projects: CvProject[];
  education: CvEducation[];
}

export const cvData: CvData = {
  header: {
    name: "Alikuxac",
    title: "Backend Developer",
    location: "Ho Chi Minh City, Viet Nam",
    email: "contact@alikuxac.xyz",
    github: "github.com/alikuxac",
    linkedin: "linkedin.com/in/alikuxac",
    phone: "Available upon request",
  },
  skills: [
    {
      label: "Languages & Runtimes",
      items: "TypeScript, JavaScript, Python, Kotlin, Node.js",
    },
    {
      label: "Frameworks",
      items: "NestJS, Next.js, Socket.io",
    },
    {
      label: "Cloud & Infrastructure",
      items: "Cloudflare (Workers, Pages, R2, D1, Tunnels, Zero Trust), VPS, Docker",
    },
    {
      label: "Databases",
      items: "PostgreSQL, MongoDB, MySQL, Redis, Cloudflare D1",
    },
    {
      label: "Tools",
      items: "Git, GitHub, Turborepo, Jira, Confluence, Agile/Scrum",
    },
  ],
  experiences: [
    {
      title: "Backend Developer",
      company: "Community Project",
      period: "03/2024 – 08/2024",
      bullets: [
        "Developed Web and Game APIs with Node.js and TypeScript.",
        "Maintained server infrastructure and managed deployment pipelines.",
      ],
    },
    {
      title: "Backend Planning & Research Intern",
      company: "Vietnam Blockchain Corporation",
      period: "09/2022 – 11/2022",
      bullets: [
        "Researched architectures and successfully advocated NestJS as core framework.",
        "Authored initial module specifications and system design documentation.",
      ],
    },
  ],
  projects: [
    {
      title: "Real-time Flood Relief Coordination & SOS Platform",
      period: "10/2025 – 01/2026",
      bullets: [
        "High-availability WebSocket gateway for real-time SOS tracking with VietMap API.",
      ],
    },
    {
      title: "Personal Ops & Autonomous Agent Infrastructure",
      bullets: [
        "Edge-native Turborepo monorepo with custom MCP toolkits and Cloudflare Workers.",
      ],
    },
    {
      title: "Personal Serverless Temp Mail",
      bullets: [
        "Edge-based disposable email service with MIME inbound parsing and automated TTL purge.",
      ],
    },
  ],
  education: [
    {
      institution: "University of Transport and Communication Campus In Ho Chi Minh City",
      period: "2018 – 2026",
      degree: "B.S. in Information Technology",
    },
  ],
};
