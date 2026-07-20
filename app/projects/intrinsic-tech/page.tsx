import type { Metadata } from "next";
import IntrinsicCaseStudy from "@/components/IntrinsicCaseStudy";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createMetadata, createProjectBreadcrumb, siteConfig } from "@/lib/site";

const description = "UI/UX case study showing how Kaveesha Dilshan clarified an AI consultancy's services through information architecture, responsive interface design, and a reusable visual system.";
export const metadata: Metadata = createMetadata({ title: "Intrinsic Tech Website Redesign Case Study", description, path: "/projects/intrinsic-tech", image: "/mockup-intrinsic-tech.png", imageAlt: "Intrinsic Tech responsive website redesign presentation", type: "article" });

export default function IntrinsicTechPage() {
  return <><JsonLd data={[{ "@context": "https://schema.org", "@type": "CreativeWork", name: "Intrinsic Tech Website Redesign", description, url: absoluteUrl("/projects/intrinsic-tech"), image: absoluteUrl("/mockup-intrinsic-tech.png"), creator: { "@id": `${siteConfig.url}/#person` }, keywords: ["UI/UX design", "responsive design", "information architecture", "design system"] }, createProjectBreadcrumb("Intrinsic Tech Website Redesign", "/projects/intrinsic-tech")]} /><IntrinsicCaseStudy /><Footer /></>;
}
