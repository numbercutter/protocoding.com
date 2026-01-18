import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES } from '@/lib/data/industries';

export const metadata: Metadata = {
  title: 'Industries - Protocoding',
  description: 'We build exceptional software for healthcare, fintech, real estate, e-commerce, SaaS, and manufacturing.',
};

const industries = Object.values(INDUSTRIES);

export default function IndustriesPage() {
  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Industries</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Deep expertise across <span className="text-accent">industries</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mb-8">
            We bring domain knowledge and technical excellence to every industry we serve. From healthcare to fintech, we understand the unique challenges and regulations of your sector.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-black/80 text-sm font-bold tracking-wide uppercase hover:brightness-110"
          >
            Discuss Your Industry <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Stats bar */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-2 md:grid-cols-4">
          {[
            { value: '6+', label: 'Industries Served' },
            { value: '50+', label: 'Projects Delivered' },
            { value: '100%', label: 'Compliance Rate' },
            { value: '5yr', label: 'Avg. Experience' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 text-center cell material-inset">
              <div className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Industries header */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Explore Industries</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Solutions tailored to your sector</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Industries grid */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className={`group p-6 lg:p-8 cell ${index % 2 === 0 ? 'material' : 'material-inset'} hover:material-elevated transition-all`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">{industry.title}</h3>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-accent mb-4">{industry.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{industry.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {industry.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.05em] bg-gray-100 text-gray-500">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-accent transition-colors">
                  Learn more <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* CTA */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 lg:p-12 text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Don&apos;t see your industry?</h2>
          <p className="text-sm text-white/40 mb-6 max-w-xl mx-auto">
            We work across many industries and are always expanding our expertise. Let&apos;s discuss how we can help with your specific challenges.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-black/80 text-sm font-bold tracking-wide uppercase hover:brightness-110"
          >
            Get in Touch <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>
    </>
  );
}
