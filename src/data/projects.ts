import type { Project, ProjectCategory } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Ecommerce',
    category: 'web',
    description: 'A complete e-commerce web application built with JavaScript. Features include product catalog, shopping cart, and user management. Available as a web app and mobile application on Google Play.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    repoUrl: 'https://github.com/its-camilo/ecommerce',
    playStoreUrl: 'https://play.google.com/store',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    slug: 'ecommerce'
  },
  {
    id: '2',
    title: 'Mars Marine',
    category: 'videogames',
    description: 'The red planet is unforgiving, and the alien threat never stops. How long can you survive? Made with Unreal Engine.',
    technologies: ['Unreal Engine', 'C++'],
    repoUrl: 'https://github.com/its-camilo/mars-marine',
    coverImage: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop',
    slug: 'mars-marine'
  },
  {
    id: '3',
    title: 'MoodPress',
    category: 'wellness',
    description: 'A wellness application for daily mood tracking that identifies patterns and provides personalized mental health tips. Made as a team project with C#.',
    technologies: ['C#', '.NET'],
    repoUrl: 'https://github.com/its-camilo/moodpress',
    coverImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop',
    slug: 'moodpress'
  },
  {
    id: '4',
    title: 'Schedule Generator',
    category: 'web',
    description: 'A single-page web application designed to help university students generate personalized schedules based on their courses, groups, and priorities. Everything runs in the browser, no installation or accounts required.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    repoUrl: 'https://github.com/its-camilo/schedule-generator',
    coverImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=600&fit=crop',
    slug: 'schedule-generator'
  },
  {
    id: '5',
    title: 'Dungeon Escape',
    category: 'videogames',
    description: 'Can you defeat the monsters, collect the diamonds, and escape before it\'s too late? The dungeon awaits! Made with Unity and C#.',
    technologies: ['Unity', 'C#'],
    repoUrl: 'https://github.com/its-camilo/dungeon-escape',
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
    slug: 'dungeon-escape'
  },
  {
    id: '6',
    title: 'Space Shooter Pro',
    category: 'videogames',
    description: 'In this exciting game, eliminate your alien rivals while moving through space and avoiding dangers. Made with Unity and C#.',
    technologies: ['Unity', 'C#'],
    repoUrl: 'https://github.com/its-camilo/space-shooter-pro',
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop',
    slug: 'space-shooter-pro'
  },
  {
    id: '7',
    title: 'Promedios Universidad Nacional',
    category: 'web',
    description: 'A website designed to help students calculate their grades, built with only JavaScript, CSS, and HTML.',
    technologies: ['JavaScript', 'CSS', 'HTML'],
    repoUrl: 'https://github.com/its-camilo/promedios-unal',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
    slug: 'promedios-unal'
  },
  {
    id: '8',
    title: 'Clock',
    category: 'iot',
    description: 'A clock and temperature and humidity sensor that sends the data to ThingSpeak and can be controlled through buttons or a web terminal. Made with C++.',
    technologies: ['C++', 'Arduino', 'ThingSpeak'],
    repoUrl: 'https://github.com/its-camilo/clock',
    coverImage: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&h=600&fit=crop',
    slug: 'clock'
  },
  {
    id: '9',
    title: 'The Great Fleece',
    category: 'videogames',
    description: 'Darren, can you go unnoticed and reach the vault? A stealth game where you must avoid security cameras and guards. Made with Unity and C#.',
    technologies: ['Unity', 'C#'],
    repoUrl: 'https://github.com/its-camilo/the-great-fleece',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
    slug: 'the-great-fleece'
  }
];

// Category labels for UI
export const categoryLabels: Record<ProjectCategory, string> = {
  videogames: 'Video Games',
  web: 'Web Applications',
  wellness: 'Wellness Apps',
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
