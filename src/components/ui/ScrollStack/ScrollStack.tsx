import React, { useLayoutEffect, useRef } from 'react';
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

/**
 * ScrollStack — cards that pin and stack as user scrolls.
 *
 * Uses CSS `position: sticky` for the pinning effect (compositor-driven,
 * zero jitter). A lightweight scroll listener only toggles a CSS class
 * for the scale-down transition on stacked cards — no per-frame
 * transform computation from JS.
 */
const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemStackDistance = 30,
  stackPosition = '20%',
  useWindowScroll = false,
  onStackComplete,
  // Preserved in interface for API compat; not used in sticky approach
  itemScale: _itemScale,
  scaleEndPosition: _scaleEndPosition,
  baseScale: _baseScale,
  scaleDuration: _scaleDuration,
  rotationAmount: _rotationAmount,
  blurAmount: _blurAmount,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    if (isMobile) return;

    const container = scrollerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];
    if (!cards.length) return;

    // --- Compute sticky top values ---
    const vh = window.innerHeight;
    const stickyTopBase =
      typeof stackPosition === 'string' && stackPosition.includes('%')
        ? (parseFloat(stackPosition) / 100) * vh
        : parseFloat(stackPosition as string);

    // Apply sticky positioning (compositor-driven — no jitter)
    cards.forEach((card, i) => {
      const stickyTop = Math.round(stickyTopBase + i * itemStackDistance);
      card.style.position = 'sticky';
      card.style.top = `${stickyTop}px`;
      card.style.zIndex = String(i + 1);
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    // --- Lightweight scroll listener: only toggles CSS classes ---
    // No transform manipulation from JS — scale is a CSS transition.
    let ticking = false;
    let completedFired = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        // Toggle "stacked" class on cards that have a card on top of them
        for (let i = 0; i < cards.length - 1; i++) {
          const nextCard = cards[i + 1];
          const nextStickyTop = Math.round(
            stickyTopBase + (i + 1) * itemStackDistance
          );
          const nextRect = nextCard.getBoundingClientRect();

          // Next card is at (or past) its sticky position → current card is stacked
          if (nextRect.top <= nextStickyTop + 2) {
            cards[i].classList.add('scroll-stack-stacked');
          } else {
            cards[i].classList.remove('scroll-stack-stacked');
          }
        }

        // onStackComplete callback — fire when last card is sticky
        if (onStackComplete && cards.length > 1) {
          const lastCard = cards[cards.length - 1];
          const lastStickyTop = Math.round(
            stickyTopBase + (cards.length - 1) * itemStackDistance
          );
          const lastRect = lastCard.getBoundingClientRect();
          const isSticky = lastRect.top <= lastStickyTop + 2;

          if (isSticky && !completedFired) {
            completedFired = true;
            onStackComplete();
          } else if (!isSticky && completedFired) {
            completedFired = false;
          }
        }

        ticking = false;
      });
    };

    const scrollTarget = useWindowScroll ? window : container;
    scrollTarget.addEventListener('scroll', onScroll, { passive: true });

    // Initial evaluation
    onScroll();

    // Recalculate sticky tops on resize (width changes only)
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      const newVh = window.innerHeight;
      const newBase =
        typeof stackPosition === 'string' && stackPosition.includes('%')
          ? (parseFloat(stackPosition) / 100) * newVh
          : parseFloat(stackPosition as string);

      cards.forEach((card, i) => {
        card.style.top = `${Math.round(newBase + i * itemStackDistance)}px`;
      });
    };
    window.addEventListener('resize', onResize);

    return () => {
      scrollTarget.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobile, itemDistance, itemStackDistance, stackPosition, useWindowScroll, onStackComplete]);

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
