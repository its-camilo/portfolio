import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { ContactForm } from '@/components/forms/ContactForm';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

/**
 * Contact page with form and social links
 */
export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact"
        description={`Get in touch with ${developerInfo.name} for collaboration opportunities and project inquiries.`}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                Let's work together on your next project
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                    Send a Message
                  </h2>
                  <p className="text-muted-foreground font-light">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <ContactForm />
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                    Connect With Me
                  </h2>
                  <p className="text-muted-foreground font-light">
                    Find me on these platforms or reach out directly.
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
                        Email
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
                        Location
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
                  <h3 className="text-lg font-light tracking-wide">Social Links</h3>
                  <div className="flex flex-wrap gap-3">
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
                    {developerInfo.socialLinks.linktree && (
                      <a
                        href={developerInfo.socialLinks.linktree}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:bg-accent transition-colors text-sm font-light"
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
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:bg-accent transition-colors text-sm font-light"
                      >
                        <ExternalLink className="size-4" />
                        Google Play
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-16" />
      </div>
    </>
  );
}
