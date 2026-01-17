import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing - Protocoding',
  description: 'Simple, transparent pricing for software development services.',
};

// Blue textured block matching FeaturedWork style
const BlueTexturedBlock = ({ 
  children, 
  className = '',
  isGutter = false 
}: { 
  children?: React.ReactNode; 
  className?: string;
  isGutter?: boolean;
}) => (
  <div className={`relative overflow-hidden bg-accent ${className}`}>
    {/* Base noise - fine grain */}
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
    
    {/* Secondary noise layer */}
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-soft-light"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
    
    {/* Top edge glare */}
    <div 
      className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
      }}
    />
    
    {/* Inner shadow overlay for depth */}
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.15),
          inset 1px 0 0 rgba(255,255,255,0.1),
          inset 0 -1px 0 rgba(0,0,0,0.08),
          inset -1px 0 0 rgba(0,0,0,0.05),
          inset 0 2px 8px rgba(0,0,0,0.04)
        `,
      }}
    />
    
    {/* Subtle radial highlight */}
    {!isGutter && (
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)',
        }}
      />
    )}
    
    {/* Content */}
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

const TIERS = [
  {
    name: 'Starter',
    price: '$15k',
    priceDetail: 'starting at',
    description: 'Perfect for MVPs and small projects',
    features: [
      'UI/UX design',
      'Frontend development',
      'Basic backend/API',
      'Database setup',
      '30-day post-launch support',
      'Source code ownership',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$50k',
    priceDetail: 'starting at',
    description: 'For growing businesses and complex apps',
    features: [
      'Everything in Starter',
      'Full-stack development',
      'Advanced API development',
      'Third-party integrations',
      'Cloud infrastructure setup',
      'CI/CD pipeline',
      '90-day post-launch support',
      'Priority communication',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceDetail: 'contact us',
    description: 'For large-scale applications and teams',
    features: [
      'Everything in Professional',
      'AI/ML integrations',
      'Microservices architecture',
      'DevOps & infrastructure',
      'Security audits',
      'Dedicated team',
      '1-year support & maintenance',
      'SLA guarantees',
    ],
    cta: 'Contact Us',
    popular: false,
  },
];

const FAQS = [
  {
    question: 'How does pricing work?',
    answer: 'We provide fixed-price quotes after an initial discovery call. The price depends on scope, complexity, and timeline. No hourly billing surprises.',
  },
  {
    question: 'What\'s included in post-launch support?',
    answer: 'Bug fixes, minor adjustments, and technical support. Major feature additions or redesigns are scoped separately.',
  },
  {
    question: 'Can I upgrade my plan mid-project?',
    answer: 'Yes, we can adjust scope and pricing as your needs evolve. We\'ll always be transparent about costs.',
  },
  {
    question: 'Do you offer ongoing development?',
    answer: 'Yes, many clients retain us for ongoing development after the initial project. We offer monthly retainer packages.',
  },
  {
    question: 'What if I\'m not satisfied?',
    answer: 'We work in weekly sprints with regular demos. If you\'re not happy with direction, we course-correct immediately. Your satisfaction is guaranteed.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'MVPs typically take 8-12 weeks. Larger projects can take 3-6 months. We\'ll give you a clear timeline during discovery.',
  },
];

const COMPARISON = [
  { feature: 'UI/UX Design', starter: true, pro: true, enterprise: true },
  { feature: 'Frontend Development', starter: true, pro: true, enterprise: true },
  { feature: 'Backend Development', starter: 'Basic', pro: true, enterprise: true },
  { feature: 'Database Design', starter: true, pro: true, enterprise: true },
  { feature: 'Third-party Integrations', starter: false, pro: true, enterprise: true },
  { feature: 'AI/ML Integration', starter: false, pro: false, enterprise: true },
  { feature: 'DevOps & CI/CD', starter: false, pro: true, enterprise: true },
  { feature: 'Security Audit', starter: false, pro: false, enterprise: true },
  { feature: 'Post-launch Support', starter: '30 days', pro: '90 days', enterprise: '1 year' },
  { feature: 'Dedicated Team', starter: false, pro: false, enterprise: true },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero section - blue textured background */}
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_80px] lg:grid-cols-[100px_1fr_100px] xl:grid-cols-[120px_1fr_120px]">
        <BlueTexturedBlock className="hidden md:block border-b border-black/10" isGutter={true} />
        <BlueTexturedBlock className="p-8 pt-20 md:p-12 md:pt-12 lg:p-16 text-center border-b border-black/10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 mb-4">Pricing</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-black/90 tracking-tight mb-4">
            Simple, transparent <span className="text-black">pricing</span>
          </h1>
          <p className="text-lg text-black/50 max-w-2xl mx-auto">
            Choose the perfect plan for your project. All plans include dedicated support and full source code ownership.
          </p>
        </BlueTexturedBlock>
        <BlueTexturedBlock className="hidden md:block border-b border-black/10" isGutter={true} />
      </div>

      {/* Pricing cards */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material grid grid-cols-1 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`p-6 md:p-8 lg:p-10 cell ${tier.popular ? 'material-dark' : 'material hover:material-elevated'} transition-all`}
            >
              {tier.popular && (
                <span className="inline-block mb-4 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] bg-accent/20 text-accent">
                  Most Popular
                </span>
              )}
              <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${tier.popular ? 'text-white/40' : 'text-gray-400'}`}>
                {tier.name}
              </h3>
              <div className={`text-4xl font-bold mb-1 tracking-tight ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                {tier.price}
              </div>
              <p className={`text-[10px] uppercase tracking-[0.15em] mb-4 ${tier.popular ? 'text-white/30' : 'text-gray-400'}`}>
                {tier.priceDetail}
              </p>
              <p className={`text-sm mb-8 ${tier.popular ? 'text-white/50' : 'text-gray-500'}`}>
                {tier.description}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-center gap-3 text-xs font-medium ${tier.popular ? 'text-white/60' : 'text-gray-600'}`}
                  >
                    <span className={`w-1.5 h-1.5 ${tier.popular ? 'bg-accent' : 'bg-gray-400'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`flex items-center justify-center gap-2 w-full py-4 text-xs font-bold tracking-wide uppercase transition-all ${
                  tier.popular
                    ? 'bg-accent text-black/80 hover:brightness-110'
                    : 'material-inset text-gray-900 hover:material'
                }`}
              >
                {tier.cta} <ArrowUpRight size={12} />
              </Link>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* Comparison header - hidden on mobile */}
      <div className="section-row hidden md:grid">
        <div className="gutter-left" />
        <div className="material-elevated p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Compare Plans</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Feature comparison</h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Comparison table header - hidden on mobile */}
      <div className="section-row hidden md:grid">
        <div className="gutter-left" />
        <div className="material-inset grid grid-cols-4">
          <div className="p-4 lg:p-6 cell">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Feature</span>
          </div>
          <div className="p-4 lg:p-6 cell text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Starter</span>
          </div>
          <div className="p-4 lg:p-6 cell text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Professional</span>
          </div>
          <div className="p-4 lg:p-6 cell text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Enterprise</span>
          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Comparison rows - hidden on mobile */}
      {COMPARISON.map((row, index) => (
        <div key={row.feature} className="section-row hidden md:grid">
          <div className="gutter-left" />
          <div className={`grid grid-cols-4 ${index % 2 === 0 ? 'material' : 'material-inset'}`}>
            <div className="p-4 lg:p-6 cell">
              <span className="text-xs font-medium text-gray-700">{row.feature}</span>
            </div>
            <div className="p-4 lg:p-6 cell flex items-center justify-center">
              {row.starter === true ? (
                <span className="w-2 h-2 bg-gray-400" />
              ) : row.starter === false ? (
                <span className="text-gray-300">—</span>
              ) : (
                <span className="text-[10px] font-bold text-gray-500">{row.starter}</span>
              )}
            </div>
            <div className="p-4 lg:p-6 cell flex items-center justify-center bg-accent/5">
              {row.pro === true ? (
                <span className="w-2 h-2 bg-accent" />
              ) : row.pro === false ? (
                <span className="text-gray-300">—</span>
              ) : (
                <span className="text-[10px] font-bold text-accent">{row.pro}</span>
              )}
            </div>
            <div className="p-4 lg:p-6 cell flex items-center justify-center">
              {row.enterprise === true ? (
                <span className="w-2 h-2 bg-gray-400" />
              ) : row.enterprise === false ? (
                <span className="text-gray-300">—</span>
              ) : (
                <span className="text-[10px] font-bold text-gray-500">{row.enterprise}</span>
              )}
            </div>
          </div>
          <div className="gutter-right" />
        </div>
      ))}

      {/* FAQ header */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-6 md:p-8 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">FAQ</p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Frequently asked <span className="text-accent">questions</span>
          </h2>
        </div>
        <div className="gutter-right" />
      </div>

      {/* FAQ items */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark grid grid-cols-1 md:grid-cols-2">
          {FAQS.map((faq, index) => (
            <div key={faq.question} className="p-6 md:p-8 cell-dark">
              <span className="text-2xl font-bold text-white/10 block mb-3">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-sm font-bold text-white mb-3">{faq.question}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="gutter-right" />
      </div>

      {/* CTA */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-inset p-6 md:p-8 lg:p-12 text-center">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Still have questions?</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Let&apos;s hop on a call and discuss your project. We&apos;ll give you a free assessment with clear scope and honest pricing.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-accent text-black/80 text-xs md:text-sm font-bold tracking-wide uppercase hover:brightness-110 transition-all"
          >
            Get Free Assessment <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="gutter-right" />
      </div>
    </>
  );
}
