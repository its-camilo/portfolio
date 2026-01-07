/**
 * Core TypeScript interfaces for Developer Portfolio
 */

export type ProjectCategory = 'videogames' | 'web' | 'wellness' | 'iot';

export type AspectRatio = 'portrait' | 'landscape' | 'square';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: AspectRatio;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  titleEs?: string;
  category: ProjectCategory;
  description: string;
  descriptionEs?: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  playStoreUrl?: string;
  itchUrl?: string;
  coverImage: string;
  hoverImages?: string[];
  slug: string;
  aspectRatio?: AspectRatio;
  // Optional fields for compatibility
  year?: string;
  location?: string;
  client?: string;
  camera?: string;
  images?: ProjectImage[];
}

export interface DeveloperInfo {
  name: string;
  title: string;
  tagline?: string;
  heroIntroduction?: string;
  education: {
    university: string;
    degree: string;
  };
  biography: string;
  skills: string[];
  technologies: string[];
  location: string;
  email: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    googlePlay?: string;
    linktree?: string;
    itchio?: string;
  };
  cvUrl?: string;
  portraitImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  timestamp: Date;
}

// Legacy type for backward compatibility
export type PhotographerInfo = DeveloperInfo;
