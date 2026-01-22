# Protocoding Website

Corporate website for Protocoding, an AI development studio. Built with Next.js 16 App Router, React 19, and Tailwind CSS.

**Live Site:** [protocoding.com](https://www.protocoding.com)

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.3 | App Router, SSG, API Routes |
| React | 19.2.3 | UI Framework |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 3.4.x | Styling |
| Framer Motion | 12.x | Animations |
| Resend | 6.x | Transactional Email |
| Bun | Latest | Package Manager & Runtime |

### Fonts
- **Plus Jakarta Sans** - Headlines & display text
- **DM Sans** - Body text

---

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Environment Variables

Create a `.env.local` file in the root:

```env
# Email (Resend) - Required for contact form
RESEND_API_KEY=re_xxxxxxxxxxxx

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Project Structure

```
protocoding_v3/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (metadata, fonts, nav, footer)
│   ├── page.tsx                  # Home page
│   ├── loading.tsx               # Global loading state
│   ├── error.tsx                 # Global error boundary
│   ├── not-found.tsx             # Custom 404 page
│   ├── globals.css               # Global styles & Tailwind utilities
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── favicon.ico               # Favicon
│   │
│   ├── about/                    # About section
│   │   ├── page.tsx              # About page
│   │   └── team/page.tsx         # Team page
│   │
│   ├── services/                 # Services section
│   │   ├── page.tsx              # Services index
│   │   └── [slug]/page.tsx       # Dynamic service pages (18 services)
│   │
│   ├── industries/               # Industries section
│   │   ├── page.tsx              # Industries index
│   │   └── [slug]/page.tsx       # Dynamic industry pages
│   │
│   ├── insights/                 # Blog/Insights section
│   │   ├── page.tsx              # Insights index with filtering
│   │   └── [slug]/page.tsx       # Dynamic article pages (50+ articles)
│   │
│   ├── portfolio/                # Portfolio section
│   │   ├── page.tsx              # Portfolio index
│   │   └── [slug]/page.tsx       # Dynamic case study pages
│   │
│   ├── careers/                  # Careers section
│   │   ├── page.tsx              # Careers page with job listings
│   │   └── JobsList.tsx          # Client component for job list
│   │
│   ├── contact/page.tsx          # Contact page with form
│   ├── privacy/page.tsx          # Privacy policy
│   ├── terms/page.tsx            # Terms of service
│   │
│   └── api/                      # API Routes
│       ├── contact/              # Contact form endpoint
│       │   ├── route.ts          # POST handler
│       │   ├── admin-notification.tsx    # Admin email template
│       │   └── customer-confirmation.tsx # Customer email template
│       │
│       └── job-application/      # Job application endpoint
│           ├── route.ts          # POST handler
│           └── *.tsx             # Email templates
│
├── components/                   # React Components
│   ├── Navigation.tsx            # Site navigation (client)
│   ├── Footer.tsx                # Site footer (server)
│   ├── ScrollProgress.tsx        # Scroll progress indicator (client)
│   │
│   ├── HeroSlider.tsx            # Home hero with parallax (client)
│   ├── Tagline.tsx               # Company tagline section
│   ├── FeaturedWork.tsx          # Featured portfolio items
│   ├── Difference.tsx            # "Why Protocoding" section
│   ├── Services.tsx              # Services overview
│   ├── Process.tsx               # Development process
│   ├── Portfolio.tsx             # Portfolio grid
│   ├── CTA.tsx                   # Call-to-action section
│   │
│   ├── ContactForm.tsx           # Contact form (client)
│   ├── InsightsFilter.tsx        # Insights filtering (client)
│   ├── JobApplicationModal.tsx   # Job application modal (client)
│   ├── AnimatedCounter.tsx       # Animated number counter (client)
│   └── ...
│
├── lib/                          # Utilities & Data
│   ├── utils.ts                  # cn() helper for Tailwind
│   ├── animations.ts             # Framer Motion variants
│   ├── rate-limit.ts             # API rate limiting utility
│   └── data/                     # Static data (acts as CMS)
│       ├── services.ts           # 18 service definitions
│       ├── industries.ts         # 6 industry definitions
│       ├── insights.ts           # 50+ article definitions
│       ├── navigation.ts         # Nav structure
│       └── portfolio.ts          # Portfolio items
│
├── public/                       # Static Assets
│   ├── brand/                    # Logos (SVG)
│   ├── clients/                  # Client logos (PNG)
│   ├── team/                     # Team photos (PNG)
│   ├── insights/                 # Article images (JPG)
│   ├── workplace/                # Office photos (PNG/WebP)
│   ├── icons/                    # UI icons (SVG)
│   ├── og-image.png              # Open Graph image
│   ├── robots.txt                # Robots file
│   └── site.webmanifest          # PWA manifest
│
├── content-lab/                  # Content Generation Tools
│   ├── scripts/                  # Bun scripts for content
│   │   ├── generate-article.ts   # AI article generation
│   │   ├── add-article-to-insights.ts
│   │   ├── generate-article-image.ts
│   │   └── ...
│   ├── article_generator/        # Generated articles (JSON/MD)
│   └── rules/                    # Content guidelines
│
├── next.config.ts                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
└── bun.lock                      # Bun lockfile
```

---

## Pages & Routes

### Public Pages

| Route | Description | Type |
|-------|-------------|------|
| `/` | Home page with hero, services, portfolio, CTA | SSG |
| `/about` | Company about page | SSG |
| `/about/team` | Team members | SSG |
| `/services` | All services overview | SSG |
| `/services/[slug]` | Individual service (18 pages) | SSG |
| `/industries` | Industries we serve | SSG |
| `/industries/[slug]` | Individual industry (6 pages) | SSG |
| `/insights` | Blog/articles with filtering | SSG |
| `/insights/[slug]` | Individual article (50+ pages) | SSG |
| `/portfolio` | Portfolio showcase | SSG |
| `/portfolio/[slug]` | Case study details | SSG |
| `/careers` | Job listings | SSG |
| `/contact` | Contact form | SSG |
| `/privacy` | Privacy policy | SSG |
| `/terms` | Terms of service | SSG |

### API Routes

| Route | Method | Purpose | Rate Limit |
|-------|--------|---------|------------|
| `/api/contact` | POST | Contact form submission | 5/min per IP |
| `/api/job-application` | POST | Job application submission | 3/hour per IP |

---

## Services (18 Total)

### AI & Data
- AI Integration
- AI Agents & Automation
- Machine Learning
- Data Engineering

### Software Engineering
- Full-Stack Development
- Mobile Development
- API Development
- Cloud & DevOps
- Process Automation

### Product & Experience
- Product Design
- MVP Development
- Digital Transformation

### Consulting & Strategy
- Technical Consulting
- Fractional CTO
- Team Augmentation
- Architecture Review

---

## Design System

### Colors

```css
:root {
  --accent: #0D99FF;           /* Primary accent (blue) */
  --dark-bg: #1a1a1a;          /* Dark backgrounds */
  --light-bg: #f8f8f9;         /* Light backgrounds */
  --text-primary: #111111;     /* Primary text */
  --text-muted: #4b5563;       /* Secondary text */
}
```

### Layout System

The site uses a distinctive gutter-based grid system:

```
┌─────────┬─────────────────────────────┬─────────┐
│  Gutter │         Content             │  Gutter │
│  80-120px│                            │ 80-120px│
└─────────┴─────────────────────────────┴─────────┘
```

**Key CSS classes:**
- `.section-row` - Light section with gutters
- `.section-row-dark` - Dark section with gutters
- `.material` - Light surface with subtle shadow
- `.material-dark` - Dark surface
- `.material-elevated` - Raised white surface
- `.material-inset` - Recessed surface
- `.cell` / `.cell-dark` - Grid cell with borders

### Typography

- **Headlines:** Plus Jakarta Sans, -0.025em tracking, 700 weight
- **Body:** DM Sans, -0.01em tracking, 1.6 line-height
- **Labels:** 9-11px, bold, 0.2-0.3em letter-spacing, uppercase

---

## SEO Features

- ✅ Dynamic metadata per page with rich descriptions
- ✅ Title templates (`%s | Protocoding`)
- ✅ Open Graph & Twitter cards on all pages
- ✅ JSON-LD structured data (Organization, WebSite, Article)
- ✅ Dynamic sitemap.xml with priorities
- ✅ robots.txt
- ✅ Canonical URLs via metadataBase
- ✅ generateStaticParams for all dynamic routes

---

## Accessibility Features

- ✅ Skip to main content link for keyboard navigation
- ✅ Semantic HTML (`<main>`, `<nav>`, `<article>`, `<footer>`)
- ✅ Form labels with screen reader support (`sr-only`)
- ✅ ARIA attributes (`aria-required`, `aria-invalid`, `aria-live`)
- ✅ Visible focus states on interactive elements
- ✅ Proper heading hierarchy
- ✅ Alt text on images

---

## Security Features

- ✅ Rate limiting on API routes (in-memory)
- ✅ Input validation (client & server-side)
- ✅ Field length limits to prevent abuse
- ✅ Email validation with regex
- ✅ File size limits on uploads (10MB)
- ✅ No `X-Powered-By` header
- ✅ Proper error handling without stack traces

---

## Performance Optimizations

- ✅ Static Site Generation (SSG) for all pages
- ✅ Image optimization (AVIF, WebP)
- ✅ Font optimization with `next/font` (only used weights loaded)
- ✅ Tree-shaking for lucide-react & framer-motion
- ✅ 30-day image cache TTL
- ✅ Compression enabled
- ✅ No render-blocking fonts (`display: swap`)
- ✅ Loading states for better perceived performance
- ✅ Error boundaries for graceful failure handling

---

## Content Management

Content is managed through TypeScript files in `lib/data/`:

### Adding a New Service

Edit `lib/data/services.ts`:

```typescript
'new-service': {
  slug: 'new-service',
  title: 'New Service',
  subtitle: 'Service Tagline',
  description: 'Short description',
  heroDescription: 'Longer hero description',
  category: 'ai', // ai | engineering | product | consulting
  benefits: ['Benefit 1', 'Benefit 2'],
  process: [
    { step: '01', title: 'Discovery', description: '...' },
    // ...
  ],
  technologies: ['Tech 1', 'Tech 2'],
  deliverables: ['Deliverable 1', 'Deliverable 2'],
  pricing: { type: 'Project-based', description: '...' },
  faqs: [
    { question: '...', answer: '...' },
  ],
  relatedServices: ['other-service-slug'],
  relatedIndustries: ['industry-slug'],
},
```

### Adding a New Article

Use the content generation scripts:

```bash
# Generate article with AI
bun run generate:article

# Add latest article to insights
bun run add:article:latest

# Generate hero image
bun run generate:image
```

Or manually edit `lib/data/insights.ts`.

---

## Scripts

```bash
# Development
bun dev                    # Start dev server
bun run build              # Production build
bun start                  # Start production server
bun lint                   # Run ESLint

# Content Generation
bun run generate:article              # Generate new article
bun run generate:article:interactive  # Interactive mode
bun run add:article:latest            # Add latest to insights
bun run add:article:latest:image      # Add with image generation
bun run add:article:all               # Add all new articles
bun run generate:image                # Generate article image
bun run generate:all-images           # Generate all missing images
bun run fix:read-times                # Recalculate read times
bun run expand:articles               # Expand short articles
```

---

## Deployment

The site is configured for deployment on Vercel:

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to `main`

Build command: `bun run build`
Output: `.next` directory

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## License

Proprietary - Protocoding, Inc.
