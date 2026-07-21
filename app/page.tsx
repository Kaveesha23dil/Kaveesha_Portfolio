import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, createMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Kaveesha Dilshan — UI/UX Designer & Creative Developer in Sri Lanka",
  description: "Kaveesha Dilshan is a UI/UX designer and creative developer in Colombo, Sri Lanka, creating responsive websites, product interfaces, and interactive React experiences.",
  path: "/",
  keywords: ["UI/UX designer Sri Lanka", "UI designer Colombo", "UX designer Colombo", "creative developer Sri Lanka", "freelance web designer Sri Lanka"],
});
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${absoluteUrl("/")}#profile`,
        url: absoluteUrl("/"),
        name: `${siteConfig.name} — UI/UX Designer & Creative Developer in Sri Lanka`,
        description: siteConfig.description,
        inLanguage: "en",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: { "@id": `${siteConfig.url}/#person` },
      }} />
      <Loader />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
