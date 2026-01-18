import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SERVICES, SERVICE_SLUGS, SERVICE_CATEGORIES } from '@/lib/data/services';
import { INDUSTRIES } from '@/lib/data/industries';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  
  if (!service) {
    return { title: 'Service Not Found - Protocoding' };
  }
  
  const title = `${service.title} - Services - Protocoding`;
  const description = service.heroDescription;
  
  return {
    title,
    description,
    openGraph: {
      title: `${service.title} | Protocoding`,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Protocoding`,
      description,
    },
  };
}

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES[slug];

  if (!service) {
    notFound();
  }

  const relatedServices = service.relatedServices
    .map((serviceSlug) => SERVICES[serviceSlug])
    .filter(Boolean);

  const relatedIndustries = service.relatedIndustries
    .map((industrySlug) => INDUSTRIES[industrySlug])
    .filter(Boolean);

  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <Link href="/services" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/50 transition-colors mb-6">
            <ArrowLeft size={12} /> All Services
          </Link>
          
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
            {SERVICE_CATEGORIES[service.category].title}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">{service.subtitle}</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {service.title}
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mb-8">
            {service.heroDescription}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-black/80 text-sm font-bold tracking-wide uppercase hover:brightness-110"
          >
            Get Started <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Benefits */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Benefits</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 material-inset">
                <span className="w-1.5 h-1.5 bg-accent mt-1.5 shrink-0" />
                <p className="text-sm text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Process */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Our Process</p>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-8">How we deliver {service.title.toLowerCase()}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step) => (
              <div key={step.step} className="p-5 cell-dark">
                <span className="text-3xl font-bold text-white/20 block mb-3">{step.step}</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-2">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Technologies & Deliverables */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-1 md:grid-cols-2">
          {/* Technologies */}
          <div className="p-6 lg:p-8 cell">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Deliverables */}
          <div className="p-6 lg:p-8 cell material-inset">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Deliverables</p>
            <ul className="space-y-2">
              {service.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-accent shrink-0" />
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Pricing */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Pricing</p>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{service.pricing.type}</h3>
          <p className="text-sm text-gray-500 mb-6">{service.pricing.description}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-black/80 text-sm font-bold tracking-wide uppercase hover:brightness-110"
          >
            Get a Quote <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>

      {/* FAQs */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">FAQs</p>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-8">Common questions</h2>
          
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <div key={index} className="p-5 material-inset">
                <h3 className="text-sm font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
              </div>
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
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">You might also need</h2>
            </div>
            <div className="gutter-right" />
          </div>
          
          <div className="section-row">
            <div className="gutter-left" />
            <div className="material grid grid-cols-1 md:grid-cols-3">
              {relatedServices.map((related, index) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className={`group p-6 cell ${index % 2 === 0 ? 'material' : 'material-inset'} hover:material-elevated transition-all`}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">
                    {SERVICE_CATEGORIES[related.category].title}
                  </p>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-accent transition-colors">{related.title}</h3>
                  <p className="text-xs text-gray-500">{related.subtitle}</p>
                </Link>
              ))}
            </div>
            <div className="gutter-right" />
          </div>
        </>
      )}

      {/* Related Industries */}
      {relatedIndustries.length > 0 && (
        <>
          <div className="section-row-dark">
            <div className="gutter-left" />
            <div className="material-dark p-6 md:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Industries We Serve</p>
              <h2 className="text-xl font-bold text-white tracking-tight">{service.title} for your industry</h2>
            </div>
            <div className="gutter-right" />
          </div>
          
          <div className="section-row-dark">
            <div className="gutter-left" />
            <div className="material-dark grid grid-cols-1 md:grid-cols-3">
              {relatedIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group p-6 cell-dark hover:bg-white/[0.02] transition-all"
                >
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-accent transition-colors">{industry.title}</h3>
                  <p className="text-xs text-white/40">{industry.subtitle}</p>
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
          Start with {service.title} <ArrowUpRight size={14} />
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
