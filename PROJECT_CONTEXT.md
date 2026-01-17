# Protocoding Website - Project Context & Reference

This document outlines the features, infrastructure, and architecture based on the reference implementation (V2 website).

---

## Overview

A modern, full-service software studio website built with Next.js App Router. Features a dark, premium aesthetic with extensive animations and interactive elements.

---

## Tech Stack

### Core Framework
- **Next.js 16** - App Router architecture
- **React 19** - Latest React version
- **TypeScript** - Full type safety
- **Bun** - Package manager and runtime

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **CSS Variables** - For theming (shadcn compatible)
- **Custom animations** - Extensive keyframe animations

### UI Components
- **shadcn/ui** - Component library (new-york style)
- **Radix UI** - Headless primitives (popover, slot)
- **Lucide React** - Icon library
- **Framer Motion** - Advanced animations

### Fonts (Google Fonts)
- **REM** - Primary headings
- **Outfit** - Body text
- **Oxanium** - Accent/tech feel
- **Kode Mono** - Monospace/code

---

## Pages & Routes

### Main Pages
| Route | Description |
|-------|-------------|
| `/` | Home - Hero, Companies, Compare, How It Works, Pricing, Portfolio, FAQ |
| `/contact` | Contact page |
| `/pricing` | Dedicated pricing page |
| `/portfolio` | Portfolio showcase |
| `/portfolio/[slug]` | Individual portfolio item |
| `/services` | Services overview |
| `/services/[slug]` | Individual service page |
| `/careers` | Job listings |
| `/careers/[slug]` | Individual job posting |
| `/our-team` | Team members page |
| `/get-started` | Multi-step project inquiry form |
| `/reach-out` | Alternative contact |
| `/cost-estimator` | Interactive project cost calculator |

### API Routes
| Route | Purpose |
|-------|---------|
| `/api/submit-form` | Main contact form submission |
| `/api/get-started` | Project inquiry form |
| `/api/submit-job` | Job application handler |
| `/api/upload-image` | Image upload handler |
| `/api/upload-file` | File upload handler |

---

## Key Components

### Layout Components
- **Navigation** - Responsive nav with mobile menu
- **Footer** - Site footer with links
- **Background** - Animated gradient background wrapper

### Home Page Sections
- **Hero** - Video background hero with stats cards
- **Companies** - Logo carousel/showcase
- **Compare** - Comparison section
- **ProtoDifference** - Feature highlights with 3D cards
- **HowItWorks** - Process steps section
- **PricingSection** - Pricing tiers display
- **PortfolioSection** - Portfolio grid
- **FAQSection** - Searchable/filterable FAQ accordion

### UI Components (Custom)
- `3d-card.tsx` - 3D hover effect cards
- `apple-cards-carousel.tsx` - Apple-style carousel
- `card-hover-effect.tsx` - Hover animations
- `cover.tsx` - Cover/overlay component
- `cta-button.tsx` - Call-to-action buttons
- `gradient-input.tsx` - Gradient border inputs
- `hero-highlight.tsx` - Text highlight effects
- `nav-card.tsx` - Navigation cards
- `portfolio-card.tsx` - Portfolio item cards
- `sparkles.tsx` - Particle sparkle effects
- `text-hover-effect.tsx` - Text hover animations

### Feature Components
- **ContactForm** - Multi-field contact form
- **JobModal** - Job application modal
- **SplineScene** - 3D Spline embeds
- **TeamMemberCard** - Team profile cards
- **WorkCard** - Portfolio work cards
- **BenefitsCard** - Feature benefit cards
- **FeatureComparisonTable** - Feature comparison grid

---

## Infrastructure & Services

### Email (Resend)
- Transactional emails for form submissions
- Admin notifications
- Customer confirmation emails
- React Email templates for HTML emails

**Environment Variables:**
```env
RESEND_API_KEY=your_resend_api_key
```

### reCAPTCHA v3
- Bot protection on all forms
- Server-side validation

**Environment Variables:**
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

### Google Analytics
- Page view tracking
- Event tracking

**Environment Variables:**
```env
# GA ID is hardcoded in layout, but could be moved to env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### General
```env
NEXT_PUBLIC_ENV=development|production
```

---

## Design System

### Color Palette
- **Primary Background:** Black (`#000`, `#0a0a0a`)
- **Accent Colors:** Purple, Green, Blue, Emerald, Orange, Violet, Cyan
- **Text:** White with various opacity levels
- **Borders:** White/gray with low opacity

### CSS Variables (shadcn)
```css
--background: 0 0% 3.9%;
--foreground: 0 0% 98%;
--primary: 0 0% 98%;
--secondary: 0 0% 14.9%;
--muted: 0 0% 14.9%;
--accent: 0 0% 14.9%;
--border: 0 0% 14.9%;
--ring: 0 0% 83.1%;
--radius: 0.5rem;
```

### Animations
- `gradient-slide` - Background gradient movement
- `shine` - Shimmer/shine effect
- `scroll` - Infinite scroll
- `spotlight` - Spotlight reveal
- `shimmer` - Loading shimmer
- `gradient-x` - Horizontal gradient animation
- `fadeIn` - Fade in
- `float` - Floating element
- `pulse-slow` - Slow pulse
- `spin-slow` - Slow rotation

### Background Effects
- `gradient-background` - Animated dark gradient
- `bg-grid` - SVG grid pattern
- `bg-dot` - SVG dot pattern

---

## Development Tools

### Code Quality
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Staged file linting

### Testing
- **Vitest** - Unit testing
- **Testing Library** - React component testing
- **jsdom** - DOM simulation

### Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run",
  "test:watch": "vitest",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

---

## Key Dependencies to Install

### Production
```
next react react-dom
framer-motion
tailwindcss tailwind-merge tailwindcss-animate
class-variance-authority clsx
lucide-react
@radix-ui/react-popover @radix-ui/react-slot
resend @react-email/components @react-email/render
react-intersection-observer
sharp
```

### Development
```
typescript @types/node @types/react @types/react-dom
eslint eslint-config-next
prettier
autoprefixer postcss
vitest @testing-library/react @testing-library/jest-dom jsdom
husky lint-staged
```

---

## File Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (server)
│   ├── client.tsx          # Home page (client)
│   ├── api/                # API routes
│   ├── contact/
│   ├── pricing/
│   ├── portfolio/
│   ├── services/
│   ├── careers/
│   ├── get-started/
│   └── ...
├── components/
│   ├── ui/                 # shadcn + custom UI
│   ├── Navigation/
│   ├── Footer/
│   ├── Hero/
│   └── ...
├── hooks/
│   ├── use-mobile.tsx
│   └── useMediaQuery.ts
├── lib/
│   ├── utils.ts            # cn() helper
│   └── metadata.ts
├── styles/
│   ├── globals.css
│   └── fonts.ts
├── public/
│   ├── images/
│   └── videos/
└── configs/
    └── index.ts
```

---

## Notes

- **No Sanity CMS** - This new implementation will use static data or alternative CMS
- **Dark theme first** - Design prioritizes dark mode
- **Performance focus** - Heavy use of dynamic imports and lazy loading
- **Mobile responsive** - All components are mobile-first
- **Accessibility** - Semantic HTML and ARIA where appropriate
