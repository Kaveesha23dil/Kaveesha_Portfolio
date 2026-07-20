import type { Metadata } from "next";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({ title: "Projects", description: "Explore selected UI/UX and development case studies by Kaveesha Dilshan, including responsive product design, React applications, and GSAP-driven web experiences.", path: "/projects" });

export default function ProjectsPage() {
  return <main className="inner-page"><Projects categorized asPage /><Footer /></main>;
}
