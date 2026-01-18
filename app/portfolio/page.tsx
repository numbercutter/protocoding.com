import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio - Protocoding',
  description: 'Explore our work across AI, fintech, mobile, and web development.',
};

const PROJECTS = [
  {
    slug: 'aivre',
    year: '2024',
    tags: ['AI', 'Appraisals'],
    title: 'Aivre',
    subtitle: 'AI-powered appraisal automation',
    description: 'Aivre is an AI tool used to help simplify and speed up the appraisal process.',
    image: '/workplace/portfolio/aivre.webp',
    client: {
      company: 'Aivre',
      industry: 'AI, Appraisals',
      location: 'Detroit, Michigan',
    },
    technologies: ['Javascript', 'Node', 'React'],
  },
  {
    slug: 'lit-financial',
    year: '2024',
    tags: ['Web', 'Finance'],
    title: 'Lit Financial',
    subtitle: 'Modern mortgage platform',
    description: 'Finance / Mortgage company revolutionizing how people find homes at the rate they deserve.',
    image: '/workplace/portfolio/lit.webp',
    client: {
      company: 'Lit Financial',
      industry: 'Mortgage / Banking',
      location: 'Detroit, MI',
    },
    technologies: ['React', 'Contentful', 'Express', 'Vite'],
  },
  {
    slug: 'whats-what',
    year: '2024',
    tags: ['Web', 'Chat', 'UI/UX'],
    title: 'Whats What',
    subtitle: 'AI-powered personal development',
    description: 'A sophisticated AI-powered chat interface designed for young professionals seeking guidance across various life domains.',
    image: '/workplace/portfolio/whatswhat.webp',
    client: {
      company: 'What\'s What Inc',
      industry: 'Artificial Intelligence / Personal Development',
      location: 'Detroit, MI',
    },
    technologies: ['Next.js', 'TypeScript', 'GPT-4', 'Tailwind', 'Prisma', 'MongoDB'],
  },
  {
    slug: 'poser',
    year: '2024',
    tags: ['Mobile', 'Web', 'AI', 'Image'],
    title: 'Poser',
    subtitle: 'AI-generated model imagery',
    description: 'Poser is a pioneering company specializing in the creation of lifelike AI models posed within diverse scenes.',
    image: '/workplace/portfolio/poser.webp',
    client: {
      company: 'Poser INC',
      industry: 'AI',
      location: 'N/A',
    },
    technologies: ['Webflow', 'FLUX'],
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Portfolio</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Our <span className="text-accent">work</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl">
            From AI-powered platforms to fintech solutions, we build products that transform industries.
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Stats bar */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-2 md:grid-cols-4">
          {[
            { value: '20+', label: 'Projects Delivered' },
            { value: '6+', label: 'Industries Served' },
            { value: '100%', label: 'Client Satisfaction' },
            { value: '2024', label: 'Latest Work' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 text-center cell material-inset">
              <div className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Projects grid */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Featured Projects</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Case Studies</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Project cards */}
      {PROJECTS.map((project, index) => (
        <div key={project.slug} className="section-row">
          <div className="gutter-left" />
          <Link href={`/portfolio/${project.slug}`} className="material hover:material-elevated transition-all group">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold text-gray-400">{project.year}</span>
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] bg-accent/10 text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 font-medium mb-4">{project.subtitle}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-bold text-gray-500 bg-gray-100">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-accent group-hover:gap-3 transition-all">
                  View Project <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </Link>
          <div className="gutter-right" />
        </div>
      ))}

      {/* CTA */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-10 lg:p-16 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-4">
            Ready to build something great?
          </h2>
          <p className="text-sm text-white/40 mb-8 max-w-md mx-auto">
            Let&apos;s discuss your project and see how we can help bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black/80 text-sm font-bold tracking-wide uppercase hover:brightness-110 transition-all"
          >
            Start a Project <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>
    </>
  );
}
