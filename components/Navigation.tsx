'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Pricing', href: '/pricing' },
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
        <div className="grid grid-cols-[40px_1fr_40px] md:grid-cols-[56px_1fr_56px] lg:grid-cols-[72px_1fr_72px] h-14">
          {/* Left gutter */}
          <div className={`${gutterBg} border-r ${borderColor}`} />
          
          {/* Nav content */}
          <div className="grid grid-cols-12">
            <div className={`col-span-3 flex items-center px-6 border-r ${borderColor}`}>
              <Link href="/" className="flex items-center gap-3">
                <Image src={logoSrc} alt="Protocoding" width={120} height={24} className="h-5 w-auto" />
              </Link>
            </div>

            <div className="col-span-6 hidden md:grid grid-cols-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-center text-[13px] font-semibold tracking-wide border-r ${borderColor} ${textMuted} hover:opacity-100`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="col-span-3 hidden md:flex">
              <Link href="/contact" className="h-full w-full flex items-center justify-center text-[13px] font-bold tracking-wide bg-accent text-[var(--text-primary)] hover:brightness-110">
                Free Assessment
              </Link>
            </div>

            <div className={`col-span-9 md:hidden flex items-center justify-end px-4`}>
              <button onClick={() => setIsMobileMenuOpen(true)} className={textColor}><Menu size={20} /></button>
            </div>
          </div>
          
          {/* Right gutter */}
          <div className={`${gutterBg} border-l ${borderColor}`} />
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={{ y: !showFullNav ? 0 : -60, opacity: !showFullNav ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-0 right-[40px] md:right-[56px] lg:right-[72px] z-50 p-3"
      >
        <Link href="/contact" className="flex items-center gap-2 px-5 py-3 bg-accent text-[var(--text-primary)] text-[12px] font-bold tracking-wide hover:brightness-110 shadow-xl">
          Free Assessment <ArrowUpRight size={12} />
        </Link>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white z-50">
            <div className="flex justify-between items-center h-14 px-6 border-b border-black/[0.08]">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/logo.svg" alt="Protocoding" width={120} height={24} className="h-5 w-auto" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
            </div>
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} className="block py-4 px-6 text-base font-bold text-[var(--text-primary)] border-b border-black/[0.08] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="p-4">
              <Link href="/contact" className="block py-3 text-center bg-accent text-[var(--text-primary)] font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                Get a Free Assessment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
