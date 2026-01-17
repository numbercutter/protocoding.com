'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const STEPS = [
  { num: '01', title: 'Discovery', desc: 'Tell us about your project. We\'ll ask questions, understand your goals, and see if we\'re a fit.', image: '/workplace/V79aX3fjufGxqBPGNmHiA.png' },
  { num: '02', title: 'Assessment', desc: 'We\'ll scope the work, define milestones, and give you a clear timeline and honest pricing.', image: '/workplace/-gjBJn7gW_wxkRb33nQIE.png' },
  { num: '03', title: 'Build', desc: 'Our team embeds with yours or works independently. Regular updates, no surprises.', image: '/workplace/RPkKoTM9axj_Sgi6wmesK.png' },
  { num: '04', title: 'Ship', desc: 'We launch together and stick around. Ongoing support, maintenance, and iteration.', image: '/workplace/UviL3ToyQfjYbdiQHAjvI.png' },
];

export default function Process() {
  return (
    <section className="section-row md:min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex flex-col">
        <div className="p-6 md:p-10 lg:p-12 material-elevated border-b border-black/[0.08]">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Process</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">How we work</h2>
        </div>

        <div className="flex-1 grid grid-cols-2 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
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
                <span className="text-4xl font-bold text-gray-200 tracking-tight mb-6 block">{step.num}</span>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mb-3">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
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
