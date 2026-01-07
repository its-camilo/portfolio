import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { TechBadge } from '@/components/ui/TechBadge';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectBySlug, getLocalizedTitle, getLocalizedDescription } from '@/data/projects';

/**
 * Project detail page with project info and links
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // 404 if project not found
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const title = getLocalizedTitle(project, language);
  const description = getLocalizedDescription(project, language);
  const categoryKey = `category.${project.category}` as const;

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

            {/* Project Image - Between Description and Technologies */}
            <motion.div
              className={`relative w-full overflow-hidden rounded-xl bg-muted ${getAspectRatioClass()}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={project.coverImage}
                alt={title}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
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
