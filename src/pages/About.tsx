import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, FileText } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { useLanguage } from '@/contexts/LanguageContext';
import { TechBadge } from '@/components/ui/TechBadge';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

/**
 * About page with developer biography and skills
 */
export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title={t('about.title')}
        description={`Learn about ${developerInfo.name}, ${developerInfo.title}. ${developerInfo.biography.split('\n\n')[0]}`}
        image={developerInfo.portraitImage}
      />
      
      <div className="min-h-screen relative">
        {/* Global Mesh Background */}
        <div className="fixed inset-0 bg-mesh -z-10" />
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                {t('about.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                {t('developer.title')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portrait and Biography - Split Layout */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Portrait Image */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted">
                  <img
                    src={developerInfo.portraitImage}
                    alt={developerInfo.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                
                {/* Social Links */}
                <div className="flex flex-wrap items-center gap-3">
                  {developerInfo.socialLinks.github && (
                    <a
                      href={developerInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:bg-accent transition-colors text-sm font-light"
                    >
                      <Github className="size-4" />
                      GitHub
                    </a>
                  )}
                  {developerInfo.socialLinks.linkedin && (
                    <a
                      href={developerInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:bg-accent transition-colors text-sm font-light"
                    >
                      <Linkedin className="size-4" />
                      LinkedIn
                    </a>
                  )}
                  {developerInfo.socialLinks.itchio && (
                    <a
                      href={developerInfo.socialLinks.itchio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:bg-accent transition-colors text-sm font-light"
                    >
                      <ExternalLink className="size-4" />
                      Itch.io
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Biography and Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Name and Title */}
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                    {developerInfo.name}
                  </h2>
                  <p className="text-lg text-muted-foreground font-light tracking-wide">
                    {t('developer.title')}
                  </p>
                </div>

                <Separator />

                {/* Biography */}
                <div className="space-y-4">
                  {t('developer.biography').split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <Separator />

                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="text-lg font-light tracking-wide">{t('about.skills')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {['developer.skills.gameDev', 'developer.skills.webDev', 'developer.skills.designPatterns', 'developer.skills.oop', 'developer.skills.fullstack'].map((skillKey) => (
                      <TechBadge key={skillKey} name={t(skillKey)} variant="outline" size="sm" />
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-4">
                  <h3 className="text-lg font-light tracking-wide">{t('about.technologies')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {developerInfo.technologies.map((tech) => (
                      <TechBadge key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="pt-4 space-y-2">
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">{t('about.education')}: </span>
                    <span className="text-foreground">
                      {t('developer.education.degree')}
                    </span>
                  </div>
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">{t('about.university')}: </span>
                    <span className="text-foreground">
                      {t('developer.education.university')}
                    </span>
                  </div>
                  <div className="text-sm font-light tracking-wide">
                    <span className="text-muted-foreground">{t('about.location')}: </span>
                    <span className="text-foreground">{developerInfo.location}</span>
                  </div>
                </div>

                {/* CV Button */}
                {developerInfo.cvUrl && (
                  <div className="pt-4">
                    <a
                      href={developerInfo.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-sm hover:bg-accent transition-colors font-light"
                    >
                      <FileText className="size-5" />
                      {t('about.viewCV')}
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
