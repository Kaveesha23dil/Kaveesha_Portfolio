import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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
