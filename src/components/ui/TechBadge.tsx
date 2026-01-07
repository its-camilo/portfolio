import { cn } from '@/lib/utils';

interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md';
}

export function TechBadge({ name, variant = 'default', size = 'md' }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium tracking-wide transition-all duration-200',
        // Default - Material UI chip style
        variant === 'default' && 'bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground',
        // Outline variant
        variant === 'outline' && 'border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10',
        // Filled variant
        variant === 'filled' && 'bg-primary text-primary-foreground',
        // Sizes with more rounded corners
        size === 'sm' && 'px-3 py-1 text-xs rounded-full',
        size === 'md' && 'px-4 py-1.5 text-sm rounded-full'
      )}
    >
      {name}
    </span>
  );
}
