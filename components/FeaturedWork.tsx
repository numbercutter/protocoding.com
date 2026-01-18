'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

// Animation variants for work items
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const WORK_ITEMS = [
  {
    category: 'AI Integration',
    title: 'Aivre Appraisal Automation',
    description: 'Built an AI-powered tool that simplifies and speeds up the appraisal process. React, Node, custom ML.',
  },
  {
    category: 'Full-Stack Build',
    title: 'Lit Financial Platform',
    description: 'Modern mortgage platform helping people find homes at rates they deserve. React, Contentful, Express.',
  },
  {
    category: 'AI + Product',
    title: 'What\'s What Chat Interface',
    description: 'Sophisticated GPT-4 powered chat for young professionals seeking career and life guidance.',
  },
  {
    category: 'Go-to-Market',
    title: 'Poser AI Imagery',
    description: 'Launched platform for lifelike AI models posed in diverse scenes. Webflow, FLUX integration.',
  },
];

// Premium textured block with glare edges like Hebbia
const TexturedBlock = ({ 
  children, 
  className = '',
  isGutter = false 
}: { 
  children?: React.ReactNode; 
  className?: string;
  isGutter?: boolean;
}) => (
  <div 
    className={`relative overflow-hidden bg-accent ${className}`}
  >
    {/* Base noise - fine grain */}
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
    
    {/* Secondary noise layer - larger grain for depth */}
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-soft-light"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
    
    {/* Top edge glare - thin bright line */}
    <div 
      className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
      }}
    />
    
    {/* Left edge glare - thin bright line */}
    <div 
      className="absolute top-0 left-0 bottom-0 w-[1px] pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)',
      }}
    />
    
    {/* Bottom edge shadow - subtle dark line */}
    <div 
      className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 100%)',
      }}
    />
    
    {/* Right edge shadow - subtle dark line */}
    <div 
      className="absolute top-0 right-0 bottom-0 w-[1px] pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.12) 100%)',
      }}
    />
    
    {/* Inner shadow overlay for depth */}
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.15),
          inset 1px 0 0 rgba(255,255,255,0.1),
          inset 0 -1px 0 rgba(0,0,0,0.08),
          inset -1px 0 0 rgba(0,0,0,0.05),
          inset 0 2px 8px rgba(0,0,0,0.04)
        `,
      }}
    />
    
    {/* Subtle radial highlight in corner */}
    {!isGutter && (
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)',
        }}
      />
    )}
    
    {/* Content */}
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

export default function FeaturedWork() {
  return (
    <div className="md:min-h-screen flex flex-col">
      {/* Top separator - neutral with gutters */}
      <section className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-8 lg:p-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">Featured Work</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            What your team does best, amplified.
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-lg">
            We don&apos;t replace your team. We extend it with senior engineers who ship.
          </p>
        </div>
        <div className="gutter-right" />
      </section>

      {/* Colored work blocks - 2x2 grid with premium texturing */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {WORK_ITEMS.map((item, i) => {
          const isLeftColumn = i % 2 === 0;
          
          return (
            <motion.div
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
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
                <TexturedBlock 
                  className="hidden md:block border-b border-black/10" 
                  isGutter={true}
                />
              )}
              
              {/* Content block */}
              <TexturedBlock 
                className={`
                  p-6 lg:p-8 group cursor-pointer 
                  border-b border-black/10
                  ${isLeftColumn ? 'md:border-r border-black/10' : 'md:border-l border-black/10'}
                  hover:brightness-[1.03] transition-all duration-200
                `}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/50 mb-3">{item.category}</p>
                <h3 className="text-lg font-bold text-black/90 mb-2 group-hover:text-black">{item.title}</h3>
                <p className="text-sm text-black/70 leading-relaxed">{item.description}</p>
              </TexturedBlock>

              {/* Right gutter - only for right column items */}
              {!isLeftColumn && (
                <TexturedBlock 
                  className="hidden md:block border-b border-black/10"
                  isGutter={true}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom separator - more prominent with extra padding */}
      <section className="section-row flex-1">
        <div className="gutter-left" />
        <div className="material-inset p-8 md:p-10 lg:p-16 flex items-center justify-center">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              <AnimatedCounter end={20} suffix="+" duration={1.5} />
            </p>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-600">
              Projects delivered across AI, fintech, and consumer products
            </p>
          </motion.div>
        </div>
        <div className="gutter-right" />
      </section>
    </div>
  );
}
