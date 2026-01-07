import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect, useCallback } from 'react';

interface CategoryFilterProps {
  categories: ProjectCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface ButtonRect {
  id: string;
  left: number;
  width: number;
  center: number;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [buttonRects, setButtonRects] = useState<ButtonRect[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const indicatorX = useMotionValue(0);
  const indicatorWidth = useMotionValue(100);
  
  // Stretch effect based on velocity during drag/animation
  const stretchX = useMotionValue(1);
  const stretchY = useTransform(stretchX, [0.85, 1, 1.25], [1.08, 1, 0.9]);
  
  const allCategories = [
    { id: 'all', label: t('category.all') },
    ...categories.map(cat => ({ id: cat, label: t(`category.${cat}`) }))
  ];

  // Measure button positions
  const measureButtons = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const rects: ButtonRect[] = [];
    
    buttonRefs.current.forEach((button, id) => {
      const rect = button.getBoundingClientRect();
      rects.push({
        id,
        left: rect.left - containerRect.left,
        width: rect.width,
        center: rect.left - containerRect.left + rect.width / 2,
      });
    });
    
    // Sort by position
    rects.sort((a, b) => a.left - b.left);
    setButtonRects(rects);
    
    // Set initial position
    const activeRect = rects.find(r => r.id === activeCategory);
    if (activeRect && !isReady) {
      indicatorX.set(activeRect.left);
      indicatorWidth.set(activeRect.width);
      setIsReady(true);
    }
  }, [activeCategory, isReady, indicatorX, indicatorWidth]);

  // Measure on mount and resize
  useEffect(() => {
    // Small delay to ensure buttons are rendered
    const timer = setTimeout(measureButtons, 50);
    window.addEventListener('resize', measureButtons);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureButtons);
    };
  }, [measureButtons, allCategories.length]);

  // Update indicator position when active category changes
  useEffect(() => {
    const activeRect = buttonRects.find(r => r.id === activeCategory);
    if (activeRect && !isDragging && isReady) {
      // Animate stretch effect
      animate(stretchX, 1.18, { 
        type: "spring", 
        stiffness: 800, 
        damping: 35,
        onComplete: () => {
          animate(stretchX, 1, { 
            type: "spring", 
            stiffness: 400, 
            damping: 25 
          });
        }
      });
      
      // Animate position and width
      animate(indicatorX, activeRect.left, { 
        type: "spring", 
        stiffness: 350, 
        damping: 30,
        mass: 1
      });
      animate(indicatorWidth, activeRect.width, { 
        type: "spring", 
        stiffness: 350, 
        damping: 30 
      });
    }
  }, [activeCategory, buttonRects, isDragging, isReady, indicatorX, indicatorWidth, stretchX]);

  // Find closest category based on indicator position
  const findClosestCategory = useCallback((x: number) => {
    if (buttonRects.length === 0) return activeCategory;
    
    const currentWidth = indicatorWidth.get();
    const indicatorCenter = x + currentWidth / 2;
    
    let closest = buttonRects[0];
    let minDistance = Math.abs(indicatorCenter - closest.center);
    
    for (const rect of buttonRects) {
      const distance = Math.abs(indicatorCenter - rect.center);
      if (distance < minDistance) {
        minDistance = distance;
        closest = rect;
      }
    }
    
    return closest.id;
  }, [buttonRects, activeCategory, indicatorWidth]);

  // Handle drag
  const handleDrag = useCallback(() => {
    const velocity = indicatorX.getVelocity();
    const stretchAmount = Math.min(Math.max(1 + velocity / 8000, 0.85), 1.25);
    stretchX.set(stretchAmount);
  }, [indicatorX, stretchX]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    
    const currentX = indicatorX.get();
    const closestCategory = findClosestCategory(currentX);
    const closestRect = buttonRects.find(r => r.id === closestCategory);
    
    // Reset stretch with bounce
    animate(stretchX, 1, { 
      type: "spring", 
      stiffness: 500, 
      damping: 25 
    });
    
    if (closestRect) {
      // Always animate to the closest category position and width
      animate(indicatorX, closestRect.left, { 
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      });
      animate(indicatorWidth, closestRect.width, { 
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      });
      
      if (closestCategory !== activeCategory) {
        onCategoryChange(closestCategory);
      }
    }
  }, [indicatorX, indicatorWidth, findClosestCategory, activeCategory, onCategoryChange, buttonRects, stretchX]);

  // Calculate drag constraints
  const dragConstraints = buttonRects.length > 0 ? {
    left: buttonRects[0].left - 10,
    right: buttonRects[buttonRects.length - 1].left + 10,
  } : { left: 0, right: 0 };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-wrap justify-center gap-2 p-1"
    >
      {/* Draggable liquid glass indicator */}
      {isReady && (
        <motion.div
          className="absolute top-1 rounded-full cursor-grab active:cursor-grabbing z-0"
          style={{
            x: indicatorX,
            width: indicatorWidth,
            height: 'calc(100% - 8px)',
            scaleX: stretchX,
            scaleY: stretchY,
            background: 'linear-gradient(135deg, hsl(211 100% 50% / 0.95), hsl(221 100% 60% / 0.9))',
            backdropFilter: 'blur(12px) saturate(180%)',
            boxShadow: `
              0 4px 24px -4px hsl(211 100% 50% / 0.5),
              0 8px 32px -8px hsl(211 100% 40% / 0.3),
              inset 0 1px 2px hsl(0 0% 100% / 0.3),
              inset 0 -1px 2px hsl(211 100% 30% / 0.2)
            `,
            border: '1px solid hsl(0 0% 100% / 0.25)',
            transformOrigin: 'center',
          }}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.02 }}
        />
      )}

      {/* Category buttons */}
      {allCategories.map((category, index) => {
        const isActive = activeCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            ref={(el) => {
              if (el) buttonRefs.current.set(category.id, el);
            }}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 z-10',
              isActive
                ? 'text-white'
                : 'text-foreground hover:text-foreground/80'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: isActive ? 1 : 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Hover preview indicator */}
            {!isActive && (
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: 'hsl(var(--primary) / 0.08)',
                }}
              />
            )}
            
            {/* Text */}
            <span className={cn(
              "relative z-10",
              isActive ? "drop-shadow-sm" : ""
            )}>
              {category.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
