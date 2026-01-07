import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { TechBadge } from '@/components/ui/TechBadge';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectBySlug, getLocalizedTitle, getLocalizedDescription } from '@/data/projects';
import { useState, useEffect } from 'react';

/**
 * Project detail page with project info and links
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // 404 if project not found
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const title = getLocalizedTitle(project, language);
  const description = getLocalizedDescription(project, language);
  const categoryKey = `category.${project.category}` as const;

  // Check if project has multiple images
  const hasMultipleImages = project.hoverImages && project.hoverImages.length > 1;
  const images = hasMultipleImages ? project.hoverImages! : [project.coverImage];

  // Auto-advance carousel only when hovering
  useEffect(() => {
    if (!hasMultipleImages || !isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length, isHovering]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Map aspectRatio to CSS class
  const getAspectRatioClass = () => {
    switch (project.aspectRatio) {
      case 'portrait':
        return 'aspect-[3/4]';
      case 'square':
        return 'aspect-square';
      case 'landscape':
      default:
        return 'aspect-video';
    }
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        image={project.coverImage}
        type="article"
      />
      
      <div className="min-h-screen pt-24">
        {/* Project Info Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Back link */}
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span className="text-sm font-light">
                {language === 'es' ? 'Volver a Proyectos' : 'Back to Projects'}
              </span>
            </Link>

            {/* Title and Category */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                {t(categoryKey)}
              </p>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">
                {description}
              </p>
            </div>

            {/* Project Image Carousel */}
            <motion.div
              className={`relative w-full overflow-hidden rounded-xl bg-muted ${getAspectRatioClass()}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`${title} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 1.5px 1.5px 0 rgba(255,255,255,0.18)'
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-5 text-white" style={{ filter: 'drop-shadow(1px 0 0 rgba(0,0,0,0.8)) drop-shadow(-1px 0 0 rgba(0,0,0,0.8)) drop-shadow(0 1px 0 rgba(0,0,0,0.8)) drop-shadow(0 -1px 0 rgba(0,0,0,0.8))' }} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 1.5px 1.5px 0 rgba(255,255,255,0.18)'
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-5 text-white" style={{ filter: 'drop-shadow(1px 0 0 rgba(0,0,0,0.8)) drop-shadow(-1px 0 0 rgba(0,0,0,0.8)) drop-shadow(0 1px 0 rgba(0,0,0,0.8)) drop-shadow(0 -1px 0 rgba(0,0,0,0.8))' }} />
                  </button>
                </>
              )}

              {/* Indicator Dots */}
              {hasMultipleImages && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-white w-4'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Technologies */}
            <div className="space-y-4">
              <h2 className="text-lg font-light tracking-wide">
                {t('about.technologies')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-light transition-all duration-300 hover:scale-105"
                  style={{
                    color: 'rgba(255,255,255,0.95)',
                    background: 'rgba(60,60,60,0.35)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 0.5px 0 0 rgba(255,255,255,0.15) inset, 0 4px 16px rgba(0,0,0,0.15)',
                    border: '0.5px solid rgba(255,255,255,0.18)'
                  }}
                >
                  <Github className="size-5" />
                  {language === 'es' ? 'Ver Repositorio' : 'View Repository'}
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-light transition-all duration-300 hover:scale-105"
                  style={{
                    color: 'rgba(255,255,255,0.95)',
                    background: 'rgba(60,60,60,0.35)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 0.5px 0 0 rgba(255,255,255,0.15) inset, 0 4px 16px rgba(0,0,0,0.15)',
                    border: '0.5px solid rgba(255,255,255,0.18)'
                  }}
                >
                  <ExternalLink className="size-5" />
                  {language === 'es' ? 'Ver en Vivo' : 'View Live'}
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-light transition-all duration-300 hover:scale-105"
                  style={{
                    color: 'rgba(255,255,255,0.95)',
                    background: 'rgba(60,60,60,0.35)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 0.5px 0 0 rgba(255,255,255,0.15) inset, 0 4px 16px rgba(0,0,0,0.15)',
                    border: '0.5px solid rgba(255,255,255,0.18)'
                  }}
                >
                  <ExternalLink className="size-5" />
                  Google Play
                </a>
              )}
              {project.itchUrl && (
                <a
                  href={project.itchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-light transition-all duration-300 hover:scale-105"
                  style={{
                    color: 'rgba(255,255,255,0.95)',
                    background: 'rgba(60,60,60,0.35)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 0.5px 0 0 rgba(255,255,255,0.15) inset, 0 4px 16px rgba(0,0,0,0.15)',
                    border: '0.5px solid rgba(255,255,255,0.18)'
                  }}
                >
                  <ExternalLink className="size-5" />
                  Itch.io
                </a>
              )}
            </div>
          </motion.div>
        </section>

        {/* Bottom spacing */}
        <div className="h-24" />
      </div>
    </>
  );
}
