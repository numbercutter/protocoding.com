import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Careers - Protocoding', description: 'Join our team.' };

const JOBS = [
  { title: 'Senior Full-Stack Engineer', location: 'Remote (US)', salary: '$150k-$200k' },
  { title: 'AI/ML Engineer', location: 'Remote (US)', salary: '$160k-$220k' },
  { title: 'Product Designer', location: 'Remote (US)', salary: '$120k-$160k' },
];

const BENEFITS = ['Competitive salary', 'Unlimited PTO', 'Remote-first', 'Health benefits', '401(k)', 'Learning stipend'];

export default function CareersPage() {
  return (
    <div className="section-row min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex flex-col">
        {/* Header */}
        <div className="p-10 lg:p-12 material-elevated border-b border-black/[0.08]">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Careers</p>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Join our team</h1>
          <p className="text-sm text-gray-500 max-w-xl">We&apos;re building something special.</p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-3 md:grid-cols-6">
          {BENEFITS.map((b) => (
            <div key={b} className="p-4 cell material-inset">
              <p className="text-[10px] text-gray-600 font-semibold flex items-center gap-2">
                <span className="w-1 h-1 bg-accent" /> {b}
              </p>
            </div>
          ))}
        </div>

        {/* Jobs list */}
        {JOBS.map((job) => (
          <div key={job.title} className="grid grid-cols-12 cell material hover:material-elevated transition-all">
            <div className="col-span-8 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">{job.title}</h3>
              <div className="flex items-center gap-4 text-[10px] text-gray-400 font-medium">
                <span>{job.location}</span>
                <span>·</span>
                <span>{job.salary}</span>
              </div>
            </div>
            <div className="col-span-4 flex items-center justify-end p-6">
              <Link href="/contact" className="flex items-center gap-1.5 px-4 py-2 bg-accent text-black/80 text-[10px] font-bold hover:brightness-110 transition-all">
                Apply <ArrowUpRight size={10} />
              </Link>
            </div>
          </div>
        ))}

        {/* CTA */}
        <Link href="/contact" className="flex items-center justify-center gap-2 p-8 material-inset hover:material text-sm font-bold text-gray-900 transition-all uppercase tracking-[0.2em] border-t border-black/[0.08]">
          Reach out <ArrowUpRight size={14} />
        </Link>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </div>
  );
}
