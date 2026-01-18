'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CTA() {
  return (
    <section className="section-row-dark py-16 md:min-h-screen md:py-0">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material-dark flex items-center justify-center p-6 py-16 md:p-10 lg:p-20 relative overflow-hidden">
        {/* Subtle B&W workplace backdrop - warm outdoor scene */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/workplace/ship.png"
            alt=""
            fill
            className="object-cover grayscale opacity-[0.06]"
            style={{
              maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)'
            }}
            priority={false}
          />
        </div>
        
        <div className="text-center max-w-4xl relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6 md:mb-8"
          >
            Let&apos;s talk
          </motion.p>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(2rem,7vw,5rem)] font-bold text-white leading-[1] tracking-tighter mb-6 md:mb-8"
          >
            Need dev help? <span className="text-accent">Let&apos;s figure it out.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-white/50 mb-10 md:mb-14 max-w-xl mx-auto"
          >
            Tell us what you&apos;re building. We&apos;ll give you a free assessment with a clear scope, timeline, and honest pricing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-0 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-accent text-[var(--text-primary)] text-[11px] font-bold tracking-[0.15em] uppercase hover:brightness-110"
            >
              GET STARTED <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 text-white/70 text-[11px] font-bold tracking-[0.15em] uppercase border border-white/20 hover:bg-white/5 hover:text-white"
            >
              OUR SERVICES
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
