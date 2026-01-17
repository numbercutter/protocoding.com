import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers - Protocoding',
  description: 'Join our team and help build the future of software development.',
};

const JOBS = [
  {
    title: 'Senior Full-Stack Engineer',
    location: 'Remote (US)',
    type: 'Full Time',
    salary: '$150k-$200k',
    description: 'Build end-to-end features for our clients using React, Node.js, and PostgreSQL. Work directly with founders and product teams.',
  },
  {
    title: 'AI/ML Engineer',
    location: 'Remote (US)',
    type: 'Full Time',
    salary: '$160k-$220k',
    description: 'Integrate LLMs and ML models into production applications. Experience with OpenAI, LangChain, and vector databases required.',
  },
  {
    title: 'Product Designer',
    location: 'Remote (US)',
    type: 'Full Time',
    salary: '$120k-$160k',
    description: 'Design intuitive user experiences for web and mobile applications. Strong portfolio and Figma skills required.',
  },
];

const BENEFITS = [
  {
    num: '01',
    title: 'Work-Life Balance',
    description: 'Flexible hours and remote-first culture. We trust you to manage your time and deliver great work.',
  },
  {
    num: '02',
    title: 'Global Impact',
    description: 'Work on projects that reach millions of users across fintech, healthcare, and enterprise.',
  },
  {
    num: '03',
    title: 'Innovation Focus',
    description: 'Work with cutting-edge technologies including AI/ML, LLMs, and modern cloud infrastructure.',
  },
  {
    num: '04',
    title: 'Great Team Culture',
    description: 'Collaborative environment with talented engineers who care about code quality and mentorship.',
  },
];

const PERKS = [
  'Competitive salary',
  'Unlimited PTO',
  'Remote-first',
  'Health & dental',
  '401(k) match',
  'Learning stipend',
  'Home office budget',
  'Team retreats',
];

const VALUES = [
  { num: '01', title: 'Excellence', desc: 'We hold ourselves to the highest standards in everything we build.' },
  { num: '02', title: 'Ownership', desc: 'We take responsibility for our work and see things through to completion.' },
  { num: '03', title: 'Collaboration', desc: 'We work together, share knowledge, and lift each other up.' },
  { num: '04', title: 'Growth', desc: 'We invest in learning and push ourselves to continuously improve.' },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Careers</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Join our <span className="text-accent">team</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl">
            Help build the future of software development. We&apos;re looking for passionate individuals who want to make a difference.
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Perks bar */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {PERKS.map((perk) => (
            <div key={perk} className="p-4 text-center cell material-inset">
              <p className="text-[10px] text-gray-600 font-bold flex items-center justify-center gap-2">
                <span className="w-1 h-1 bg-accent" /> {perk}
              </p>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Why work with us header */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Why Work With Us</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Benefits that matter</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Benefits grid */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="p-8 cell material-inset hover:material transition-all">
              <span className="text-3xl font-bold text-gray-200 tracking-tight block mb-4">{benefit.num}</span>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.15em] mb-3">{benefit.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Our Values header */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Our Values</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">What we believe in</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Values grid */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark grid grid-cols-1 md:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="p-8 cell-dark hover:bg-white/[0.02] transition-colors">
              <span className="text-3xl font-bold text-white/20 block mb-4">{value.num}</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3">{value.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Open roles header */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Open Roles</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Current opportunities</h2>
          <p className="text-sm text-gray-500 mt-3 max-w-xl">
            We&apos;re always looking for talented people. If you don&apos;t see a role that fits, reach out anyway.
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Jobs list */}
      {JOBS.map((job) => (
        <div key={job.title} className="section-row">
          <div className="gutter-left" />
          <div className="material hover:material-elevated transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] bg-gray-100 text-gray-600">
                    {job.type}
                  </span>
                  <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] bg-accent/20 text-accent">
                    Remote
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{job.description}</p>
                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold">
                  <span>{job.location}</span>
                  <span>·</span>
                  <span>{job.salary}</span>
                </div>
              </div>
              <div className="lg:col-span-4 flex items-center lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black/80 text-xs font-bold tracking-wide uppercase hover:brightness-110 transition-all"
                >
                  Apply Now <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
          <div className="gutter-right" />
        </div>
      ))}

      {/* No role that fits */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-inset p-8 lg:p-12 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Don&apos;t see a role that fits?</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            We&apos;re always interested in meeting talented people. Send us your info and we&apos;ll keep you in mind for future opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-gray-900 border border-gray-200 hover:bg-gray-50 transition-all uppercase tracking-[0.1em]"
          >
            Get in Touch <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>

      {/* CTA */}
      <div className="section-row">
        <div className="gutter-left" />
        <Link
          href="/about"
          className="material flex items-center justify-center gap-2 p-8 text-sm font-bold text-gray-900 hover:material-elevated transition-all uppercase tracking-[0.2em]"
        >
          Meet the Team <ArrowUpRight size={14} />
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
