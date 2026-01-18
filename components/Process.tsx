'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const STEPS = [
  { num: '01', title: 'Discovery', desc: 'Tell us about your project. We\'ll ask questions, understand your goals, and see if we\'re a fit.', image: '/workplace/discovery.png' },
  { num: '02', title: 'Assessment', desc: 'We\'ll scope the work, define milestones, and give you a clear timeline and honest pricing.', image: '/workplace/assessment.png' },
  { num: '03', title: 'Build', desc: 'Our team embeds with yours or works independently. Regular updates, no surprises.', image: '/workplace/build.png' },
  { num: '04', title: 'Ship', desc: 'We launch together and stick around. Ongoing support, maintenance, and iteration.', image: '/workplace/ship.png' },
];

// Animation variants
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 25,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

export default function Process() {
  return (
    <section className="section-row md:min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex flex-col">
        <motion.div 
          className="p-6 md:p-10 lg:p-12 material-elevated border-b border-black/[0.08]"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">Process</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">How we work</h2>
        </motion.div>

        <div className="flex-1 grid grid-cols-2 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="p-6 md:p-10 cell material-inset hover:material flex flex-col items-center text-center justify-center relative overflow-hidden group"
            >
              {/* Subtle B&W person backdrop */}
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src={step.image}
                  alt=""
                  fill
                  className="object-cover object-center grayscale opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500"
                  priority={false}
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <span className="text-4xl font-bold text-gray-300 tracking-tight mb-6 block">{step.num}</span>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
