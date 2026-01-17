'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const TIERS = [
  { name: 'Starter', price: '$15k', desc: 'Perfect for MVPs', features: ['UI/UX design', 'Frontend dev', 'Basic backend', '30-day support'] },
  { name: 'Professional', price: '$50k', desc: 'For growing businesses', popular: true, features: ['Everything in Starter', 'Full-stack dev', 'API development', 'Database design', '90-day support'] },
  { name: 'Enterprise', price: 'Custom', desc: 'For large-scale apps', features: ['Everything in Pro', 'AI/ML integration', 'Microservices', 'DevOps', '1-year support'] },
];

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {TIERS.map((tier, i) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className={`p-8 cell ${tier.popular ? 'material-dark' : 'material hover:material-elevated'}`}
        >
          {tier.popular && (
            <span className="inline-block mb-4 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.3em] bg-accent/20 text-accent">Popular</span>
          )}
          <h3 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-2 ${tier.popular ? 'text-white/40' : 'text-gray-400'}`}>{tier.name}</h3>
          <div className={`text-3xl font-bold mb-2 tracking-tight ${tier.popular ? 'text-white' : 'text-gray-900'}`}>{tier.price}</div>
          <p className={`text-[10px] mb-6 ${tier.popular ? 'text-white/20' : 'text-gray-400'}`}>{tier.desc}</p>

          <ul className="space-y-3 mb-8">
            {tier.features.map((f) => (
              <li key={f} className={`flex items-center gap-3 text-[11px] font-semibold ${tier.popular ? 'text-white/50' : 'text-gray-500'}`}>
                <span className={`w-1 h-1 ${tier.popular ? 'bg-accent' : 'bg-gray-300'}`} /> {f}
              </li>
            ))}
          </ul>

          <Link
            href={`/contact?plan=${tier.name}`}
            className={`flex items-center justify-center gap-2 w-full py-4 text-xs font-bold tracking-wide ${
              tier.popular 
                ? 'bg-accent text-black/80 hover:brightness-110' 
                : 'material-inset text-gray-900 hover:material'
            }`}
          >
            Get Assessment <ArrowUpRight size={10} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
