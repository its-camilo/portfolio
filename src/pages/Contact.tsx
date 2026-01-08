import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, ExternalLink, FileText } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

/**
 * Contact page with social links
 */
export default function Contact() {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead
        title={t('contact.title')}
        description={`Get in touch with ${developerInfo.name} for collaboration opportunities and project inquiries.`}
      />
      
      <div className="min-h-screen relative">
        {/* Global Mesh Background */}
        <div className="fixed inset-0 bg-mesh -z-10" />
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                {t('contact.subtitle')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                {t('contact.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                    {t('contact.socialLinks')}
                  </h2>
                  <p className="text-muted-foreground font-light">
                    {t('contact.findMe')}
                  </p>
                </div>

                <Separator />

                {/* Contact Details */}
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm bg-accent">
                      <Mail className="size-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-light tracking-wide text-muted-foreground">
                        {t('contact.email')}
                      </p>
                      <a
                        href={`mailto:${developerInfo.email}`}
                        className="text-base md:text-lg font-light hover:text-muted-foreground transition-colors"
                      >
                        {developerInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm bg-accent">
                      <MapPin className="size-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-light tracking-wide text-muted-foreground">
                        {t('about.location')}
                      </p>
                      <p className="text-base md:text-lg font-light">
                        {developerInfo.location}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-light tracking-wide">{t('contact.socialLinks')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {developerInfo.socialLinks.github && (
                      <a
                        href={developerInfo.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-light backdrop-blur-xl bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
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
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-light backdrop-blur-xl bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
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
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-light backdrop-blur-xl bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
                      >
                        <ExternalLink className="size-4" />
                        Itch.io
                      </a>
                    )}
                    {developerInfo.socialLinks.linktree && (
                      <a
                        href={developerInfo.socialLinks.linktree}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-light backdrop-blur-xl bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
                      >
                        <ExternalLink className="size-4" />
                        Linktree
                      </a>
                    )}
                    {developerInfo.socialLinks.googlePlay && (
                      <a
                        href={developerInfo.socialLinks.googlePlay}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-light backdrop-blur-xl bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
                      >
                        <ExternalLink className="size-4" />
                        Google Play
                      </a>
                    )}
                    {developerInfo.cvUrl && (
                      <button
                        onClick={() => window.open(developerInfo.cvUrl, '_blank', 'noopener,noreferrer')}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-light backdrop-blur-xl bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"
                      >
                        <FileText className="size-4" />
                        {t('about.viewCV')}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </>
  );
}
