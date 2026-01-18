import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About - Protocoding',
  description: 'Protocoding was founded by Ryan and Jordan Lesson in 2017. A full-service software studio serving clients from startups to enterprise.',
};

const MILESTONES = [
  {
    year: '2008',
    title: 'The Beginning',
    content: 'Ryan saw the opportunity in tech early. He got his younger brother Jordan into coding, and Jordan took to it fast. Really fast. By high school, Jordan had already sold his first app. Ryan was grinding through college and eventually landed at Microsoft, then Walmart Global Tech. Both brothers were building, just on different paths.',
  },
  {
    year: '2017',
    title: 'Tutorials',
    content: 'While Ryan was getting enterprise experience at big tech, we noticed a gap. People wanted to learn to code, but most tutorials out there were either way too basic or assumed you already knew everything. So we started making our own. No fluff, no filler. Just practical content that treated viewers like adults who wanted to actually build something.',
  },
  {
    year: '2018',
    title: 'The Response',
    content: 'The response caught us off guard. Thousands of developers were watching, sharing, and actually building stuff from what they learned. Turns out, people appreciate content that doesn\'t waste their time. That\'s when viewers started reaching out with a different question: "Can you build this for us?"',
  },
  {
    year: '2019',
    title: 'First Clients',
    content: 'We had already proven we understood both the technical side and how to communicate it. The jump from teaching to shipping products felt natural. First client project was a healthcare dashboard. It\'s still running today. Word spread. More clients came in. We realized this could be something real.',
  },
  {
    year: '2020+',
    title: 'Building the Team',
    content: 'Good work attracts good people. Mitch came on as founding engineer. Then Christian. Then Raymond and Riya. Each brought something different: backend expertise, design systems, creative development, data engineering. The studio grew, but the approach stayed the same. Do excellent work, treat clients like partners, keep learning.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">About</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Built by <span className="text-accent">engineers</span>
          </h1>
          <p className="text-lg text-white/40 max-w-2xl">
            Protocoding was founded by Ryan and Jordan Lesson in 2017. What started as a technical education platform evolved into a full-service software studio serving clients from startups to enterprise.
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Founding date callout */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-2 md:grid-cols-4">
          <div className="p-6 md:p-8 text-center cell material-inset">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">April 23</div>
            <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">Founded</div>
          </div>
          <div className="p-6 md:p-8 text-center cell material">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">2017</div>
            <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">Year</div>
          </div>
          <div className="p-6 md:p-8 text-center cell material-inset">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">Brothers</div>
            <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">Founders</div>
          </div>
          <div className="p-6 md:p-8 text-center cell material">
            <div className="text-2xl font-bold text-gray-900 tracking-tight">8+ yrs</div>
            <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">Running</div>
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Founders intro */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-8 lg:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">The Founders</p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-4">Ryan & Jordan Lesson</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Ryan spent over a decade at Microsoft and Walmart Global Tech, leading teams and shipping enterprise software. He got Jordan into coding when they were younger, and Jordan ran with it. Sold his first app in high school. We saw the same gap from different angles: too many agencies out there delivering mediocre work at premium prices. We knew we could do better.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 aspect-[3/4] relative material-inset overflow-hidden">
                <Image
                  src="/team/ryan.png"
                  alt="Ryan Lesson"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="flex-1 aspect-[3/4] relative material-inset overflow-hidden">
                <Image
                  src="/team/jordan.png"
                  alt="Jordan Lesson"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Timeline header */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Timeline</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">How it happened</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Timeline */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark">
          {MILESTONES.map((milestone, index) => (
            <div key={milestone.year} className={`p-6 md:p-8 lg:p-10 ${index !== MILESTONES.length - 1 ? 'border-b border-white/[0.06]' : ''}`}>
              <div className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-8 items-start">
                <div className="flex md:block items-center gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-accent tracking-tight">{milestone.year}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 md:mt-2 md:block">{milestone.title}</span>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-3 md:hidden">{milestone.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{milestone.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Philosophy */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Philosophy</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-6">People first</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                We&apos;ve built strong connections in venture capital and private equity over the years. Not because we were chasing deals, but because we prioritize relationships and growth that helps every party involved. That&apos;s how you build something that lasts.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Every project we take on, we treat as a chance to leave the client better equipped than before. We actually explain the decisions, document the systems, and make sure teams can maintain what we build. The tech industry moves fast enough without people hoarding information.
              </p>
            </div>
            <div className="material-inset p-6">
              <blockquote className="text-sm text-gray-600 leading-relaxed italic">
                &ldquo;We started Protocoding because we wanted to build things we were proud of, for people who actually cared about the outcome. Eight years later, that&apos;s still the filter for every project we take.&rdquo;
              </blockquote>
              <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-[0.1em]">— Ryan Lesson</p>
            </div>
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Today */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Today</p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-4">Full-service, still personal</h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mb-6">
            We&apos;ve grown from two people making tutorials to a team that handles everything from AI integration to enterprise platforms. The services expanded. UI/UX design, full-stack engineering, SEO, technical consulting. But the approach stayed the same. Expert work, direct communication, no bloated processes or surprise invoices. Just people who know what they&apos;re doing, working on problems that matter.
          </p>
          <div className="flex flex-wrap gap-3">
            {['AI Integration', 'Full-Stack Dev', 'UI/UX Design', 'SEO & Growth', 'Technical Consulting'].map((service) => (
              <span key={service} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] bg-gray-100 text-gray-600">
                {service}
              </span>
            ))}
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* CTAs */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid md:grid-cols-2">
          <Link
            href="/about/team"
            className="p-6 md:p-8 cell material-inset hover:material transition-all group"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Next</p>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-accent transition-colors flex items-center gap-2">
              Meet the Team <ArrowUpRight size={14} />
            </h3>
          </Link>
          <Link
            href="/services"
            className="p-6 md:p-8 cell material hover:material-elevated transition-all group"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Explore</p>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-accent transition-colors flex items-center gap-2">
              Our Services <ArrowUpRight size={14} />
            </h3>
          </Link>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Final CTA */}
      <div className="section-row">
        <div className="gutter-left" />
        <Link
          href="/contact"
          className="material-inset flex items-center justify-center gap-2 p-6 md:p-8 text-xs md:text-sm font-bold text-gray-900 hover:material transition-all uppercase tracking-[0.2em]"
        >
          Start a Conversation <ArrowUpRight size={14} />
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
