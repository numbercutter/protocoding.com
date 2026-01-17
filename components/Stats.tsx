'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '$25M+', label: 'Project Value' },
  { value: '1000+', label: 'Features Shipped' },
  { value: '5 years', label: 'Experience' },
  { value: '100%', label: 'Satisfaction' },
];

export default function Stats() {
  return (
    <section className="material-inset">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 text-center cell material hover:material-elevated"
          >
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</div>
            <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-2 font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
