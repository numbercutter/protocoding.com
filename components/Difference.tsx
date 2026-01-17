'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, DollarSign, Clock, Shield } from 'lucide-react';

const FEATURES = [
  {
    id: 'competent',
    icon: Zap,
    title: 'Highly Competent',
    description: 'Our vetted engineering team brings years of experience and advanced technical skills to your project. We hire only senior engineers with 5+ years of production experience.',
    details: ['Rigorous vetting process', 'Full-stack expertise', 'Modern tech stack proficiency', 'Code review culture'],
  },
  {
    id: 'cost',
    icon: DollarSign,
    title: 'Cost Effective',
    description: 'Get Silicon Valley quality development at a fraction of the cost, without compromising on expertise or delivery timelines. No overhead, no surprises.',
    details: ['Transparent pricing', 'No hidden fees', 'Flexible engagement models', 'Scale up or down as needed'],
  },
  {
    id: 'available',
    icon: Clock,
    title: 'Onshore & Available',
    description: 'All our employees are onshore and within compatible time zones, eliminating late-night meetings, communication delays, and timezone friction.',
    details: ['US-based team', 'Same-day response', 'Real-time collaboration', 'Overlapping work hours'],
  },
  {
    id: 'quality',
    icon: Shield,
    title: 'Quality Obsessed',
    description: 'We don\'t cut corners. Every project gets the attention it deserves—from architecture decisions to pixel-perfect implementation and thorough testing.',
    details: ['Comprehensive testing', 'CI/CD pipelines', 'Documentation standards', 'Long-term maintainability'],
  },
];

export default function Difference() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = containerHeight - viewportHeight;
      
      // Calculate how far we've scrolled through this section
      // When top of container hits top of viewport, progress starts
      // When bottom of container hits bottom of viewport, progress ends
      const scrolled = -rect.top;
      const rawProgress = scrolled / scrollableHeight;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(clampedProgress);
      
      // Determine active panel based on progress
      const panelProgress = clampedProgress * FEATURES.length;
      const newIndex = Math.min(Math.floor(panelProgress), FEATURES.length - 1);
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeFeature = FEATURES[activeIndex];

  return (
    // Container height = viewport + extra scroll space for each panel
    <div 
      ref={containerRef} 
      className="relative"
      style={{ height: `${100 + (FEATURES.length - 1) * 80}vh` }}
    >
      {/* Sticky inner container */}
      <div className="sticky top-0 h-screen section-row">
        <div className="gutter-left" />
        
        <div className="material grid grid-cols-1 lg:grid-cols-[280px_1fr] h-full">
          {/* Left navigation */}
          <div className="p-6 lg:p-8 material-elevated border-b lg:border-b-0 lg:border-r border-black/[0.08] flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Why Us</p>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight mb-8">
              The Protocoding<br />
              <span className="text-accent">Difference</span>
            </h2>
            
            <nav className="space-y-1">
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`
                    px-4 py-3 text-sm font-semibold transition-all duration-300 flex items-center gap-3
                    ${activeIndex === index 
                      ? 'bg-accent text-black/80 shadow-sm' 
                      : 'text-gray-400'
                    }
                  `}
                >
                  <feature.icon size={16} className={activeIndex === index ? 'text-black/60' : 'text-gray-300'} />
                  <span className="hidden lg:inline">{feature.title}</span>
                </div>
              ))}
            </nav>

            {/* Progress indicator */}
            <div className="mt-8 h-1 bg-gray-200 overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Right content - animated panel */}
          <div className="flex-1 flex items-center p-8 lg:p-12 xl:p-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-accent flex items-center justify-center mb-8 relative">
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <activeFeature.icon size={28} className="text-black/70 relative" />
                </div>

                {/* Title & description */}
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{activeFeature.title}</h3>
                <p className="text-lg text-gray-500 leading-relaxed mb-10">{activeFeature.description}</p>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-4">
                  {activeFeature.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-accent flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
                </div>

                {/* Panel indicator */}
                <div className="mt-10 flex gap-2">
                  {FEATURES.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-1 w-8 transition-all duration-300 ${i === activeIndex ? 'bg-accent' : 'bg-gray-200'}`}
                    />
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
