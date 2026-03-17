import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const lastScrollTopRef = useRef<number>(-1);
  const endOffsetRef = useRef<number>(0);
  const tickingRef = useRef(false);

  // Cached parameters for high-performance calculations
  const scrollParamsRef = useRef({
    stackPositionPx: 0,
    scaleEndPositionPx: 0,
    containerHeight: 0
  });

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length) return;

    // Use pageYOffset for maximum performance and compatibility with mobile
    const scrollTop = useWindowScroll 
      ? (window.pageYOffset || document.documentElement.scrollTop)
      : scrollerRef.current?.scrollTop || 0;

    // Only update if scroll position actually changed
    if (scrollTop === lastScrollTopRef.current) {
      tickingRef.current = false;
      return;
    }
    lastScrollTopRef.current = scrollTop;

    const { stackPositionPx, scaleEndPositionPx, containerHeight } = scrollParamsRef.current;
    const endElementTop = endOffsetRef.current;

    for (let i = 0; i < cardsRef.current.length; i++) {
      const card = cardsRef.current[i];
      if (!card) continue;

      const cardTop = cardOffsetsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - (containerHeight / 2);

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - (scaleProgress * (1 - targetScale));
      const rotation = rotationAmount ? (i * rotationAmount * scaleProgress) : 0;

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      // Pro-tip: Avoiding string template literals for every update can save a bit of GC pressure
      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    }

    tickingRef.current = false;
  }, [
    useWindowScroll,
    itemScale,
    itemStackDistance,
    baseScale,
    rotationAmount,
    onStackComplete,
    calculateProgress
  ]);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
    }
  }, [updateCardTransforms]);

  const updateOffsets = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const h = useWindowScroll ? window.innerHeight : (scroller?.clientHeight || 0);
    
    // Update cached parameters
    scrollParamsRef.current = {
      containerHeight: h,
      stackPositionPx: parsePercentage(stackPosition, h),
      scaleEndPositionPx: parsePercentage(scaleEndPosition, h)
    };

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller!.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    // Accurate measurement with clean styles
    const originalStyles = cards.map(c => ({
      transform: c.style.transform,
      filter: c.style.filter
    }));

    cards.forEach(c => {
      c.style.transform = 'none';
      c.style.filter = 'none';
    });

    cardOffsetsRef.current = cards.map(c => {
      if (useWindowScroll) {
        return c.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
      }
      return c.offsetTop;
    });

    const endElement = useWindowScroll
      ? (document.querySelector('.scroll-stack-end') as HTMLElement)
      : scroller?.querySelector('.scroll-stack-end') as HTMLElement;
    
    if (endElement) {
      if (useWindowScroll) {
        endOffsetRef.current = endElement.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
      } else {
        endOffsetRef.current = endElement.offsetTop;
      }
    }

    // Restore
    cards.forEach((c, i) => {
      c.style.transform = originalStyles[i].transform;
      c.style.filter = originalStyles[i].filter;
    });

    // Strategy: Use scroll event to trigger initial update
    handleScroll();
  }, [useWindowScroll, stackPosition, scaleEndPosition, parsePercentage, handleScroll]);

  useLayoutEffect(() => {
    const scroller = useWindowScroll ? window : scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : (scroller as HTMLElement).querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.zIndex = `${i + 1}`;
      // Initial hardware acceleration push
      if (!card.style.transform) card.style.transform = 'translate3d(0,0,0)';
    });

    updateOffsets();

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateOffsets);

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateOffsets);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      tickingRef.current = false;
    };
  }, [
    itemDistance,
    useWindowScroll,
    handleScroll,
    updateOffsets
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
