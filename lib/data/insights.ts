// Insights data for SEO-rich blog/article pages

export type InsightTopic = 'ai' | 'engineering' | 'startups' | 'case-studies' | 'trends';

export type Insight = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  topic: InsightTopic;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  content: {
    type: 'heading' | 'paragraph' | 'list' | 'quote' | 'code';
    content: string | string[];
  }[];
  tags: string[];
  relatedInsights: string[];
};

export const TOPIC_LABELS: Record<InsightTopic, string> = {
  'ai': 'AI & Machine Learning',
  'engineering': 'Engineering',
  'startups': 'Startups',
  'case-studies': 'Case Studies',
  'trends': 'Tech Trends',
};

export const INSIGHTS: Record<string, Insight> = {
  'building-ai-products-2024': {
    slug: 'building-ai-products-2024',
    title: 'Building AI Products in 2024: Lessons from 20+ Implementations',
    subtitle: 'Practical insights from integrating LLMs into production applications',
    description: 'What we\'ve learned from implementing AI features across healthcare, fintech, and SaaS products. A practical guide to avoiding common pitfalls.',
    topic: 'ai',
    readTime: '8 min read',
    publishedAt: '2024-01-15',
    author: {
      name: 'Ryan Lesson',
      role: 'Founder',
      image: '/team/ryan.png',
    },
    content: [
      { type: 'paragraph', content: 'Over the past year, our team has integrated AI capabilities into more than 20 production applications. From chatbots to document processing, from recommendation engines to automated workflows—we\'ve seen what works, what doesn\'t, and what separates successful AI implementations from failed ones.' },
      { type: 'heading', content: 'Start with the Problem, Not the Technology' },
      { type: 'paragraph', content: 'The most common mistake we see is teams starting with "we need to add AI" rather than "we need to solve X problem." AI is a tool, not a strategy. The best implementations we\'ve done started with a clear business problem and evaluated whether AI was the right solution.' },
      { type: 'heading', content: 'The 80/20 Rule of Prompt Engineering' },
      { type: 'paragraph', content: 'You can get 80% of the way to a great AI feature with good prompt engineering. The remaining 20% often requires fine-tuning, RAG architectures, or custom models—but don\'t jump there first. We\'ve seen teams spend months on complex solutions when a well-crafted prompt would have sufficed.' },
      { type: 'list', content: ['Start with zero-shot prompts', 'Add few-shot examples if needed', 'Consider RAG for domain-specific knowledge', 'Fine-tune only when necessary'] },
      { type: 'heading', content: 'Cost Optimization Matters More Than You Think' },
      { type: 'paragraph', content: 'AI API costs can explode quickly at scale. We\'ve helped clients reduce their AI costs by 70%+ through caching strategies, model selection optimization, and smart batching. Always build with cost monitoring from day one.' },
      { type: 'quote', content: 'The best AI features feel invisible. Users shouldn\'t think "this is AI"—they should think "this just works."' },
      { type: 'heading', content: 'Looking Forward' },
      { type: 'paragraph', content: 'The AI landscape continues to evolve rapidly. We\'re excited about multi-modal capabilities, improved reasoning in smaller models, and the democratization of fine-tuning. The companies that win will be those that thoughtfully integrate AI to solve real problems, not those that sprinkle it everywhere as a buzzword.' },
    ],
    tags: ['AI', 'LLMs', 'Product Development', 'Best Practices'],
    relatedInsights: ['choosing-the-right-ai-model', 'rag-architecture-patterns'],
  },
  'choosing-the-right-ai-model': {
    slug: 'choosing-the-right-ai-model',
    title: 'GPT-4 vs Claude vs Open Source: Choosing the Right AI Model',
    subtitle: 'A practical comparison for production applications',
    description: 'Not all AI models are created equal. Learn how to evaluate and select the right model for your specific use case and requirements.',
    topic: 'ai',
    readTime: '6 min read',
    publishedAt: '2024-01-08',
    author: {
      name: 'Jordan Lesson',
      role: 'Founder',
      image: '/team/jordan.png',
    },
    content: [
      { type: 'paragraph', content: 'With the proliferation of AI models—GPT-4, Claude, Llama, Mistral, and many more—choosing the right one for your application has become a significant decision. Here\'s our framework for evaluating models based on real production experience.' },
      { type: 'heading', content: 'Key Evaluation Criteria' },
      { type: 'list', content: ['Accuracy for your specific use case', 'Latency requirements', 'Cost per token at your expected volume', 'Privacy and data handling requirements', 'Rate limits and availability', 'Context window size'] },
      { type: 'heading', content: 'When to Use GPT-4' },
      { type: 'paragraph', content: 'GPT-4 remains the gold standard for complex reasoning, code generation, and multi-step tasks. If accuracy is paramount and cost is secondary, GPT-4 is often the right choice. We use it for legal document analysis, complex customer support, and code review automation.' },
      { type: 'heading', content: 'When to Use Claude' },
      { type: 'paragraph', content: 'Claude excels at nuanced, long-form content and tends to be more careful about edge cases. We\'ve found it particularly strong for content generation, summarization of long documents, and applications where tone matters. Claude 3 Opus rivals GPT-4 in many benchmarks.' },
      { type: 'heading', content: 'When to Go Open Source' },
      { type: 'paragraph', content: 'Open source models like Llama 2 and Mistral are compelling when you need data privacy, want to avoid vendor lock-in, or have specific fine-tuning requirements. The gap between open source and proprietary models is narrowing rapidly.' },
    ],
    tags: ['AI', 'LLMs', 'GPT-4', 'Claude', 'Model Selection'],
    relatedInsights: ['building-ai-products-2024', 'rag-architecture-patterns'],
  },
  'rag-architecture-patterns': {
    slug: 'rag-architecture-patterns',
    title: 'RAG Architecture Patterns for Production',
    subtitle: 'Building retrieval-augmented generation systems that scale',
    description: 'A deep dive into RAG architectures, from basic implementations to advanced patterns for enterprise applications.',
    topic: 'engineering',
    readTime: '10 min read',
    publishedAt: '2024-01-02',
    author: {
      name: 'Christian Loth',
      role: 'Senior Development Lead',
      image: '/team/christian.png',
    },
    content: [
      { type: 'paragraph', content: 'Retrieval-Augmented Generation (RAG) has become the go-to pattern for building AI applications that need access to private or specialized knowledge. But the gap between a demo RAG system and a production-ready one is significant.' },
      { type: 'heading', content: 'Basic RAG Architecture' },
      { type: 'paragraph', content: 'At its simplest, RAG involves: embedding your documents into a vector database, retrieving relevant chunks based on user queries, and including those chunks in your LLM prompt. This works well for demos but often fails in production.' },
      { type: 'heading', content: 'Common Failure Modes' },
      { type: 'list', content: ['Retrieval misses relevant documents', 'Too much irrelevant context confuses the model', 'Chunk boundaries cut off important context', 'Latency becomes unacceptable at scale', 'Cost explodes with large context windows'] },
      { type: 'heading', content: 'Advanced Patterns' },
      { type: 'paragraph', content: 'Production RAG systems often need hybrid search (combining semantic and keyword search), re-ranking retrieved results, query expansion, and intelligent chunking strategies. We\'ve found that spending time on retrieval quality pays dividends in output quality.' },
      { type: 'code', content: '// Example: Hybrid search with re-ranking\nconst results = await hybridSearch(query, {\n  semantic: { weight: 0.7 },\n  keyword: { weight: 0.3 }\n});\nconst reranked = await rerank(query, results);\nconst context = reranked.slice(0, 5);' },
    ],
    tags: ['RAG', 'Architecture', 'AI', 'Vector Databases', 'Engineering'],
    relatedInsights: ['building-ai-products-2024', 'choosing-the-right-ai-model'],
  },
  'startup-mvp-mistakes': {
    slug: 'startup-mvp-mistakes',
    title: '5 MVP Mistakes That Kill Startups (And How to Avoid Them)',
    subtitle: 'Lessons from building 30+ startup MVPs',
    description: 'The most common mistakes we see founders make when building their first product, and practical advice for getting to market faster.',
    topic: 'startups',
    readTime: '7 min read',
    publishedAt: '2023-12-18',
    author: {
      name: 'Ryan Lesson',
      role: 'Founder',
      image: '/team/ryan.png',
    },
    content: [
      { type: 'paragraph', content: 'Having built MVPs for 30+ startups, we\'ve seen patterns emerge in what separates successful launches from failed ones. Here are the five most common mistakes—and how to avoid them.' },
      { type: 'heading', content: '1. Building Too Much' },
      { type: 'paragraph', content: 'The #1 killer of MVPs is scope creep. Every feature you add delays your launch and increases your burn. Your MVP should be embarrassingly simple. If you\'re not embarrassed by v1, you launched too late.' },
      { type: 'heading', content: '2. Optimizing for Scale Too Early' },
      { type: 'paragraph', content: 'We see founders building Kubernetes clusters for apps that don\'t have users yet. Your MVP doesn\'t need to handle 1M users. It needs to handle your first 100. Build for today\'s problems, not tomorrow\'s hypothetical ones.' },
      { type: 'heading', content: '3. Ignoring Distribution' },
      { type: 'paragraph', content: 'A beautiful product nobody knows about is worse than an ugly product with users. Plan your distribution strategy before you start building. The best MVPs are built with a specific acquisition channel in mind.' },
      { type: 'heading', content: '4. Not Talking to Users' },
      { type: 'paragraph', content: 'If you\'re building for 3 months without user feedback, you\'re probably building the wrong thing. Get something in front of users within weeks, even if it\'s a prototype or landing page.' },
      { type: 'heading', content: '5. Picking the Wrong Tech Stack' },
      { type: 'paragraph', content: 'Your MVP tech stack should optimize for speed of iteration, not theoretical best practices. Use boring technology you know well. This isn\'t the time to learn a new framework.' },
      { type: 'quote', content: 'The best MVP is the one that ships. Period. You can always improve it later.' },
    ],
    tags: ['Startups', 'MVP', 'Product', 'Founders'],
    relatedInsights: ['tech-stack-for-startups', 'building-ai-products-2024'],
  },
  'tech-stack-for-startups': {
    slug: 'tech-stack-for-startups',
    title: 'The Optimal Tech Stack for Startups in 2024',
    subtitle: 'Maximize velocity without sacrificing quality',
    description: 'Our recommended tech stack for startups that need to move fast, stay lean, and scale when the time comes.',
    topic: 'startups',
    readTime: '5 min read',
    publishedAt: '2023-12-10',
    author: {
      name: 'Mitch Carrara',
      role: 'Founding Software Engineer',
      image: '/team/mitch.png',
    },
    content: [
      { type: 'paragraph', content: 'After building dozens of startup products, we\'ve converged on a tech stack that optimizes for what matters most early on: development speed, time to market, and the ability to iterate quickly based on user feedback.' },
      { type: 'heading', content: 'Our Recommended Stack' },
      { type: 'list', content: ['Frontend: Next.js (App Router) + TypeScript + Tailwind', 'Backend: Next.js API routes or separate Node.js/Express', 'Database: PostgreSQL via Supabase or PlanetScale', 'Auth: Clerk or NextAuth', 'Payments: Stripe', 'Hosting: Vercel', 'Analytics: PostHog'] },
      { type: 'heading', content: 'Why This Stack?' },
      { type: 'paragraph', content: 'Every choice optimizes for developer velocity. Next.js gives you full-stack capabilities in one framework. TypeScript catches bugs before they hit production. Tailwind eliminates CSS bikeshedding. Managed services like Supabase and Vercel mean zero DevOps overhead.' },
      { type: 'heading', content: 'When to Deviate' },
      { type: 'paragraph', content: 'This stack isn\'t universal. If you\'re building something ML-heavy, Python might be better. If you\'re building a mobile app, React Native makes sense. If you need real-time at scale, consider adding Redis. But for most web-based MVPs, this stack just works.' },
    ],
    tags: ['Tech Stack', 'Startups', 'Next.js', 'Engineering'],
    relatedInsights: ['startup-mvp-mistakes', 'building-ai-products-2024'],
  },
  'lit-financial-case-study': {
    slug: 'lit-financial-case-study',
    title: 'Case Study: Transforming Lit Financial\'s Digital Experience',
    subtitle: 'How we helped a mortgage company modernize their tech stack',
    description: 'A deep dive into our partnership with Lit Financial, including the technical challenges, solutions, and measurable outcomes.',
    topic: 'case-studies',
    readTime: '6 min read',
    publishedAt: '2023-12-01',
    author: {
      name: 'Jordan Lesson',
      role: 'Founder',
      image: '/team/jordan.png',
    },
    content: [
      { type: 'paragraph', content: 'When Lit Financial approached us, they were struggling with an outdated web presence that wasn\'t converting leads or reflecting their modern approach to mortgages. This is the story of how we transformed their digital experience.' },
      { type: 'heading', content: 'The Challenge' },
      { type: 'paragraph', content: 'The mortgage industry often suffers from dated technology and complex processes. Lit Financial needed a platform that would simplify the mortgage journey while scaling their operations and maintaining personalized service.' },
      { type: 'heading', content: 'Our Approach' },
      { type: 'list', content: ['Discovery workshops to understand user needs', 'Modern React frontend with Contentful CMS', 'Smart application flow that adapts to user inputs', 'Real-time rate calculators', 'Integrated lead management'] },
      { type: 'heading', content: 'Results' },
      { type: 'paragraph', content: 'The new platform delivered measurable impact: 40% increase in online applications, 60% reduction in processing time, 85% customer satisfaction score, and 3x loan officer productivity.' },
      { type: 'quote', content: 'The new platform has completely transformed how we handle mortgages. Our loan officers can focus on what they do best—helping customers find the right solutions.' },
    ],
    tags: ['Case Study', 'Fintech', 'Web Development', 'React'],
    relatedInsights: ['startup-mvp-mistakes', 'tech-stack-for-startups'],
  },
};

export const INSIGHT_SLUGS = Object.keys(INSIGHTS);

export function getInsightsByTopic(topic: InsightTopic): Insight[] {
  return Object.values(INSIGHTS).filter(insight => insight.topic === topic);
}

export function getRecentInsights(limit: number = 5): Insight[] {
  return Object.values(INSIGHTS)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
