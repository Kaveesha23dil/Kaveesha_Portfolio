"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  { number: "01", title: "Nova Finance", category: "Product Design · Development", year: "2026", image: "/project-nova.png", description: "A real-time wealth platform that turns complex market data into confident decisions.", featured: true },
  { number: "02", title: "Roam", category: "Mobile Experience · UX/UI", year: "2025", image: "/project-roam.png", description: "A calm, intelligent travel companion for planning meaningful journeys from one place." },
  { number: "03", title: "Synapse AI", category: "Art Direction · Product Design", year: "2025", image: "/project-synapse.png", description: "An adaptive workspace that helps creative teams turn scattered thinking into momentum." },
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
    <section ref={section} id="projects" className="projects-section">
      <div className="projects-header">
        <div><span>03 / SELECTED WORK</span><span className="project-count">(03 PROJECTS)</span></div>
        <h2>Selected work that turns<br />ideas into <em>impact.</em></h2>
        <p>A collection of digital products shaped through strategy, design, and thoughtful technology.</p>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <a href="#contact" className="project-image project-reveal" aria-label={`View ${project.title} case study`}>
              <Image src={project.image} alt={`${project.title} project presentation`} fill sizes="(max-width: 900px) 94vw, 58vw" />
              <span className="project-arrow"><ArrowUpRight size={24} /></span>
              {project.featured && <span className="featured-pill">FEATURED PROJECT</span>}
            </a>
            <div className="project-info project-reveal">
              <div className="project-meta"><span>{project.number}</span><span>{project.category}</span><span>{project.year}</span></div>
              <div className="project-title-row"><h3>{project.title}</h3><p>{project.description}</p></div>
            </div>
          </article>
        ))}
      </div>

      <a href="#contact" className="all-work-link">View all projects <span><ArrowUpRight size={20} /></span></a>
    </section>
  );
}
