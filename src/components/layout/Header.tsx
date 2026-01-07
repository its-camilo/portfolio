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
 * Apple-inspired header with glass effect and smooth transitions
 */
export function Header() {
  const location = useLocation();
  const {
    isScrolled
  } = useScrollPosition();
  const {
    t
  } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTransparent = location.pathname === '/' && !isScrolled;
  const navLinks = [{
    name: t('nav.home'),
    path: '/'
  }, {
    name: t('nav.portfolio'),
    path: '/portfolio'
  }, {
    name: t('nav.about'),
    path: '/about'
  }, {
    name: t('nav.contact'),
    path: '/contact'
  }];
  return <motion.header initial={{
    y: -100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94]
  }} className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-500', isScrolled ? 'glass border-b border-border/50 shadow-sm' : 'bg-transparent')}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-base font-semibold tracking-tight text-foreground hover:text-primary transition-colors duration-300">
            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => <motion.div key={link.path} initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.4,
            delay: 0.1 * index
          }}>
                <Link to={link.path} className={cn('relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full', location.pathname === link.path ? 'text-primary bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                  {link.name}
                </Link>
              </motion.div>)}
            
            {/* Divider + Controls */}
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
                <Button variant="ghost" size="icon" className="size-9 rounded-full text-foreground hover:bg-muted" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-background/95 backdrop-blur-xl">
                <nav className="flex flex-col gap-2 mt-8">
                  {navLinks.map(link => <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className={cn('px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300', location.pathname === link.path ? 'text-primary bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                      {link.name}
                    </Link>)}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>;
}