import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Protocoding - Next Generation AI Software Development',
  description: 'Protocoding is a boutique software development firm that partners with businesses to design and deliver customized software and AI solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
