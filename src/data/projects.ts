import type { Project, ProjectCategory } from '@/types';
import dungeonEscapeImg from '@/assets/dungeon-escape.png';
import ecommerceImg from '@/assets/ecommerce.png';
import promediosUnalImg from '@/assets/promedios-unal.jpg';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Ecommerce',
    category: 'web',
    description: 'A complete e-commerce web application built with JavaScript. Features include product catalog, shopping cart, and user management. Available as a web app and mobile application on Google Play.',
    descriptionEs: 'Una aplicación web de comercio electrónico completa construida con JavaScript. Incluye catálogo de productos, carrito de compras y gestión de usuarios. Disponible como aplicación web y móvil en Google Play.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    repoUrl: 'https://github.com/its-camilo/ecommerce',
    playStoreUrl: 'https://play.google.com/store',
    coverImage: ecommerceImg,
    slug: 'ecommerce'
  },
  {
    id: '2',
    title: 'Mars Marine',
    category: 'videogames',
    description: 'The red planet is unforgiving, and the alien threat never stops. How long can you survive? Made with Unreal Engine.',
    descriptionEs: 'El planeta rojo es implacable, y la amenaza alienígena nunca se detiene. ¿Cuánto tiempo puedes sobrevivir? Hecho con Unreal Engine.',
    technologies: ['Unreal Engine', 'C++'],
    repoUrl: 'https://github.com/its-camilo/mars-marine',
    coverImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop',
    slug: 'mars-marine'
  },
  {
    id: '3',
    title: 'MoodPress',
    category: 'wellness',
    description: 'A wellness application for daily mood tracking that identifies patterns and provides personalized mental health tips. Made as a team project with C#.',
    descriptionEs: 'Una aplicación de bienestar para el seguimiento diario del estado de ánimo que identifica patrones y proporciona consejos personalizados de salud mental. Hecho como proyecto en equipo con C#.',
    technologies: ['C#', '.NET'],
    repoUrl: 'https://github.com/its-camilo/moodpress',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    slug: 'moodpress'
  },
  {
    id: '4',
    title: 'Schedule Generator',
    titleEs: 'Generador de Horarios',
    category: 'web',
    description: 'A single-page web application designed to help university students generate personalized schedules based on their courses, groups, and priorities. Everything runs in the browser, no installation or accounts required.',
    descriptionEs: 'Una aplicación web de página única diseñada para ayudar a estudiantes universitarios a generar horarios personalizados basados en sus cursos, grupos y prioridades. Todo funciona en el navegador, sin instalación ni cuentas requeridas.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    repoUrl: 'https://github.com/its-camilo/schedule-generator',
    coverImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    slug: 'schedule-generator'
  },
  {
    id: '5',
    title: 'Dungeon Escape',
    category: 'videogames',
    description: 'Can you defeat the monsters, collect the diamonds, and escape before it\'s too late? The dungeon awaits! Made with Unity and C#.',
    descriptionEs: '¿Puedes derrotar a los monstruos, recolectar los diamantes y escapar antes de que sea demasiado tarde? ¡La mazmorra te espera! Hecho con Unity y C#.',
    technologies: ['Unity', 'C#'],
    repoUrl: 'https://github.com/its-camilo/dungeon-escape',
    coverImage: dungeonEscapeImg,
    slug: 'dungeon-escape'
  },
  {
    id: '6',
    title: 'Space Shooter Pro',
    category: 'videogames',
    description: 'In this exciting game, eliminate your alien rivals while moving through space and avoiding dangers. Made with Unity and C#.',
    descriptionEs: 'En este emocionante juego, elimina a tus rivales alienígenas mientras te mueves por el espacio y evitas peligros. Hecho con Unity y C#.',
    technologies: ['Unity', 'C#'],
    repoUrl: 'https://github.com/its-camilo/space-shooter-pro',
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop',
    slug: 'space-shooter-pro'
  },
  {
    id: '7',
    title: 'Promedios Universidad Nacional',
    titleEs: 'Promedios Universidad Nacional',
    category: 'web',
    description: 'A website designed to help students calculate their grades, built with only JavaScript, CSS, and HTML.',
    descriptionEs: 'Un sitio web diseñado para ayudar a los estudiantes a calcular sus notas, construido solo con JavaScript, CSS y HTML.',
    technologies: ['JavaScript', 'CSS', 'HTML'],
    repoUrl: 'https://github.com/its-camilo/promedios-unal',
    coverImage: promediosUnalImg,
    slug: 'promedios-unal'
  },
  {
    id: '8',
    title: 'Clock',
    titleEs: 'Reloj',
    category: 'iot',
    description: 'A clock and temperature and humidity sensor that sends the data to ThingSpeak and can be controlled through buttons or a web terminal. Made with C++.',
    descriptionEs: 'Un reloj y sensor de temperatura y humedad que envía los datos a ThingSpeak y puede ser controlado mediante botones o una terminal web. Hecho con C++.',
    technologies: ['C++', 'Arduino', 'ThingSpeak'],
    repoUrl: 'https://github.com/its-camilo/clock',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    hoverImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524567248408-cbfd37e65e2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=600&fit=crop'
    ],
    slug: 'clock'
  },
  {
    id: '9',
    title: 'The Great Fleece',
    category: 'videogames',
    description: 'Darren, can you go unnoticed and reach the vault? A stealth game where you must avoid security cameras and guards. Made with Unity and C#.',
    descriptionEs: 'Darren, ¿puedes pasar desapercibido y llegar a la bóveda? Un juego de sigilo donde debes evitar cámaras de seguridad y guardias. Hecho con Unity y C#.',
    technologies: ['Unity', 'C#', 'GitHub'],
    repoUrl: 'https://github.com/its-camilo/the-great-fleece',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    slug: 'the-great-fleece'
  }
];

// Category labels for UI (used as fallback, prefer translations)
export const categoryLabels: Record<ProjectCategory, string> = {
  videogames: 'Video Games',
  web: 'Web Apps',
  wellness: 'Apps',
  iot: 'IoT / Hardware'
};

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Get all unique categories
export const getCategories = (): ProjectCategory[] => {
  return [...new Set(projects.map(p => p.category))];
};

// Get localized project title
export const getLocalizedTitle = (project: Project, language: 'en' | 'es'): string => {
  if (language === 'es' && project.titleEs) {
    return project.titleEs;
  }
  return project.title;
};

// Get localized project description
export const getLocalizedDescription = (project: Project, language: 'en' | 'es'): string => {
  if (language === 'es' && project.descriptionEs) {
    return project.descriptionEs;
  }
  return project.description;
};
