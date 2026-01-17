'use client';

import { motion } from 'framer-motion';
import { Users, Brain, Code2, Rocket, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
  { icon: Users, title: 'Fractional Development', desc: 'Embed senior engineers with your team. Scale up or down as needed—no long-term commitments.' },
  { icon: Brain, title: 'AI Integration', desc: 'Add AI capabilities to your existing products. LLMs, automation, computer vision, and more.' },
  { icon: Code2, title: 'Full-Stack Engineering', desc: 'End-to-end development from architecture to deployment. Web, mobile, APIs, and infrastructure.' },
  { icon: Rocket, title: 'Go-to-Market', desc: 'Product design, MVP development, and launch strategy. Take your idea from concept to customers.' },
];

export default function Services() {
  return (
    <section className="section-row md:min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex flex-col">
        {/* Header */}
        <div className="p-10 lg:p-12 material-elevated border-b border-black/[0.08]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Services</p>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">How we work with you</h2>
        </div>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 lg:p-12 cell material hover:material-elevated cursor-pointer flex flex-col justify-center"
            >
              <div className="w-14 h-14 material-inset group-hover:bg-accent flex items-center justify-center mb-6">
                <service.icon size={24} className="text-gray-500 group-hover:text-gray-900" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{service.desc}</p>
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-accent flex items-center gap-1 uppercase tracking-[0.15em]">
                Learn more <ArrowUpRight size={10} />
              </span>
            </motion.div>
          ))}
        </div>

        <Link href="/services" className="flex items-center justify-center gap-2 p-5 material-inset text-xs font-bold text-gray-500 hover:text-accent uppercase tracking-[0.15em] border-t border-black/[0.08]">
          View all services <ArrowUpRight size={12} />
        </Link>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
