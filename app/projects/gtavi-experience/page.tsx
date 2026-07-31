import type { Metadata } from "next";
import DevelopmentCaseStudy, { DevelopmentProject } from "@/components/DevelopmentCaseStudy";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createMetadata, createProjectBreadcrumb, siteConfig } from "@/lib/site";

const description = "A fan-made cinematic GTA VI landing-page case study by Kaveesha Dilshan, featuring React, GSAP ScrollTrigger, scroll-controlled video, responsive motion, and interactive storytelling.";

export const metadata: Metadata = createMetadata({
  title: "GTA VI Cinematic Landing Page Case Study",
  description,
  path: "/projects/gtavi-experience",
  image: "/mockup-gtavi.png",
  imageAlt: "GTA VI cinematic landing page presentation",
  type: "article",
});

const project: DevelopmentProject = {
  eyebrow: "CREATIVE DEVELOPMENT CASE STUDY",
  title: "GTA VI",
  accent: "Cinematic Landing Page",
  year: "2025",
  role: "Front-end Developer",
  scope: "Creative development, motion design, responsive UI",
  mockup: "/mockup-gtavi.png",
  live: "https://gtavi-landingpage.vercel.app/",
  github: "https://github.com/Kaveesha23dil/GTAVI_Landingpage",
  summary: "A fan-made interactive web experience inspired by the visual identity and storytelling style of Grand Theft Auto VI, transforming scrolling into a cinematic digital trailer.",
  disclaimer: "This is an independent fan-made project created for educational and portfolio purposes. Grand Theft Auto, GTA VI, Rockstar Games, and all related artwork and trademarks belong to their respective owners. It is not affiliated with or endorsed by Rockstar Games or Take-Two Interactive.",
  overview: [
    "Instead of creating a conventional static landing page, I designed and developed an immersive scrolling experience combining cinematic videos, layered images, animated masks, character introductions, and smooth transitions.",
    "Each section is connected through scroll-based animation, allowing visitors to explore the page as if they were moving through a digital trailer.",
  ],
  challenge: "Synchronize animations, pinned sections, video playback, and page scrolling without making the experience feel disconnected.",
  solution: "I built coordinated GSAP timelines with ScrollTrigger. Video playback time, element opacity, image movement, scaling, masks, and transitions are controlled by scroll progress. Responsive mask settings keep the central animated reveal correctly positioned across desktop, tablet, and mobile screens.",
  contributionIntro: "I designed and developed the complete frontend experience, from reusable React architecture and scroll-triggered sequences to responsive behavior, performance refinement, and deployment through Vercel.",
  contributions: [
    { title: "Page architecture", detail: "Built the experience with reusable React components for the navigation, hero, video sequences, character stories, promotional cards, and outro." },
    { title: "Scroll-triggered sequences", detail: "Created coordinated GSAP ScrollTrigger timelines for pinned scenes, masks, opacity, scale, image movement, and seamless section handoffs." },
    { title: "Video synchronization", detail: "Connected HTML5 video playback time to scroll progress after media metadata loads, creating controlled cinematic sequences instead of conventional autoplay." },
    { title: "Image and text transitions", detail: "Developed layered image movement, animated typography, character reveals, and subtle parallax effects to support the visual narrative." },
    { title: "Responsive behavior", detail: "Implemented separate animation settings and layout adjustments for desktop, tablet, and mobile screens." },
    { title: "Experience optimization", detail: "Refined trigger timing, media behavior, section overlap, and responsive composition to maintain a smooth cinematic browsing experience." },
    { title: "Production deployment", detail: "Prepared the Vite production build and deployed the completed website through Vercel." },
  ],
  process: [
    { number: "01", title: "Decompose the narrative", detail: "Mapped the experience into focused story beats and identified where pinning, video, parallax, and character content best supported each moment." },
    { number: "02", title: "Build reusable sections", detail: "Created React components for the navigation, hero, video sequences, Jason and Lucia stories, promotional cards, and outro." },
    { number: "03", title: "Direct motion with GSAP", detail: "Built coordinated ScrollTrigger timelines and tuned trigger positions, scrubbing, masks, scaling, opacity, and section transitions." },
    { number: "04", title: "Adapt, optimize, and deploy", detail: "Implemented responsive animation rules, refined video behavior and layout performance, and deployed the production build through Vercel." },
  ],
  features: [
    "Cinematic hero with animated mask transition",
    "Scroll-controlled video playback",
    "Jason Duval and Lucia Caminos story sections",
    "Smooth GSAP section transitions",
    "Responsive desktop, tablet, and mobile experience",
    "Reusable component-based architecture",
  ],
  stack: ["React", "JavaScript", "Vite", "GSAP", "GSAP ScrollTrigger", "Tailwind CSS", "React Responsive", "HTML5 Video", "Vercel"],
  challenges: [
    { title: "Coordinating motion and scrolling", detail: "Pinned sections, video playback, masks, image motion, opacity, scaling, and transitions had to remain synchronized so the experience felt like one continuous story." },
    { title: "Responsive animated mask", detail: "The large mask effect required dedicated desktop, tablet, and mobile settings so its scale and position remained intentional at every screen size." },
    { title: "Reliable video scrubbing", detail: "Video duration is unavailable until metadata loads, so scroll-controlled playback is initialized only after each media element is ready." },
  ],
  outcome: "A responsive and visually engaging landing page that combines frontend engineering with motion design and interactive storytelling. The project strengthened my experience in advanced scroll animation, video synchronization, responsive animation logic, component-based development, and cinematic web design.",
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: "GTA VI Cinematic Landing Page",
          description,
          url: absoluteUrl("/projects/gtavi-experience"),
          image: absoluteUrl("/mockup-gtavi.png"),
          creator: { "@id": `${siteConfig.url}/#person` },
          keywords: ["React", "GSAP", "ScrollTrigger", "motion design", "creative development"],
          isBasedOn: "Grand Theft Auto VI",
        },
        createProjectBreadcrumb("GTA VI Cinematic Landing Page", "/projects/gtavi-experience"),
      ]} />
      <DevelopmentCaseStudy project={project} />
      <Footer />
    </>
  );
}
