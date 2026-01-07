import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md';
}

export function TechBadge({ name, variant = 'default', size = 'md' }: TechBadgeProps) {
  const liquidGlassStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 1.5px 1.5px 0 rgba(255,255,255,0.18)',
    border: '1px solid rgba(255, 255, 255, 0.18)'
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center font-medium tracking-tight cursor-default select-none text-foreground',
        'transition-all duration-300 ease-out',
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-xs rounded-lg',
        size === 'md' && 'px-4 py-2 text-sm rounded-xl'
      )}
      style={liquidGlassStyle}
    >
      {name}
    </motion.span>
  );
}