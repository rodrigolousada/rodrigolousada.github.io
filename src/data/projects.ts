export interface CareerStop {
  org: string;
  logo: string;
  logoScale?: number;
  chipClass: string;
  period: string;
  role: string;
  kpis: string[];
  projects: string[];
  stack: string[];
  // Self-assessed focus split (%, sums to 100) by focus-category id — see data/focus.ts
  focus: Record<string, number>;
}

export const careerPath: CareerStop[] = [
  {
    org: 'Instituto de Telecomunicações',
    logo: '/img/it-logo.png',
    chipClass: 'bg-white',
    period: '2018 — 2020',
    role: 'Thesis Researcher / Data Scientist',
    kpis: ['48%+ decision accuracy', '100% Return on Risk', '1.90 Sharpe ratio'],
    projects: ['ML trading simulator for SPY options — Mixture of Experts model using Random Forests'],
    stack: ['Python', 'Random Forests', 'Time Series', 'scikit-learn'],
    focus: { pm: 5, swe: 15, analytics: 10, de: 10, ds: 60 },
  },
  {
    org: 'IBM Consulting',
    logo: '/img/ibm-logo.png',
    chipClass: 'bg-gradient-to-br from-sky-500/30 via-blue-500/10 to-transparent',
    period: '2020 — 2024',
    role: 'Consulting Lead — led a 4–6 person team across 2 concurrent teams',
    kpis: ['Doubled FTE savings', '70% workload cut via automation', '9+ NPS', '10+ features shipped, 8+ demos pitched'],
    projects: ['Chatbot & GenAI delivery for a bank’s 50k+ calls/month call center'],
    stack: ['Python', 'Data Pipelines', 'Chat/Voicebot', 'GenAI', 'Agile'],
    focus: { pm: 35, swe: 25, analytics: 15, de: 15, ds: 10 },
  },
  {
    org: 'Klarna',
    logo: '/img/klarna-logo.svg',
    logoScale: 1.6,
    chipClass: 'bg-gradient-to-br from-pink-500/30 via-fuchsia-500/10 to-transparent',
    period: '2024 — Present',
    role: 'Full-stack engineer, rotating across 4+ teams — now on Referrals & Deals',
    kpis: ['Built a GenAI agent automating data modeling into Neo4j', 'Cut a Qliksense app’s footprint 53%+'],
    projects: ['Search → Product → DevOps → Knowledge Management → Referrals & Deals'],
    stack: ['Neo4j', 'FastAPI', 'TypeScript', 'React', 'GenAI / LLMs'],
    focus: { pm: 5, swe: 65, analytics: 10, de: 15, ds: 5 },
  },
];

export interface SideProject {
  title: string;
  description: string;
  initials: string;
  cover: string;
  href?: string;
  placeholder?: boolean;
}

// EXAMPLE ENTRIES — placeholders to show what a fuller side-projects grid could
// look like. Replace with real projects before publishing, or delete the
// placeholder ones if this section should stay minimal.
export const sideProjects: SideProject[] = [
  {
    title: '[Example] OSS contribution — Neo4j tooling',
    description: 'Placeholder: co-maintaining a small open-source graph/GenAI-tooling project.',
    initials: 'OSS',
    cover: 'from-emerald-500/30 to-transparent',
    placeholder: true,
  },
  {
    title: '[Example] Small team-shipped build',
    description: 'Placeholder: a weekend project run with 2–3 collaborators, written up afterward.',
    initials: 'RUN',
    cover: 'from-amber-500/30 to-transparent',
    placeholder: true,
  },
];
