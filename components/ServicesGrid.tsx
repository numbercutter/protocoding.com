'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  { num: '01', title: 'Fractional Development', features: ['Embedded engineers', 'Scale on demand', 'No long-term lock-in'] },
  { num: '02', title: 'AI Integration', features: ['LLM integration', 'Automation', 'Computer vision'] },
  { num: '03', title: 'Full-Stack Engineering', features: ['Web & mobile', 'APIs & backends', 'Infrastructure'] },
  { num: '04', title: 'Go-to-Market', features: ['Product design', 'MVP builds', 'Launch strategy'] },
  { num: '05', title: 'Software Consulting', features: ['Architecture review', 'Tech strategy', 'Team augmentation'] },
  { num: '06', title: 'Product Design', features: ['UX research', 'UI design', 'Prototyping'] },
];

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      {SERVICES.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="group p-8 cell material hover:material-elevated"
        >
          {/* Number */}
          <span className="text-[10px] font-bold tracking-[0.3em] text-accent mb-5 block">{s.num}</span>
          
          <h3 className="text-sm font-bold text-gray-900 mb-4">{s.title}</h3>
          <div className="space-y-2">
            {s.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                <span className="w-1 h-1 bg-gray-300" /> {f}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
