import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

// Project data
const PROJECTS: Record<string, {
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  image: string;
  client: {
    company: string;
    industry: string;
    location: string;
  };
  technologies: string[];
  overview: string;
  sections: {
    title: string;
    content: string;
  }[];
  stats?: {
    value: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
}> = {
  'aivre': {
    title: 'Aivre',
    subtitle: 'AI-powered appraisal automation',
    year: '2024',
    tags: ['AI', 'Appraisals'],
    image: '/workplace/portfolio/aivre.webp',
    client: {
      company: 'Aivre',
      industry: 'AI, Appraisals',
      location: 'Detroit, Michigan',
    },
    technologies: ['Javascript', 'Node', 'React'],
    overview: 'Aivre is an AI tool used to help simplify and speed up the appraisal process.',
    sections: [
      {
        title: 'The Challenge',
        content: 'The appraisal industry is traditionally slow and manual, requiring significant time and expertise to complete each assessment. Aivre needed a solution that could automate key parts of the process while maintaining accuracy and compliance.',
      },
      {
        title: 'Our Solution',
        content: 'We helped Aivre increase their bandwidth to be able to increase their velocity on project deliverables and help them raise money. Our team embedded with theirs to accelerate development and deliver critical features on tight timelines.',
      },
      {
        title: 'Impact',
        content: 'Through our partnership, Aivre was able to significantly speed up their development cycle, successfully raise funding, and bring their AI-powered appraisal tool to market faster than anticipated.',
      },
    ],
  },
  'lit-financial': {
    title: 'Lit Financial',
    subtitle: 'Modern mortgage platform',
    year: '2024',
    tags: ['Web', 'Finance'],
    image: '/workplace/portfolio/lit.webp',
    client: {
      company: 'Lit Financial',
      industry: 'Mortgage / Banking',
      location: 'Detroit, MI',
    },
    technologies: ['React', 'Contentful', 'Express', 'Vite'],
    overview: 'Lit Financial is a revolutionary mortgage company helping people find homes at the rate they deserve. Our partnership focused on creating a modern, user-centric digital platform that would streamline the mortgage application process.',
    sections: [
      {
        title: 'The Challenge',
        content: 'The mortgage industry often suffers from outdated technology and complex, confusing processes. Lit Financial needed a digital solution that would simplify the mortgage application journey for customers while scaling their operations and maintaining personalized service.',
      },
      {
        title: 'Platform Development',
        content: 'At the core of our solution is a modern, responsive website that guides potential homeowners through their mortgage journey. The smart application flow adapts dynamically to user inputs, making the complex process of mortgage application more approachable. We integrated advanced calculators that provide real-time rate estimates.',
      },
      {
        title: 'Looking Forward',
        content: 'Our partnership continues to evolve. Current development initiatives include native mobile applications for iOS and Android, featuring push notifications and mobile document scanning. We\'re also exploring AI integration for automated underwriting assistance and predictive analytics.',
      },
    ],
    stats: [
      { value: '+40%', label: 'Online Applications' },
      { value: '-60%', label: 'Processing Time' },
      { value: '85%', label: 'Customer Satisfaction' },
      { value: '3x', label: 'Loan Officer Productivity' },
    ],
    testimonial: {
      quote: 'The new platform has completely transformed how we handle mortgages. Our loan officers can focus on what they do best - helping customers find the right mortgage solutions - while the system handles the complex paperwork and calculations automatically.',
      name: 'Adam',
      role: 'CFO',
    },
  },
  'whats-what': {
    title: 'Whats What',
    subtitle: 'AI-powered personal development',
    year: '2024',
    tags: ['Web', 'Chat', 'UI/UX'],
    image: '/workplace/portfolio/whatswhat.webp',
    client: {
      company: 'What\'s What Inc',
      industry: 'Artificial Intelligence / Personal Development',
      location: 'Detroit, MI',
    },
    technologies: ['Next.js', 'TypeScript', 'GPT-4', 'Tailwind', 'Prisma', 'MongoDB'],
    overview: 'What\'s What represents a breakthrough in personal development technology, offering young professionals an AI companion that provides guidance across six crucial life domains: Education, Health, Finance, Relationships, Lifestyle, and Career.',
    sections: [
      {
        title: 'The Challenge',
        content: 'Creating an interface that feels both professional and approachable while handling complex AI interactions. Implementing real-time chat functionality with context-aware responses across different life domains. Ensuring consistent and helpful AI responses while maintaining conversation context and user privacy.',
      },
      {
        title: 'Our Solution',
        content: 'Our solution centered on creating a clean, card-based interface that organizes different life domains into easily accessible categories. We implemented custom AI prompt engineering, real-time chat with typing indicators and message history, responsive design across all devices, context-aware conversation handling, and a privacy-first architecture.',
      },
      {
        title: 'Results',
        content: 'Today What\'s What is a growing education platform, with rich engagement and high quality advertisement and commercial features currently being built.',
      },
    ],
    testimonial: {
      quote: 'What\'s What has transformed how we approach personal development technology. The team\'s attention to detail and technical expertise resulted in a product that truly resonates with our target audience.',
      name: 'CEO',
      role: 'What\'s What Inc.',
    },
  },
  'poser': {
    title: 'Poser',
    subtitle: 'AI-generated model imagery',
    year: '2024',
    tags: ['Mobile', 'Web', 'AI', 'FLUX', 'Image'],
    image: '/workplace/portfolio/poser.webp',
    client: {
      company: 'Poser INC',
      industry: 'AI',
      location: 'N/A',
    },
    technologies: ['Webflow', 'FLUX'],
    overview: 'Poser is a pioneering company specializing in the creation of lifelike AI models posed within diverse scenes.',
    sections: [
      {
        title: 'The Project',
        content: 'Poser leverages cutting-edge AI technology including FLUX to generate realistic, customizable model imagery for various commercial and creative applications.',
      },
      {
        title: 'Our Role',
        content: 'We partnered with Poser to build their web presence and platform infrastructure, enabling them to showcase their AI capabilities and onboard clients effectively.',
      },
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug];
  
  if (!project) {
    return { title: 'Project Not Found - Protocoding' };
  }
  
  return {
    title: `${project.title} - Portfolio - Protocoding`,
    description: project.overview,
  };
}

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS[slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/50 transition-colors mb-6">
            <ArrowLeft size={12} /> Back to Portfolio
          </Link>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[10px] font-bold text-white/40">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] bg-accent/20 text-accent">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-accent mb-4">{project.subtitle}</p>
          <p className="text-base text-white/40 max-w-2xl leading-relaxed">
            {project.overview}
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Project image */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="gutter-right" />
      </div>

      {/* Client info */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-1 md:grid-cols-4">
          <div className="p-6 lg:p-8 cell">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Client</p>
            <p className="text-sm font-bold text-gray-900">{project.client.company}</p>
          </div>
          <div className="p-6 lg:p-8 cell">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Industry</p>
            <p className="text-sm font-bold text-gray-900">{project.client.industry}</p>
          </div>
          <div className="p-6 lg:p-8 cell">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Location</p>
            <p className="text-sm font-bold text-gray-900">{project.client.location}</p>
          </div>
          <div className="p-6 lg:p-8 cell">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Technologies</p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <span key={tech} className="text-xs font-bold text-accent">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Stats (if available) */}
      {project.stats && (
        <div className="section-row">
          <div className="gutter-left" />
          <div className="material-inset grid grid-cols-2 md:grid-cols-4">
            {project.stats.map((stat) => (
              <div key={stat.label} className="p-6 lg:p-8 text-center cell">
                <div className="text-2xl lg:text-3xl font-bold text-accent tracking-tight">{stat.value}</div>
                <div className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mt-1 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="gutter-right" />
        </div>
      )}

      {/* Content sections */}
      {project.sections.map((section, index) => (
        <div key={section.title} className={index % 2 === 0 ? 'section-row' : 'section-row-dark'}>
          <div className="gutter-left" />
          <div className={`${index % 2 === 0 ? 'material' : 'material-dark'} p-8 lg:p-12`}>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${index % 2 === 0 ? 'text-gray-400' : 'text-white/30'} mb-3`}>
              {String(index + 1).padStart(2, '0')}
            </p>
            <h2 className={`text-xl lg:text-2xl font-bold tracking-tight mb-4 ${index % 2 === 0 ? 'text-gray-900' : 'text-white'}`}>
              {section.title}
            </h2>
            <p className={`text-sm leading-relaxed max-w-3xl ${index % 2 === 0 ? 'text-gray-500' : 'text-white/50'}`}>
              {section.content}
            </p>
          </div>
          <div className="gutter-right" />
        </div>
      ))}

      {/* Testimonial (if available) */}
      {project.testimonial && (
        <div className="section-row-dark">
          <div className="gutter-left" />
          <div className="material-dark p-8 lg:p-16">
            <blockquote className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-3xl mb-8 italic">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <div>
              <p className="text-sm font-bold text-white">{project.testimonial.name}</p>
              <p className="text-xs text-white/40">{project.testimonial.role}</p>
            </div>
          </div>
          <div className="gutter-right" />
        </div>
      )}

      {/* Navigation */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-2">
          <Link href="/portfolio" className="p-8 cell material-inset hover:material transition-all group">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">← Previous</p>
            <p className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors">All Projects</p>
          </Link>
          <Link href="/contact" className="p-8 cell material-inset hover:material transition-all group text-right">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Next →</p>
            <p className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors">Start Your Project</p>
          </Link>
        </div>
        <div className="gutter-right" />
      </div>

      {/* CTA */}
      <div className="section-row">
        <div className="gutter-left" />
        <Link
          href="/contact"
          className="material flex items-center justify-center gap-2 p-8 text-sm font-bold text-gray-900 hover:material-elevated transition-all uppercase tracking-[0.2em]"
        >
          Start a Similar Project <ArrowUpRight size={14} />
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
