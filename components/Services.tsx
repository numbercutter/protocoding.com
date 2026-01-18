'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 'all', label: 'All Industries', count: 24 },
  { id: 'fintech', label: 'Fintech', count: 4 },
  { id: 'healthcare', label: 'Healthcare', count: 4 },
  { id: 'ecommerce', label: 'E-Commerce', count: 4 },
  { id: 'enterprise', label: 'Enterprise', count: 4 },
  { id: 'saas', label: 'SaaS', count: 4 },
  { id: 'ai', label: 'AI Integration', count: 4 },
];

const USE_CASES = [
  // Fintech
  { category: 'fintech', title: 'Trading Platform Build', desc: 'Real-time trading interfaces with WebSocket integrations.' },
  { category: 'fintech', title: 'Payment Processing', desc: 'Stripe, Plaid, and custom payment gateway integrations.' },
  { category: 'fintech', title: 'Risk Assessment AI', desc: 'ML models for credit scoring and fraud detection.' },
  { category: 'fintech', title: 'Regulatory Reporting', desc: 'Automated compliance reports for SEC, FINRA.' },
  
  // Healthcare
  { category: 'healthcare', title: 'Patient Portal', desc: 'HIPAA-compliant web and mobile applications.' },
  { category: 'healthcare', title: 'EHR Integration', desc: 'HL7 FHIR connectors to Epic, Cerner systems.' },
  { category: 'healthcare', title: 'Medical Document AI', desc: 'Extract structured data from clinical notes.' },
  { category: 'healthcare', title: 'Telehealth Platform', desc: 'Video consultation with scheduling.' },
  
  // E-Commerce
  { category: 'ecommerce', title: 'Headless Commerce', desc: 'Shopify, BigCommerce with React storefronts.' },
  { category: 'ecommerce', title: 'Inventory Automation', desc: 'Real-time sync across warehouses.' },
  { category: 'ecommerce', title: 'Product Recommendations', desc: 'Personalized recommendations with AI.' },
  { category: 'ecommerce', title: 'Checkout Optimization', desc: 'A/B tested flows with fraud prevention.' },
  
  // Enterprise
  { category: 'enterprise', title: 'Legacy Migration', desc: 'Modernize monoliths to microservices.' },
  { category: 'enterprise', title: 'Internal Tools', desc: 'Admin dashboards and workflow automation.' },
  { category: 'enterprise', title: 'SSO & Identity', desc: 'Okta, Auth0, Azure AD integrations.' },
  { category: 'enterprise', title: 'Data Pipelines', desc: 'ETL workflows and real-time analytics.' },
  
  // SaaS
  { category: 'saas', title: 'MVP Development', desc: 'Idea to launched product in 8-12 weeks.' },
  { category: 'saas', title: 'Multi-Tenant Architecture', desc: 'Scalable infrastructure with tenant isolation.' },
  { category: 'saas', title: 'API Platform', desc: 'RESTful and GraphQL APIs with SDKs.' },
  { category: 'saas', title: 'Usage Analytics', desc: 'Product analytics and feature flags.' },
  
  // AI Integration
  { category: 'ai', title: 'LLM Integration', desc: 'OpenAI, Anthropic models in your product.' },
  { category: 'ai', title: 'Document Processing', desc: 'Extract and summarize documents at scale.' },
  { category: 'ai', title: 'Conversational AI', desc: 'Chatbots with RAG and knowledge bases.' },
  { category: 'ai', title: 'Computer Vision', desc: 'Image classification, OCR, visual inspection.' },
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
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-3">What We Build</p>
              <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Shipped across every industry
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
              From Series A startups to Fortune 500 enterprises. Here are the types of projects we deliver.
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
          <div className="flex items-center gap-8">
            <div className="text-center md:text-left">
              <span className="text-2xl font-bold text-gray-900">50+</span>
              <span className="text-sm text-gray-500 ml-2">projects shipped</span>
            </div>
            <div className="text-center md:text-left">
              <span className="text-2xl font-bold text-gray-900">6</span>
              <span className="text-sm text-gray-500 ml-2">industries served</span>
            </div>
          </div>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-xs font-bold tracking-wide hover:bg-gray-800 transition-all"
          >
            Start a Project <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </section>
  );
}
