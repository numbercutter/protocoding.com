'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, useInView, MotionValue } from 'framer-motion';

// ============================================
// SCROLL-LINKED PARALLAX
// ============================================

interface UseParallaxOptions {
  /** How much to move (in pixels). Positive = moves down as you scroll */
  offset?: number;
  /** Smooth spring config */
  smooth?: boolean;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { offset = 50, smooth = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const y = smooth 
    ? useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 })
    : rawY;
  
  return { ref, y };
}

// ============================================
// ANIMATED COUNTER
// ============================================

interface UseCounterOptions {
  /** Final value to count to */
  end: number;
  /** Starting value */
  start?: number;
  /** Duration in seconds */
  duration?: number;
  /** Suffix to append (e.g., '+', '%') */
  suffix?: string;
  /** Only animate once */
  once?: boolean;
}

export function useCounter(options: UseCounterOptions) {
  const { end, start = 0, duration = 2, suffix = '', once = true } = options;
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (!isInView) return;
    
    const startTime = performance.now();
    const diff = end - start;
    
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      
      setCount(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, start, end, duration]);
  
  return { ref, count, display: `${count}${suffix}` };
}

// ============================================
// STAGGERED REVEAL VARIANTS
// ============================================

// Use these with framer-motion's variants prop
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1], // Custom cubic bezier for smooth feel
    },
  },
};

export const fadeInUpStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// ============================================
// TEXT LINE REVEAL
// ============================================

export const lineReveal = {
  hidden: { 
    opacity: 0,
    y: '100%',
  },
  visible: { 
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const lineRevealStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ============================================
// SCROLL PROGRESS HOOK
// ============================================

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  return scaleX;
}

// ============================================
// BLUR-IN EFFECT
// ============================================

export const blurIn = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};
