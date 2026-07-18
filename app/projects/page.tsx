import type { Metadata } from "next";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projects — Kaveesha Dilshan",
  description: "Selected digital product, UX, brand, and development work by Kaveesha Dilshan.",
};

export default function ProjectsPage() {
  return <main className="inner-page"><Projects /><Footer /></main>;
}
