import { motion, useMotionValue, animate, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useCallback, useRef, useEffect } from 'react';

interface CategoryFilterProps {
  categories: ProjectCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface CategoryPosition {
  id: string;
  center: number;
  left: number;
  right: number;
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
  const [positions, setPositions] = useState<CategoryPosition[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  
  const dragOffset = useMotionValue(0);
  
  const allCategories = [
    { id: 'all', label: t('category.all') },
    ...categories.map(cat => ({ id: cat, label: t(`category.${cat}`) }))
  ];

  // Measure button positions
  const measurePositions = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions: CategoryPosition[] = [];
    
    buttonRefs.current.forEach((button, id) => {
      const rect = button.getBoundingClientRect();
      newPositions.push({
        id,
        left: rect.left - containerRect.left,
        right: rect.right - containerRect.left,
        center: rect.left - containerRect.left + rect.width / 2,
      });
    });
    
    newPositions.sort((a, b) => a.left - b.left);
    setPositions(newPositions);
  }, []);

  useEffect(() => {
    const timer = setTimeout(measurePositions, 100);
    window.addEventListener('resize', measurePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measurePositions);
    };
  }, [measurePositions, allCategories.length]);

  // Find closest category based on current drag position
  const findClosestCategory = useCallback((dragDelta: number): string => {
    if (positions.length === 0) return activeCategory;
    
    const activePos = positions.find(p => p.id === activeCategory);
    if (!activePos) return activeCategory;
    
    const currentCenter = activePos.center + dragDelta;
    
    let closest = positions[0];
    let minDistance = Math.abs(currentCenter - closest.center);
    
    for (const pos of positions) {
      const distance = Math.abs(currentCenter - pos.center);
      if (distance < minDistance) {
        minDistance = distance;
        closest = pos;
      }
    }
    
    return closest.id;
  }, [positions, activeCategory]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDrag = useCallback((event: any, info: PanInfo) => {
    dragOffset.set(info.offset.x);
  }, [dragOffset]);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    setIsDragging(false);
    
    const closestCategory = findClosestCategory(info.offset.x);
    
    // Animate back to zero offset
    animate(dragOffset, 0, { type: "spring", stiffness: 500, damping: 30 });
    
    if (closestCategory !== activeCategory) {
      setIsAnimating(true);
      onCategoryChange(closestCategory);
      setTimeout(() => setIsAnimating(false), 350);
    }
  }, [findClosestCategory, activeCategory, onCategoryChange, dragOffset]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    if (!isDragging && categoryId !== activeCategory) {
      setIsAnimating(true);
      onCategoryChange(categoryId);
      setTimeout(() => setIsAnimating(false), 350);
    }
  }, [isDragging, activeCategory, onCategoryChange]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-wrap justify-center gap-2 p-1"
    >
      {allCategories.map((category, index) => {
        const isActive = activeCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            ref={(el) => {
              if (el) buttonRefs.current.set(category.id, el);
            }}
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
            
            {/* Active liquid glass indicator */}
            {isActive && (
              <motion.div
                layoutId="categoryIndicator"
                className="absolute inset-0 rounded-full cursor-grab active:cursor-grabbing touch-none"
                style={{
                  x: dragOffset,
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
                drag="x"
                dragConstraints={{ left: -300, right: 300 }}
                dragElastic={0.1}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                initial={false}
                animate={{
                  scaleX: isAnimating || isDragging ? 1.12 : 1,
                  scaleY: isAnimating || isDragging ? 0.94 : 1,
                }}
                whileDrag={{ scale: 1.03 }}
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
            
            <span className={cn("relative z-10 pointer-events-none", isActive && "drop-shadow-sm")}>
              {category.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
