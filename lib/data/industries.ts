// Industries data for SEO-rich industry pages

export type Industry = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroDescription: string;
  icon: string;
  challenges: string[];
  solutions: string[];
  technologies: string[];
  stats: {
    value: string;
    label: string;
  }[];
  useCases: {
    title: string;
    description: string;
  }[];
  relatedServices: string[];
};

export const INDUSTRIES: Record<string, Industry> = {
  'healthcare': {
    slug: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Digital Health Solutions',
    description: 'We build HIPAA-compliant healthcare applications that improve patient outcomes and streamline clinical workflows.',
    heroDescription: 'Transform patient care with intelligent healthcare software. From telemedicine platforms to clinical decision support systems.',
    icon: '',
    challenges: [
      'HIPAA compliance and data security',
      'Integration with legacy EHR systems',
      'Patient engagement and retention',
      'Clinical workflow optimization',
    ],
    solutions: [
      'Secure, compliant cloud infrastructure',
      'HL7 FHIR interoperability',
      'Patient portal development',
      'AI-powered diagnostic tools',
    ],
    technologies: ['HIPAA Cloud', 'HL7 FHIR', 'React Native', 'TensorFlow', 'AWS HealthLake'],
    stats: [
      { value: '10+', label: 'Healthcare Projects' },
      { value: '100%', label: 'HIPAA Compliant' },
      { value: '2M+', label: 'Patients Served' },
      { value: '40%', label: 'Efficiency Gains' },
    ],
    useCases: [
      { title: 'Telemedicine Platforms', description: 'HIPAA-compliant video consultations with integrated scheduling and payments.' },
      { title: 'Patient Portals', description: 'Secure access to medical records, appointments, and provider communication.' },
      { title: 'Clinical Decision Support', description: 'AI-powered tools that assist clinicians with diagnosis and treatment plans.' },
      { title: 'Remote Patient Monitoring', description: 'IoT integration for continuous health data collection and analysis.' },
    ],
    relatedServices: ['ai-integration', 'full-stack-engineering', 'software-consulting'],
  },
  'financial-services': {
    slug: 'financial-services',
    title: 'Financial Services',
    subtitle: 'Fintech & Banking Solutions',
    description: 'We develop secure, scalable financial applications that meet regulatory requirements while delivering exceptional user experiences.',
    heroDescription: 'Build the future of finance with modern fintech solutions. Payment systems, lending platforms, and wealth management tools.',
    icon: '',
    challenges: [
      'Regulatory compliance (SOC2, PCI-DSS)',
      'Real-time transaction processing',
      'Fraud detection and prevention',
      'Legacy system modernization',
    ],
    solutions: [
      'Secure payment infrastructure',
      'AI-powered risk assessment',
      'Open banking API integration',
      'Modern core banking systems',
    ],
    technologies: ['Plaid', 'Stripe', 'AWS', 'PostgreSQL', 'Python', 'Node.js'],
    stats: [
      { value: '$50M+', label: 'Transactions Processed' },
      { value: '99.99%', label: 'Uptime SLA' },
      { value: 'SOC2', label: 'Certified' },
      { value: '15+', label: 'Fintech Projects' },
    ],
    useCases: [
      { title: 'Digital Lending Platforms', description: 'End-to-end loan origination with automated underwriting and compliance.' },
      { title: 'Payment Processing', description: 'PCI-compliant payment infrastructure supporting multiple payment methods.' },
      { title: 'Wealth Management', description: 'Portfolio management tools with real-time analytics and reporting.' },
      { title: 'RegTech Solutions', description: 'Automated compliance monitoring and regulatory reporting.' },
    ],
    relatedServices: ['full-stack-engineering', 'ai-integration', 'software-consulting'],
  },
  'real-estate': {
    slug: 'real-estate',
    title: 'Real Estate',
    subtitle: 'PropTech Innovation',
    description: 'We build property technology solutions that modernize real estate operations and enhance buyer and seller experiences.',
    heroDescription: 'Revolutionize real estate with smart technology. Property management, transaction platforms, and AI-powered valuations.',
    icon: '',
    challenges: [
      'Complex transaction workflows',
      'Market data integration',
      'Property valuation accuracy',
      'Agent and client coordination',
    ],
    solutions: [
      'Transaction management platforms',
      'AI-powered property valuations',
      'Virtual tour technology',
      'CRM and lead management',
    ],
    technologies: ['Next.js', 'React Native', 'Python', 'TensorFlow', 'AWS'],
    stats: [
      { value: '500K+', label: 'Properties Listed' },
      { value: '30%', label: 'Faster Closings' },
      { value: '95%', label: 'Valuation Accuracy' },
      { value: '10+', label: 'PropTech Projects' },
    ],
    useCases: [
      { title: 'Property Listing Platforms', description: 'Feature-rich marketplaces with advanced search and filtering.' },
      { title: 'AI Appraisals', description: 'Machine learning models for accurate property valuations.' },
      { title: 'Transaction Management', description: 'Digital closing platforms streamlining the purchase process.' },
      { title: 'Property Management', description: 'Tools for landlords and property managers to streamline operations.' },
    ],
    relatedServices: ['ai-integration', 'full-stack-engineering', 'product-design'],
  },
  'e-commerce': {
    slug: 'e-commerce',
    title: 'E-Commerce',
    subtitle: 'Retail & Marketplace Solutions',
    description: 'We create high-performance e-commerce platforms that drive conversions and scale with your business.',
    heroDescription: 'Build commerce experiences that convert. Custom storefronts, marketplaces, and omnichannel retail solutions.',
    icon: '',
    challenges: [
      'Cart abandonment and conversion',
      'Inventory management at scale',
      'Payment and fulfillment integration',
      'Personalization and recommendations',
    ],
    solutions: [
      'Custom storefront development',
      'AI-powered recommendations',
      'Headless commerce architecture',
      'Multi-channel selling platforms',
    ],
    technologies: ['Next.js', 'Shopify', 'Stripe', 'Algolia', 'Redis', 'PostgreSQL'],
    stats: [
      { value: '$100M+', label: 'GMV Processed' },
      { value: '25%', label: 'Conversion Increase' },
      { value: '<1s', label: 'Page Load Time' },
      { value: '20+', label: 'E-Commerce Projects' },
    ],
    useCases: [
      { title: 'Custom Storefronts', description: 'High-performance, brand-aligned shopping experiences.' },
      { title: 'B2B Marketplaces', description: 'Multi-vendor platforms with complex pricing and workflows.' },
      { title: 'Subscription Commerce', description: 'Recurring billing and subscription management.' },
      { title: 'Mobile Commerce', description: 'Native and progressive web apps for mobile shopping.' },
    ],
    relatedServices: ['full-stack-engineering', 'product-design', 'ai-integration'],
  },
  'saas': {
    slug: 'saas',
    title: 'SaaS',
    subtitle: 'Software Products',
    description: 'We help SaaS companies build, scale, and optimize their products with modern architecture and best practices.',
    heroDescription: 'Build software products that scale. From MVP to enterprise-grade SaaS with multi-tenant architecture.',
    icon: '',
    challenges: [
      'Multi-tenant architecture',
      'Usage-based billing complexity',
      'Feature velocity vs stability',
      'Customer onboarding and retention',
    ],
    solutions: [
      'Scalable multi-tenant systems',
      'Flexible billing integration',
      'CI/CD and DevOps automation',
      'Analytics and product insights',
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS'],
    stats: [
      { value: '50+', label: 'SaaS Products Built' },
      { value: '10x', label: 'Scale Achieved' },
      { value: '99.9%', label: 'Avg. Uptime' },
      { value: '2x', label: 'Faster Feature Delivery' },
    ],
    useCases: [
      { title: 'MVP Development', description: 'Rapid prototyping and validation for new SaaS ideas.' },
      { title: 'Platform Scaling', description: 'Architecture redesign for high-growth products.' },
      { title: 'Feature Development', description: 'Embedded teams accelerating product roadmaps.' },
      { title: 'Technical Debt Reduction', description: 'Modernization and refactoring for maintainability.' },
    ],
    relatedServices: ['fractional-development', 'full-stack-engineering', 'go-to-market'],
  },
  'manufacturing': {
    slug: 'manufacturing',
    title: 'Manufacturing',
    subtitle: 'Industry 4.0 Solutions',
    description: 'We build smart manufacturing solutions that optimize operations and drive digital transformation.',
    heroDescription: 'Embrace Industry 4.0 with intelligent manufacturing software. IoT, predictive maintenance, and supply chain optimization.',
    icon: '',
    challenges: [
      'Legacy system integration',
      'Real-time production monitoring',
      'Supply chain visibility',
      'Predictive maintenance',
    ],
    solutions: [
      'IoT sensor integration',
      'Real-time dashboards',
      'Predictive analytics',
      'Supply chain platforms',
    ],
    technologies: ['Python', 'TensorFlow', 'AWS IoT', 'React', 'PostgreSQL', 'TimescaleDB'],
    stats: [
      { value: '35%', label: 'Downtime Reduction' },
      { value: '20%', label: 'Efficiency Gains' },
      { value: '15%', label: 'Cost Savings' },
      { value: '8+', label: 'Manufacturing Projects' },
    ],
    useCases: [
      { title: 'Production Monitoring', description: 'Real-time visibility into manufacturing operations.' },
      { title: 'Predictive Maintenance', description: 'ML models predicting equipment failures before they occur.' },
      { title: 'Supply Chain Management', description: 'End-to-end visibility and optimization.' },
      { title: 'Quality Control', description: 'Computer vision for automated inspection.' },
    ],
    relatedServices: ['ai-integration', 'software-consulting', 'full-stack-engineering'],
  },
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRIES);
