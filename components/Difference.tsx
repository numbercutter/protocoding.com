'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const FEATURES = [
  {
    num: '01',
    title: 'Highly Competent',
    description: 'Our vetted engineering team brings years of experience and advanced technical skills to your project. We hire only senior engineers with 5+ years of production experience.',
    details: ['Rigorous vetting process', 'Full-stack expertise', 'Modern tech stack proficiency', 'Code review culture'],
  },
  {
    num: '02',
    title: 'Cost Effective',
    description: 'Get Silicon Valley quality development at a fraction of the cost, without compromising on expertise or delivery timelines. No overhead, no surprises.',
    details: ['Transparent pricing', 'No hidden fees', 'Flexible engagement models', 'Scale up or down as needed'],
  },
  {
    num: '03',
    title: 'Onshore & Available',
    description: 'All our employees are onshore and within compatible time zones, eliminating late-night meetings, communication delays, and timezone friction.',
    details: ['US-based team', 'Same-day response', 'Real-time collaboration', 'Overlapping work hours'],
  },
  {
    num: '04',
    title: 'Quality Obsessed',
    description: 'We don\'t cut corners. Every project gets the attention it deserves—from architecture decisions to pixel-perfect implementation and thorough testing.',
    details: ['Comprehensive testing', 'CI/CD pipelines', 'Documentation standards', 'Long-term maintainability'],
  },
];

export default function Difference() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip scroll handling on mobile
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = containerHeight - viewportHeight;
      
      const scrolled = -rect.top;
      const rawProgress = scrolled / scrollableHeight;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(clampedProgress);
      
      const panelProgress = clampedProgress * FEATURES.length;
      const newIndex = Math.min(Math.floor(panelProgress), FEATURES.length - 1);
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const activeFeature = FEATURES[activeIndex];

  // Mobile: Simple stacked layout
  if (isMobile) {
    return (
      <section className="section-row bg-[var(--dark-bg)]">
        <div className="gutter-left !bg-[#1f1f1f]" />
        
        <div className="material-dark p-6 py-12">
          {/* Header */}
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-2">Why Us</p>
          <h2 className="text-xl font-bold text-white tracking-tight mb-8">
            The Protocoding <span className="text-accent">Difference</span>
          </h2>
          
          {/* Stacked features */}
          <div className="space-y-6">
            {FEATURES.map((feature) => (
              <div key={feature.num} className="border-l-2 border-accent pl-4">
                <span className="text-xs font-bold text-white/30 tracking-widest">{feature.num}</span>
                <h3 className="text-lg font-bold text-white mt-1 mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="gutter-right !bg-[#1f1f1f]" />
      </section>
    );
  }

  // Desktop: Scroll-hijack layout
  return (
    <div 
      ref={containerRef} 
      className="relative"
      style={{ height: `${100 + (FEATURES.length - 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen section-row">
        <div className="gutter-left" />
        
        <div className="material-dark grid grid-cols-1 lg:grid-cols-[300px_1fr] h-full relative overflow-hidden">
          {/* Subtle B&W workplace backdrop */}
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/workplace/-gjBJn7gW_wxkRb33nQIE.png"
              alt=""
              fill
              className="object-cover grayscale opacity-[0.05]"
              style={{
                maskImage: 'radial-gradient(ellipse at 80% 50%, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 80% 50%, black 0%, transparent 70%)'
              }}
              priority={false}
            />
          </div>
          
          {/* Left navigation */}
          <div className="hidden lg:flex flex-col justify-center p-8 lg:p-10 border-r border-white/[0.08]">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Why Us</p>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-10">
              The Protocoding<br />
              <span className="text-accent">Difference</span>
            </h2>
            
            <nav className="space-y-1">
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.num}
                  className={`
                    px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center gap-4
                    ${activeIndex === index 
                      ? 'bg-accent text-black/80' 
                      : 'text-white/30'
                    }
                  `}
                >
                  <span className="text-[10px] font-bold tracking-[0.3em]">{feature.num}</span>
                  {feature.title}
                </div>
              ))}
            </nav>

            {/* Progress bar */}
            <div className="mt-10 h-[2px] bg-white/10 overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Right content - animated panel */}
          <div className="flex-1 flex flex-col lg:flex-row items-center p-8 lg:p-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl"
              >
                <span className="text-6xl lg:text-8xl font-bold text-white/10 tracking-tight block mb-6">{activeFeature.num}</span>
                <h3 className="text-2xl lg:text-4xl font-bold text-white mb-6 tracking-tight">{activeFeature.title}</h3>
                <p className="text-lg text-white/40 leading-relaxed mb-10">{activeFeature.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {activeFeature.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-3 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="gutter-right" />
      </div>
    </div>
  );
}
