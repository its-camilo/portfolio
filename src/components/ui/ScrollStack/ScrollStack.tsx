import React, { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
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
  const lastWidthRef = useRef<number>(0);
  const endOffsetRef = useRef<number>(0);

  const scrollParamsRef = useRef({
    stackPositionPx: 0,
    scaleEndPositionPx: 0,
    containerHeight: 0
  });

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCardTransforms = useCallback(() => {
    animationFrameRef.current = null;

    if (!cardsRef.current.length) return;

    const scrollTop = useWindowScroll 
      ? window.scrollY
      : scrollerRef.current?.scrollTop || 0;

    const rounded = Math.round(scrollTop * 2) / 2;
    if (rounded === lastScrollTopRef.current) return;
    lastScrollTopRef.current = rounded;

    const { stackPositionPx, scaleEndPositionPx, containerHeight } = scrollParamsRef.current;
    if (containerHeight === 0) return;

    const endElementTop = endOffsetRef.current;

    for (let i = 0; i < cardsRef.current.length; i++) {
      const card = cardsRef.current[i];
      if (!card) continue;

      const cardTop = cardOffsetsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinEnd = endElementTop - (containerHeight / 2);

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - (scaleProgress * (1 - targetScale));
      const rotation = rotationAmount ? (i * rotationAmount * scaleProgress) : 0;

      let translateY = 0;
      if (scrollTop > triggerStart) {
        translateY = Math.min(scrollTop - triggerStart, pinEnd - triggerStart);
      }

      card.style.transform = `translate3d(0px, ${translateY}px, 0px) scale(${scale}) rotate(${rotation}deg)`;

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= triggerStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    }
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
    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
    }
  }, [updateCardTransforms]);

  const updateOffsets = useCallback(() => {
    const currentWidth = window.innerWidth;
    if (currentWidth === lastWidthRef.current && lastWidthRef.current !== 0) {
      return;
    }
    lastWidthRef.current = currentWidth;

    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const h = useWindowScroll ? window.innerHeight : (scroller?.clientHeight || 0);
    
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

    const originalTransforms = cards.map(c => c.style.transform);
    cards.forEach(c => c.style.transform = 'none');

    cardOffsetsRef.current = cards.map(c => {
      if (useWindowScroll) {
        return c.getBoundingClientRect().top + window.scrollY;
      }
      return c.offsetTop;
    });

    const endElement = useWindowScroll
      ? (document.querySelector('.scroll-stack-end') as HTMLElement)
      : scroller?.querySelector('.scroll-stack-end') as HTMLElement;
    
    if (endElement) {
      if (useWindowScroll) {
        endOffsetRef.current = endElement.getBoundingClientRect().top + window.scrollY;
      } else {
        endOffsetRef.current = endElement.offsetTop;
      }
    }

    cards.forEach((c, i) => c.style.transform = originalTransforms[i]);
    lastScrollTopRef.current = -1;
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
      if (!card.style.transform) card.style.transform = 'translate3d(0,0,0)';
    });

    updateOffsets();

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateOffsets);

    return () => {
      scroller.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateOffsets);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
    };
  }, [
    itemDistance,
    useWindowScroll,
    handleScroll,
    updateOffsets
  ]);

  useEffect(() => {
    if (!isMobile) return;
    const cards = cardsRef.current;
    cards.forEach(card => {
      card.style.willChange = 'transform';
    });
    return () => {
      cards.forEach(card => {
        card.style.willChange = '';
      });
    };
  }, [isMobile]);

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
