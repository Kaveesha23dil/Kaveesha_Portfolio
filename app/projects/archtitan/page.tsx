import type { Metadata } from "next";
import DevelopmentCaseStudy, { DevelopmentProject } from "@/components/DevelopmentCaseStudy";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createMetadata, createProjectBreadcrumb, siteConfig } from "@/lib/site";

const description = "ArchTitan OS website developed and hosted by Kaveesha Dilshan: a responsive Next.js experience presenting context-aware developer Linux research and its connected ecosystem.";

export const metadata: Metadata = createMetadata({ title: "ArchTitan OS Website Case Study", description, path: "/projects/archtitan", image: "/project-archtitan.jpeg", imageAlt: "ArchTitan OS desktop with blue and violet geometric wallpaper", type: "article" });

const project: DevelopmentProject = {
  eyebrow: "WEBSITE DEVELOPMENT & HOSTING",
  title: "ArchTitan OS",
  accent: "Research Website",
  year: "2026",
  role: "Website Developer & Hosting",
  scope: "Responsive development, motion, deployment",
  deliverable: "Live research website",
  mockup: "/project-archtitan.jpeg",
  live: "https://www.archtitan.tech/",
  github: "https://github.com/Kaveesha23dil/ArchTitionOS",
  summary: "I developed and hosted the public website for ArchTitan OS, an adaptive Arch Linux research project exploring developer workloads, workspace-aware resource management, and a connected Linux–Android ecosystem.",
  overview: ["The website introduces the research premise, system architecture, workspace classifier, ecosystem modules, and evaluation plan. Dedicated pages explain Titan Hardware Manager, TitanShare, and TitanMirror.", "This case study focuses on my website development and hosting work. The operating system and its research provide the subject matter presented on the site."],
  challenge: "Make a technical operating-system research project approachable while preserving the detail developers need to understand it.",
  solution: "I built a responsive Next.js website that organizes the research into focused sections and module pages, using animated demonstrations and clear navigation to connect the system architecture to practical developer workflows.",
  contributionIntro: "I developed the website and hosted it at archtitan.tech, bringing the research content, interactive presentation, and public deployment together.",
  contributions: [
    { title: "Responsive website development", detail: "Built the public experience with Next.js, React, TypeScript, and Tailwind CSS, with navigation for desktop and mobile visitors." },
    { title: "Research and module pages", detail: "Organized the research overview and dedicated pages for Titan Hardware Manager, TitanShare, and TitanMirror." },
    { title: "Interactive presentation", detail: "Used GSAP animation and interactive workspace demonstrations to communicate resource allocation and classification concepts." },
    { title: "Hosting and deployment", detail: "Deployed the website and made it publicly accessible through the archtitan.tech domain." },
  ],
  process: [
    { number: "01", title: "Structure the research", detail: "Group the research premise, architecture, classifier, ecosystem, and evaluation into a navigable website." },
    { number: "02", title: "Build the experience", detail: "Implement responsive layouts and dedicated module pages with reusable React components." },
    { number: "03", title: "Bring concepts to life", detail: "Add hero and scroll animations alongside interactive demonstrations of workspace context." },
    { number: "04", title: "Publish the website", detail: "Host the completed website at www.archtitan.tech so visitors can explore the project online." },
  ],
  features: ["Responsive desktop and mobile navigation", "Research and system architecture overview", "Interactive workspace context demonstration", "Titan Hardware Manager module page", "TitanShare and TitanMirror module pages", "GSAP hero and scroll animations", "Research evaluation and references", "Public deployment at archtitan.tech"],
  stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Lucide React"],
  challenges: [
    { title: "Presenting dense technical content", detail: "Focused sections and dedicated module pages give visitors an overview before they explore individual systems." },
    { title: "Explaining adaptive behavior", detail: "Workspace states, resource meters, and classifier demonstrations make abstract operating-system concepts easier to follow." },
    { title: "Connecting development to delivery", detail: "A hosted website on the project domain turns the implementation into an accessible public presentation of the research." },
  ],
  outcome: "A live research website, developed and hosted by me, that gives ArchTitan OS a clear public presence.",
};

export default function Page() {
  return <><JsonLd data={[{ "@context": "https://schema.org", "@type": "CreativeWork", name: "ArchTitan OS Website", description, url: absoluteUrl("/projects/archtitan"), image: absoluteUrl("/project-archtitan.jpeg"), author: { "@id": `${siteConfig.url}/#person` }, sameAs: [project.live, project.github] }, createProjectBreadcrumb("ArchTitan OS", "/projects/archtitan")]} /><DevelopmentCaseStudy project={project} /><Footer /></>;
}
