'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Reusable micro-texture block component
const TextureBlock = ({ 
  children, 
  className = '',
  variant = 'default'
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: 'default' | 'inset' | 'elevated';
}) => {
  const shadows = {
    default: `
      inset 0 1px 0 rgba(255,255,255,0.12),
      inset 0 -1px 0 rgba(0,0,0,0.06)
    `,
    inset: `
      inset 0 1px 2px rgba(0,0,0,0.08),
      inset 0 -1px 0 rgba(255,255,255,0.15)
    `,
    elevated: `
      inset 0 1px 0 rgba(255,255,255,0.2),
      inset 0 -1px 0 rgba(0,0,0,0.04),
      0 2px 4px rgba(0,0,0,0.05)
    `,
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ boxShadow: shadows[variant] }}>
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Company logos for the marquee
const COMPANIES = [
  { name: 'DGB', logo: '/dgb.png' },
  { name: 'LIT Financial', logo: '/litfinancial.png' },
  { name: 'Poser', logo: '/poser.png' },
  { name: 'WhatsWhat', logo: '/whatswhat.png' },
];

// Logo Marquee component
function LogoMarquee() {
  // Render logos 4 times for seamless infinite loop
  const allLogos = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        ['--animation-duration' as string]: '60s',
        ['--animation-direction' as string]: 'forwards',
      }}
    >
      <div 
        className="flex shrink-0 gap-16 md:gap-24 py-4 md:py-6 w-max flex-nowrap animate-scroll"
      >
        {allLogos.map((company, index) => (
          <div 
            key={`${company.name}-${index}`} 
            className="w-24 h-12 md:w-32 md:h-14 flex justify-center items-center"
          >
            <Image 
              src={company.logo} 
              alt={`${company.name} logo`} 
              width={112} 
              height={48} 
              className="object-contain"
              style={{
                filter: 'brightness(0) contrast(1)',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSlider() {
  return (
    <section className="section-row min-h-[80vh] md:min-h-screen">
      {/* Left gutter - matches accent */}
      <div className="gutter-left !bg-accent relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>
      
      {/* Content - Grid of textured blocks */}
      <div className="relative overflow-hidden bg-accent flex flex-col">
        
        {/* Base texture for the whole section */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        
        {/* === MAIN CONTENT BLOCK === */}
        <div className="flex-1 flex flex-col justify-center px-5 py-6 pt-16 md:p-10 lg:p-16 relative z-10">
          
          {/* Overline - simple label, not a button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-3 mb-5 md:mb-6"
          >
            <div className="w-6 md:w-8 h-[1.5px] bg-black/30" />
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-black/50 uppercase">
              Software Studio
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(2rem,8vw,5rem)] font-bold text-black/90 leading-[0.95] tracking-tighter max-w-4xl"
          >
            Your on-demand<br />
            <span className="text-white drop-shadow-sm">software team</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 md:mt-8 text-sm md:text-lg text-black/50 max-w-md leading-relaxed"
          >
            Fractional development, AI integrations, and full-stack engineering. From concept to launch, we build products that work.
          </motion.p>

          {/* Buttons as separate texture blocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-0"
          >
            <TextureBlock variant="elevated" className="bg-black/90 hover:bg-black transition-colors">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white text-[11px] font-bold tracking-[0.15em] uppercase overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">GET STARTED</span>
                <ArrowUpRight size={14} className="relative" />
              </Link>
            </TextureBlock>
            
            <TextureBlock variant="default" className="bg-white/[0.08] border-l border-black/10 hover:bg-white/[0.12] transition-colors">
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-black/70 text-[11px] font-bold tracking-[0.15em] uppercase"
              >
                OUR SERVICES
                <span className="w-4 h-[1px] bg-current opacity-50 transition-all group-hover:w-6 group-hover:opacity-100" />
              </Link>
            </TextureBlock>
          </motion.div>
        </div>

        {/* === LOGO MARQUEE BAR === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-black/10 relative z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.02))',
            boxShadow: `
              inset 0 1px 0 rgba(0,0,0,0.06),
              inset 0 2px 4px rgba(0,0,0,0.03),
              inset 0 -1px 0 rgba(255,255,255,0.08)
            `
          }}
        >
          {/* Texture overlay for marquee section */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />
          <LogoMarquee />
        </motion.div>
      </div>
      
      {/* Right gutter - matches accent */}
      <div className="gutter-right !bg-accent relative overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>
    </section>
  );
}
