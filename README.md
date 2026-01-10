# Developer Portfolio — Core & Code

A high-performance, minimalist portfolio designed to showcase a multidisciplinary career spanning Web Development, Game Design, IoT, and Mobile Applications. Built with a focus on immersive interactions and seamless performance using React 18, TypeScript, and Tailwind CSS v4.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Overview

This portfolio serves as a centralized hub for my professional work across diverse technical fields. Originally adapted from a high-end visual design template, it has been re-engineered into a robust platform to highlight technical complexity through a refined, polished interface.

---

## ✨ Key Features

- **Multidisciplinary Showcase**: Specialized sections for **Web Development**, **Video Games**, **IoT**, and **Mobile Apps**.
- **Bilingual Experience**: Full English and Spanish localization handled via a custom Context API.
- **Dynamic Masonry Layout**: A responsive grid that gracefully displays varying project previews (UI/UX shots, gameplay clips, hardware photos).
- **Advanced Animations**: Powered by `framer-motion` for meaningful transitions and page entry animations.
- **Theme Perfection**: Native support for Dark/Light modes with system preference detection (`next-themes`).
- **Performance Optimized**: Built on Vite 5 with Tailwind CSS v4 for near-instant load times.
- **Form Integration**: Validated contact system using `react-hook-form` and `zod`.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Engine**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router 6](https://reactrouter.com/)

---

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/       # Navigation, Footer, Language/Theme controls
│   ├── portfolio/    # Grid layouts, Project cards, Filtering logic
│   ├── forms/        # Validated Contact forms
│   └── ui/           # Radix-based design system components
├── contexts/         # Language (i18n) and Theme state management
├── data/             # Project definitions and developer biography
├── hooks/            # Custom hooks for scroll, media queries, and state
├── pages/            # View components (Home, Portfolio, Details)
└── types/            # Centralized TypeScript definitions
```

---

## ⚙️ Configuration & Data

The portfolio is data-driven, making it easy to update without touching core logic:

1.  **Projects**: Populate `src/data/projects.ts` with your work.
2.  **Profile**: Update `src/data/developer.ts` with your social links and bio.
3.  **Localization**: Add or modify translation keys in `src/contexts/LanguageContext.tsx`.

---

## 🚀 Getting Started

```sh
# Install dependencies
bun install # or npm install

# Start development server
bun run dev

# Build for production
bun run build
```

---

Developed with curiosity by [its-camilo](https://github.com/its-camilo)
