import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Home page
    'home.aboutMe': 'About Me',
    'home.learnMore': 'Learn More',
    'home.technologies': 'Technologies',
    'home.featuredProjects': 'Featured Projects',
    'home.selectionOfWork': 'A selection of recent work',
    'home.viewAllProjects': 'View All Projects',
    
    // Portfolio page
    'portfolio.title': 'Projects',
    'portfolio.subtitle': 'Portfolio',
    'portfolio.all': 'All',
    
    // Categories
    'category.all': 'All',
    'category.web': 'Web Apps',
    'category.videogames': 'Video Games',
    'category.wellness': 'Apps',
    'category.iot': 'IoT / Hardware',
    
    // About page
    'about.title': 'About',
    'about.skills': 'Skills',
    'about.technologies': 'Technologies',
    'about.education': 'Education',
    'about.university': 'University',
    'about.location': 'Location',
    
    // Contact page
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in Touch',
    'contact.description': "Have a project in mind or just want to say hello? I'd love to hear from you.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully!',
    'contact.socialLinks': 'Social Links',
    
    // Common
    'common.repo': 'Repo',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.portfolio': 'Portafolio',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    
    // Home page
    'home.aboutMe': 'Sobre mí',
    'home.learnMore': 'Conocer más',
    'home.technologies': 'Tecnologías',
    'home.featuredProjects': 'Proyectos Destacados',
    'home.selectionOfWork': 'Una selección de trabajos recientes',
    'home.viewAllProjects': 'Ver Todos los Proyectos',
    
    // Portfolio page
    'portfolio.title': 'Proyectos',
    'portfolio.subtitle': 'Portafolio',
    'portfolio.all': 'Todos',
    
    // Categories
    'category.all': 'Todos',
    'category.web': 'Web Apps',
    'category.videogames': 'Videojuegos',
    'category.wellness': 'Apps',
    'category.iot': 'IoT / Hardware',
    
    // About page
    'about.title': 'Sobre mí',
    'about.skills': 'Habilidades',
    'about.technologies': 'Tecnologías',
    'about.education': 'Educación',
    'about.university': 'Universidad',
    'about.location': 'Ubicación',
    
    // Contact page
    'contact.title': 'Contacto',
    'contact.subtitle': 'Ponte en Contacto',
    'contact.description': '¿Tienes un proyecto en mente o simplemente quieres saludar? Me encantaría saber de ti.',
    'contact.name': 'Nombre',
    'contact.email': 'Correo electrónico',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': '¡Mensaje enviado exitosamente!',
    'contact.socialLinks': 'Redes Sociales',
    
    // Common
    'common.repo': 'Repo',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
