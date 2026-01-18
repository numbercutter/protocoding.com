'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Tagline() {
  return (
    <section className="section-row md:min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material-elevated md:flex md:items-center relative overflow-hidden">
        {/* Subtle B&W workplace backdrop - right side fade */}
        <div className="absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none hidden lg:block">
          <Image
            src="/workplace/discovery.png"
            alt=""
            fill
            className="object-cover object-left grayscale opacity-[0.06]"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)'
            }}
            priority={false}
          />
        </div>
        
        <div className="p-6 py-10 md:p-10 lg:p-20 w-full relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4"
          >
            What We Build
          </motion.p>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(1.75rem,6vw,4.5rem)] font-bold text-gray-900 leading-[1.05] tracking-tighter max-w-5xl"
          >
            <span className="text-accent">AI applications.</span> Custom platforms. Intelligent integrations.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 md:mt-8 text-base md:text-xl text-gray-600 max-w-xl leading-relaxed"
          >
            From multi-agent systems to full-stack platforms, we design and deliver software that transforms how businesses operate.
          </motion.p>
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
