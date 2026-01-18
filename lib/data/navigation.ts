// Navigation structure with dropdown menus for SEO-friendly site architecture

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavDropdown = {
  label: string;
  href?: string;
  items: NavItem[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
  };
};

export type NavEntry = NavItem | NavDropdown;

export function isDropdown(entry: NavEntry): entry is NavDropdown {
  return 'items' in entry;
}

export const NAV_CONFIG: NavEntry[] = [
  {
    label: 'SERVICES',
    href: '/services',
    items: [
      // AI & Data - Primary Focus
      { label: 'AI Integration', href: '/services/ai-integration', description: 'LLMs & AI features' },
      { label: 'AI Agents & Automation', href: '/services/ai-agents', description: 'Autonomous systems' },
      { label: 'Machine Learning', href: '/services/machine-learning', description: 'Custom ML models' },
      { label: 'Data Engineering', href: '/services/data-engineering', description: 'Pipelines & warehouses' },
      // Engineering
      { label: 'Full-Stack Development', href: '/services/full-stack-development', description: 'Web & mobile apps' },
      { label: 'Cloud & DevOps', href: '/services/cloud-infrastructure', description: 'AWS, GCP, Azure' },
      // Product & Consulting
      { label: 'MVP Development', href: '/services/mvp-development', description: 'Rapid product launches' },
      { label: 'Technical Consulting', href: '/services/technical-consulting', description: 'Expert guidance' },
    ],
    featured: {
      title: 'AI Agents & Automation',
      description: 'Build autonomous AI systems that handle complex workflows',
      href: '/services/ai-agents',
    },
  },
  {
    label: 'INDUSTRIES',
    href: '/industries',
    items: [
      { label: 'Healthcare', href: '/industries/healthcare', description: 'Digital health solutions' },
      { label: 'Financial Services', href: '/industries/financial-services', description: 'Fintech & banking' },
      { label: 'Real Estate', href: '/industries/real-estate', description: 'PropTech innovation' },
      { label: 'E-Commerce', href: '/industries/e-commerce', description: 'Retail & marketplaces' },
      { label: 'SaaS', href: '/industries/saas', description: 'Software products' },
      { label: 'Manufacturing', href: '/industries/manufacturing', description: 'Industry 4.0' },
    ],
    featured: {
      title: 'Healthcare',
      description: 'Building the future of digital health',
      href: '/industries/healthcare',
    },
  },
  {
    label: 'INSIGHTS',
    href: '/insights',
    items: [
      { label: 'AI & Machine Learning', href: '/insights?topic=ai', description: 'Latest in AI trends' },
      { label: 'Engineering Best Practices', href: '/insights?topic=engineering', description: 'Technical deep-dives' },
      { label: 'Startup Guides', href: '/insights?topic=startups', description: 'For founders' },
      { label: 'Case Studies', href: '/insights?topic=case-studies', description: 'Success stories' },
    ],
    featured: {
      title: 'Latest Insights',
      description: 'Explore our thought leadership on technology and innovation',
      href: '/insights',
    },
  },
  {
    label: 'ABOUT',
    href: '/about',
    items: [
      { label: 'Our Story', href: '/about', description: 'Who we are' },
      { label: 'Team', href: '/about/team', description: 'Meet the people' },
      { label: 'Portfolio', href: '/portfolio', description: 'Our work' },
      { label: 'Careers', href: '/careers', description: 'Join us' },
    ],
  },
];
