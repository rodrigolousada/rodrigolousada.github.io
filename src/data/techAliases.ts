// Alternate names/spellings for a technology whose on-site label doesn't
// already cover them (e.g. "ReactJS" for "React") — combined with the
// normalized, comma/semicolon-aware search in TechStack.astro so a recruiter
// pasting a raw keyword list still finds a match even when the spelling
// doesn't exactly match the pill's own label.
export const techAliases: Record<string, string[]> = {
  React: ['ReactJS', 'React.js', 'React JS'],
  'React Native': ['ReactNative', 'RN'],
  'Node.js': ['NodeJS', 'Node JS', 'Node'],
  TypeScript: ['TS'],
  JavaScript: ['JS'],
  PostgreSQL: ['Postgres'],
  AWS: ['Amazon Web Services'],
  'GenAI / LLMs': ['GenAI', 'Generative AI', 'LLMs', 'LLM'],
  'IBM Watson': ['IBM Watson Assistant', 'IBM Watson Assistant for Voice'],
  'Three.js': ['ThreeJS'],
  'D3.js': ['D3JS', 'D3'],
  'scikit-learn': ['sklearn', 'SciKit Learn'],
  'Tailwind CSS': ['Tailwind', 'TailwindCSS'],
  'HTML & CSS': ['HTML', 'CSS', 'HTML5', 'CSS3'],
};
