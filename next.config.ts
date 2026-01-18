import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    // Enable modern formats
    formats: ['image/avif', 'image/webp'],
    // Optimize image sizes for common breakpoints
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Cache optimized images longer
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Enable React strict mode for better dev experience
  reactStrictMode: true,
  
  // Compress responses
  compress: true,
  
  // Power optimizations
  poweredByHeader: false,
  
  // Experimental features for better performance
  experimental: {
    // Optimize package imports - tree shake large packages
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
