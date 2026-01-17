'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="section-row-dark py-16 md:min-h-screen md:py-0">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material-dark flex items-center justify-center p-10 lg:p-20">
        <div className="text-center max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-8"
          >
            Let&apos;s talk
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-white leading-[1] tracking-tighter mb-8"
          >
            Need dev help? <span className="text-accent">Let&apos;s figure it out.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/25 mb-14 max-w-xl mx-auto"
          >
            Tell us what you&apos;re building. We&apos;ll give you a free assessment with a clear scope, timeline, and honest pricing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex gap-0 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-accent text-[var(--text-primary)] text-sm font-bold tracking-wide hover:brightness-110"
            >
              Get a Free Assessment <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-10 py-5 text-white/40 text-sm font-bold tracking-wide border border-white/10 hover:bg-white/5 hover:text-white"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
