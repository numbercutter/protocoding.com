'use client';

import { motion } from 'framer-motion';
import { MessageSquare, FileSearch, Code, Rocket } from 'lucide-react';

const STEPS = [
  { num: '01', icon: MessageSquare, title: 'Discovery Call', desc: 'Tell us about your project. We\'ll ask questions, understand your goals, and see if we\'re a fit.' },
  { num: '02', icon: FileSearch, title: 'Assessment', desc: 'We\'ll scope the work, define milestones, and give you a clear timeline and honest pricing.' },
  { num: '03', icon: Code, title: 'Build', desc: 'Our team embeds with yours or works independently. Regular updates, no surprises.' },
  { num: '04', icon: Rocket, title: 'Ship & Support', desc: 'We launch together and stick around. Ongoing support, maintenance, and iteration.' },
];

export default function Process() {
  return (
    <section className="section-row min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex flex-col">
        <div className="p-10 lg:p-12 material-elevated border-b border-black/[0.08]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Process</p>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">How we work</h2>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 cell material-inset hover:material flex flex-col items-center text-center justify-center"
            >
              <span className="text-[10px] font-bold text-gray-300 tracking-[0.2em] mb-4">{step.num}</span>
              <div className="w-16 h-16 material flex items-center justify-center mb-6">
                <step.icon size={28} className="text-gray-500" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.15em] mb-3">{step.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
