import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging Tailwind classes
 * Usage: cn("base-class", conditional && "conditional-class", "another-class")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
