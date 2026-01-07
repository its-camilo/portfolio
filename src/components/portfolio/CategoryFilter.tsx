import { motion, useMotionValue, useDragControls, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useCallback, useRef } from 'react';

interface CategoryFilterProps {
  categories: ProjectCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * Apple-style category filter with draggable liquid glass indicator
 */
export function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const { t } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const allCategories = [
    { id: 'all', label: t('category.all') },
    ...categories.map(cat => ({ id: cat, label: t(`category.${cat}`) }))
  ];

  const currentIndex = allCategories.findIndex(c => c.id === activeCategory);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    // Determine direction based on velocity or offset
    if (velocity < -200 || (offset < -threshold && velocity < 50)) {
      // Swipe left -> next category
      const nextIndex = Math.min(currentIndex + 1, allCategories.length - 1);
      if (nextIndex !== currentIndex) {
        setIsAnimating(true);
        onCategoryChange(allCategories[nextIndex].id);
        setTimeout(() => setIsAnimating(false), 350);
      }
    } else if (velocity > 200 || (offset > threshold && velocity > -50)) {
      // Swipe right -> previous category
      const prevIndex = Math.max(currentIndex - 1, 0);
      if (prevIndex !== currentIndex) {
        setIsAnimating(true);
        onCategoryChange(allCategories[prevIndex].id);
        setTimeout(() => setIsAnimating(false), 350);
      }
    }
    
    // Reset drag position
    dragX.set(0);
  }, [currentIndex, allCategories, onCategoryChange, dragX]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    if (!isDragging) {
      setIsAnimating(true);
      onCategoryChange(categoryId);
      setTimeout(() => setIsAnimating(false), 350);
    }
  }, [isDragging, onCategoryChange]);

  return (
    <motion.div 
      ref={containerRef}
      className="flex flex-wrap justify-center gap-2 p-1 touch-pan-y"
      onPanStart={() => setIsDragging(true)}
      onPan={(_, info) => dragX.set(info.offset.x)}
      onPanEnd={handleDragEnd}
    >
      {allCategories.map((category, index) => {
        const isActive = activeCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              'relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200',
              isActive ? 'text-white' : 'text-foreground hover:text-foreground/80'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: isActive ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Hover preview */}
            {!isActive && (
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
                style={{ background: 'hsl(var(--primary) / 0.08)' }}
              />
            )}
            
            {/* Active liquid glass indicator with layoutId */}
            {isActive && (
              <motion.div
                layoutId="categoryIndicator"
                className="absolute inset-0 rounded-full"
                style={{
                  x: isDragging ? dragX : 0,
                  background: 'linear-gradient(135deg, hsl(211 100% 50% / 0.95), hsl(221 100% 60% / 0.9))',
                  backdropFilter: 'blur(12px) saturate(180%)',
                  boxShadow: `
                    0 4px 24px -4px hsl(211 100% 50% / 0.5),
                    0 8px 32px -8px hsl(211 100% 40% / 0.3),
                    inset 0 1px 2px hsl(0 0% 100% / 0.3),
                    inset 0 -1px 2px hsl(211 100% 30% / 0.2)
                  `,
                  border: '1px solid hsl(0 0% 100% / 0.25)',
                }}
                initial={false}
                animate={{
                  scaleX: isAnimating ? 1.15 : 1,
                  scaleY: isAnimating ? 0.92 : 1,
                }}
                transition={{ 
                  layout: {
                    type: "spring", 
                    stiffness: 350, 
                    damping: 30,
                    mass: 1.2
                  },
                  scaleX: { type: "spring", stiffness: 600, damping: 35 },
                  scaleY: { type: "spring", stiffness: 600, damping: 35 }
                }}
              />
            )}
            
            <span className={cn("relative z-10", isActive && "drop-shadow-sm")}>
              {category.label}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
