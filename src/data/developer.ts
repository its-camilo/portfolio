import type { DeveloperInfo } from '@/types';

export const developerInfo: DeveloperInfo = {
  name: 'Camilo Alejandro Lagos Malaver',
  title: 'Student | Junior Game Developer',
  tagline: 'Student | Junior Game Developer',
  heroIntroduction: 'Creating interactive experiences through video games and web applications.',
  education: {
    university: 'National University of Colombia',
    degree: 'Computer & Systems Engineering'
  },
  biography: `My name is Camilo. I have experience programming video game mechanics and systems, as well as developing full-stack web applications. I am proficient in using various design patterns, such as the singleton pattern and object-oriented programming.

I am passionate about creating interactive experiences that engage users, whether through immersive video games or intuitive web applications. My background in computer science gives me a solid foundation in algorithms, data structures, and software architecture.`,
  skills: [
    'Game Development',
    'Web Development',
    'Design Patterns',
    'Object-Oriented Programming',
    'Full-Stack Development'
  ],
  technologies: [
    'Java',
    'C#',
    'JavaScript',
    'C++',
    'Unity',
    'Unreal Engine',
    'React',
    'GitHub'
  ],
  location: 'Colombia',
  email: 'contact@example.com',
  socialLinks: {
    github: 'https://github.com/its-camilo',
    linkedin: 'https://linkedin.com/in/camilo-lagos',
    googlePlay: 'https://play.google.com/store/apps/developer?id=CamiloLagos',
    linktree: 'https://linktr.ee/camilolagos',
    itchio: 'https://camilolagos.itch.io'
  },
  cvUrl: '#',
  // Placeholder image - will be replaced
  portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'
};

// Alias for backward compatibility
export const photographerInfo = developerInfo;
