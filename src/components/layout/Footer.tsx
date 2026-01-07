import { Github, Linkedin, ExternalLink, FileText, Gamepad2 } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

/**
 * Apple-inspired minimal footer
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const {
    t
  } = useLanguage();
  const socialLinks = [{
    href: developerInfo.socialLinks.github,
    icon: Github,
    label: 'GitHub',
    show: !!developerInfo.socialLinks.github
  }, {
    href: developerInfo.socialLinks.linkedin,
    icon: Linkedin,
    label: 'LinkedIn',
    show: !!developerInfo.socialLinks.linkedin
  }, {
    href: developerInfo.socialLinks.itchio,
    icon: Gamepad2,
    label: 'Itch.io',
    show: !!developerInfo.socialLinks.itchio
  }];
  const footerLinks = [{
    name: t('nav.portfolio'),
    path: '/portfolio'
  }, {
    name: t('nav.about'),
    path: '/about'
  }, {
    name: t('nav.contact'),
    path: '/contact'
  }];
  return <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {developerInfo.name.split(' ')[0]}
              <span className="text-primary"></span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('developer.title')}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map(link => <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  {link.name}
                </Link>)}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-2">
              {socialLinks.filter(link => link.show).map((link, index) => <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="size-10 rounded-full flex items-center justify-center text-muted-foreground backdrop-blur-xl bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/30 hover:text-primary hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300" aria-label={link.label}>
                  <link.icon className="size-4" />
                </a>)}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {developerInfo.name}. All rights reserved.
          </p>
          {developerInfo.cvUrl && developerInfo.cvUrl !== '#' && <a href={developerInfo.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300">
              <FileText className="size-4" />
              <span>{t('common.viewCV')}</span>
            </a>}
        </div>
      </div>
    </footer>;
}