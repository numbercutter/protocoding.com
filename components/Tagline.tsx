'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Tagline() {
  return (
    <section className="section-row py-16 md:min-h-screen md:py-0">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material-elevated flex items-center relative overflow-hidden">
        {/* Subtle B&W workplace backdrop - right side fade */}
        <div className="absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none hidden lg:block">
          <Image
            src="/workplace/V79aX3fjufGxqBPGNmHiA.png"
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
        
        <div className="p-10 lg:p-20 w-full relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6"
          >
            What We Do
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-gray-900 leading-[1.05] tracking-tighter max-w-5xl"
          >
            Fractional dev. <span className="text-accent">AI integration.</span> Full-stack builds. Go-to-market.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-xl text-gray-500 max-w-xl leading-relaxed"
          >
            We embed with your team or build from scratch. Product design, engineering, and consulting—whatever you need to ship.
          </motion.p>
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
