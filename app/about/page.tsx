import { Metadata } from 'next';
import { Target, Users, Rocket, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = { title: 'About - Protocoding', description: 'Meet the team behind Protocoding.' };

const VALUES = [
  { icon: Target, title: 'Excellence' },
  { icon: Users, title: 'Collaboration' },
  { icon: Rocket, title: 'Innovation' },
  { icon: Heart, title: 'Integrity' },
];

const TEAM = [
  {
    name: 'Ryan Lesson',
    role: 'Founder',
    image: '/team/ryan.png',
    bio: 'With over a decade of experience at Microsoft and Walmart Global Tech, Ryan is a seasoned tech professional known for forming skilled teams, managing complex projects, and delivering innovative software solutions.',
  },
  {
    name: 'Jordan Lesson',
    role: 'Founder',
    image: '/team/jordan.png',
    bio: 'With over eight years of experience in software development, Jordan specializes in designing and developing high-quality web and mobile applications that drive business growth and innovation.',
  },
  {
    name: 'Mitch Carrara',
    role: 'Founding Software Engineer',
    image: '/team/mitch.png',
    bio: 'Mitch is a versatile and creative force, wearing multiple hats to drive the company\'s vision forward. He brings skill and passion to elevate Protocoding to new heights.',
  },
  {
    name: 'Christian Loth',
    role: 'Senior Development Lead',
    image: '/team/christian.png',
    bio: 'Christian is a software engineer with over 10 years of programming experience. He plays a key role in architecting projects, conducting code reviews, and communicating with clients.',
  },
  {
    name: 'Raymond Spartz',
    role: 'Senior Creative Developer',
    image: '/team/raymond.png',
    bio: 'Raymond is a multi-disciplinary designer and developer, specializing in 3D animation and immersive UI/UX experiences. He is a Spline partner with deep knowledge in creating intuitive frontend experiences.',
  },
  {
    name: 'Riya',
    role: 'Senior Engineer',
    image: '/team/riya.png',
    bio: 'Riya is a skilled Software Engineer with expertise in full-stack development, data engineering, and cloud technologies. She focuses on creating seamless and efficient digital experiences.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">About</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Building software that <span className="text-accent">matters</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl">
            We&apos;re a team of engineers and designers dedicated to exceptional digital experiences. From MVP to full-scale enterprise applications.
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Values */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="p-8 text-center cell material-inset hover:material transition-all">
                <div className="w-12 h-12 mx-auto material flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-gray-500" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Team header */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Our Team</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">The people behind Protocoding</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Team grid */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="group p-6 lg:p-8 cell material hover:material-elevated transition-all">
                <div className="aspect-square w-full mb-6 overflow-hidden material-inset relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-4">{member.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* CTA */}
      <div className="section-row">
        <div className="gutter-left" />
        <Link href="/careers" className="material-inset flex items-center justify-center gap-2 p-8 text-sm font-bold text-gray-900 hover:material transition-all uppercase tracking-wider">
          Join our team <ArrowUpRight size={14} />
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
