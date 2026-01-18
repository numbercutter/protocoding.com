import { MetadataRoute } from 'next';
import { INDUSTRY_SLUGS } from '@/lib/data/industries';
import { SERVICE_SLUGS } from '@/lib/data/services';
import { INSIGHT_SLUGS } from '@/lib/data/insights';

const baseUrl = 'https://www.protocoding.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Main pages
  const mainRoutes = [
    '',
    '/about',
    '/about/team',
    '/services',
    '/industries',
    '/insights',
    '/portfolio',
    '/careers',
    '/contact',
  ];

  // Dynamic industry pages
  const industryRoutes = INDUSTRY_SLUGS.map((slug) => `/industries/${slug}`);

  // Dynamic service pages  
  const serviceRoutes = SERVICE_SLUGS.map((slug) => `/services/${slug}`);

  // Dynamic insight pages
  const insightRoutes = INSIGHT_SLUGS.map((slug) => `/insights/${slug}`);

  // Portfolio pages (hardcoded for now)
  const portfolioRoutes = [
    '/portfolio/aivre',
    '/portfolio/lit-financial',
    '/portfolio/whats-what',
    '/portfolio/poser',
  ];

  const allRoutes = [
    ...mainRoutes,
    ...industryRoutes,
    ...serviceRoutes,
    ...insightRoutes,
    ...portfolioRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: getPriority(route),
  }));
}

function getPriority(route: string): number {
  if (route === '') return 1;
  if (route === '/services' || route === '/industries') return 0.9;
  if (route.startsWith('/services/') || route.startsWith('/industries/')) return 0.8;
  if (route === '/insights' || route === '/about') return 0.8;
  if (route.startsWith('/insights/')) return 0.7;
  if (route.startsWith('/portfolio/')) return 0.7;
  return 0.6;
}
