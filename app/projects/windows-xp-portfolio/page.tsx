import type { Metadata } from "next";
import DevelopmentCaseStudy, { DevelopmentProject } from "@/components/DevelopmentCaseStudy";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createMetadata, createProjectBreadcrumb, siteConfig } from "@/lib/site";

const description = "Development case study showing how Kaveesha Dilshan built an interactive Windows XP-inspired portfolio with React, reusable window components, centralized UI state, and responsive behavior.";
export const metadata: Metadata = createMetadata({ title: "Windows XP Portfolio Case Study", description, path: "/projects/windows-xp-portfolio", image: "/mockup-windows-xp.png", imageAlt: "Windows XP-inspired interactive portfolio presentation", type: "article" });

const project: DevelopmentProject = {
  eyebrow: "INTERACTIVE DEVELOPMENT CASE STUDY", title: "Windows XP", accent: "Portfolio Desktop", year: "2025", role: "Front-end Developer", scope: "UI engineering, state design, interaction", mockup: "/mockup-windows-xp.png", live: "https://windows-xp-portfolio-lime.vercel.app/", github: "https://github.com/Kaveesha23dil/Windows_Xp_Portfolio",
  summary: "A nostalgic portfolio reimagined as a working Windows XP desktop, complete with boot flow, window management, taskbar behavior, folders, utilities, and interactive portfolio content.",
  challenge: "Present personal work in a memorable interface while making a desktop operating-system simulation feel coherent and genuinely interactive.",
  solution: "I modeled the interface around a central React desktop state. Applications open as reusable XPWindow instances, the taskbar reflects active windows, and each portfolio area behaves like a familiar XP utility rather than a conventional webpage.",
  contributions: [
    { title: "Application state flow", detail: "Created loading, login, welcome, and desktop states with timed transitions and explicit state changes that reproduce the XP startup journey." },
    { title: "Window management", detail: "Built an active-window state map supporting open, close, minimize, maximize, restore, and taskbar representation for multiple applications." },
    { title: "Reusable XP interface", detail: "Created shared window chrome, title bars, menus, status bars, desktop icons, Start menu, taskbar, and system-tray components." },
    { title: "Functional portfolio apps", detail: "Implemented project explorer, project details, command-line skills, Paint, picture viewer, résumé Notepad, PDF viewing, and downloads." },
  ],
  process: [
    { number: "01", title: "Model the operating-system flow", detail: "Defined the startup sequence and desktop states before building the individual portfolio applications." },
    { number: "02", title: "Create the shell", detail: "Reproduced the Bliss desktop, icon grid, Start button, Start menu, taskbar, live clock, and system tray." },
    { number: "03", title: "Build a window system", detail: "Designed one reusable XPWindow component and controlled every open application through centralized window state." },
    { number: "04", title: "Connect portfolio content", detail: "Mapped projects, skills, contact details, résumé content, and media into familiar folders and utilities, then deployed with Vite and Vercel." },
  ],
  features: ["Five-second XP loading sequence", "Login and welcome states", "Start menu and live system clock", "Open/minimize/maximize window behavior", "Taskbar application buttons", "Command Prompt skills experience", "Paint and picture-viewer utilities", "Project explorer and résumé tools"],
  stack: ["React 19", "Vite 7", "Tailwind CSS 4", "JavaScript", "React state and effects", "Vercel"],
  challenges: [
    { title: "Managing many application windows", detail: "A keyed state object keeps each window's content and open, minimized, and maximized status synchronized with the taskbar." },
    { title: "Recreating a familiar visual system", detail: "Gradients, borders, shadows, Tahoma-style typography, icon treatment, and exact control shapes were composed with reusable Tailwind utilities." },
    { title: "Making the theme useful", detail: "Every nostalgic element doubles as navigation: folders reveal projects, Command Prompt presents skills, and Notepad/PDF flows deliver résumé content." },
  ],
  outcome: "A distinctive portfolio experience that demonstrates component architecture, complex UI state, interaction design, and careful visual recreation through working software.",
};

export default function Page() { return <><JsonLd data={[{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Windows XP Portfolio", description, url: absoluteUrl("/projects/windows-xp-portfolio"), image: absoluteUrl("/mockup-windows-xp.png"), applicationCategory: "WebApplication", operatingSystem: "Web browser", author: { "@id": `${siteConfig.url}/#person` }, codeRepository: project.github }, createProjectBreadcrumb("Windows XP Portfolio", "/projects/windows-xp-portfolio")]} /><DevelopmentCaseStudy project={project} /><Footer /></>; }
