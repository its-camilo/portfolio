import { useState, useMemo, useEffect, useRef } from 'react';
import { projects, getCategories, getProjectsByCategory } from '@/data/projects';
import { useLanguage } from '@/contexts/LanguageContext';
import { CategoryFilter } from '@/components/portfolio/CategoryFilter';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Portfolio page with category filters and project grid
 */
export default function Portfolio() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLElement>(null);
  const categories = getCategories();

  // Detect when the category filter becomes sticky
  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const { top } = stickyRef.current.getBoundingClientRect();
        // 64 is the height of header (4rem). We use 65 to add a small buffer/tolerance.
        // When it hits the sticky position, top will be fixed at 64.
        setIsSticky(top <= 65);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const filteredProjects = useMemo(() => {
    return getProjectsByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <>
      <SEOHead 
        title={t('portfolio.subtitle')}
        description="Browse my complete portfolio featuring video games, web applications, wellness apps, and IoT projects."
      />
      
      <div className="min-h-screen relative">
        {/* Global Mesh Background */}
        <div className="fixed inset-0 bg-mesh -z-10" />
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                {t('portfolio.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
                {t('portfolio.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section 
          ref={stickyRef}
          className={`py-3 px-6 lg:px-8 sticky top-16 z-40 transition-all duration-300 ${
            isSticky ? 'glass border-b border-border/50' : 'bg-transparent'
          }`}
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </section>

        {/* Projects Grid */}
        <section className="py-12 md:py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground font-light">
                  {t('portfolio.noProjects')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-12" />
      </div>
    </>
  );
}
