import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageDropdown } from './LanguageDropdown';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { developerInfo } from '@/data/developer';
import { cn } from '@/lib/utils';

/**
 * Main header component with scroll-aware styling
 * Transparent on hero section, solid when scrolled
 * Mobile responsive with hamburger menu
 */
export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Header is transparent only on homepage hero when not scrolled
  const isTransparent = location.pathname === '/' && !isScrolled;

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.portfolio'), path: '/portfolio' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-card/95 backdrop-blur-xl border-b border-border shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              'text-base font-semibold tracking-wide transition-all duration-300',
              isTransparent
                ? 'text-foreground hover:text-primary'
                : 'text-foreground hover:text-primary'
            )}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:inline"
            >
              {developerInfo.name}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:hidden"
            >
              Camilo Lagos
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'relative text-sm font-medium tracking-wide transition-all duration-300 px-3 py-1.5 rounded-lg',
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Language + Theme aligned */}
            <div className="flex items-center gap-1 ml-4 pl-4 border-l border-border/50">
              <LanguageDropdown isTransparent={isTransparent} />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-1">
            <LanguageDropdown isTransparent={isTransparent} />
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 text-foreground hover:bg-muted"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <nav className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'text-lg font-light tracking-wide transition-colors',
                        location.pathname === link.path
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
