import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md';
}

export function TechBadge({ name, variant = 'default', size = 'md' }: TechBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center font-medium tracking-tight cursor-default select-none',
        'transition-all duration-300 ease-out',
        // Default - Apple-style chip
        variant === 'default' && 'bg-card border border-border text-foreground hover:border-primary hover:bg-accent shadow-sm',
        // Outline variant
        variant === 'outline' && 'border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10',
        // Filled variant
        variant === 'filled' && 'bg-primary text-primary-foreground shadow-md',
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-xs rounded-lg',
        size === 'md' && 'px-4 py-2 text-sm rounded-xl'
      )}
    >
      {name}
    </motion.span>
  );
}