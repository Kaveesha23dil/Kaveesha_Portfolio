import type { Metadata } from "next";
import DevelopmentCaseStudy, { DevelopmentProject } from "@/components/DevelopmentCaseStudy";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createMetadata, createProjectBreadcrumb, siteConfig } from "@/lib/site";

const description = "A fan-made creative-development case study showing how Kaveesha Dilshan built a cinematic GTA VI landing experience with React, GSAP ScrollTrigger, scrubbed video, and responsive motion.";
export const metadata: Metadata = createMetadata({ title: "GTA VI Interactive Experience Case Study", description, path: "/projects/gtavi-experience", image: "/mockup-gtavi.png", imageAlt: "GTA VI interactive landing experience presentation", type: "article" });

const project: DevelopmentProject = {
  eyebrow: "CREATIVE DEVELOPMENT CASE STUDY", title: "GTA VI", accent: "Interactive Experience", year: "2025", role: "Front-end Developer", scope: "Creative development, motion, responsive UI", mockup: "/mockup-gtavi.png", live: "https://gtavi-landingpage.vercel.app/", github: "https://github.com/Kaveesha23dil/GTAVI_Landingpage",
  summary: "A cinematic fan-made landing experience that turns scrolling into a directed story through masks, pinned scenes, scrubbed video, and character-led transitions.",
  disclaimer: "Independent fan-made portfolio project. Grand Theft Auto, GTA VI, Rockstar Games, and all related artwork and trademarks belong to their respective owners. This project is not affiliated with or endorsed by Rockstar Games or Take-Two Interactive.",
  challenge: "Make a long promotional page feel like an interactive trailer—not a collection of static sections.",
  solution: "I built the experience as a sequence of React sections controlled by GSAP ScrollTrigger timelines. Scrolling reveals the world through expanding masks, advances video playback, transitions between scenes, and moves layered character artwork at different speeds.",
  contributions: [
    { title: "Experience architecture", detail: "Split the narrative into focused Hero, video, Jason, Lucia, postcard, finale, and outro components so each scene could own its animation logic." },
    { title: "Scroll-directed motion", detail: "Built pinned and scrubbed ScrollTrigger timelines that synchronize opacity, scale, masking, image movement, and section handoffs." },
    { title: "Video sequencing", detail: "Connected scroll progress to HTML video currentTime after metadata loads, creating controlled cinematic playback without conventional controls." },
    { title: "Responsive adaptation", detail: "Used responsive mask settings and layout variants so the visual reveals and character compositions remain effective across viewport sizes." },
  ],
  process: [
    { number: "01", title: "Decompose the narrative", detail: "Mapped the experience into independent story beats and identified where pinning, video, or parallax best supported each moment." },
    { number: "02", title: "Build reusable sections", detail: "Created React components for every scene and organized imagery, custom fonts, video, and constants into predictable project structure." },
    { number: "03", title: "Direct motion with GSAP", detail: "Set initial states, created scrub timelines, and tuned trigger start/end points to make transitions feel continuous." },
    { number: "04", title: "Optimize and deploy", detail: "Added muted inline video behavior, responsive rules, linting, and a Vite production build deployed through Vercel." },
  ],
  features: ["Pinned expanding-mask hero", "Scroll-scrubbed video sequences", "Jason and Lucia character stories", "Layered parallax image compositions", "Responsive desktop and mobile layouts", "Cinematic scene-to-scene transitions"],
  stack: ["React 19", "Vite 7", "GSAP 3", "ScrollTrigger", "@gsap/react", "Tailwind CSS 4", "react-responsive"],
  challenges: [
    { title: "Synchronizing video and scroll", detail: "Video duration is unavailable until metadata loads, so timeline playback is attached only after the media is ready." },
    { title: "Seamless pinned transitions", detail: "Overlapping negative margins, pinned sections, and opacity handoffs were carefully timed to avoid visual gaps between scenes." },
    { title: "Motion across breakpoints", detail: "Mask positions and sizes needed separate responsive settings so the central reveal stayed intentional on narrow screens." },
  ],
  outcome: "A responsive, production-deployed experience that demonstrates creative front-end development, animation direction, and scroll-based storytelling.",
};

export default function Page() { return <><JsonLd data={[{ "@context": "https://schema.org", "@type": "CreativeWork", name: "GTA VI Interactive Experience", description, url: absoluteUrl("/projects/gtavi-experience"), image: absoluteUrl("/mockup-gtavi.png"), creator: { "@id": `${siteConfig.url}/#person` }, keywords: ["React", "GSAP", "ScrollTrigger", "creative development"], isBasedOn: "Grand Theft Auto VI" }, createProjectBreadcrumb("GTA VI Interactive Experience", "/projects/gtavi-experience")]} /><DevelopmentCaseStudy project={project} /><Footer /></>; }
