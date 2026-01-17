'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'SERVICES', href: '/services' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CAREERS', href: '/careers' },
  { label: 'PRICING', href: '/pricing' },
];

const DARK_HERO_PAGES = ['/'];

export default function Navigation() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  
  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);
  const showFullNav = isAtTop || isScrollingUp;
  const isDarkMode = hasDarkHero && isAtTop;

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

  const navBg = isDarkMode 
    ? 'bg-transparent' 
    : 'bg-white/95 backdrop-blur-sm';
  
  const textColor = isDarkMode ? 'text-white' : 'text-[var(--text-primary)]';
  const textMuted = isDarkMode ? 'text-white/60' : 'text-[var(--text-muted)]';
  const borderColor = isDarkMode ? 'border-white/[0.08]' : 'border-black/[0.08]';
  const gutterBg = isDarkMode ? 'bg-[#1f1f1f]' : 'bg-[#ebe8e4]';
  const logoSrc = isDarkMode ? '/logo_offwhite.svg' : '/logo.svg';

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
          <div className={`hidden md:block ${gutterBg} border-r ${borderColor}`} />
          
          {/* Nav content */}
          <div className="h-full flex md:grid md:grid-cols-12">
            <div className={`flex items-center px-4 md:px-6 md:col-span-3 md:border-r ${borderColor}`}>
              <Link href="/" className="flex items-center gap-3">
                <Image src={logoSrc} alt="Protocoding" width={120} height={24} className="h-5 w-auto" />
              </Link>
            </div>

            <div className="hidden md:grid md:col-span-6 grid-cols-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-center font-display text-[11px] font-bold tracking-[0.1em] border-r ${borderColor} ${textMuted} hover:opacity-100`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex md:col-span-3">
              <Link href="/contact" className="h-full w-full flex items-center justify-center font-display text-[12px] font-bold tracking-[0.1em] uppercase bg-accent text-[var(--text-primary)] hover:brightness-110">
                GET STARTED
              </Link>
            </div>

            <div className="flex-1 flex items-center justify-end px-4 md:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className={textColor}><Menu size={20} /></button>
            </div>
          </div>
          
          {/* Right gutter - hidden on mobile */}
          <div className={`hidden md:block ${gutterBg} border-l ${borderColor}`} />
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={{ y: !showFullNav ? 0 : -60, opacity: !showFullNav ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-0 right-0 md:right-[80px] lg:right-[100px] xl:right-[120px] z-50 p-3"
      >
        <Link href="/contact" className="flex items-center gap-2 px-5 py-3 bg-accent text-[var(--text-primary)] font-display text-[11px] font-bold tracking-[0.1em] uppercase hover:brightness-110 shadow-xl">
          GET STARTED <ArrowUpRight size={12} />
        </Link>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white z-50">
            <div className="flex justify-between items-center h-14 px-4 border-b border-black/[0.08]">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/logo.svg" alt="Protocoding" width={120} height={24} className="h-5 w-auto" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
            </div>
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} className="block py-4 px-4 font-display text-[13px] font-bold tracking-[0.1em] uppercase text-[var(--text-primary)] border-b border-black/[0.08] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="p-4">
              <Link href="/contact" className="block py-3 text-center bg-accent text-[var(--text-primary)] font-display text-[12px] font-bold tracking-[0.1em] uppercase" onClick={() => setIsMobileMenuOpen(false)}>
                GET STARTED
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
