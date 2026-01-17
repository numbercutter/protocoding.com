'use client';

import { motion } from 'framer-motion';
import { Users, Brain, Code2, Rocket, Wrench, BarChart3, Check } from 'lucide-react';

const SERVICES = [
  { icon: Users, title: 'Fractional Development', features: ['Embedded engineers', 'Scale on demand', 'No long-term lock-in'] },
  { icon: Brain, title: 'AI Integration', features: ['LLM integration', 'Automation', 'Computer vision'] },
  { icon: Code2, title: 'Full-Stack Engineering', features: ['Web & mobile', 'APIs & backends', 'Infrastructure'] },
  { icon: Rocket, title: 'Go-to-Market', features: ['Product design', 'MVP builds', 'Launch strategy'] },
  { icon: Wrench, title: 'Software Consulting', features: ['Architecture review', 'Tech strategy', 'Team augmentation'] },
  { icon: BarChart3, title: 'Product Design', features: ['UX research', 'UI design', 'Prototyping'] },
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
          <div className="w-10 h-10 material-inset group-hover:bg-accent flex items-center justify-center mb-5">
            <s.icon size={18} className="text-gray-500 group-hover:text-gray-900" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-4">{s.title}</h3>
          <div className="space-y-2">
            {s.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                <Check size={9} className="text-gray-300" /> {f}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
