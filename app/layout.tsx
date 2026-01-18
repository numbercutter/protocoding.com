import type { Metadata } from 'next';
import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

// Optimized font loading - no render blocking
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${plusJakartaSans.variable}`}>
      <body>
        <ScrollProgress />
        <Navigation />
        <main className="pt-14">{children}</main>
        <Footer />
        {/* Add Google Analytics when ready:
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        */}
      </body>
    </html>
  );
}
