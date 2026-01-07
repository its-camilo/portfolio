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
  const currentImage = hasHoverImages && isHovered 
    ? project.hoverImages![currentImageIndex] 
    : project.coverImage;

  // Carousel effect on hover for projects with hoverImages
  useEffect(() => {
    if (isHovered && hasHoverImages) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => 
          (prev + 1) % project.hoverImages!.length
        );
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block relative overflow-hidden rounded-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className={cn('relative overflow-hidden bg-muted', aspectRatioClasses[ratio])}>
          {/* Loading placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-muted" />
          )}
          
          <motion.img
            key={currentImage}
            src={currentImage}
            alt={project.title}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700',
              isLoaded ? 'opacity-100' : 'opacity-0',
              'group-hover:scale-110'
            )}
            initial={hasHoverImages && isHovered ? { opacity: 0 } : false}
            animate={hasHoverImages && isHovered ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            loading={index < 6 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Overlay with gradient and text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
              <h3 className="text-white text-xl md:text-2xl font-light tracking-wide">
                {project.title}
              </h3>
              {showCategory && (
                <div className="flex items-center gap-3 text-sm text-white/80 font-light tracking-wide">
                  <span className="capitalize">{project.category}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
              )}
            </div>
          </div>

          {/* Image indicator dots for carousel */}
          {hasHoverImages && isHovered && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {project.hoverImages!.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    idx === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'
                  )}
                />
              ))}
            </div>
          )}

          {/* Subtle hover border effect */}
          <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}
