import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      <div className="text-center max-w-lg px-6">
        {/* Large 404 */}
        <div className="mb-8">
          <span className="text-[120px] md:text-[180px] font-bold text-gray-200 leading-none select-none">
            404
          </span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Page not found
        </h1>
        <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white text-sm font-bold tracking-wide uppercase hover:brightness-110 transition-all"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-300 text-gray-700 text-sm font-bold tracking-wide uppercase hover:bg-gray-50 transition-all"
          >
            <Search size={14} />
            View Services
          </Link>
        </div>
        
        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Services', href: '/services' },
              { label: 'About', href: '/about' },
              { label: 'Insights', href: '/insights' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
