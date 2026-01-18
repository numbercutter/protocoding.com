'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'all', label: 'All Solutions', count: 24 },
  { id: 'fintech', label: 'Financial Services', count: 4 },
  { id: 'healthcare', label: 'Healthcare', count: 4 },
  { id: 'ecommerce', label: 'E-Commerce', count: 4 },
  { id: 'realestate', label: 'Real Estate', count: 4 },
  { id: 'saas', label: 'SaaS & Startups', count: 4 },
  { id: 'manufacturing', label: 'Manufacturing', count: 4 },
];

const USE_CASES = [
  // Financial Services
  { category: 'fintech', title: 'Cut loan processing from weeks to hours', desc: 'ML models that analyze 50+ risk factors and make underwriting decisions in seconds. Not days.' },
  { category: 'fintech', title: 'Catch fraud before it hits your books', desc: 'Real-time transaction monitoring that flags suspicious patterns before losses occur.' },
  { category: 'fintech', title: 'Eliminate manual compliance reporting', desc: 'SEC, FINRA, SOX reports that generate themselves from your existing data.' },
  { category: 'fintech', title: 'Launch digital banking features faster', desc: 'Plaid, Stripe, custom payment rails. Drop them in without touching your core systems.' },
  
  // Healthcare
  { category: 'healthcare', title: 'Free clinicians from documentation', desc: 'AI scribes that pull structured data from notes. Providers get 2+ hours back every day.' },
  { category: 'healthcare', title: 'Reduce missed diagnoses with AI triage', desc: 'Clinical decision support that surfaces relevant patient history and suggests workups.' },
  { category: 'healthcare', title: 'Connect siloed health systems', desc: 'HL7 FHIR integrations that unify data from Epic, Cerner, and legacy EHRs.' },
  { category: 'healthcare', title: 'Scale telehealth without more staff', desc: 'AI handles intake, scheduling, and follow-up. Your team focuses on actual care.' },
  
  // E-Commerce
  { category: 'ecommerce', title: 'Personalize every customer touchpoint', desc: 'Recommendations that adapt in real-time. We see 25%+ higher cart values.' },
  { category: 'ecommerce', title: 'Stop losing sales to checkout friction', desc: 'One-click flows with fraud prevention that approves more and declines less.' },
  { category: 'ecommerce', title: 'Automate inventory across all channels', desc: 'Real-time sync across 10+ platforms. No more stockouts or overselling.' },
  { category: 'ecommerce', title: 'Turn browsers into buyers with AI chat', desc: 'Answers questions, completes purchases. Works at 3am when you don\'t.' },
  
  // Real Estate
  { category: 'realestate', title: 'Appraise properties in minutes', desc: 'ML models that analyze comps, market trends, and property data. Instant valuations.' },
  { category: 'realestate', title: 'Close deals 40% faster', desc: 'Digital transaction management. No more paper pushing and endless email chains.' },
  { category: 'realestate', title: 'Predict market trends first', desc: 'Dashboards that surface opportunities from MLS and economic data before your competition.' },
  { category: 'realestate', title: 'Automate tenant screening', desc: 'Background checks, income verification, lease generation. One workflow, start to finish.' },
  
  // SaaS & Startups
  { category: 'saas', title: 'Go from idea to MVP in 8 weeks', desc: 'Architecture that scales from day one. Build once, never rebuild.' },
  { category: 'saas', title: 'Reduce churn with predictive analytics', desc: 'ML flags at-risk accounts before they cancel. Retention jumps 20%+.' },
  { category: 'saas', title: 'Ship features 2x faster', desc: 'Embedded engineers who slot into your team and your workflows.' },
  { category: 'saas', title: 'Handle 10x traffic without 10x costs', desc: 'Infrastructure that scales elastically. Pay for what you use.' },
  
  // Manufacturing
  { category: 'manufacturing', title: 'Predict equipment failures early', desc: 'IoT sensors + ML models. Maintenance happens when it matters, not on arbitrary schedules.' },
  { category: 'manufacturing', title: 'Catch defects humans miss', desc: 'Computer vision inspection at production speed. Quality issues get caught, not shipped.' },
  { category: 'manufacturing', title: 'Optimize supply chain in real-time', desc: 'Demand forecasting that cuts carrying costs 15-30%.' },
  { category: 'manufacturing', title: 'Digitize paper-based processes', desc: 'Tablets replace clipboards. Data gets captured and actually drives decisions.' },
];

// Responsive items per page
const ITEMS_MOBILE = 6;
const ITEMS_DESKTOP = 12;

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_DESKTOP);
  
  // Detect screen size for responsive pagination
  useEffect(() => {
    const checkScreenSize = () => {
      const newItemsPerPage = window.innerWidth < 768 ? ITEMS_MOBILE : ITEMS_DESKTOP;
      setItemsPerPage(newItemsPerPage);
      setPage(0); // Reset to first page on resize
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Get filtered items
  const allFilteredCases = activeCategory === 'all' 
    ? USE_CASES 
    : USE_CASES.filter(c => c.category === activeCategory);
  
  // Calculate pagination
  const totalPages = Math.ceil(allFilteredCases.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCases = allFilteredCases.slice(startIndex, endIndex);
  
  // Reset page when category changes
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setPage(0);
  };

  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  return (
    <section className="section-row md:min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-8 lg:p-12 material-elevated border-b border-black/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">Your Industry, Solved</p>
              <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Real problems we solve every day
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
              Not hypotheticals. These are the exact workflows we automate and the outcomes we deliver for teams like yours.
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[240px_1fr]">
          {/* Left sidebar - categories */}
          <div className="border-b lg:border-b-0 lg:border-r border-black/[0.08] p-4 lg:p-0">
            <div className="flex lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`
                    flex items-center justify-between gap-4 px-4 lg:px-6 py-3 lg:py-4 text-left transition-all whitespace-nowrap
                    border-b border-transparent lg:border-black/[0.08] last:border-b-0
                    ${activeCategory === cat.id 
                      ? 'bg-accent text-black/80' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="text-xs font-bold">{cat.label}</span>
                  <span className={`text-[11px] font-bold ${activeCategory === cat.id ? 'text-black/50' : 'text-gray-400'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right content - use cases grid */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 content-start md:min-h-[560px]">
              <AnimatePresence mode="popLayout">
                {visibleCases.map((useCase, i) => (
                  <motion.div
                    key={`${useCase.category}-${useCase.title}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    layout
                    className="group p-6 lg:p-8 cell material hover:material-elevated cursor-pointer flex flex-col"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3">
                      {CATEGORIES.find(c => c.id === useCase.category)?.label}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">
                      {useCase.desc}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination controls - only show if more than one page */}
            {totalPages > 1 && (
              <div className="border-t border-black/[0.08] p-4 material-inset flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                  {startIndex + 1}–{Math.min(endIndex, allFilteredCases.length)} of {allFilteredCases.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => p - 1)}
                    disabled={!canGoPrev}
                    className={`p-2 transition-all ${
                      canGoPrev 
                        ? 'text-gray-900 hover:bg-gray-100' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`w-2 h-2 transition-all ${
                          page === i ? 'bg-accent' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={!canGoNext}
                    className={`p-2 transition-all ${
                      canGoNext 
                        ? 'text-gray-900 hover:bg-gray-100' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-black/[0.08] p-6 lg:p-8 material-inset flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 max-w-md text-center md:text-left">
            <span className="font-bold text-gray-900">Don&apos;t see your use case?</span> We&apos;ve likely solved something similar. Let&apos;s talk about what&apos;s slowing your team down.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-xs font-bold tracking-wide hover:bg-gray-800 transition-all whitespace-nowrap"
          >
            Tell Us Your Challenge <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
