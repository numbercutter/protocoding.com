import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team - Protocoding',
  description: 'Meet the talented engineers and designers behind Protocoding.',
};

const TEAM = [
  {
    name: 'Ryan Lesson',
    role: 'Founder',
    image: '/team/ryan.png',
    bio: 'With over a decade of experience at Microsoft and Walmart Global Tech, Ryan is a seasoned tech professional known for forming skilled teams, managing complex projects, and delivering innovative software solutions.',
    specialties: ['Leadership', 'Architecture', 'Cloud'],
  },
  {
    name: 'Jordan Lesson',
    role: 'Founder',
    image: '/team/jordan.png',
    bio: 'With over eight years of experience in software development, Jordan specializes in designing and developing high-quality web and mobile applications that drive business growth and innovation.',
    specialties: ['Full-Stack', 'Mobile', 'Product'],
  },
  {
    name: 'Mitch Carrara',
    role: 'Founding Software Engineer',
    image: '/team/mitch.png',
    bio: 'Mitch is a versatile and creative force, wearing multiple hats to drive the company\'s vision forward. He brings skill and passion to elevate Protocoding to new heights.',
    specialties: ['Backend', 'DevOps', 'AI'],
  },
  {
    name: 'Christian Loth',
    role: 'Senior Development Lead',
    image: '/team/christian.png',
    bio: 'Christian is a software engineer with over 10 years of programming experience. He plays a key role in architecting projects, conducting code reviews, and communicating with clients.',
    specialties: ['Architecture', 'Code Quality', 'Mentorship'],
  },
  {
    name: 'Raymond Spartz',
    role: 'Senior Creative Developer',
    image: '/team/raymond.png',
    bio: 'Raymond is a multi-disciplinary designer and developer, specializing in 3D animation and immersive UI/UX experiences. He is a Spline partner with deep knowledge in creating intuitive frontend experiences.',
    specialties: ['3D', 'UI/UX', 'Animation'],
  },
  {
    name: 'Riya',
    role: 'Senior Engineer',
    image: '/team/riya.png',
    bio: 'Riya is a skilled Software Engineer with expertise in full-stack development, data engineering, and cloud technologies. She focuses on creating seamless and efficient digital experiences.',
    specialties: ['Full-Stack', 'Data', 'Cloud'],
  },
];

const VALUES = [
  { 
    title: 'Excellence', 
    description: 'We hold ourselves to the highest standards in every line of code.',
  },
  { 
    title: 'Collaboration', 
    description: 'Great products are built by great teams working together.',
  },
  { 
    title: 'Innovation', 
    description: 'We stay at the forefront of technology to deliver cutting-edge solutions.',
  },
  { 
    title: 'Integrity', 
    description: 'We build trust through transparency, honesty, and reliability.',
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <Link href="/about" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/50 transition-colors mb-6">
            <ArrowLeft size={12} /> About
          </Link>
          
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Our Team</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            The people behind <span className="text-accent">Protocoding</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl">
            We&apos;re a team of engineers and designers who are passionate about building exceptional software. Get to know the people who will be working on your project.
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Values */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {VALUES.map((value, index) => (
              <div key={value.title} className={`p-5 md:p-8 cell ${index % 2 === 0 ? 'material' : 'material-inset'}`}>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.15em] mb-2">{value.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Team header */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Meet the Team</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Engineers & designers who care</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Team grid */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, index) => (
              <div key={member.name} className={`group p-6 lg:p-8 cell ${index % 2 === 0 ? 'material' : 'material-inset'} hover:material-elevated transition-all`}>
                <div className="aspect-square w-full mb-6 overflow-hidden material-inset relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">{member.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span key={specialty} className="px-2 py-1 text-[9px] font-bold uppercase tracking-[0.05em] bg-gray-100 text-gray-500">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Join us */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 lg:p-12 text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Want to join our team?</h2>
          <p className="text-sm text-white/40 mb-6 max-w-xl mx-auto">
            We&apos;re always looking for talented engineers and designers who share our passion for building great software.
          </p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-black/80 text-sm font-bold tracking-wide uppercase hover:brightness-110"
          >
            View Open Positions <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>

      {/* CTA */}
      <div className="section-row">
        <div className="gutter-left" />
        <Link
          href="/careers"
          className="material flex items-center justify-center gap-2 p-8 text-sm font-bold text-gray-900 hover:material-elevated transition-all uppercase tracking-[0.2em]"
        >
          Work With Us <ArrowUpRight size={14} />
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
