import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Portfolio",
  description: "Kaveesha Dilshan is a digital designer and creative developer in Colombo, creating user-centered interfaces, responsive websites, and interactive experiences with React, Next.js, and GSAP.",
  path: "/",
});
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
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
