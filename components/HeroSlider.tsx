'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Company logos for the marquee
const COMPANIES = [
  { name: 'DGB', logo: '/clients/dgb.png' },
  { name: 'LIT Financial', logo: '/clients/litfinancial.png' },
  { name: 'Poser', logo: '/clients/poser.png' },
  { name: 'WhatsWhat', logo: '/clients/whatswhat.png' },
];

// Logo Marquee component - dark mode version
function LogoMarquee() {
  const allLogos = [...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        ['--animation-duration' as string]: '60s',
        ['--animation-direction' as string]: 'forwards',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div className="flex shrink-0 gap-16 md:gap-24 py-4 md:py-6 w-max flex-nowrap animate-scroll">
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
              className="object-contain opacity-30 hover:opacity-50 transition-opacity invert"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSlider() {
  return (
    <section className="section-row-dark md:min-h-screen">
      {/* Left gutter - dark */}
      <div className="gutter-left !bg-[#0f0f12]" />
      
      {/* Content */}
      <div className="relative overflow-hidden bg-[#0f0f12] flex flex-col">
        
        {/* Workplace photo - fades in from right - z-0 */}
        <div className="absolute right-0 top-0 bottom-0 w-[70%] pointer-events-none hidden md:block z-0">
          <Image
            src="/workplace/discovery.png"
            alt=""
            fill
            className="object-cover object-left opacity-[0.15]"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)'
            }}
            priority={false}
          />
        </div>
        
        {/* Subtle gradient overlay - z-[1] */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(100,110,228,0.08) 0%, transparent 60%)',
          }}
        />
        
        
        {/* === MAIN CONTENT BLOCK === */}
        <div className="md:flex-1 flex flex-col justify-center px-6 py-10 pt-24 md:p-12 lg:p-20 relative z-10">
          
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <div className="w-8 md:w-12 h-[2px] bg-accent" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-accent uppercase">
              AI Development Studio
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[clamp(2.25rem,7vw,4.5rem)] font-bold text-white leading-[1.05] tracking-tight max-w-3xl"
          >
            Building the future with{' '}
            <span className="text-accent">intelligent software</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 md:mt-8 text-base md:text-xl text-white/70 max-w-xl leading-relaxed"
          >
            We design and build AI-powered applications, custom platforms, and intelligent integrations that transform how businesses operate.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-accent text-white text-[11px] font-bold tracking-[0.12em] uppercase hover:brightness-110 transition-all"
            >
              <span>Start a project</span>
              <ArrowUpRight size={14} />
            </Link>
            
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/30 text-white/80 text-[11px] font-bold tracking-[0.12em] uppercase hover:border-white/50 hover:text-white transition-all"
            >
              Our services
              <span className="w-4 h-[1px] bg-current opacity-50 transition-all group-hover:w-6 group-hover:opacity-100" />
            </Link>
          </motion.div>
        </div>

        {/* === LOGO MARQUEE BAR === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-white/10 relative z-10 bg-black/20"
        >
          <LogoMarquee />
        </motion.div>
      </div>
      
      {/* Right gutter - dark */}
      <div className="gutter-right !bg-[#0f0f12]" />
    </section>
  );
}
