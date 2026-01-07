import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Animated scroll indicator for hero sections
 * Subtle visual cue to encourage scrolling
 */
export function ScrollIndicator() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  return;
}