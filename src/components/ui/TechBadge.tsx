import { cn } from '@/lib/utils';

interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md';
}

export function TechBadge({ name, variant = 'default', size = 'md' }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-light tracking-wide transition-colors',
        variant === 'default' && 'bg-accent text-accent-foreground',
        variant === 'outline' && 'border border-border text-foreground',
        size === 'sm' && 'px-2 py-0.5 text-xs rounded',
        size === 'md' && 'px-3 py-1 text-sm rounded-sm'
      )}
    >
      {name}
    </span>
  );
}
