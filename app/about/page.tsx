import { Metadata } from 'next';
import { Target, Users, Rocket, Heart, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About - Protocoding', description: 'Learn about our team.' };

const VALUES = [
  { icon: Target, title: 'Excellence' },
  { icon: Users, title: 'Collaboration' },
  { icon: Rocket, title: 'Innovation' },
  { icon: Heart, title: 'Integrity' },
];

const TEAM = [
  { name: 'Ryan Chen', role: 'CEO', initials: 'RC' },
  { name: 'Jordan Park', role: 'CTO', initials: 'JP' },
  { name: 'Alex Rivera', role: 'Lead Engineer', initials: 'AR' },
  { name: 'Sam Mitchell', role: 'Design Director', initials: 'SM' },
];

export default function AboutPage() {
  return (
    <div className="section-row min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex flex-col">
        {/* Header */}
        <div className="p-10 lg:p-12 material-elevated border-b border-black/[0.08]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">About</p>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Building software that matters</h1>
          <p className="text-sm text-gray-500 max-w-xl">We&apos;re a team of engineers and designers dedicated to exceptional digital experiences.</p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="p-8 text-center cell material-inset hover:material transition-all">
              <div className="w-11 h-11 mx-auto material flex items-center justify-center mb-4 shadow-sm">
                <v.icon size={18} className="text-gray-500" />
              </div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{v.title}</h3>
            </div>
          ))}
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className="p-8 text-center cell material hover:material-elevated transition-all">
              <div className="w-12 h-12 mx-auto material-inset flex items-center justify-center text-xs font-bold text-gray-600 mb-4 shadow-inner">
                {m.initials}
              </div>
              <h3 className="text-xs font-bold text-gray-900 mb-1">{m.name}</h3>
              <p className="text-[10px] text-gray-400 font-medium">{m.role}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/careers" className="flex items-center justify-center gap-2 p-8 material-inset hover:material text-sm font-bold text-gray-900 transition-all uppercase tracking-wider border-t border-black/[0.08]">
          Join our team <ArrowUpRight size={14} />
        </Link>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </div>
  );
}
