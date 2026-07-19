"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  { number: "01", title: "Intrinsic Tech", category: "Website Redesign · UI/UX", year: "2026", image: "/Home Page Desktop view.png", href: "/projects/intrinsic-tech", description: "A complete responsive redesign that makes a complex AI consultancy feel clear, credible, and ready for growth.", featured: true, imagePosition: "top" },
  { number: "02", title: "GTA VI Experience", category: "Creative Development · Motion", year: "2025", image: "https://raw.githubusercontent.com/Kaveesha23dil/GTAVI_Landingpage/main/public/images/hero-bg.webp", href: "https://gtavi-landingpage.vercel.app/", github: "https://github.com/Kaveesha23dil/GTAVI_Landingpage", description: "A cinematic, responsive GTA VI landing page with GSAP-powered storytelling, character sequences, and immersive video transitions." },
  { number: "03", title: "Windows XP Portfolio", category: "Interactive Development · React", year: "2025", image: "https://raw.githubusercontent.com/Kaveesha23dil/Windows_Xp_Portfolio/main/public/background.png", href: "https://windows-xp-portfolio-lime.vercel.app/", github: "https://github.com/Kaveesha23dil/Windows_Xp_Portfolio", description: "A nostalgic, fully interactive portfolio desktop with authentic XP windows, Start menu, taskbar, command prompt, Paint, Notepad, and project explorer." },
];

export default function Projects() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card.querySelectorAll(".project-reveal"), { scrollTrigger: { trigger: card, start: "top 76%" }, y: 45, opacity: 0, duration: .85, stagger: .1, ease: "power3.out" });
        gsap.fromTo(card.querySelector(".project-image img"), { scale: 1.12, yPercent: -3 }, { scale: 1.02, yPercent: 3, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 } });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="projects" data-scroll-section className="projects-section">
      <div className="projects-header">
        <div><span>03 / SELECTED WORK</span><span className="project-count">(03 PROJECTS)</span></div>
        <h2>Selected work that turns<br />ideas into <em>impact.</em></h2>
        <p>A collection of digital products shaped through strategy, design, and thoughtful technology.</p>
      </div>
      <div className="projects-list">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined} className={`project-image project-reveal ${project.imagePosition === "top" ? "project-image--intrinsic" : ""}`} aria-label={`View ${project.title} project`}>
              <Image src={project.image} alt={`${project.title} project presentation`} fill sizes="(max-width: 900px) 94vw, 58vw" />
              <span className="project-arrow"><ArrowUpRight size={24} /></span>
              {project.featured && <span className="featured-pill">FEATURED REDESIGN</span>}
            </a>
            <div className="project-info project-reveal">
              <div className="project-meta"><span>{project.number}</span><span>{project.category}</span><span>{project.year}</span></div>
              <div className="project-title-row"><h3>{project.title}</h3><p>{project.description}</p>{project.github && <div className="project-links"><a href={project.href} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={14} /></a><a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div>}</div>
            </div>
          </article>
        ))}
      </div>
      <a href="/contact" className="all-work-link">Start a project <span><ArrowUpRight size={20} /></span></a>
    </section>
  );
}
