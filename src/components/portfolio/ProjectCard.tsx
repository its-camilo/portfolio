import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
}

/**
 * Project card component with image, hover overlay, and smooth animations
 * Used in homepage featured projects and portfolio grid
 */
export function ProjectCard({
  project,
  aspectRatio,
  showCategory = true,
  index = 0
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const ratio = aspectRatio || 'landscape';
  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square'
  };
  const hasHoverImages = project.hoverImages && project.hoverImages.length > 1;
  const currentImage = hasHoverImages && isHovered ? project.hoverImages![currentImageIndex] : project.coverImage;

  // Carousel effect on hover for projects with hoverImages
  useEffect(() => {
    if (isHovered && hasHoverImages) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % project.hoverImages!.length);
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImageIndex(0);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, hasHoverImages, project.hoverImages]);
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }} className="group">
      <Link to={`/project/${project.slug}`} className="block relative overflow-hidden rounded-2xl bg-card shadow-md hover:shadow-xl transition-all duration-500" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Image Container */}
        <motion.div className={cn('relative overflow-hidden', aspectRatioClasses[ratio])} whileHover={{
        scale: 1.02
      }} transition={{
        duration: 0.4
      }}>
          {/* Loading placeholder */}
          {!isLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
          
          <motion.img key={currentImage} src={currentImage} alt={project.title} className={cn('absolute inset-0 w-full h-full object-cover', isLoaded ? 'opacity-100' : 'opacity-0')} initial={hasHoverImages && isHovered ? {
          opacity: 0
        } : false} animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isHovered ? 1.1 : 1
        }} transition={{
          duration: 0.6,
          ease: "easeOut"
        }} loading={index < 6 ? 'eager' : 'lazy'} onLoad={() => setIsLoaded(true)} />
          
          {/* Category badge - visible by default, hidden on hover */}
          {showCategory && <motion.div className="absolute top-4 left-4 z-10" initial={{
          opacity: 1,
          y: 0
        }} animate={{
          opacity: isHovered ? 0 : 1,
          y: isHovered ? -10 : 0
        }} transition={{
          duration: 0.3
        }}>
              <span className="capitalize bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                {project.category}
              </span>
            </motion.div>}

          {/* Hover overlay with title only */}
          <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end" initial={{
          opacity: 0
        }} animate={{
          opacity: isHovered ? 1 : 0
        }} transition={{
          duration: 0.4
        }}>
            <motion.div className="p-6 w-full" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0
          }} transition={{
            duration: 0.4,
            delay: 0.1
          }}>
              
            </motion.div>
          </motion.div>

          {/* Image indicator dots for carousel */}
          {hasHoverImages && isHovered && <motion.div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.3,
          delay: 0.2
        }}>
              {project.hoverImages!.map((_, idx) => <motion.div key={idx} className={cn('w-2 h-2 rounded-full transition-all duration-300', idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50')} whileHover={{
            scale: 1.2
          }} />)}
            </motion.div>}
        </motion.div>
        
        {/* Card footer */}
        <motion.div className="p-4 bg-card" whileHover={{
        backgroundColor: 'var(--accent)'
      }} transition={{
        duration: 0.3
      }}>
          <h3 className="text-foreground font-medium tracking-wide group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
        </motion.div>
      </Link>
    </motion.div>;
}