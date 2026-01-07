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

  return (
    <motion.button
      onClick={handleScroll}
      className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </motion.button>
  );
}