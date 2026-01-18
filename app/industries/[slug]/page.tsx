import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { INDUSTRIES, INDUSTRY_SLUGS } from '@/lib/data/industries';
import { SERVICES } from '@/lib/data/services';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  
  if (!industry) {
    return { title: 'Industry Not Found - Protocoding' };
  }
  
  const title = `${industry.title} Software Development - Protocoding`;
  const description = industry.heroDescription;
  
  return {
    title,
    description,
    openGraph: {
      title: `${industry.title} Solutions | Protocoding`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.title} Solutions | Protocoding`,
      description,
    },
  };
}

export async function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];

  if (!industry) {
    notFound();
  }

  const relatedServices = industry.relatedServices
    .map((serviceSlug) => SERVICES[serviceSlug])
    .filter(Boolean);

  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <Link href="/industries" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/50 transition-colors mb-6">
            <ArrowLeft size={12} /> All Industries
          </Link>
          
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">{industry.subtitle}</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {industry.title} <span className="text-accent">Solutions</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mb-8">
            {industry.heroDescription}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-black/80 text-sm font-bold tracking-wide uppercase hover:brightness-110"
          >
            Discuss Your Project <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Stats */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-2 md:grid-cols-4">
          {industry.stats.map((stat) => (
            <div key={stat.label} className="p-6 text-center cell material-inset">
              <div className="text-2xl font-bold text-accent tracking-tight">{stat.value}</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Challenges & Solutions */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-1 md:grid-cols-2">
          {/* Challenges */}
          <div className="p-6 lg:p-8 cell">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Industry Challenges</p>
            <div className="space-y-3">
              {industry.challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-gray-300">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-sm text-gray-600">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Solutions */}
          <div className="p-6 lg:p-8 cell material-inset">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">Our Solutions</p>
            <div className="space-y-3">
              {industry.solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                  <p className="text-sm text-gray-600">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Use Cases */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Use Cases</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-8">What we build for {industry.title.toLowerCase()}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.useCases.map((useCase, index) => (
              <div key={index} className="p-5 material-inset hover:material transition-all">
                <h3 className="text-sm font-bold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Technologies */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Technologies</p>
          <div className="flex flex-wrap gap-3">
            {industry.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white/60 border border-white/10 hover:border-accent/50 hover:text-accent transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <>
          <div className="section-row">
            <div className="gutter-left" />
            <div className="material-elevated p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Related Services</p>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Services for {industry.title.toLowerCase()}</h2>
            </div>
            <div className="gutter-right" />
          </div>
          
          <div className="section-row">
            <div className="gutter-left" />
            <div className="material grid grid-cols-1 md:grid-cols-3">
              {relatedServices.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`group p-6 cell ${index % 2 === 0 ? 'material' : 'material-inset'} hover:material-elevated transition-all`}
                >
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-xs text-gray-500">{service.subtitle}</p>
                </Link>
              ))}
            </div>
            <div className="gutter-right" />
          </div>
        </>
      )}

      {/* CTA */}
      <div className="section-row">
        <div className="gutter-left" />
        <Link
          href="/contact"
          className="material flex items-center justify-center gap-2 p-8 text-sm font-bold text-gray-900 hover:material-elevated transition-all uppercase tracking-[0.2em]"
        >
          Start Your {industry.title} Project <ArrowUpRight size={14} />
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
