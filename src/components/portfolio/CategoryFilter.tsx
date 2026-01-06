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
 * Category filter component with improved design and translations
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
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {allCategories.map((category, index) => {
        const isActive = activeCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'relative px-5 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300',
              isActive
                ? 'text-primary-foreground shadow-lg'
                : 'text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-border'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Active background pill */}
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-primary rounded-full"
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
