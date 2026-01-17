'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'SERVICES', href: '/services' },
  { label: 'PORTFOLIO', href: '/portfolio' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'PRICING', href: '/pricing' },
];

// Pages with accent-colored hero (not dark, not white)
const ACCENT_HERO_PAGES = ['/'];

// Noise texture SVG data URL
const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function Navigation() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  
  const hasAccentHero = ACCENT_HERO_PAGES.includes(pathname);
  const showFullNav = isAtTop || isScrollingUp;
  const isOnAccentHero = hasAccentHero && isAtTop;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 20);
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsScrollingUp(currentScrollY < lastScrollY.current);
        lastScrollY.current = currentScrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = isOnAccentHero 
    ? 'bg-transparent' 
    : 'bg-white/95 backdrop-blur-sm';
  
  // On accent hero: use dark text for readability on blue
  const textColor = isOnAccentHero ? 'text-black/90' : 'text-[var(--text-primary)]';
  const textMuted = isOnAccentHero ? 'text-black/70' : 'text-[var(--text-muted)]';
  const borderColor = isOnAccentHero ? 'border-black/10' : 'border-black/[0.08]';
  const gutterBg = isOnAccentHero ? 'bg-accent' : 'bg-[#ebe8e4]';
  // Use horizontal logo with text
  const logoSrc = '/logo_horizontal.svg';

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: showFullNav ? 0 : -100, opacity: showFullNav ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 ${navBg} border-b ${borderColor}`}
      >
        {/* Mobile: no gutters, Desktop: with gutters */}
        <div className="h-14 md:grid md:grid-cols-[80px_1fr_80px] lg:grid-cols-[100px_1fr_100px] xl:grid-cols-[120px_1fr_120px]">
          {/* Left gutter - hidden on mobile */}
          <div className={`hidden md:block ${gutterBg} border-r ${borderColor} relative overflow-hidden`}>
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
              style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
            />
          </div>
          
          {/* Nav content */}
          <div className="h-full flex md:grid md:grid-cols-12 relative">
            {/* Texture overlay for main nav area */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
              style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
            />
            
            {/* Logo section - its own textured block */}
            <div className={`flex items-center px-4 md:px-6 md:col-span-3 md:border-r ${borderColor} relative`}>
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
                style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
              />
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.04), inset -1px 0 0 rgba(0,0,0,0.02)' }}
              />
              <Link href="/" className="flex items-center gap-3 relative z-10">
                <Image 
                  src={logoSrc} 
                  alt="Protocoding" 
                  width={180} 
                  height={40} 
                  className="h-8 w-auto invert"
                />
              </Link>
            </div>

            {/* Nav links - each is its own textured block */}
            <div className="hidden md:grid md:col-span-6 grid-cols-5">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-center font-display text-[10px] font-bold tracking-[0.08em] border-r ${borderColor} ${textMuted} hover:opacity-100 relative overflow-hidden group`}
                >
                  {/* Individual block texture */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
                    style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
                  />
                  {/* Alternating subtle bg */}
                  <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-black/[0.01]' : 'bg-white/[0.02]'}`} />
                  {/* Inner shadows for depth */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.03)' }}
                  />
                  {/* Hover state */}
                  <div className="absolute inset-0 bg-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* CTA button - elevated textured block */}
            <div className="hidden md:flex md:col-span-3 relative overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
                style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
              />
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.08)' }}
              />
              <Link href="/contact" className="h-full w-full flex items-center justify-center font-display text-[12px] font-bold tracking-[0.1em] uppercase bg-accent text-[var(--text-primary)] hover:brightness-110 relative z-10">
                GET STARTED
              </Link>
            </div>

            <div className="flex-1 flex items-center justify-end px-4 md:hidden relative z-10">
              <button onClick={() => setIsMobileMenuOpen(true)} className={textColor}><Menu size={20} /></button>
            </div>
          </div>
          
          {/* Right gutter - hidden on mobile */}
          <div className={`hidden md:block ${gutterBg} border-l ${borderColor} relative overflow-hidden`}>
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
              style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
            />
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={{ y: !showFullNav ? 0 : -60, opacity: !showFullNav ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-0 right-0 md:right-[80px] lg:right-[100px] xl:right-[120px] z-50 p-3"
      >
        <div className="relative overflow-hidden">
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
            style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.08)' }}
          />
          <Link href="/contact" className="flex items-center gap-2 px-5 py-3 bg-accent text-[var(--text-primary)] font-display text-[11px] font-bold tracking-[0.1em] uppercase hover:brightness-110 shadow-xl relative z-10">
            GET STARTED <ArrowUpRight size={12} />
          </Link>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white z-50">
            {/* Mobile menu header - textured */}
            <div className="flex justify-between items-center h-14 px-4 border-b border-black/[0.08] relative overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
              />
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="relative z-10">
                <Image src="/logo_horizontal.svg" alt="Protocoding" width={180} height={40} className="h-8 w-auto invert" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="relative z-10"><X size={20} /></button>
            </div>
            
            {/* Mobile nav items - each is a textured block */}
            {NAV_ITEMS.map((item, index) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className="block py-4 px-4 font-display text-[13px] font-bold tracking-[0.1em] uppercase text-[var(--text-primary)] border-b border-black/[0.08] hover:bg-gray-50 relative overflow-hidden" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                  style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
                />
                <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-black/[0.01]' : 'bg-transparent'}`} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile CTA - textured block */}
            <div className="p-4">
              <div className="relative overflow-hidden">
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
                  style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.08)' }}
                />
                <Link 
                  href="/contact" 
                  className="block py-3 text-center bg-accent text-[var(--text-primary)] font-display text-[12px] font-bold tracking-[0.1em] uppercase relative z-10" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  GET STARTED
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
