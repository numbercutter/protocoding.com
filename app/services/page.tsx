import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES, SERVICE_CATEGORIES, getServicesByCategory, getFeaturedServices, ServiceCategory } from '@/lib/data/services';

export const metadata: Metadata = {
  title: 'Services - Protocoding',
  description: 'AI integration, software engineering, and technical consulting services. From LLM integration to full-stack development.',
};

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '6', label: 'Industries Served' },
  { value: '5yrs', label: 'Avg. Experience' },
];

const CATEGORY_ORDER: ServiceCategory[] = ['ai', 'engineering', 'product', 'consulting'];

export default function ServicesPage() {
  const featuredServices = getFeaturedServices();

  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Services</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            AI-first software <span className="text-accent">development</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mb-8">
            We build intelligent software systems by combining cutting-edge AI with world-class engineering. From LLM integration to enterprise platforms.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-black/80 text-sm font-bold tracking-wide uppercase hover:brightness-110"
          >
            Start Your Project <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Stats bar */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-6 text-center cell material-inset">
              <div className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Featured Services */}
      {featuredServices.length > 0 && (
        <>
          <div className="section-row">
            <div className="gutter-left" />
            <div className="material-elevated p-6 md:p-8 lg:p-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-3">Featured</p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">AI-powered solutions</h2>
            </div>
            <div className="gutter-right" />
          </div>

          <div className="section-row">
            <div className="gutter-left" />
            <div className="material grid grid-cols-1 md:grid-cols-2">
              {featuredServices.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`group p-6 lg:p-8 cell ${index % 2 === 0 ? 'material' : 'material-inset'} hover:material-elevated transition-all`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3">
                    {SERVICE_CATEGORIES[service.category].title}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.technologies.slice(0, 4).map((tech) => (
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
            <div className="gutter-right" />
          </div>
        </>
      )}

      {/* Services by Category */}
      {CATEGORY_ORDER.map((categoryKey, categoryIndex) => {
        const category = SERVICE_CATEGORIES[categoryKey];
        const services = getServicesByCategory(categoryKey);
        const isDark = categoryIndex % 2 === 1;

        return (
          <div key={categoryKey}>
            {/* Category header */}
            <div className={isDark ? 'section-row-dark' : 'section-row'}>
              <div className="gutter-left" />
              <div className={`${isDark ? 'material-dark' : 'material-elevated'} p-6 md:p-8 lg:p-12`}>
                <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDark ? 'text-white/30' : 'text-gray-400'} mb-3`}>
                  {category.title}
                </p>
                <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {category.description}
                </h2>
              </div>
              <div className="gutter-right" />
            </div>

            {/* Services in category */}
            <div className={isDark ? 'section-row-dark' : 'section-row'}>
              <div className="gutter-left" />
              <div className={`${isDark ? 'material-dark' : 'material'} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
                {services.map((service, index) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className={`group p-6 ${isDark ? 'cell-dark hover:bg-white/[0.02]' : `cell ${index % 2 === 0 ? 'material' : 'material-inset'} hover:material-elevated`} transition-all`}
                  >
                    <h3 className={`text-base font-bold mb-1 group-hover:text-accent transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs mb-3 ${isDark ? 'text-accent' : 'text-accent'} font-bold uppercase tracking-[0.1em]`}>
                      {service.subtitle}
                    </p>
                    <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                      {service.description}
                    </p>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold group-hover:text-accent transition-colors ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                      Learn more <ArrowUpRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="gutter-right" />
            </div>
          </div>
        );
      })}

      {/* Process section header */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">How We Work</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">A process built for results</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Process steps */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark grid grid-cols-2 md:grid-cols-4">
          {[
            { num: '01', title: 'Discovery', desc: 'We learn about your business, goals, and technical requirements.' },
            { num: '02', title: 'Planning', desc: 'We scope the work, define milestones, and provide transparent pricing.' },
            { num: '03', title: 'Building', desc: 'Our team delivers in weekly sprints with regular demos and updates.' },
            { num: '04', title: 'Support', desc: 'We launch together and provide ongoing support and iteration.' },
          ].map((step) => (
            <div key={step.title} className="p-5 md:p-8 cell-dark hover:bg-white/[0.02] transition-colors">
              <span className="text-3xl font-bold text-white/20 block mb-4">{step.num}</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-3">{step.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* CTA */}
      <div className="section-row">
        <div className="gutter-left" />
        <Link
          href="/contact"
          className="material-inset flex items-center justify-center gap-2 p-6 md:p-8 text-xs md:text-sm font-bold text-gray-900 hover:material transition-all uppercase tracking-[0.2em]"
        >
          Get a Free Assessment <ArrowUpRight size={14} />
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
