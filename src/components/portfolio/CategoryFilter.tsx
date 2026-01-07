import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryFilterProps {
  categories: ProjectCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * Apple-style category filter with smooth pill transitions
 */
export function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const { t } = useLanguage();
  
  const allCategories = [
    { id: 'all', label: t('category.all') },
    ...categories.map(cat => ({ id: cat, label: t(`category.${cat}`) }))
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {allCategories.map((category, index) => {
        const isActive = activeCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300',
              isActive
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: isActive ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Active background with gradient */}
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full shadow-lg"
                style={{ background: 'var(--gradient-primary)' }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            
            {/* Text */}
            <span className="relative z-10">{category.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}