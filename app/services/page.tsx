import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services - Protocoding',
  description: 'Full-stack development, AI integrations, and software consulting services.',
};

const SERVICES = [
  {
    num: '01',
    title: 'Fractional Development',
    subtitle: 'Scale your team on demand',
    description: 'Embedded senior engineers who integrate seamlessly with your existing team. No long-term contracts, no recruitment headaches.',
    features: ['Embedded engineers', 'Weekly sprints', 'Flexible scaling', 'No lock-in contracts'],
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL'],
  },
  {
    num: '02',
    title: 'AI Integration',
    subtitle: 'Make your product intelligent',
    description: 'From LLM integrations to custom ML pipelines, we bring AI capabilities to your existing products without the complexity.',
    features: ['LLM integration', 'Document processing', 'Chatbots & RAG', 'Computer vision'],
    technologies: ['OpenAI', 'Anthropic', 'LangChain', 'Pinecone', 'HuggingFace'],
  },
  {
    num: '03',
    title: 'Full-Stack Engineering',
    subtitle: 'End-to-end product builds',
    description: 'Complete product development from architecture to deployment. Web apps, mobile apps, APIs, and everything in between.',
    features: ['Web applications', 'Mobile apps', 'API development', 'Cloud infrastructure'],
    technologies: ['Next.js', 'React Native', 'GraphQL', 'Docker', 'Kubernetes'],
  },
  {
    num: '04',
    title: 'Go-to-Market',
    subtitle: 'From idea to launch',
    description: 'MVP development and product strategy for founders and startups. Go from napkin sketch to paying customers in 8-12 weeks.',
    features: ['MVP builds', 'Product strategy', 'Launch support', 'Iteration cycles'],
    technologies: ['Rapid prototyping', 'User testing', 'Analytics', 'Growth tools'],
  },
  {
    num: '05',
    title: 'Software Consulting',
    subtitle: 'Expert guidance when you need it',
    description: 'Architecture reviews, technical strategy, and roadmap planning. Get the guidance you need to make the right technology decisions.',
    features: ['Architecture review', 'Tech strategy', 'Team augmentation', 'Code audits'],
    technologies: ['System design', 'Best practices', 'Security review', 'Performance'],
  },
  {
    num: '06',
    title: 'Product Design',
    subtitle: 'User-centered experiences',
    description: 'UX research, UI design, and prototyping that creates products users actually want to use. Design that converts.',
    features: ['UX research', 'UI design', 'Prototyping', 'Design systems'],
    technologies: ['Figma', 'User testing', 'A/B testing', 'Analytics'],
  },
];

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '6', label: 'Industries Served' },
  { value: '5yrs', label: 'Average Experience' },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Services</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Software development <span className="text-accent">that scales</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mb-8">
            We build exceptional digital experiences by combining cutting-edge AI with world-class software engineering.
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

      {/* Services header */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">What We Do</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">End-to-end development services</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Services grid */}
      {SERVICES.map((service, index) => (
        <div key={service.title} className="section-row">
          <div className="gutter-left" />
          <div className={`${index % 2 === 0 ? 'material' : 'material-inset'} p-6 md:p-8 lg:p-12`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left - Info */}
              <div>
                <span className="text-4xl font-bold text-gray-200 tracking-tight block mb-4">{service.num}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm font-bold text-accent uppercase tracking-[0.1em] mb-4">{service.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{service.description}</p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                      <span className="w-1.5 h-1.5 bg-accent" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Technologies */}
              <div className="flex flex-col justify-end">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Technologies</p>
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
            </div>
          </div>
          <div className="gutter-right" />
        </div>
      ))}

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
