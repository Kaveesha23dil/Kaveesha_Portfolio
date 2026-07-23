# Kaveesha Dilshan — Portfolio

Personal portfolio of **Kaveesha Dilshan**, a UI/UX designer and creative developer based in Colombo, Sri Lanka. The site brings together selected design and front-end development work in a responsive, motion-rich experience.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000000)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Animation-0AE448?logo=greensock&logoColor=000000)](https://gsap.com/)

![Kaveesha Dilshan portfolio homepage](./public/Home%20Page%20Desktop%20view.png)

## Highlights

- Responsive portfolio pages for home, about, projects, and contact
- Detailed UI/UX and creative-development case studies
- GSAP-powered scroll effects and motion choreography
- Lenis smooth scrolling with reduced-motion support
- Dynamic Open Graph artwork and structured JSON-LD metadata
- Generated sitemap, robots rules, web manifest, and custom 404 page
- Optimized responsive images through Next.js Image

## Featured work

| Project | Focus | Year |
| --- | --- | --- |
| [Intrinsic Tech](./app/projects/intrinsic-tech/page.tsx) | Website redesign, information architecture, responsive UI/UX | 2026 |
| [GTA VI Experience](./app/projects/gtavi-experience/page.tsx) | Creative development, GSAP, cinematic scroll interactions | 2025 |
| [Windows XP Portfolio](./app/projects/windows-xp-portfolio/page.tsx) | React interface engineering, reusable windows, UI state | 2025 |

## Built with

- **Framework:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS and custom CSS
- **Motion:** GSAP, ScrollTrigger, and Lenis
- **Icons:** Lucide React and React Icons
- **Quality:** ESLint and Next.js production tooling

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or newer
- npm

### Installation

```bash
git clone https://github.com/Kaveesha23dil/Kaveesha_Portfolio.git
cd Kaveesha_Portfolio
npm install
```

Copy the example environment file and replace the placeholder with the final deployed URL:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Check the project with ESLint |

## Project structure

```text
portfolio/
├── app/                 # Routes, metadata, sitemap, and global styles
│   └── projects/        # Individual project case studies
├── components/          # Reusable sections and interface components
├── lib/                 # Shared site configuration and SEO helpers
├── public/              # Images, mockups, and certificate files
└── .env.example         # Production URL configuration
```

## Deployment

The simplest deployment path is [Vercel](https://vercel.com/). Import the GitHub repository, add `NEXT_PUBLIC_SITE_URL` with the production domain, and deploy. The standard Next.js build command is already configured.

## Connect

- [GitHub](https://github.com/Kaveesha23dil)
- [Behance](https://www.behance.net/kaveeshadilshan10)
- [Dribbble](https://dribbble.com/Kavee23)
- [Email](mailto:kaveeshadilshankd23@gmail.com)

---

Designed and developed by [Kaveesha Dilshan](https://github.com/Kaveesha23dil).
