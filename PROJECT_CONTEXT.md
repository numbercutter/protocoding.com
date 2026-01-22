# Protocoding Website - Technical Reference

Detailed technical documentation for developers working on the Protocoding website.

---

## Architecture Overview

### Rendering Strategy

All pages use **Static Site Generation (SSG)**:

- Pages are pre-rendered at build time
- Dynamic routes use `generateStaticParams()` for static generation
- No server-side rendering (SSR) or ISR currently in use
- API routes handle form submissions

### Component Strategy

```
Server Components (Default)
├── Pages (app/**/page.tsx)
├── Layouts (app/layout.tsx)
├── Footer
├── Static sections (Tagline, Services, Process, etc.)

Client Components ('use client')
├── Navigation (scroll state, mobile menu)
├── HeroSlider (animations, parallax)
├── ContactForm (form state)
├── InsightsFilter (filter state)
├── JobApplicationModal (modal state)
├── AnimatedCounter (intersection observer)
├── ScrollProgress (scroll tracking)
```

---

## File Patterns

### Page Files

Every page follows this structure:

```typescript
// app/[section]/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title - Protocoding',
  description: 'Page description for SEO.',
};

export default function PageName() {
  return (
    <>
      {/* Hero section - usually dark */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12">
          {/* Hero content */}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Content sections - alternate light/dark */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material p-6 md:p-8">
          {/* Section content */}
        </div>
        <div className="gutter-right" />
      </div>
    </>
  );
}
```

### Dynamic Route Pages

```typescript
// app/[section]/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DATA_OBJECT, SLUGS } from '@/lib/data/datafile';

type Props = {
  params: Promise<{ slug: string }>;
};

// Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = DATA_OBJECT[slug];
  
  if (!item) return { title: 'Not Found' };
  
  return {
    title: `${item.title} - Section - Protocoding`,
    description: item.description,
    openGraph: { /* ... */ },
    twitter: { /* ... */ },
  };
}

// Pre-generate all routes at build time
export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

// Page component
export default async function ItemPage({ params }: Props) {
  const { slug } = await params;
  const item = DATA_OBJECT[slug];

  if (!item) {
    notFound();
  }

  return (
    <>
      {/* Page content */}
    </>
  );
}
```

### Client Components

```typescript
// components/ComponentName.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ComponentName() {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  );
}
```

---

## Data Layer

### Data Files Structure

All content lives in `lib/data/`:

```typescript
// lib/data/services.ts
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
  process: { step: string; title: string; description: string; }[];
  technologies: string[];
  deliverables: string[];
  pricing: { type: string; description: string; };
  faqs: { question: string; answer: string; }[];
  relatedServices: string[];
  relatedIndustries: string[];
};

export const SERVICES: Record<string, Service> = {
  'service-slug': { /* ... */ },
};

export const SERVICE_SLUGS = Object.keys(SERVICES);

// Helper functions
export function getServicesByCategory(category: ServiceCategory): Service[] {
  return Object.values(SERVICES).filter(s => s.category === category);
}
```

### Data Files

| File | Contains | Count |
|------|----------|-------|
| `services.ts` | Service definitions | 18 |
| `industries.ts` | Industry definitions | 6 |
| `insights.ts` | Article definitions | 50+ |
| `navigation.ts` | Nav structure | - |
| `portfolio.ts` | Portfolio items | 4 |

---

## Styling System

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{tsx,ts}', './components/**/*.{tsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        scroll: 'scroll var(--animation-duration, 40s) linear infinite',
      },
    },
  },
};
```

### CSS Custom Properties

```css
/* globals.css */
:root {
  --accent: #0D99FF;
  --dark-bg: #1a1a1a;
  --light-bg: #f8f8f9;
  --light-bg-elevated: #ffffff;
  --light-bg-inset: #f0f0f2;
  --text-primary: #111111;
  --text-muted: #4b5563;
  --border: rgba(0, 0, 0, 0.1);
  --border-dark: rgba(255, 255, 255, 0.08);
}
```

### Layout Classes

```css
/* Section with gutters - responsive grid */
.section-row {
  display: grid;
  grid-template-columns: 80px 1fr 80px;  /* md */
  grid-template-columns: 100px 1fr 100px; /* lg */
  grid-template-columns: 120px 1fr 120px; /* xl */
}

/* Gutters collapse on mobile */
@media (max-width: 767px) {
  .section-row { display: block; }
  .gutter-left, .gutter-right { display: none; }
}
```

### Surface Classes

| Class | Background | Use Case |
|-------|------------|----------|
| `.material` | `#f8f8f9` | Default light surface |
| `.material-dark` | `#1a1a1a` | Dark sections |
| `.material-elevated` | `#ffffff` | Raised cards |
| `.material-inset` | `#f0f0f2` | Recessed areas |
| `.cell` | + borders | Grid items (light) |
| `.cell-dark` | + borders | Grid items (dark) |

---

## API Routes

### Contact Form

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();

  // Validation
  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Send emails via Resend
  await Promise.all([
    resend.emails.send({ /* admin notification */ }),
    resend.emails.send({ /* customer confirmation */ }),
  ]);

  return NextResponse.json({ success: true });
}
```

### Email Templates

Email templates use React Email components:

```typescript
// app/api/contact/admin-notification.tsx
import { Html, Body, Text } from '@react-email/components';

export function AdminNotificationEmail({ name, email, message }) {
  return (
    <Html>
      <Body>
        <Text>New inquiry from {name}</Text>
        {/* ... */}
      </Body>
    </Html>
  );
}
```

---

## SEO Implementation

### Root Layout Metadata

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Protocoding - AI Development Studio',
    template: '%s | Protocoding',
  },
  description: '...',
  metadataBase: new URL('https://www.protocoding.com'),
  robots: { index: true, follow: true },
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
  icons: { /* ... */ },
  manifest: '/site.webmanifest',
};
```

### Structured Data

```typescript
// Organization schema (layout.tsx)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Protocoding',
  url: 'https://www.protocoding.com',
  logo: 'https://www.protocoding.com/brand/logo_color.svg',
  // ...
};

// Article schema (insights/[slug]/page.tsx)
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: insight.title,
  datePublished: insight.publishedAt,
  author: { '@type': 'Person', name: insight.author.name },
  // ...
};
```

### Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', '/about', '/services', '/industries', '/insights',
    ...SERVICE_SLUGS.map(s => `/services/${s}`),
    ...INDUSTRY_SLUGS.map(s => `/industries/${s}`),
    ...INSIGHT_SLUGS.map(s => `/insights/${s}`),
  ];

  return routes.map(route => ({
    url: `https://www.protocoding.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: getPriority(route),
  }));
}
```

---

## Animation Patterns

### Framer Motion Variants

```typescript
// lib/animations.ts
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};
```

### Usage

```tsx
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.h1 variants={itemVariants}>Title</motion.h1>
  <motion.p variants={itemVariants}>Description</motion.p>
</motion.div>
```

### CSS Animations

```css
/* Infinite scroll marquee */
@keyframes scroll {
  to { transform: translate(calc(-50% - 0.5rem)); }
}

.animate-scroll {
  animation: scroll var(--animation-duration, 40s) linear infinite;
}
```

---

## Image Handling

### Next.js Image Config

```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 768, 1024, 1280, 1536],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
  minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
}
```

### Image Patterns

```tsx
// Hero images - priority loading
<Image src="/image.jpg" fill priority className="object-cover" alt="..." />

// Below fold - lazy loading
<Image src="/image.jpg" width={400} height={300} loading="lazy" alt="..." />

// Author avatars
<Image src={author.image} width={48} height={48} className="rounded-full" alt={author.name} />
```

---

## Content Generation

### Article Generation Flow

1. **Generate article content:**
   ```bash
   bun run generate:article
   ```
   Creates JSON/MD in `content-lab/article_generator/`

2. **Add to insights data:**
   ```bash
   bun run add:article:latest
   ```
   Appends to `lib/data/insights.ts`

3. **Generate hero image:**
   ```bash
   bun run generate:image
   ```
   Saves to `public/insights/`

### Script Details

| Script | Purpose |
|--------|---------|
| `generate-article.ts` | AI-powered article generation using Anthropic |
| `add-article-to-insights.ts` | Adds articles to the insights data file |
| `generate-article-image.ts` | Generates hero images for articles |
| `fix-read-times.ts` | Recalculates reading times based on content |
| `expand-short-articles.ts` | Expands articles under word count threshold |

---

## Performance Considerations

### Bundle Optimization

```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ['lucide-react', 'framer-motion'],
}
```

### Font Loading

```typescript
// app/layout.tsx
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap', // Prevents FOIT
  weight: ['400', '500', '600', '700'],
});
```

### Image Optimization

- Use `priority` only for LCP images (hero)
- Use `loading="lazy"` for below-fold images
- Provide explicit `width`/`height` when possible
- Use `fill` with `object-cover` for responsive containers

---

## Common Patterns

### Linking to Services

```tsx
import Link from 'next/link';
import { SERVICES } from '@/lib/data/services';

// Direct link
<Link href="/services/ai-integration">AI Integration</Link>

// From data
{Object.values(SERVICES).map(service => (
  <Link key={service.slug} href={`/services/${service.slug}`}>
    {service.title}
  </Link>
))}
```

### Conditional Dark/Light Sections

```tsx
{items.map((item, index) => {
  const isDark = index % 2 === 1;
  
  return (
    <div className={isDark ? 'section-row-dark' : 'section-row'}>
      <div className="gutter-left" />
      <div className={isDark ? 'material-dark' : 'material'}>
        {/* content */}
      </div>
      <div className="gutter-right" />
    </div>
  );
})}
```

### Mobile-First Responsive

```tsx
<div className="p-6 md:p-8 lg:p-12">
  <h1 className="text-2xl md:text-3xl lg:text-5xl">
    Responsive heading
  </h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {/* Grid items */}
  </div>
</div>
```

---

## Known Limitations

1. **No CMS** - Content is in TypeScript files, requires rebuild to update
2. **No ISR** - All pages are fully static, no incremental regeneration
3. **No auth** - No protected routes or user accounts
4. **No search** - Insights filtering is client-side only
5. **No i18n** - English only

---

## Implemented Features

- [x] `loading.tsx` - Global loading state with branded spinner
- [x] `error.tsx` - Error boundary with retry functionality
- [x] `not-found.tsx` - Custom 404 page with navigation
- [x] Rate limiting on API routes (5/min contact, 3/hr job applications)
- [x] Form accessibility (aria-labels, aria-required, aria-invalid, aria-live)
- [x] Skip to main content link for keyboard navigation
- [x] Optimized font loading (only used weights)

## Future Considerations

- [ ] Consider headless CMS for content (Sanity, Contentful)
- [ ] Add analytics event tracking (Google Analytics ready in layout)
- [ ] Add A/B testing capability
- [ ] Consider Redis for distributed rate limiting (multi-instance)
- [ ] Add Google Search Console verification