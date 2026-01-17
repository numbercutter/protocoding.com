'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CASES = [
  { cat: 'Fractional Dev', title: 'Series A Startup Scale-Up', desc: 'Embedded 3 senior engineers to help a fintech startup ship their mobile app in 4 months.', metrics: ['4 months', '3 engineers', 'App Store launch'] },
  { cat: 'AI Integration', title: 'Document Processing AI', desc: 'Built an AI pipeline that automates 80% of manual document review for a legal tech company.', metrics: ['80% automated', '10x faster', '$500k saved'] },
  { cat: 'Go-to-Market', title: 'MVP to First Customers', desc: 'Took a founder from napkin sketch to paying customers in 12 weeks.', metrics: ['12 weeks', 'First revenue', '500 users'] },
];

export default function CaseStudies() {
  return (
    <section className="min-h-screen w-full material-elevated flex flex-col">
      <div className="p-10 lg:p-12 cell material">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Case Studies</p>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Recent work</h2>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
        {CASES.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-10 cell material hover:material-elevated cursor-pointer flex flex-col"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent mb-4">{c.cat}</p>
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-accent">{c.title}</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-1">{c.desc}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {c.metrics.map((m) => (
                <span key={m} className="px-3 py-2 text-[9px] font-bold text-gray-600 material-inset">{m}</span>
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-900 flex items-center gap-1 uppercase tracking-[0.15em]">
              View case study <ArrowUpRight size={10} />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
