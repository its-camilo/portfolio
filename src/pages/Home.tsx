import { motion } from 'framer-motion';
import { developerInfo } from '@/data/developer';
import { getFeaturedProjects } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TechBadge } from '@/components/ui/TechBadge';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Github, Linkedin, FileText, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Homepage with Apple-inspired design - Hero, Technologies, Featured Projects
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
        {/* Hero Section - Apple Style */}
        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-mesh" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
          
          {/* Floating Orbs - Decorative */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
            animate={{ 
              x: [0, -20, 0],
              y: [0, 30, 0],
              scale: [1.1, 1, 1.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Hero Content */}
          <div className="relative z-10 px-6 py-32 max-w-4xl mx-auto text-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border"
              >
                <Sparkles className="size-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{t('developer.title')}</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="block">{developerInfo.name.split(' ')[0]}</span>
                <span className="block gradient-text">{developerInfo.name.split(' ').slice(1).join(' ')}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl font-normal text-muted-foreground max-w-2xl mx-auto text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('developer.education.university')} • {t('developer.education.degree')}
              </motion.p>

              {/* CTA Buttons - Apple Style */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {developerInfo.cvUrl && (
                  <a
                    href={developerInfo.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-btn inline-flex items-center gap-2"
                  >
                    <FileText className="size-4" />
                    {t('common.viewCV')}
                  </a>
                )}
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card hover:bg-accent text-foreground font-medium transition-all duration-300 hover:border-primary/50"
                >
                  {t('home.viewAllProjects')}
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>

              {/* Social Links - Minimal Pills */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-3 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {developerInfo.socialLinks.github && (
                  <a
                    href={developerInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-300 text-sm font-medium"
                  >
                    <Github className="size-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {developerInfo.socialLinks.linkedin && (
                  <a
                    href={developerInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-300 text-sm font-medium"
                  >
                    <Linkedin className="size-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {developerInfo.socialLinks.itchio && (
                  <a
                    href={developerInfo.socialLinks.itchio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-300 text-sm font-medium"
                  >
                    <ExternalLink className="size-4" />
                    <span>Itch.io</span>
                  </a>
                )}
                {developerInfo.socialLinks.googlePlay && (
                  <a
                    href={developerInfo.socialLinks.googlePlay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-300 text-sm font-medium"
                  >
                    <ExternalLink className="size-4" />
                    <span>Google Play</span>
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* About Section - Clean & Minimal */}
        <section className="py-32 md:py-40 px-6 lg:px-8 bg-background">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                  {t('home.aboutMe')}
                </h2>
                <p className="text-lg md:text-xl font-normal leading-relaxed text-muted-foreground text-balance">
                  {t('developer.biography').split('\n\n')[0]}
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
                >
                  <span>{t('home.learnMore')}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Technologies Section - Grid of Pills */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <ScrollReveal>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  {t('home.technologies')}
                </h2>
                <p className="text-muted-foreground">Tools & technologies I work with</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3">
                {developerInfo.technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    viewport={{ once: true }}
                  >
                    <TechBadge name={tech} size="md" />
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-32 md:py-40 bg-background">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                {t('home.featuredProjects')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                {t('home.selectionOfWork')}
              </p>
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                />
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-3 apple-btn"
              >
                <span>{t('home.viewAllProjects')}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}