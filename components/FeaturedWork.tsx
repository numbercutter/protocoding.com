'use client';

import { motion } from 'framer-motion';

const WORK_ITEMS = [
  {
    category: 'Full-Stack Build',
    title: 'Series A Fintech Platform',
    description: 'Built a complete trading platform from scratch in 4 months. React, Node, PostgreSQL.',
  },
  {
    category: 'AI Integration',
    title: 'Document Processing Pipeline',
    description: 'Automated 80% of manual document review with custom AI models.',
  },
  {
    category: 'Fractional Team',
    title: 'Healthcare Startup Scale',
    description: 'Embedded 3 engineers to ship their mobile app on time.',
  },
  {
    category: 'Go-to-Market',
    title: 'MVP in 12 Weeks',
    description: 'Took founder from napkin sketch to paying customers.',
  },
];

const NoiseTexture = () => (
  <div 
    className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }}
  />
);

export default function FeaturedWork() {
  return (
    <div className="md:min-h-screen flex flex-col">
      {/* Top separator - neutral with gutters */}
      <section className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Featured Work</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            What your team does best, amplified.
          </h2>
          <p className="mt-3 text-sm text-gray-500 max-w-lg">
            We don&apos;t replace your team. We extend it with senior engineers who ship.
          </p>
        </div>
        <div className="gutter-right" />
      </section>

      {/* Colored work blocks - 2x2 grid with proper gutters on outside edges */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {WORK_ITEMS.map((item, i) => {
          const isLeftColumn = i % 2 === 0;
          
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`
                grid 
                ${isLeftColumn 
                  ? 'grid-cols-1 md:grid-cols-[80px_1fr] lg:grid-cols-[100px_1fr] xl:grid-cols-[120px_1fr]' 
                  : 'grid-cols-1 md:grid-cols-[1fr_80px] lg:grid-cols-[1fr_100px] xl:grid-cols-[1fr_120px]'
                }
              `}
            >
              {/* Left gutter - only for left column items */}
              {isLeftColumn && (
                <div className="hidden md:block bg-accent relative border-b border-black/10">
                  <NoiseTexture />
                </div>
              )}
              
              {/* Content block - reduced padding for shorter height */}
              <div className={`
                bg-accent p-6 lg:p-8 relative group hover:brightness-105 cursor-pointer 
                border-b border-black/10
                ${isLeftColumn ? 'md:border-r border-black/10' : 'md:border-l border-black/10'}
              `}>
                <NoiseTexture />
                <p className="relative text-[9px] font-bold uppercase tracking-[0.3em] text-black/40 mb-3">{item.category}</p>
                <h3 className="relative text-lg font-bold text-black/90 mb-2 group-hover:text-black">{item.title}</h3>
                <p className="relative text-sm text-black/50 leading-relaxed">{item.description}</p>
              </div>

              {/* Right gutter - only for right column items */}
              {!isLeftColumn && (
                <div className="hidden md:block bg-accent relative border-b border-black/10">
                  <NoiseTexture />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom separator - more prominent with extra padding */}
      <section className="section-row flex-1">
        <div className="gutter-left" />
        <div className="material-inset p-10 lg:p-16 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-bold text-gray-200 tracking-tight mb-4">20+</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
              Projects delivered across fintech, healthcare, and enterprise
            </p>
          </div>
        </div>
        <div className="gutter-right" />
      </section>
    </div>
  );
}
