'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

// Animation variants for portfolio cards
const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 1.03,
    y: 20,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const PROJECTS = [
  {
    slug: 'aivre',
    year: '2024',
    tags: ['AI', 'Appraisals'],
    title: 'Aivre',
    description: 'AI tool to simplify and speed up the appraisal process.',
    image: '/workplace/portfolio/aivre.webp',
  },
  {
    slug: 'lit-financial',
    year: '2024',
    tags: ['Web', 'Finance'],
    title: 'Lit Financial',
    description: 'Modern mortgage platform revolutionizing home buying.',
    image: '/workplace/portfolio/lit.webp',
  },
  {
    slug: 'whats-what',
    year: '2024',
    tags: ['Web', 'Chat'],
    title: 'Whats What',
    description: 'AI-powered personal development for young professionals.',
    image: '/workplace/portfolio/whatswhat.webp',
  },
  {
    slug: 'poser',
    year: '2024',
    tags: ['AI', 'Image'],
    title: 'Poser',
    description: 'Lifelike AI models posed within diverse scenes.',
    image: '/workplace/portfolio/poser.webp',
  },
];

export default function Portfolio() {
  return (
    <section className="section-row md:min-h-screen bg-[var(--light-bg)]">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex flex-col">
        {/* Header */}
        <div className="p-5 lg:p-6 material-elevated border-b border-black/[0.08]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-1">Portfolio</p>
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 tracking-tight">
                Recent work
              </h2>
            </div>
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-accent hover:gap-2 transition-all uppercase tracking-[0.1em]"
            >
              View All <ArrowUpRight size={10} />
            </Link>
          </div>
        </div>

        {/* Projects grid - 2x2 with full image backgrounds */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="cell"
            >
              <Link href={`/portfolio/${project.slug}`} className="group relative block h-full min-h-[220px] md:min-h-[260px] overflow-hidden">
                {/* Full background image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Gradient overlay for text readability - stronger on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 md:from-black/80 md:via-black/30 md:to-black/10 group-hover:from-black/70 group-hover:via-black/20 transition-all duration-500" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 p-4 md:p-5 lg:p-6 flex flex-col justify-end">
                  {/* Tags row */}
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <span className="text-[10px] font-bold text-white/70">{project.year}</span>
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-1.5 md:px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white/90 border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title & description */}
                  <h3 className="text-xl md:text-lg lg:text-xl font-bold text-white mb-1 md:mb-1.5 group-hover:text-white transition-colors drop-shadow-sm">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-sm text-white/90 md:text-white/80 leading-relaxed line-clamp-2 mb-3 md:mb-4 max-w-sm">
                    {project.description}
                  </p>
                  
                  {/* View link */}
                  <div className="flex items-center gap-1.5 text-[11px] md:text-[11px] font-bold text-white/90 md:text-white/80 group-hover:text-white group-hover:gap-2 transition-all">
                    View Project <ArrowUpRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <Link 
          href="/portfolio"
          className="material-inset flex items-center justify-center gap-2 py-4 text-[11px] font-bold text-gray-900 hover:bg-gray-100 transition-all uppercase tracking-[0.15em] border-t border-black/[0.08]"
        >
          Explore All Case Studies <ArrowUpRight size={10} />
        </Link>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
