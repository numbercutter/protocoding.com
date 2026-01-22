import type { Metadata } from 'next';
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import DevThemePicker from '@/components/DevThemePicker';

// Optimized font loading - no render blocking
// Only loading weights that are actually used in the design
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'], // normal, medium, semibold, bold
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'], // medium, semibold, bold - headlines only
});

const title = 'Protocoding - AI Development Studio';
const description = 'Protocoding is an AI development studio that designs and builds intelligent software applications, custom platforms, and AI integrations for businesses.';
const siteUrl = 'https://www.protocoding.com';

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Protocoding',
  },
  description: description,
  metadataBase: new URL(siteUrl),
  
  // Robots & indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: title,
    description: description,
    siteName: 'Protocoding',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Protocoding - AI Development Studio',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [`${siteUrl}/og-image.png`],
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  
  // Web app manifest
  manifest: '/site.webmanifest',
  
  // Additional SEO
  keywords: ['AI development', 'AI development studio', 'intelligent software', 'custom platforms', 'AI integration', 'multi-agent AI', 'software development', 'full-stack engineering'],
  authors: [{ name: 'Protocoding' }],
  creator: 'Protocoding',
  publisher: 'Protocoding',
  
  // Verification (add your IDs when ready)
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

// Organization schema for site-wide SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Protocoding',
  url: siteUrl,
  logo: `${siteUrl}/brand/logo_color.svg`,
  description: description,
  email: 'hello@protocoding.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  sameAs: [
    // Add your social media URLs here when ready
    // 'https://linkedin.com/company/protocoding',
    // 'https://twitter.com/protocoding',
  ],
};

// WebSite schema for sitelinks search box
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Protocoding',
  url: siteUrl,
  description: description,
  publisher: {
    '@type': 'Organization',
    name: 'Protocoding',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:font-bold focus:text-sm"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <Navigation />
        <main id="main-content" className="pt-14" role="main">{children}</main>
        <Footer />
        {/* Dev-only theme picker for testing colors */}
        <DevThemePicker />
        {/* Add Google Analytics when ready:
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        */}
      </body>
    </html>
  );
}
