// Services data for SEO-rich service pages
// Organized by category with AI as the primary focus

export type ServiceCategory = 'ai' | 'engineering' | 'product' | 'consulting';

export type Service = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroDescription: string;
  category: ServiceCategory;
  featured?: boolean;
  benefits: string[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  technologies: string[];
  deliverables: string[];
  pricing: {
    type: string;
    description: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: string[];
  relatedIndustries: string[];
};

export const SERVICE_CATEGORIES: Record<ServiceCategory, { title: string; description: string }> = {
  ai: {
    title: 'AI & Data',
    description: 'Transform your business with intelligent systems, from LLM integration to custom ML pipelines.',
  },
  engineering: {
    title: 'Software Engineering',
    description: 'Build scalable, production-ready software with modern architecture and best practices.',
  },
  product: {
    title: 'Product & Experience',
    description: 'Design and launch products that users love, from concept to market.',
  },
  consulting: {
    title: 'Consulting & Strategy',
    description: 'Expert guidance to make the right technology decisions and accelerate your roadmap.',
  },
};

export const SERVICES: Record<string, Service> = {
  // ==================== AI & DATA ====================
  'ai-integration': {
    slug: 'ai-integration',
    title: 'AI Integration',
    subtitle: 'Embed Intelligence Into Your Products',
    description: 'Integrate large language models and AI capabilities into your existing products. From chatbots to document processing, we make AI work for your business.',
    heroDescription: 'Transform your product with AI. We integrate GPT-4, Claude, and other leading models into production systems with enterprise-grade reliability.',
    category: 'ai',
    featured: true,
    benefits: [
      'Production-ready AI implementations',
      'Leverage GPT-4, Claude, Gemini & more',
      'Custom prompt engineering',
      'Cost optimization strategies',
      'Responsible AI practices',
      'Ongoing model maintenance',
    ],
    process: [
      { step: '01', title: 'Use Case Discovery', description: 'Identify high-impact AI opportunities in your product.' },
      { step: '02', title: 'Proof of Concept', description: 'Build a working prototype to validate feasibility and ROI.' },
      { step: '03', title: 'Production Build', description: 'Engineer a scalable, reliable AI system with proper guardrails.' },
      { step: '04', title: 'Optimization', description: 'Fine-tune for accuracy, latency, and cost efficiency.' },
    ],
    technologies: ['OpenAI', 'Anthropic', 'Google AI', 'LangChain', 'Pinecone', 'Python'],
    deliverables: [
      'AI feature implementation',
      'API integrations',
      'Prompt engineering & optimization',
      'Model evaluation reports',
      'Monitoring and analytics setup',
    ],
    pricing: {
      type: 'Project-based',
      description: 'Fixed-price projects or time & materials based on scope.',
    },
    faqs: [
      { question: 'Which AI models do you work with?', answer: 'We work with OpenAI, Anthropic, Google, open-source models, and can recommend the best fit for your needs.' },
      { question: 'Can you help with existing AI features?', answer: 'Yes, we often help optimize or scale existing AI implementations.' },
      { question: 'How do you handle data privacy?', answer: 'We follow strict data handling practices and can work with on-premise or private cloud deployments.' },
    ],
    relatedServices: ['ai-agents', 'data-engineering', 'machine-learning'],
    relatedIndustries: ['healthcare', 'financial-services', 'e-commerce'],
  },
  'ai-agents': {
    slug: 'ai-agents',
    title: 'AI Agents & Automation',
    subtitle: 'Autonomous Systems That Work For You',
    description: 'Build intelligent agents that automate complex workflows, make decisions, and interact with external systems autonomously.',
    heroDescription: 'Deploy AI agents that go beyond chat. We build autonomous systems that can research, analyze, execute tasks, and orchestrate multi-step workflows.',
    category: 'ai',
    featured: true,
    benefits: [
      'Multi-agent orchestration',
      'Tool use and function calling',
      'Memory and context management',
      'Human-in-the-loop workflows',
      'Reliable task execution',
      'Enterprise security controls',
    ],
    process: [
      { step: '01', title: 'Workflow Analysis', description: 'Map the processes and decisions you want to automate.' },
      { step: '02', title: 'Agent Architecture', description: 'Design the agent system, tools, and interaction patterns.' },
      { step: '03', title: 'Development', description: 'Build agents with proper guardrails and error handling.' },
      { step: '04', title: 'Deployment', description: 'Launch with monitoring, logging, and continuous improvement.' },
    ],
    technologies: ['LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'OpenAI Functions', 'Anthropic Tools'],
    deliverables: [
      'Custom AI agent system',
      'Tool integrations',
      'Admin dashboard',
      'Audit logging',
      'Performance monitoring',
    ],
    pricing: {
      type: 'Project-based',
      description: 'Custom pricing based on complexity and integration requirements.',
    },
    faqs: [
      { question: 'What can AI agents automate?', answer: 'Research, data entry, customer support, document processing, scheduling, and complex multi-step workflows.' },
      { question: 'How do you ensure reliability?', answer: 'We build in error handling, fallbacks, human escalation paths, and comprehensive monitoring.' },
      { question: 'Can agents integrate with our existing tools?', answer: 'Yes, we build custom integrations with CRMs, ERPs, databases, APIs, and other enterprise systems.' },
    ],
    relatedServices: ['ai-integration', 'automation', 'full-stack-development'],
    relatedIndustries: ['financial-services', 'healthcare', 'saas'],
  },
  'machine-learning': {
    slug: 'machine-learning',
    title: 'Machine Learning',
    subtitle: 'Custom Models for Your Data',
    description: 'Develop custom machine learning models tailored to your unique data and business problems. From prediction to classification to recommendation systems.',
    heroDescription: 'Build ML models that solve your specific challenges. We handle everything from data preparation to model deployment and monitoring.',
    category: 'ai',
    benefits: [
      'Custom model development',
      'Data pipeline engineering',
      'Model training & fine-tuning',
      'MLOps and deployment',
      'Continuous model improvement',
      'Explainable AI',
    ],
    process: [
      { step: '01', title: 'Data Assessment', description: 'Evaluate your data quality, volume, and ML readiness.' },
      { step: '02', title: 'Model Development', description: 'Train and evaluate models against your success metrics.' },
      { step: '03', title: 'Productionization', description: 'Deploy models with proper MLOps infrastructure.' },
      { step: '04', title: 'Monitoring', description: 'Track model performance and retrain as needed.' },
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'MLflow', 'AWS SageMaker'],
    deliverables: [
      'Trained ML model',
      'Data pipelines',
      'API endpoint',
      'Model documentation',
      'Monitoring dashboard',
    ],
    pricing: {
      type: 'Project-based',
      description: 'Pricing based on data complexity and model requirements.',
    },
    faqs: [
      { question: 'Do we need a lot of data?', answer: 'It depends on the problem. We can often work with smaller datasets using transfer learning or synthetic data augmentation.' },
      { question: 'How long does model development take?', answer: 'Typically 4-12 weeks depending on complexity, data readiness, and iteration requirements.' },
      { question: 'Can you improve our existing models?', answer: 'Yes, we often help teams improve model accuracy, reduce latency, or lower inference costs.' },
    ],
    relatedServices: ['data-engineering', 'ai-integration', 'cloud-infrastructure'],
    relatedIndustries: ['healthcare', 'financial-services', 'manufacturing'],
  },
  'data-engineering': {
    slug: 'data-engineering',
    title: 'Data Engineering',
    subtitle: 'Build Your Data Foundation',
    description: 'Design and build robust data infrastructure that powers analytics, reporting, and AI initiatives. From data pipelines to warehouses.',
    heroDescription: 'Create the data infrastructure your AI needs. We build pipelines, warehouses, and platforms that make your data accessible and actionable.',
    category: 'ai',
    benefits: [
      'Modern data stack implementation',
      'ETL/ELT pipeline development',
      'Data warehouse design',
      'Real-time streaming',
      'Data quality frameworks',
      'Cost optimization',
    ],
    process: [
      { step: '01', title: 'Data Audit', description: 'Assess current data sources, quality, and infrastructure.' },
      { step: '02', title: 'Architecture Design', description: 'Design scalable data platform architecture.' },
      { step: '03', title: 'Implementation', description: 'Build pipelines, transformations, and storage.' },
      { step: '04', title: 'Governance', description: 'Implement quality checks, security, and documentation.' },
    ],
    technologies: ['Snowflake', 'Databricks', 'dbt', 'Airflow', 'Fivetran', 'AWS'],
    deliverables: [
      'Data pipeline infrastructure',
      'Data warehouse/lakehouse',
      'Transformation models',
      'Data documentation',
      'Quality monitoring',
    ],
    pricing: {
      type: 'Project or retainer',
      description: 'Implementation projects or ongoing data engineering support.',
    },
    faqs: [
      { question: 'What data platforms do you work with?', answer: 'We work with Snowflake, Databricks, BigQuery, Redshift, and can recommend the best fit for your needs.' },
      { question: 'Can you help migrate from legacy systems?', answer: 'Yes, we often help teams modernize from on-premise or legacy cloud data systems.' },
      { question: 'Do you handle data governance?', answer: 'Yes, including access controls, PII handling, data catalogs, and compliance requirements.' },
    ],
    relatedServices: ['machine-learning', 'cloud-infrastructure', 'ai-integration'],
    relatedIndustries: ['financial-services', 'healthcare', 'e-commerce'],
  },

  // ==================== SOFTWARE ENGINEERING ====================
  'full-stack-development': {
    slug: 'full-stack-development',
    title: 'Full-Stack Development',
    subtitle: 'End-to-End Application Builds',
    description: 'Complete product development from architecture to deployment. Web apps, mobile apps, APIs, and everything in between.',
    heroDescription: 'Build your product end-to-end. From database design to pixel-perfect UIs, we deliver complete software solutions that scale.',
    category: 'engineering',
    benefits: [
      'Single team for entire stack',
      'Modern architecture patterns',
      'Scalable from day one',
      'Comprehensive testing',
      'DevOps and CI/CD included',
      'Post-launch support',
    ],
    process: [
      { step: '01', title: 'Architecture', description: 'Design scalable system architecture and data models.' },
      { step: '02', title: 'Backend', description: 'Build APIs, databases, and business logic.' },
      { step: '03', title: 'Frontend', description: 'Create responsive, performant user interfaces.' },
      { step: '04', title: 'DevOps', description: 'Set up infrastructure, CI/CD, and monitoring.' },
    ],
    technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    deliverables: [
      'Production-ready application',
      'API documentation',
      'Infrastructure as code',
      'Test suites',
      'Deployment pipelines',
      'Operations runbook',
    ],
    pricing: {
      type: 'Project-based',
      description: 'Fixed-price milestones with clear deliverables.',
    },
    faqs: [
      { question: 'What tech stack do you recommend?', answer: 'It depends on your needs, but we typically use Next.js, Node.js, PostgreSQL, and AWS for most projects.' },
      { question: 'Do you handle mobile apps?', answer: 'Yes, we build native and cross-platform mobile apps with React Native.' },
      { question: 'What about ongoing maintenance?', answer: 'We offer maintenance retainers or can hand off to your internal team with full documentation.' },
    ],
    relatedServices: ['mobile-development', 'api-development', 'cloud-infrastructure'],
    relatedIndustries: ['saas', 'e-commerce', 'healthcare'],
  },
  'mobile-development': {
    slug: 'mobile-development',
    title: 'Mobile Development',
    subtitle: 'Native & Cross-Platform Apps',
    description: 'Build mobile applications for iOS and Android that users love. From native development to cross-platform solutions with React Native.',
    heroDescription: 'Launch on iOS and Android with apps that feel native. We build performant, beautiful mobile experiences that scale.',
    category: 'engineering',
    benefits: [
      'iOS and Android expertise',
      'Cross-platform efficiency',
      'Native performance',
      'Offline-first architecture',
      'App store optimization',
      'Push notifications & engagement',
    ],
    process: [
      { step: '01', title: 'Strategy', description: 'Define platform strategy and feature prioritization.' },
      { step: '02', title: 'Design', description: 'Create platform-native UI/UX designs.' },
      { step: '03', title: 'Development', description: 'Build with React Native or native technologies.' },
      { step: '04', title: 'Launch', description: 'App store submission and post-launch iteration.' },
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
    deliverables: [
      'iOS and Android apps',
      'Backend API (if needed)',
      'App store listings',
      'Analytics setup',
      'Push notification system',
    ],
    pricing: {
      type: 'Project-based',
      description: 'Fixed-price packages based on feature scope and platforms.',
    },
    faqs: [
      { question: 'Native or cross-platform?', answer: 'We typically recommend React Native for most projects—it offers near-native performance with faster development.' },
      { question: 'Can you update our existing app?', answer: 'Yes, we can enhance, refactor, or completely rebuild existing mobile applications.' },
      { question: 'Do you handle app store submission?', answer: 'Yes, we manage the entire submission process for both Apple App Store and Google Play.' },
    ],
    relatedServices: ['full-stack-development', 'product-design', 'api-development'],
    relatedIndustries: ['e-commerce', 'healthcare', 'saas'],
  },
  'api-development': {
    slug: 'api-development',
    title: 'API Development',
    subtitle: 'Robust Backend Services',
    description: 'Design and build APIs that power your applications. RESTful services, GraphQL, microservices, and third-party integrations.',
    heroDescription: 'Build APIs that scale. We create well-documented, secure, and performant backend services that your applications can rely on.',
    category: 'engineering',
    benefits: [
      'RESTful & GraphQL expertise',
      'Microservices architecture',
      'Third-party integrations',
      'Authentication & security',
      'Rate limiting & caching',
      'Comprehensive documentation',
    ],
    process: [
      { step: '01', title: 'API Design', description: 'Define endpoints, schemas, and authentication strategy.' },
      { step: '02', title: 'Development', description: 'Build APIs with proper error handling and validation.' },
      { step: '03', title: 'Testing', description: 'Automated testing and load testing.' },
      { step: '04', title: 'Documentation', description: 'Generate OpenAPI specs and developer docs.' },
    ],
    technologies: ['Node.js', 'Python', 'GraphQL', 'REST', 'PostgreSQL', 'Redis'],
    deliverables: [
      'Production API',
      'OpenAPI/Swagger documentation',
      'SDKs (optional)',
      'Postman collection',
      'Integration tests',
    ],
    pricing: {
      type: 'Project-based',
      description: 'Pricing based on endpoints and integration complexity.',
    },
    faqs: [
      { question: 'REST or GraphQL?', answer: 'It depends on your use case. We can help you choose and implement the right approach.' },
      { question: 'Can you integrate with third-party APIs?', answer: 'Yes, we have experience integrating with payment processors, CRMs, ERPs, and countless other systems.' },
      { question: 'How do you handle API security?', answer: 'We implement OAuth 2.0, JWT, rate limiting, input validation, and follow OWASP best practices.' },
    ],
    relatedServices: ['full-stack-development', 'cloud-infrastructure', 'ai-integration'],
    relatedIndustries: ['saas', 'financial-services', 'e-commerce'],
  },
  'cloud-infrastructure': {
    slug: 'cloud-infrastructure',
    title: 'Cloud & DevOps',
    subtitle: 'Scalable Infrastructure',
    description: 'Design and implement cloud infrastructure that scales with your business. AWS, GCP, Azure, and modern DevOps practices.',
    heroDescription: 'Build infrastructure that scales automatically and costs less. We implement cloud-native architectures with proper DevOps practices.',
    category: 'engineering',
    benefits: [
      'Multi-cloud expertise',
      'Infrastructure as code',
      'CI/CD pipelines',
      'Kubernetes orchestration',
      'Cost optimization',
      '24/7 monitoring',
    ],
    process: [
      { step: '01', title: 'Assessment', description: 'Evaluate current infrastructure and requirements.' },
      { step: '02', title: 'Architecture', description: 'Design cloud-native infrastructure.' },
      { step: '03', title: 'Implementation', description: 'Deploy with infrastructure as code.' },
      { step: '04', title: 'Operations', description: 'Set up monitoring, alerting, and runbooks.' },
    ],
    technologies: ['AWS', 'GCP', 'Azure', 'Terraform', 'Kubernetes', 'Docker'],
    deliverables: [
      'Cloud infrastructure',
      'Terraform/IaC code',
      'CI/CD pipelines',
      'Monitoring setup',
      'Disaster recovery plan',
    ],
    pricing: {
      type: 'Project or retainer',
      description: 'Implementation projects or ongoing DevOps support.',
    },
    faqs: [
      { question: 'Which cloud provider do you recommend?', answer: 'It depends on your existing investments and requirements. We work with AWS, GCP, and Azure.' },
      { question: 'Can you help reduce our cloud costs?', answer: 'Yes, cloud cost optimization is a common engagement. We typically find 20-40% savings.' },
      { question: 'Do you offer managed DevOps?', answer: 'Yes, we offer ongoing DevOps support and can function as your infrastructure team.' },
    ],
    relatedServices: ['full-stack-development', 'api-development', 'data-engineering'],
    relatedIndustries: ['saas', 'healthcare', 'financial-services'],
  },
  'automation': {
    slug: 'automation',
    title: 'Process Automation',
    subtitle: 'Streamline Operations',
    description: 'Automate repetitive tasks and workflows across your organization. From simple scripts to complex enterprise workflow automation.',
    heroDescription: 'Free your team from repetitive work. We build automation that saves hours, reduces errors, and lets your people focus on what matters.',
    category: 'engineering',
    benefits: [
      'Workflow automation',
      'System integrations',
      'Document processing',
      'Data entry elimination',
      'Quality assurance automation',
      'ROI-focused implementation',
    ],
    process: [
      { step: '01', title: 'Process Mapping', description: 'Document current workflows and identify automation opportunities.' },
      { step: '02', title: 'ROI Analysis', description: 'Quantify time savings and prioritize by impact.' },
      { step: '03', title: 'Implementation', description: 'Build and deploy automation with proper error handling.' },
      { step: '04', title: 'Optimization', description: 'Monitor and continuously improve automations.' },
    ],
    technologies: ['Python', 'Node.js', 'Zapier', 'n8n', 'RPA tools', 'Custom integrations'],
    deliverables: [
      'Automated workflows',
      'Integration scripts',
      'Error handling & alerts',
      'Documentation',
      'Training materials',
    ],
    pricing: {
      type: 'Project-based',
      description: 'Pricing based on process complexity and integration requirements.',
    },
    faqs: [
      { question: 'What processes can be automated?', answer: 'Data entry, report generation, file processing, system syncing, approval workflows, and much more.' },
      { question: 'How do you handle errors?', answer: 'We build in comprehensive error handling, alerting, and fallback procedures.' },
      { question: 'Do you use RPA tools?', answer: 'When appropriate, yes. We also build custom automation for more complex or specific needs.' },
    ],
    relatedServices: ['ai-agents', 'api-development', 'data-engineering'],
    relatedIndustries: ['financial-services', 'healthcare', 'manufacturing'],
  },

  // ==================== PRODUCT & EXPERIENCE ====================
  'product-design': {
    slug: 'product-design',
    title: 'Product Design',
    subtitle: 'User-Centered Experiences',
    description: 'UX research, UI design, and prototyping that creates products users actually want to use. Design that converts.',
    heroDescription: 'Design products people love. We combine user research, visual design, and prototyping to create exceptional digital experiences.',
    category: 'product',
    benefits: [
      'User research-driven approach',
      'Conversion-focused design',
      'Design system creation',
      'Rapid prototyping',
      'Usability testing',
      'Developer handoff ready',
    ],
    process: [
      { step: '01', title: 'Research', description: 'Understand users, competitors, and market context.' },
      { step: '02', title: 'Wireframes', description: 'Map user flows and information architecture.' },
      { step: '03', title: 'Visual Design', description: 'Create high-fidelity designs and components.' },
      { step: '04', title: 'Validation', description: 'Test with users and iterate.' },
    ],
    technologies: ['Figma', 'Framer', 'Maze', 'Hotjar', 'Analytics'],
    deliverables: [
      'User research findings',
      'Wireframes and flows',
      'High-fidelity designs',
      'Interactive prototypes',
      'Design system / component library',
    ],
    pricing: {
      type: 'Project or retainer',
      description: 'Design sprints or ongoing design support.',
    },
    faqs: [
      { question: 'Do you do branding?', answer: 'We focus on product/UI design, but can recommend branding partners.' },
      { question: 'How do you hand off to developers?', answer: 'We use Figma with detailed specs, tokens, and interactive prototypes.' },
      { question: 'Can you redesign an existing product?', answer: 'Yes, we often help teams refresh or overhaul existing products.' },
    ],
    relatedServices: ['mvp-development', 'full-stack-development', 'mobile-development'],
    relatedIndustries: ['saas', 'e-commerce', 'healthcare'],
  },
  'mvp-development': {
    slug: 'mvp-development',
    title: 'MVP Development',
    subtitle: 'From Idea to Launch',
    description: 'MVP development and product strategy for founders and startups. Go from napkin sketch to paying customers in 8-12 weeks.',
    heroDescription: 'Launch your product fast. We help startups validate ideas, build MVPs, and get to market in weeks, not months.',
    category: 'product',
    benefits: [
      'Rapid 8-12 week timelines',
      'Lean, focused scope',
      'Product strategy included',
      'Launch support',
      'Investor-ready deliverables',
      'Post-launch iteration',
    ],
    process: [
      { step: '01', title: 'Strategy', description: 'Define MVP scope, user personas, and success metrics.' },
      { step: '02', title: 'Design', description: 'Create wireframes and high-fidelity designs.' },
      { step: '03', title: 'Build', description: 'Develop core features with rapid iteration.' },
      { step: '04', title: 'Launch', description: 'Deploy, monitor, and iterate based on feedback.' },
    ],
    technologies: ['Next.js', 'Supabase', 'Vercel', 'Stripe', 'Analytics'],
    deliverables: [
      'Working MVP',
      'Product roadmap',
      'User analytics setup',
      'Launch checklist',
      'Pitch deck assets (optional)',
    ],
    pricing: {
      type: 'Fixed-price packages',
      description: 'MVP packages starting at $25K with clear scope and timeline.',
    },
    faqs: [
      { question: 'Is 8-12 weeks realistic?', answer: 'Yes, for a focused MVP. We ruthlessly prioritize features to hit your launch date.' },
      { question: 'Do you help with fundraising?', answer: 'We can provide technical due diligence support and help prepare materials for investors.' },
      { question: 'What happens after launch?', answer: 'We offer retainer options for ongoing development and iteration.' },
    ],
    relatedServices: ['product-design', 'full-stack-development', 'technical-consulting'],
    relatedIndustries: ['saas', 'e-commerce', 'healthcare'],
  },
  'digital-transformation': {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    subtitle: 'Modernize Your Business',
    description: 'Modernize legacy systems and processes with modern technology. We help enterprises embrace digital-first operations.',
    heroDescription: 'Transform your business for the digital age. We modernize legacy systems, automate processes, and build the platforms you need to compete.',
    category: 'product',
    benefits: [
      'Legacy system modernization',
      'Process digitization',
      'Change management support',
      'Phased migration approach',
      'Risk mitigation',
      'Training & enablement',
    ],
    process: [
      { step: '01', title: 'Assessment', description: 'Evaluate current systems, processes, and pain points.' },
      { step: '02', title: 'Strategy', description: 'Define transformation roadmap and priorities.' },
      { step: '03', title: 'Implementation', description: 'Execute in phases with quick wins and milestones.' },
      { step: '04', title: 'Adoption', description: 'Drive adoption with training and change management.' },
    ],
    technologies: ['Modern web stack', 'Cloud platforms', 'APIs', 'Integration tools'],
    deliverables: [
      'Transformation roadmap',
      'Modernized systems',
      'Process documentation',
      'Training materials',
      'Change management plan',
    ],
    pricing: {
      type: 'Project-based',
      description: 'Custom pricing based on scope and complexity.',
    },
    faqs: [
      { question: 'How long does digital transformation take?', answer: 'It varies widely—from 3 months for focused initiatives to multi-year enterprise programs.' },
      { question: 'How do you handle legacy system migration?', answer: 'We take a phased approach, often running systems in parallel to reduce risk.' },
      { question: 'Can you work with our existing IT team?', answer: 'Yes, we often augment internal teams and transfer knowledge throughout the engagement.' },
    ],
    relatedServices: ['automation', 'cloud-infrastructure', 'technical-consulting'],
    relatedIndustries: ['manufacturing', 'financial-services', 'healthcare'],
  },

  // ==================== CONSULTING & STRATEGY ====================
  'technical-consulting': {
    slug: 'technical-consulting',
    title: 'Technical Consulting',
    subtitle: 'Expert Guidance',
    description: 'Architecture reviews, technical strategy, and roadmap planning. Get the guidance you need to make the right technology decisions.',
    heroDescription: 'Make better technology decisions. Our consultants bring decades of experience to help you navigate complex technical challenges.',
    category: 'consulting',
    benefits: [
      'Objective expert perspective',
      'Architecture reviews',
      'Technology selection guidance',
      'Team structure advice',
      'Vendor evaluation',
      'Technical due diligence',
    ],
    process: [
      { step: '01', title: 'Assessment', description: 'Deep dive into your current state and challenges.' },
      { step: '02', title: 'Analysis', description: 'Identify gaps, risks, and opportunities.' },
      { step: '03', title: 'Recommendations', description: 'Deliver actionable insights and roadmap.' },
      { step: '04', title: 'Support', description: 'Ongoing advisory as you implement changes.' },
    ],
    technologies: ['Architecture', 'Cloud', 'Security', 'DevOps', 'Data'],
    deliverables: [
      'Assessment report',
      'Architecture diagrams',
      'Technology roadmap',
      'Recommendations document',
      'Executive summary',
    ],
    pricing: {
      type: 'Hourly or project-based',
      description: 'Consulting engagements from 10-hour assessments to multi-month advisory.',
    },
    faqs: [
      { question: 'What size companies do you work with?', answer: 'We work with startups to enterprises, tailoring our approach to your scale and needs.' },
      { question: 'Can you help with technical hiring?', answer: 'Yes, we can help define roles, evaluate candidates, and structure your engineering org.' },
      { question: 'Do you offer ongoing advisory?', answer: 'Yes, many clients retain us for monthly advisory sessions and ad-hoc guidance.' },
    ],
    relatedServices: ['fractional-cto', 'architecture-review', 'ai-integration'],
    relatedIndustries: ['saas', 'financial-services', 'manufacturing'],
  },
  'fractional-cto': {
    slug: 'fractional-cto',
    title: 'Fractional CTO',
    subtitle: 'Technical Leadership On Demand',
    description: 'Experienced technical leadership without the full-time commitment. We provide CTO-level guidance for startups and growing companies.',
    heroDescription: 'Get CTO-level expertise on a fractional basis. Strategic technical leadership for startups and growing companies without the full-time cost.',
    category: 'consulting',
    benefits: [
      'Strategic technical leadership',
      'Team building & mentorship',
      'Investor & board communication',
      'Vendor management',
      'Technical roadmap ownership',
      'Flexible time commitment',
    ],
    process: [
      { step: '01', title: 'Onboarding', description: 'Learn your business, team, and technical landscape.' },
      { step: '02', title: 'Assessment', description: 'Identify immediate priorities and quick wins.' },
      { step: '03', title: 'Execution', description: 'Lead technical initiatives and build team capabilities.' },
      { step: '04', title: 'Transition', description: 'Help hire and transition to a full-time CTO when ready.' },
    ],
    technologies: ['Strategy', 'Architecture', 'Team building', 'Process'],
    deliverables: [
      'Technical strategy',
      'Team development',
      'Stakeholder communication',
      'Vendor management',
      'Hiring support',
    ],
    pricing: {
      type: 'Monthly retainer',
      description: 'Flexible retainer based on hours per week (typically 10-20 hours).',
    },
    faqs: [
      { question: 'How many hours per week?', answer: 'Typically 10-20 hours, but we can flex based on your needs and critical periods.' },
      { question: 'Can you help us hire a full-time CTO?', answer: 'Yes, that is often the end goal. We help define the role, source candidates, and ensure a smooth transition.' },
      { question: 'Do you attend board meetings?', answer: 'Yes, we can represent the technical function in board meetings and investor conversations.' },
    ],
    relatedServices: ['technical-consulting', 'team-augmentation', 'architecture-review'],
    relatedIndustries: ['saas', 'healthcare', 'financial-services'],
  },
  'team-augmentation': {
    slug: 'team-augmentation',
    title: 'Team Augmentation',
    subtitle: 'Scale Your Engineering Team',
    description: 'Embedded senior engineers who integrate seamlessly with your existing team. No long-term contracts, no recruitment headaches.',
    heroDescription: 'Get senior engineering talent without the overhead. Our engineers embed with your team, ship features, and scale with your needs.',
    category: 'consulting',
    benefits: [
      'No recruitment costs or delays',
      'Flexible engagement terms',
      'Senior-level expertise from day one',
      'Seamless team integration',
      'Knowledge transfer included',
      'Scale up or down as needed',
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'We learn your tech stack, team dynamics, and project needs.' },
      { step: '02', title: 'Matching', description: 'We assign engineers with the right skills and culture fit.' },
      { step: '03', title: 'Integration', description: 'Engineers onboard to your tools, processes, and team.' },
      { step: '04', title: 'Delivery', description: 'Ship features in your sprints with full accountability.' },
    ],
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'TypeScript'],
    deliverables: [
      'Dedicated engineering resources',
      'Weekly progress reports',
      'Code reviews and documentation',
      'Direct Slack/communication access',
      'Sprint planning participation',
    ],
    pricing: {
      type: 'Monthly retainer',
      description: 'Flexible monthly engagements starting at 20 hours/week.',
    },
    faqs: [
      { question: 'How quickly can engineers start?', answer: 'Most engagements begin within 1-2 weeks of signing.' },
      { question: 'Do you work in our timezone?', answer: 'Yes, we have engineers across US timezones with overlap flexibility.' },
      { question: 'What if it is not a good fit?', answer: 'We offer a 2-week trial period with no long-term commitment.' },
    ],
    relatedServices: ['fractional-cto', 'full-stack-development', 'technical-consulting'],
    relatedIndustries: ['saas', 'healthcare', 'financial-services'],
  },
  'architecture-review': {
    slug: 'architecture-review',
    title: 'Architecture Review',
    subtitle: 'Optimize Your Systems',
    description: 'Deep-dive assessment of your technical architecture. Identify bottlenecks, security risks, and scalability issues before they become problems.',
    heroDescription: 'Get an objective view of your technical architecture. We identify risks, inefficiencies, and opportunities to improve performance and reduce costs.',
    category: 'consulting',
    benefits: [
      'Unbiased expert assessment',
      'Security vulnerability identification',
      'Performance optimization',
      'Scalability planning',
      'Cost reduction opportunities',
      'Technical debt prioritization',
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Review documentation, codebase, and infrastructure.' },
      { step: '02', title: 'Analysis', description: 'Assess against best practices and your specific needs.' },
      { step: '03', title: 'Findings', description: 'Present findings with prioritized recommendations.' },
      { step: '04', title: 'Roadmap', description: 'Create actionable plan to address issues.' },
    ],
    technologies: ['Architecture patterns', 'Security', 'Performance', 'Cloud'],
    deliverables: [
      'Architecture assessment report',
      'Risk register',
      'Optimization recommendations',
      'Prioritized roadmap',
      'Executive summary',
    ],
    pricing: {
      type: 'Fixed-price',
      description: 'Standard architecture reviews from $10K-$25K depending on scope.',
    },
    faqs: [
      { question: 'How long does a review take?', answer: 'Typically 2-4 weeks depending on the complexity of your systems.' },
      { question: 'Do you need access to our codebase?', answer: 'Yes, read access to code and infrastructure helps us provide thorough analysis.' },
      { question: 'Can you help implement recommendations?', answer: 'Yes, many clients engage us to help implement the recommendations we make.' },
    ],
    relatedServices: ['technical-consulting', 'cloud-infrastructure', 'fractional-cto'],
    relatedIndustries: ['saas', 'financial-services', 'healthcare'],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES);

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return Object.values(SERVICES).filter(service => service.category === category);
}

export function getFeaturedServices(): Service[] {
  return Object.values(SERVICES).filter(service => service.featured);
}
