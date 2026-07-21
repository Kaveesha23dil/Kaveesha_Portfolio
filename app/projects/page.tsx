import type { Metadata } from "next";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({ title: "UI/UX Design & Web Development Projects", description: "Explore UI/UX design and front-end development case studies by Kaveesha Dilshan, featuring responsive websites, React applications, and GSAP experiences.", path: "/projects", keywords: ["UI/UX portfolio Sri Lanka", "web design case studies", "React portfolio projects", "front-end developer portfolio"] });

export default function ProjectsPage() {
  return <main className="inner-page"><Projects categorized asPage /><Footer /></main>;
}
