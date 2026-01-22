'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      <div className="text-center max-w-md px-6">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-red-500">!</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          We encountered an unexpected error. Please try again or return to the home page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white text-sm font-bold tracking-wide uppercase hover:brightness-110 transition-all"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-bold tracking-wide uppercase hover:bg-gray-50 transition-all"
          >
            <Home size={14} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
