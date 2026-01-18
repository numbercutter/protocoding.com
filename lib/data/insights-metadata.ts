// Lightweight metadata for listing pages - much smaller bundle
// Full content stays in insights.ts and is only loaded on individual article pages

import { INSIGHTS, InsightTopic, TOPIC_LABELS } from './insights';

export type InsightMetadata = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  topic: InsightTopic;
  readTime: string;
  publishedAt: string;
  heroImage?: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  tags: string[];
};

// Extract only metadata (no content) for list views
export const INSIGHTS_METADATA: InsightMetadata[] = Object.values(INSIGHTS).map(
  ({ content, relatedInsights, ...metadata }) => metadata
);

// Pre-sorted by date for listing pages
export const INSIGHTS_BY_DATE = [...INSIGHTS_METADATA].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

// Pre-grouped by topic for filtered views
export const INSIGHTS_BY_TOPIC: Record<InsightTopic, InsightMetadata[]> = {
  ai: INSIGHTS_METADATA.filter(i => i.topic === 'ai'),
  engineering: INSIGHTS_METADATA.filter(i => i.topic === 'engineering'),
  startups: INSIGHTS_METADATA.filter(i => i.topic === 'startups'),
  'case-studies': INSIGHTS_METADATA.filter(i => i.topic === 'case-studies'),
  trends: INSIGHTS_METADATA.filter(i => i.topic === 'trends'),
};

export function getRecentInsightsMetadata(limit: number = 6): InsightMetadata[] {
  return INSIGHTS_BY_DATE.slice(0, limit);
}

export { TOPIC_LABELS, type InsightTopic };
