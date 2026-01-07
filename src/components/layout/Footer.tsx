import { Github, Linkedin, ExternalLink, FileText, Gamepad2 } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Minimal footer component with social links and copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const socialLinks = [
    {
      href: developerInfo.socialLinks.github,
      icon: Github,
      label: 'GitHub',
      show: !!developerInfo.socialLinks.github
    },
    {
      href: developerInfo.cvUrl,
      icon: FileText,
      label: t('common.viewCV'),
      show: !!developerInfo.cvUrl && developerInfo.cvUrl !== '#'
    },
    {
      href: developerInfo.socialLinks.linkedin,
      icon: ExternalLink,
      label: 'LinkedIn',
      show: !!developerInfo.socialLinks.linkedin
    },
    {
      href: developerInfo.socialLinks.itchio,
      icon: Gamepad2,
      label: 'Itch.io',
      show: !!developerInfo.socialLinks.itchio
    },
    {
      href: developerInfo.socialLinks.googlePlay,
      icon: ExternalLink,
      label: 'Google Play',
      show: !!developerInfo.socialLinks.googlePlay
    }
  ];

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            © {currentYear} {developerInfo.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.filter(link => link.show).map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all"
                aria-label={link.label}
              >
                <link.icon className="size-4" />
                <span className="text-sm font-light">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
