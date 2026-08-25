import type { Project, ProjectCategory } from '@/types';
import dungeonEscapeImg from '@/assets/dungeon-escape.png';
import ecommerceImg from '@/assets/ecommerce.png';
import promediosUnalImg from '@/assets/promedios-unal.jpg';
import nexum0 from '@/assets/nexum-0.png';
import nexum1 from '@/assets/nexum-1.png';
import nexum2 from '@/assets/nexum-2.png';
import clock0 from '@/assets/clock-0.jpg';
import clock1 from '@/assets/clock-1.png';
import clock2 from '@/assets/clock-2.png';
import clock3 from '@/assets/clock-3.png';
import clock4 from '@/assets/clock-4.png';
import marsMarineImg from '@/assets/mars-marine.png';
import moodpress0 from '@/assets/moodpress-0.png';
import moodpress1 from '@/assets/moodpress-1.png';
import moodpress2 from '@/assets/moodpress-2.png';
import moodpress3 from '@/assets/moodpress-3.png';
import spaceShooterProImg from '@/assets/space-shooter-pro.png';
import anylogicPleMcpImg from '@/assets/anylogicple-mcp.png';
import theGreatFleeceImg from '@/assets/the-great-fleece.png';
import healthScope0 from '@/assets/health-scope-0.png';
import healthScope1 from '@/assets/health-scope-1.png';
import agenticNodes0 from '@/assets/agentic-nodes-0.png';
import agenticNodes1 from '@/assets/agentic-nodes-1.png';
import agenticNodes2 from '@/assets/agentic-nodes-2.png';
import tejoStrike0 from '@/assets/tejo-strike-0.png';
import tejoStrike1 from '@/assets/tejo-strike-1.png';
import tejoStrike2 from '@/assets/tejo-strike-2.png';
import tejoStrike3 from '@/assets/tejo-strike-3.png';
import indiaHealth0 from '@/assets/india-health-0.png';
import indiaHealth1 from '@/assets/india-health-1.png';
import indiaHealth2 from '@/assets/india-health-2.png';
import indiaHealth3 from '@/assets/india-health-3.png';
import indiaHealth4 from '@/assets/india-health-4.png';
import cvAiGenerator0 from '@/assets/cv-ai-generator-0.png';
import cvAiGenerator1 from '@/assets/cv-ai-generator-1.png';
import cvAiGenerator2 from '@/assets/cv-ai-generator-2.png';
import cvAiGenerator3 from '@/assets/cv-ai-generator-3.png';
import cvAiGenerator4 from '@/assets/cv-ai-generator-4.png';
import auri0 from '@/assets/auri-0.png';
import auri1 from '@/assets/auri-1.png';
import auri2 from '@/assets/auri-2.png';
import appSolicitudesFce0 from '@/assets/app-solicitudes-fce-0.png';
import appSolicitudesFce1 from '@/assets/app-solicitudes-fce-1.png';
import appSolicitudesFce2 from '@/assets/app-solicitudes-fce-2.png';
import appInsigniasFce0 from '@/assets/app-insignias-fce-0.png';
import appInsigniasFce1 from '@/assets/app-insignias-fce-1.png';
import appInsigniasFce2 from '@/assets/app-insignias-fce-2.png';
import appInsigniasFce3 from '@/assets/app-insignias-fce-3.png';
import appUifce0 from '@/assets/app-uifce-0.png';
import appUifce1 from '@/assets/app-uifce-1.png';



export const projects: Project[] = [
  {
    id: '1',
    title: 'Ecommerce',
    category: 'web',
    description: 'A complete e-commerce web application built with JavaScript. Features include product catalog, shopping cart, and user management. Available as a web app and mobile application on Google Play.',
    descriptionEs: 'Una aplicación web de comercio electrónico completa construida con JavaScript. Incluye catálogo de productos, carrito de compras y gestión de usuarios. Disponible como aplicación web y móvil en Google Play.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    repoUrl: 'https://github.com/its-camilo/ecommerce',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.itscamilo.ecommerce',
    liveUrl: 'https://its-camilo.github.io/Ecommerce/',
    coverImage: ecommerceImg,
    slug: 'ecommerce',
    aspectRatio: 'landscape'
  },
  {
    id: '2',
    title: 'Mars Marine',
    category: 'videogames',
    description: 'The red planet is unforgiving, and the alien threat never stops. How long can you survive? Made with Unreal Engine.',
    descriptionEs: 'El planeta rojo es implacable, y la amenaza alienígena nunca se detiene. ¿Cuánto tiempo puedes sobrevivir? Hecho con Unreal Engine.',
    technologies: ['Unreal Engine', 'C++'],
    repoUrl: 'https://github.com/its-camilo/mars-marine',
    itchUrl: 'https://its-camilo.itch.io/mars-marine',
    coverImage: marsMarineImg,
    slug: 'mars-marine',
    aspectRatio: 'landscape'
  },
  {
    id: '3',
    title: 'MoodPress',
    category: 'apps',
    description: 'A wellness application for daily mood tracking that identifies patterns and provides personalized mental health tips. Made as a team project with C#.',
    descriptionEs: 'Una aplicación de bienestar para el seguimiento diario del estado de ánimo que identifica patrones y proporciona consejos personalizados de salud mental. Hecho como proyecto en equipo con C#.',
    technologies: ['C#', '.NET'],
    repoUrl: 'https://github.com/JohnFPy/LosInadaptados',
    coverImage: moodpress0,
    hoverImages: [moodpress0, moodpress1, moodpress2, moodpress3],
    slug: 'moodpress',
    aspectRatio: 'portrait'
  },
  {
    id: '11',
    title: 'Agentic Nodes',
    category: 'ai-mcps',
    description: 'AI Development-powered supply chain simulation platform. Describe your procurement needs in natural language and let autonomous agents discover suppliers, plan shipping routes, negotiate pricing, and build execution plans — all in real time. Developed at the Hack-Nation Global AI Hackathon - 4th Edition.',
    descriptionEs: 'Plataforma de simulación de cadena de suministro impulsada por Desarrollo AI. Describe tus necesidades de adquisición en lenguaje natural y deja que agentes autónomos descubran proveedores, planifiquen rutas de envío, negocien precios y construyan planes de ejecución — todo en tiempo real. Desarrollado en la Hack-Nation Global AI Hackaton - 4 Edicion.',
    technologies: ['Python', 'TypeScript', 'AI Development', 'GitHub'],
    repoUrl: 'https://github.com/its-camilo/agentic-nodes',
    liveUrl: 'https://its-camilo.github.io/agentic-nodes/',
    coverImage: agenticNodes0,
    hoverImages: [agenticNodes0, agenticNodes1, agenticNodes2],
    slug: 'agentic-nodes',
    aspectRatio: 'landscape'
  },
  {
    id: '5',
    title: 'Nexum',
    category: 'web',
    description: 'Build your week at Universidad Nacional: bookmark courses from the course finder, sort priorities, generate schedules, and keep your weeks saved to your account.',
    descriptionEs: 'Arma tu semana en la Universidad Nacional: marca materias del buscador de cursos, ordena prioridades, genera horarios y deja las semanas guardadas en tu cuenta.',
    technologies: ['TypeScript', 'React', 'AI Development', 'GitHub'],
    repoUrl: 'https://github.com/its-camilo/nexum',
    liveUrl: 'https://nexum-unal.vercel.app',
    coverImage: nexum0,
    hoverImages: [nexum0, nexum1, nexum2],
    slug: 'nexum',
    aspectRatio: 'landscape'
  },
  {
    id: '4',
    title: 'Health Scope',
    category: 'apps',
    description: 'A comprehensive health and wellness application that leverages AI Development to provide personalized health insights. It features AI Development-driven analysis that provides an overall health score, general recommendations, and alopecia risk assessment.',
    descriptionEs: 'Una aplicación integral de salud y bienestar que aprovecha el Desarrollo AI para ofrecer información personalizada. Incluye un análisis de Desarrollo AI que determina el puntaje general de salud, recomendaciones generales y riesgo de alopecia.',
    technologies: ['JavaScript', 'React', 'GitHub', 'AI Development'],
    repoUrl: 'https://github.com/its-camilo/health-scope',
    liveUrl: 'https://its-camilo.github.io/health-scope/',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=co.median.android.odxzdar',
    coverImage: healthScope0,
    hoverImages: [healthScope0, healthScope1],
    slug: 'health-scope',
    aspectRatio: 'portrait'
  },
  {
    id: '12',
    title: 'Tejo Strike',
    category: 'videogames',
    description: 'The Most Explosive Sport in the World Comes to VR! Developed for the Meta Quest.',
    descriptionEs: '¡El deporte más explosivo del mundo llega a la VR! Desarrollado para el Meta Quest.',
    technologies: ['C#', 'Unity', 'VR Development', 'GitHub'],
    repoUrl: 'https://github.com/its-camilo/Tejo-VR',
    itchUrl: 'https://its-camilo.itch.io/tejo-strike',
    metaStoreUrl: 'https://www.meta.com/experiences/tejo-strike/26590651387187461/',
    coverImage: tejoStrike0,
    hoverImages: [tejoStrike0, tejoStrike1, tejoStrike2, tejoStrike3],
    slug: 'tejo-strike',
    aspectRatio: 'landscape'
  },
  {
    id: '13',
    title: 'India Health Navigator',
    category: 'ai-mcps',
    description: 'A health intelligence project for India that enables searching for medical facilities in natural language, evaluating their reliability with evidence, and visualizing "medical deserts" on an interactive map. Developed at the Hack-Nation Global AI Hackathon - 5th Edition.',
    descriptionEs: 'Proyecto de inteligencia sanitaria para India que permite buscar instalaciones médicas en lenguaje natural, evaluar su confiabilidad con evidencia y visualizar "desiertos médicos" en un mapa interactivo. Desarrollado en la Hack-Nation Global AI Hackaton - 5 Edicion.',
    technologies: ['Python', 'TypeScript', 'AI Development', 'GitHub'],
    repoUrl: 'https://github.com/its-camilo/india-health-navigator',
    liveUrl: 'https://india-health-navigator.vercel.app/',
    coverImage: indiaHealth0,
    hoverImages: [indiaHealth0, indiaHealth1, indiaHealth2, indiaHealth3, indiaHealth4],
    slug: 'india-health-navigator',
    aspectRatio: 'landscape'
  },
  {
    id: '14',
    title: 'CV AI Generator',
    category: 'ai-mcps',
    description: 'AI-powered CV generator tailored to each job offer. Preview and download PDF in Spanish or English.',
    descriptionEs: 'Generador de CVs con IA adaptado a cada oferta de trabajo. Vista previa y descarga PDF en español o inglés.',
    technologies: ['TypeScript', 'GitHub', 'AI Development'],
    repoUrl: 'https://github.com/its-camilo/cv-ai-generator',
    liveUrl: 'https://cv-ai-generator-rho.vercel.app/login',
    coverImage: cvAiGenerator0,
    hoverImages: [cvAiGenerator0, cvAiGenerator1, cvAiGenerator2, cvAiGenerator3, cvAiGenerator4],
    slug: 'cv-ai-generator',
    aspectRatio: 'landscape'
  },
  {
    id: '15',
    title: 'Auri',
    category: 'ai-mcps',
    description: 'Retrieval-Augmented Generation chatbot for Universidad Nacional de Colombia, Bogotá campus. Students can ask in natural language about student assistant, monitor, and scholarship calls, plus general university information.',
    descriptionEs: 'Chatbot de Retrieval-Augmented Generation que permite a cualquier estudiante consultar en lenguaje natural información sobre convocatorias de estudiantes auxiliares, monitores y becarios, e información general de la universidad.',
    technologies: ['TypeScript', 'React', 'Python', 'AWS', 'AI Development'],
    repoUrl: 'https://github.com/YonyChaparro/chatbot-universitario',
    liveUrl: 'https://d21wzophkkd453.cloudfront.net/',
    coverImage: auri0,
    hoverImages: [auri0, auri1, auri2],
    slug: 'auri',
    aspectRatio: 'landscape'
  },
  {
    id: '17',
    title: 'App Solicitudes FCE',
    category: 'corporate',
    description: 'Service request portal for the Informatics Unit of the Faculty of Economic Sciences (UIFCE). It lets the university community register and track support and technology service requests, with hybrid authentication (local + UNAL LDAP), role-based access control, and catalogs of services, spaces, and time slots. Built as a team project within the UIFCE development area; I contributed primarily to the frontend.',
    descriptionEs: 'Portal de solicitudes de servicios de la Unidad de Informática de la Facultad de Ciencias Económicas (UIFCE). Permite a la comunidad universitaria registrar y dar seguimiento a solicitudes de soporte y servicios tecnológicos, con autenticación híbrida (local + LDAP UNAL), control de acceso por roles y catálogos de servicios, espacios y franjas horarias. Desarrollado en equipo dentro del área de desarrollo de la Unidad de Informática de la FCE; contribuí principalmente al frontend.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'LDAP'],
    coverImage: appSolicitudesFce0,
    hoverImages: [appSolicitudesFce0, appSolicitudesFce1, appSolicitudesFce2],
    slug: 'app-solicitudes-fce',
    aspectRatio: 'landscape'
  },
  {
    id: '18',
    title: 'App Insignias FCE',
    category: 'corporate',
    description: 'Web application for managing digital certifications and badges for students of the Faculty of Economic Sciences, with later redemption for 2 free-elective credits. Built as a team project within the UIFCE development area; I contributed primarily to the frontend and also worked on parts of the backend.',
    descriptionEs: 'Aplicativo web diseñado para la gestión de certificaciones de los estudiantes de la Facultad de Ciencias Económicas y su posterior canje por 2 créditos de libre elección. Desarrollado en equipo dentro del área de desarrollo de la Unidad de Informática de la FCE (UIFCE); contribuí principalmente al frontend y también un poco al backend.',
    technologies: ['React', 'TypeScript', 'CSS'],
    coverImage: appInsigniasFce0,
    hoverImages: [appInsigniasFce0, appInsigniasFce1, appInsigniasFce2, appInsigniasFce3],
    slug: 'app-insignias-fce',
    aspectRatio: 'landscape'
  },
  {
    id: '19',
    title: 'App UIFCE',
    category: 'corporate',
    description: 'Web application for tracking activities developed in the Informatics Unit of the Faculty of Economic Sciences (UIFCE). Built as a team project within the UIFCE development area; I contributed to developing new modules and debugging.',
    descriptionEs: 'Aplicativo web para realizar seguimiento de las actividades desarrolladas en la Unidad de Informática de la Facultad de Ciencias Económicas. Desarrollado en equipo dentro del área de desarrollo de la UIFCE; contribuí al desarrollo de nuevos módulos y a hacer debugging.',
    technologies: ['React', 'JavaScript', 'CSS'],
    coverImage: appUifce0,
    hoverImages: [appUifce0, appUifce1],
    slug: 'app-uifce',
    aspectRatio: 'landscape'
  },
  {
    id: '6',
    title: 'Dungeon Escape',
    category: 'videogames',
    description: 'Can you defeat the monsters, collect the diamonds, and escape before it\'s too late? The dungeon awaits! Made with Unity and C#.',
    descriptionEs: '¿Puedes derrotar a los monstruos, recolectar los diamantes y escapar antes de que sea demasiado tarde? ¡La mazmorra te espera! Hecho con Unity y C#.',
    technologies: ['Unity', 'C#'],
    repoUrl: 'https://github.com/its-camilo/Dungeon-Scape',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.TechNestGamesStudios.DungeonEscape',
    itchUrl: 'https://its-camilo.itch.io/dungeon-escape',
    coverImage: dungeonEscapeImg,
    slug: 'dungeon-escape',
    aspectRatio: 'landscape'
  },
  {
    id: '16',
    title: 'anylogicPLE-mcp',
    category: 'ai-mcps',
    description: 'An MCP server that generates AnyLogic PLE simulation models from natural-language prompts in Claude Code. Describe a queueing system, factory, or ER and get a validated .alp file ready to open and run.',
    descriptionEs: 'Un servidor MCP que genera modelos de simulación de AnyLogic PLE a partir de prompts en lenguaje natural en Claude Code. Describe un sistema de colas, una fábrica o una urgencia y obtén un archivo .alp validado listo para abrir y ejecutar.',
    technologies: ['Python', 'MCP', 'AI Development'],
    repoUrl: 'https://github.com/its-camilo/anylogicPLE-mcp',
    coverImage: anylogicPleMcpImg,
    slug: 'anylogicple-mcp',
    aspectRatio: 'landscape'
  },
  {
    id: '7',
    title: 'Space Shooter Pro',
    category: 'videogames',
    description: 'In this exciting game, eliminate your alien rivals while moving through space and avoiding dangers. Made with Unity and C#.',
    descriptionEs: 'En este emocionante juego, elimina a tus rivales alienígenas mientras te mueves por el espacio y evitas peligros. Hecho con Unity y C#.',
    technologies: ['Unity', 'C#'],
    repoUrl: 'https://github.com/its-camilo/Space-Shooter',
    itchUrl: 'https://its-camilo.itch.io/space-shooter-pro',
    coverImage: spaceShooterProImg,
    slug: 'space-shooter-pro',
    aspectRatio: 'portrait'
  },
  {
    id: '8',
    title: 'Promedios Universidad Nacional',
    titleEs: 'Promedios Universidad Nacional',
    category: 'web',
    description: 'A website designed to help students calculate their grades, built with only JavaScript, CSS, and HTML.',
    descriptionEs: 'Un sitio web diseñado para ayudar a los estudiantes a calcular sus notas, construido solo con JavaScript, CSS y HTML.',
    technologies: ['JavaScript', 'CSS', 'HTML'],
    repoUrl: 'https://github.com/promediosunal/promediosunal',
    liveUrl: 'https://promediosunal.github.io/promediosunal/',
    coverImage: promediosUnalImg,
    slug: 'promedios-unal',
    aspectRatio: 'landscape'
  },
  {
    id: '9',
    title: 'Clock',
    titleEs: 'Reloj',
    category: 'iot',
    description: 'A clock and temperature and humidity sensor that sends the data to ThingSpeak and can be controlled through buttons or a web terminal. Made with C++.',
    descriptionEs: 'Un reloj y sensor de temperatura y humedad que envía los datos a ThingSpeak y puede ser controlado mediante botones o una terminal web. Hecho con C++.',
    technologies: ['C++', 'Arduino', 'ThingSpeak'],
    repoUrl: 'https://github.com/its-camilo/clock',
    coverImage: clock0,
    hoverImages: [clock0, clock1, clock2, clock3, clock4],
    slug: 'clock',
    aspectRatio: 'landscape'
  },
  {
    id: '10',
    title: 'The Great Fleece',
    category: 'videogames',
    description: 'Darren, can you go unnoticed and reach the vault? A stealth game where you must avoid security cameras and guards. Made with Unity and C#.',
    descriptionEs: 'Darren, ¿puedes pasar desapercibido y llegar a la bóveda? Un juego de sigilo donde debes evitar cámaras de seguridad y guardias. Hecho con Unity y C#.',
    technologies: ['Unity', 'C#', 'GitHub'],
    repoUrl: 'https://github.com/its-camilo/the-great-fleece',
    itchUrl: 'https://its-camilo.itch.io/the-great-fleece',
    coverImage: theGreatFleeceImg,
    slug: 'the-great-fleece',
    aspectRatio: 'landscape'
  }
];

// Category labels for UI (used as fallback, prefer translations)
export const categoryLabels: Record<ProjectCategory, string> = {
  videogames: 'Video Games',
  web: 'Web',
  apps: 'Apps',
  iot: 'IoT',
  'ai-mcps': 'AI & MCPs',
  corporate: 'Corporate'
};

/** Preferred display order for the Home / About technologies sections */
const TECHNOLOGY_ORDER = [
  'Java',
  'C#',
  'JavaScript',
  'TypeScript',
  'Python',
  'C++',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'React',
  '.NET',
  'Unity',
  'Unreal Engine',
  'VR Development',
  'AI Development',
  'MCP',
  'AWS',
  'LDAP',
  'Arduino',
  'ThingSpeak',
  'GitHub'
] as const;

/** Union of every project's technologies, ordered for Home / About badges */
export const getAllTechnologies = (): string[] => {
  const fromProjects = new Set(projects.flatMap((project) => project.technologies));
  const ordered = TECHNOLOGY_ORDER.filter((tech) => fromProjects.has(tech));
  const extras = [...fromProjects].filter(
    (tech) => !TECHNOLOGY_ORDER.includes(tech as (typeof TECHNOLOGY_ORDER)[number])
  );
  return [...ordered, ...extras.sort()];
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
