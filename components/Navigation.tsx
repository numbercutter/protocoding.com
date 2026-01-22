'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_CONFIG, isDropdown, NavEntry, NavDropdown } from '@/lib/data/navigation';

// Pages with hero section (nav uses hero-specific styling when at top)
const HERO_PAGES = ['/'];

// Noise texture SVG data URL
const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function DropdownMenu({ dropdown, isOpen, onClose, onEnter, textMuted, borderColor }: { 
  dropdown: NavDropdown; 
  isOpen: boolean; 
  onClose: () => void;
  onEnter: () => void;
  textMuted: string;
  borderColor: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-0 w-[320px] bg-white shadow-xl border border-black/[0.08] z-50"
          onMouseEnter={onEnter}
        >
          {/* Header */}
          {dropdown.href && (
            <Link
              href={dropdown.href}
              className="block px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-accent border-b border-black/[0.05]"
              onClick={onClose}
            >
              View All {dropdown.label} →
            </Link>
          )}
          
          {/* Items */}
          <div className="py-2">
            {dropdown.items.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-5 py-3 hover:bg-gray-50 transition-colors group"
                onClick={onClose}
              >
                <span className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors">
                  {item.label}
                </span>
                {item.description && (
                  <span className="block text-xs text-gray-400 mt-0.5">{item.description}</span>
                )}
              </Link>
            ))}
          </div>
          
          {/* Featured */}
          {dropdown.featured && (
            <div className="border-t border-black/[0.05] p-4 bg-gray-50/50">
              <Link href={dropdown.featured.href} className="block group" onClick={onClose}>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent mb-1">Featured</p>
                <p className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors">{dropdown.featured.title}</p>
                <p className="text-xs text-gray-400 mt-1">{dropdown.featured.description}</p>
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileDropdown({ dropdown, isOpen, onToggle, onClose }: {
  dropdown: NavDropdown;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-4 font-display text-[13px] font-bold tracking-[0.1em] uppercase text-[var(--text-primary)] border-b border-black/[0.08] hover:bg-gray-50"
      >
        {dropdown.label}
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-gray-50"
          >
            {dropdown.href && (
              <Link
                href={dropdown.href}
                className="block py-3 px-6 text-xs font-bold text-accent uppercase tracking-[0.1em] border-b border-black/[0.05]"
                onClick={onClose}
              >
                View All →
              </Link>
            )}
            {dropdown.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 px-6 text-sm text-gray-600 border-b border-black/[0.05] last:border-b-0"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navigation() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const hasHero = HERO_PAGES.includes(pathname);
  const showFullNav = isAtTop || isScrollingUp;
  const isOnHero = hasHero && isAtTop;

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

  // Cleanup dropdown timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // When on hero: use hero CSS variables (transparent bg)
  // When scrolled: use standard nav styling
  const navBg = isOnHero 
    ? 'bg-[var(--nav-hero-bg)]' 
    : 'bg-white/95 backdrop-blur-sm';
  
  const textColor = isOnHero ? 'text-[var(--nav-hero-text)]' : 'text-[var(--text-primary)]';
  const textMuted = isOnHero ? 'text-[var(--nav-hero-text-muted)]' : 'text-gray-600';
  const borderColor = isOnHero ? 'border-[var(--nav-hero-border)]' : 'border-black/[0.08]';
  const gutterBg = isOnHero ? 'bg-[var(--nav-hero-gutter)]' : 'bg-page';
  const logoSrc = '/brand/logo_horizontal.svg';

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: showFullNav ? 0 : -100, opacity: showFullNav ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 ${navBg} border-b ${borderColor}`}
      >
        <div className="h-14 md:grid md:grid-cols-[80px_1fr_80px] lg:grid-cols-[100px_1fr_100px] xl:grid-cols-[120px_1fr_120px]">
          {/* Left gutter */}
          <div className={`hidden md:block ${gutterBg} border-r ${borderColor}`} />
          
          {/* Nav content */}
          <div className="h-full flex md:grid md:grid-cols-12 relative">
            {/* Logo section */}
            <div className={`flex items-center px-4 md:px-6 md:col-span-3 md:border-r ${borderColor} relative`}>
              <Link href="/" className="flex items-center gap-3 relative z-10">
                <Image 
                  src={logoSrc} 
                  alt="Protocoding" 
                  width={180} 
                  height={40} 
                  className="h-8 w-auto"
                  style={{ filter: isOnHero ? 'var(--nav-hero-logo-invert)' : 'invert(1)' }}
                />
              </Link>
            </div>

            {/* Nav links with dropdowns */}
            <div className="hidden md:grid md:col-span-6 grid-cols-4">
              {NAV_CONFIG.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => isDropdown(item) && handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {isDropdown(item) ? (
                    <>
                      <Link
                        href={item.href || '#'}
                        onClick={() => setOpenDropdown(null)}
                        className={`flex items-center justify-center gap-1 h-full font-display text-[11px] font-bold tracking-[0.08em] border-r ${borderColor} ${textMuted} hover:opacity-100 relative overflow-hidden group`}
                      >
                        <div className="absolute inset-0 bg-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10">{item.label}</span>
                        <ChevronDown size={10} className={`relative z-10 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                      </Link>
                      <DropdownMenu
                        dropdown={item}
                        isOpen={openDropdown === item.label}
                        onClose={() => setOpenDropdown(null)}
                        onEnter={() => handleDropdownEnter(item.label)}
                        textMuted={textMuted}
                        borderColor={borderColor}
                      />
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center justify-center font-display text-[11px] font-bold tracking-[0.08em] h-full border-r ${borderColor} ${textMuted} hover:opacity-100 relative overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA button */}
            <div className="hidden md:flex md:col-span-3">
              <Link href="/contact" className="h-full w-full flex items-center justify-center font-display text-[12px] font-bold tracking-[0.1em] uppercase bg-accent text-white hover:brightness-110">
                GET STARTED
              </Link>
            </div>

            <div className="flex-1 flex items-center justify-end px-4 md:hidden relative z-10">
              <button onClick={() => setIsMobileMenuOpen(true)} className={textColor}><Menu size={20} /></button>
            </div>
          </div>
          
          {/* Right gutter */}
          <div className={`hidden md:block ${gutterBg} border-l ${borderColor}`} />
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={{ y: !showFullNav ? 0 : -60, opacity: !showFullNav ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-0 right-0 md:right-[80px] lg:right-[100px] xl:right-[120px] z-50 p-3"
      >
        <Link href="/contact" className="flex items-center gap-2 px-5 py-3 bg-accent text-white font-display text-[11px] font-bold tracking-[0.1em] uppercase hover:brightness-110 shadow-xl">
          GET STARTED <ArrowUpRight size={12} />
        </Link>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="flex justify-between items-center h-14 px-4 border-b border-black/[0.08] relative overflow-hidden">
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{ backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }}
              />
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="relative z-10">
                <Image src="/brand/logo_horizontal.svg" alt="Protocoding" width={180} height={40} className="h-8 w-auto invert" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="relative z-10"><X size={20} /></button>
            </div>
            
            {NAV_CONFIG.map((item) => (
              isDropdown(item) ? (
                <MobileDropdown
                  key={item.label}
                  dropdown={item}
                  isOpen={openMobileDropdown === item.label}
                  onToggle={() => setOpenMobileDropdown(openMobileDropdown === item.label ? null : item.label)}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              ) : (
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
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            ))}
            
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
