import type { Metadata } from "next";
import About from "@/components/About";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Me — Kaveesha Dilshan",
  description: "About Kaveesha Dilshan, a multidisciplinary designer and creative developer based in Sri Lanka.",
};

export default function AboutPage() {
  return <main className="inner-page"><About /><Education /><Certificates /><TechStack /><Services sectionNumber="06" /><Process sectionNumber="07" /><Footer /></main>;
}
