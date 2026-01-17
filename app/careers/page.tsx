import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import JobsList from './JobsList';

export const metadata: Metadata = {
  title: 'Careers - Protocoding',
  description: 'Join our team and help build the future of software development.',
};

const JOBS = [
  {
    title: 'Software Engineer (Frontend)',
    location: 'Remote',
    type: 'Part Time · Contract',
    compensation: 'Hourly (based on interview)',
    postedAgo: '8 months ago',
    description: 'We\'re looking for a passionate Frontend Software Engineer to join our innovative team at Protocoding. As a Frontend Engineer, you\'ll be at the forefront of creating exceptional user experiences and working with cutting-edge web technologies.',
    responsibilities: [
      'Building modern, responsive web applications using React and Next.js',
      'Implementing pixel-perfect UI designs with a focus on performance and accessibility',
      'Collaborating with designers and backend engineers to deliver seamless user experiences',
    ],
    requirements: [
      '3+ years of experience with modern JavaScript and React',
      'Strong proficiency in Next.js, TypeScript, and modern frontend tooling',
      'Experience with state management solutions (Redux, Zustand, etc.)',
      'Understanding of web performance optimization and SEO best practices',
    ],
    preferred: [
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Familiarity with CI/CD pipelines and deployment workflows',
      'Understanding of design systems and component libraries',
      'Experience with animation libraries (Framer Motion, GSAP)',
    ],
  },
  {
    title: 'Modern PHP/Drupal Developer',
    location: 'Remote',
    type: 'Part Time · Contract',
    compensation: 'Hourly (based on interview)',
    postedAgo: '8 months ago',
    description: 'We\'re looking for a skilled Drupal Developer with a modern PHP background to join our growing team. You\'ll be responsible for building and maintaining robust, scalable web applications, collaborating with designers and front-end engineers.',
    responsibilities: [
      'Develop and maintain Drupal-based web applications with clean, modern PHP',
      'Create and customize modules, themes, and templates in Drupal 9/10',
      'Integrate RESTful APIs and third-party services',
      'Work with front-end developers to deliver responsive, performant user experiences',
      'Participate in weekly client meetings for updates, demos, and feedback',
      'Perform code reviews, troubleshoot bugs, and maintain project documentation',
    ],
    requirements: [
      'Minimum of 3+ years of experience with Drupal (preferably 9 or 10)',
      'Strong understanding of modern PHP, OOP, and Composer-based workflows',
      'Experience with Drupal theming and module development',
      'Familiarity with MySQL or other relational databases',
      'Strong communication skills; able to participate in client-facing meetings',
      'Self-driven and comfortable working remotely in a fast-paced environment',
    ],
    preferred: [
      'Experience with headless Drupal and front-end frameworks (e.g., React, Vue)',
      'Familiarity with Docker, GitHub Actions, or other CI/CD tools',
      'Understanding of decoupled CMS architectures',
      'Familiarity with hosting platforms like Pantheon, Acquia, or Platform.sh',
    ],
  },
  {
    title: 'React Native Developer',
    location: 'Remote',
    type: 'Part Time · Contract',
    compensation: 'Hourly (based on interview)',
    postedAgo: '8 months ago',
    description: 'Build and maintain cross-platform mobile apps using React Native. Work closely with designers and backend teams to deliver polished mobile experiences.',
    responsibilities: [
      'Develop and maintain cross-platform mobile apps using React Native',
      'Integrate with backend APIs and handle state management using Redux',
      'Work closely with designers to implement responsive, user-friendly UI/UX',
      'Participate in weekly client meetings for progress updates and feedback',
      'Review and merge PRs and help maintain code quality across the team',
    ],
    requirements: [
      'Minimum 2+ years of experience with React Native',
      'Solid understanding of JavaScript/TypeScript and mobile app architecture',
      'Experience using Redux or similar state management libraries',
      'Comfortable integrating REST or GraphQL APIs',
      'Strong communication skills; able to join client meetings',
    ],
    preferred: [
      'Familiarity with Expo, Firebase, or native modules',
      'Experience deploying to App Store and Google Play',
      'Understanding of CI/CD for mobile apps',
      'Experience with design tools (Figma, Zeplin)',
    ],
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
  'Remote-First',
  'Flexible Hours',
  'Contract Work',
  'Startup Culture',
  'Diverse Projects',
  'Growth Potential',
  'Direct Client Work',
  'Skill Development',
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

      {/* Jobs list - expanded format */}
      <JobsList jobs={JOBS} />

      {/* Company description */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">About Us</p>
          <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight mb-4">Company Description</h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
            Protocoding is a full-service software consulting firm specializing in AI solutions for startups and enterprise clients. We focus on delivering high-quality, scalable solutions for businesses building out their tech teams or augmenting their existing capabilities.
          </p>
        </div>
        <div className="gutter-right" />
      </div>

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
