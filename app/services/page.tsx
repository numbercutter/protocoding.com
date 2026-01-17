import { Metadata } from 'next';
import ServicesGrid from '@/components/ServicesGrid';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services - Protocoding',
  description: 'Full-stack development services.',
};

export default function ServicesPage() {
  return (
    <div className="section-row min-h-screen">
      {/* Left gutter */}
      <div className="gutter-left" />
      
      {/* Content */}
      <div className="material flex flex-col">
        <div className="p-10 lg:p-12 material-elevated border-b border-black/[0.08]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Services</p>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">What we build</h1>
          <p className="text-sm text-gray-500 max-w-xl">End-to-end development services for ambitious companies.</p>
        </div>
        <ServicesGrid />
        <Link href="/contact" className="flex items-center justify-center gap-2 p-8 material-inset hover:material text-sm font-bold text-gray-900 transition-all uppercase tracking-wider border-t border-black/[0.08]">
          Get a Free Assessment <ArrowUpRight size={14} />
        </Link>
      </div>
      
      {/* Right gutter */}
      <div className="gutter-right" />
    </div>
  );
}
