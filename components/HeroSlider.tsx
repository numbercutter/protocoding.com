'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSlider() {
  return (
    <section className="section-row-dark min-h-[80vh] md:min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material-dark flex flex-col">
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center p-6 pt-20 md:p-10 md:pt-10 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 border border-white/10 bg-white/[0.02]">
              <span className="w-2 h-2 bg-accent" />
              Fractional Dev Team
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-white leading-[0.95] tracking-tighter max-w-4xl"
          >
            Your on-demand<br />
            <span className="text-accent">software team</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 text-base md:text-lg text-white/40 max-w-md leading-relaxed"
          >
            Fractional development, AI integrations, and full-stack engineering. From concept to launch, we build products that work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-0"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-[var(--text-primary)] text-sm font-bold tracking-wide hover:brightness-110 transition-all"
            >
              Get a Free Assessment <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-white/50 text-sm font-bold tracking-wide border border-white/10 hover:bg-white/5 hover:text-white transition-all"
            >
              View Services
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 border-t border-white/[0.08]"
        >
          {[
            { value: '20+', label: 'Products Shipped' },
            { value: '100%', label: 'Satisfaction' },
            { value: '5yrs', label: 'Experience' },
            { value: '24/7', label: 'Support' },
          ].map((stat) => (
            <div 
              key={stat.label} 
              className="p-5 md:p-6 text-center cell-dark hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1 font-bold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
