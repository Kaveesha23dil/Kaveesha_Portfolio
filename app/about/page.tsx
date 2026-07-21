import type { Metadata } from "next";
import About from "@/components/About";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({ title: "About Kaveesha Dilshan — UI/UX Designer", description: "Meet Kaveesha Dilshan, a UI/UX designer and creative developer in Sri Lanka. Explore his design approach, education, certifications, and development toolkit.", path: "/about", keywords: ["about Kaveesha Dilshan", "Sri Lankan UI/UX designer", "Figma designer Sri Lanka", "React developer Colombo"] });

export default function AboutPage() {
  return <main className="inner-page"><JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${absoluteUrl("/about")}#profile`, url: absoluteUrl("/about"), name: `About ${siteConfig.name}`, mainEntity: { "@id": `${siteConfig.url}/#person` } }} /><About asPage /><Education /><Certificates /><TechStack /><Services sectionNumber="06" /><Process sectionNumber="07" /><Footer /></main>;
}
