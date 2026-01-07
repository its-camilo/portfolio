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
    'portfolio.description': 'A collection of video games, web applications, and more',
    'portfolio.noProjects': 'No projects found in this category.',
    
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
    'contact.findMe': 'Find me on these platforms or reach out directly.',
    
    // Developer info
    'developer.title': 'Student | Junior Game Developer',
    'developer.biography': 'My name is Camilo. I have experience programming video game mechanics and systems, as well as developing full-stack web applications. I am proficient in using various design patterns, such as the singleton pattern and object-oriented programming.\n\nI am passionate about creating interactive experiences that engage users, whether through immersive video games or intuitive web applications. My background in computer science gives me a solid foundation in algorithms, data structures, and software architecture.',
    
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
    'portfolio.description': 'Una colección de videojuegos, aplicaciones web y más',
    'portfolio.noProjects': 'No se encontraron proyectos en esta categoría.',
    
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
    'contact.findMe': 'Encuéntrame en estas plataformas o contáctame directamente.',
    
    // Developer info
    'developer.title': 'Estudiante | Desarrollador de Videojuegos Junior',
    'developer.biography': 'Mi nombre es Camilo. Tengo experiencia programando mecánicas y sistemas de videojuegos, así como desarrollando aplicaciones web full-stack. Soy competente en el uso de varios patrones de diseño, como el patrón singleton y programación orientada a objetos.\n\nMe apasiona crear experiencias interactivas que involucren a los usuarios, ya sea a través de videojuegos inmersivos o aplicaciones web intuitivas. Mi formación en ciencias de la computación me da una base sólida en algoritmos, estructuras de datos y arquitectura de software.',
    
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
