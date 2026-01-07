import { motion } from 'framer-motion';
import { developerInfo } from '@/data/developer';
import { getFeaturedProjects } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TechBadge } from '@/components/ui/TechBadge';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Github, Linkedin, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Homepage with hero section, technologies, and featured projects
 */
export default function Home() {
  const { t } = useLanguage();
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead 
        title={t('nav.home')}
        description={`${developerInfo.name} - ${developerInfo.title}. ${developerInfo.biography.split('\n\n')[0]}`}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          
          {/* Hero Content */}
          <div className="relative z-10 px-6 py-32 max-w-5xl mx-auto text-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {developerInfo.name}
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl font-light tracking-wide text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('developer.title')}
              </motion.p>

              <motion.p
                className="text-base md:text-lg font-light text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t('developer.education.university')} • {t('developer.education.degree')}
              </motion.p>

              {/* Social Links */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {developerInfo.socialLinks.github && (
                  <a
                    href={developerInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-accent transition-colors text-sm font-light"
                  >
                    <Github className="size-4" />
                    GitHub
                  </a>
                )}
                {developerInfo.cvUrl && (
                  <a
                    href={developerInfo.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-accent transition-colors text-sm font-light"
                  >
                    <FileText className="size-4" />
                    {t('common.viewCV')}
                  </a>
                )}
                {developerInfo.socialLinks.linkedin && (
                  <a
                    href={developerInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-accent transition-colors text-sm font-light"
                  >
                    <Linkedin className="size-4" />
                    LinkedIn
                  </a>
                )}
                {developerInfo.socialLinks.googlePlay && (
                  <a
                    href={developerInfo.socialLinks.googlePlay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-accent transition-colors text-sm font-light"
                  >
                    <ExternalLink className="size-4" />
                    Google Play
                  </a>
                )}
                {developerInfo.socialLinks.linktree && (
                  <a
                    href={developerInfo.socialLinks.linktree}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-accent transition-colors text-sm font-light"
                  >
                    <ExternalLink className="size-4" />
                    Linktree
                  </a>
                )}
                {developerInfo.socialLinks.itchio && (
                  <a
                    href={developerInfo.socialLinks.itchio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-accent transition-colors text-sm font-light"
                  >
                    <ExternalLink className="size-4" />
                    Itch.io
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                  {t('home.aboutMe')}
                </h2>
                <p className="text-lg font-light leading-relaxed text-muted-foreground">
                  {t('developer.biography').split('\n\n')[0]}
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors group"
                >
                  <span>{t('home.learnMore')}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16 md:py-24 px-6 lg:px-8 bg-accent/30">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-8">
                {t('home.technologies')}
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {developerInfo.technologies.map((tech) => (
                  <TechBadge key={tech} name={tech} size="md" />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                {t('home.featuredProjects')}
              </h2>
              <p className="text-lg text-muted-foreground font-light tracking-wide">
                {t('home.selectionOfWork')}
              </p>
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* View All Link */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
              >
                <span>{t('home.viewAllProjects')}</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
