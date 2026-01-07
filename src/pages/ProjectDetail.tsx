import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  // Auto-advance carousel always
  useEffect(() => {
    if (!hasMultipleImages) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

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
      
      <div className="min-h-screen pt-8">
        {/* Project Info Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-6 md:py-8">
          <motion.div
            className="space-y-4"
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
            <div className="space-y-4">
              <div className="relative w-1/3">
                <div className="overflow-hidden rounded-xl bg-muted">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${title} - ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows - Outside image */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 1.5px 1.5px 0 rgba(255,255,255,0.18)',
                        border: '1px solid rgba(255, 255, 255, 0.18)'
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="size-5 text-foreground" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 hover:scale-110"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 1.5px 1.5px 0 rgba(255,255,255,0.18)',
                        border: '1px solid rgba(255, 255, 255, 0.18)'
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight className="size-5 text-foreground" />
                    </button>
                  </>
                )}
              </div>

              {/* Indicator Dots - Centered on page */}
              {hasMultipleImages && (
                <div className="flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-foreground w-4'
                          : 'bg-muted-foreground/50 hover:bg-muted-foreground/70 w-2'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

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
        <div className="h-12" />
      </div>
    </>
  );
}
