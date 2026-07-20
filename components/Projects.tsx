"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motionMedia, registerMotion } from "@/components/motion";

const projects = [
  { number: "01", type: "uiux", title: "Intrinsic Tech", category: "Website Redesign · UI/UX", year: "2026", image: "/mockup-intrinsic-tech.png", href: "/projects/intrinsic-tech", description: "A complete responsive redesign that makes a complex AI consultancy feel clear, credible, and ready for growth.", featured: true },
  { number: "02", type: "development", title: "GTA VI Experience", category: "Creative Development · GSAP", year: "2025", image: "/mockup-gtavi.png", href: "/projects/gtavi-experience", live: "https://gtavi-landingpage.vercel.app/", github: "https://github.com/Kaveesha23dil/GTAVI_Landingpage", description: "A cinematic responsive website built with GSAP-powered scroll choreography, character sequences, masks, and immersive video transitions." },
  { number: "03", type: "development", title: "Windows XP Portfolio", category: "Development · React", year: "2025", image: "/mockup-windows-xp.png", href: "/projects/windows-xp-portfolio", live: "https://windows-xp-portfolio-lime.vercel.app/", github: "https://github.com/Kaveesha23dil/Windows_Xp_Portfolio", description: "A nostalgic, fully interactive portfolio desktop with authentic XP windows, Start menu, taskbar, command prompt, Paint, Notepad, and project explorer." },
];

const projectTypes = [
  { id: "all", label: "All work", description: "A complete view of selected design, development, and motion work." },
  { id: "uiux", label: "UI/UX", description: "Research-led interfaces, product thinking, and responsive design systems." },
  { id: "development", label: "Development", description: "Production-ready websites and interactive applications built with modern tools." },
  { id: "motion", label: "Motion Design", description: "Cinematic interactions, scroll storytelling, and expressive digital movement." },
] as const;

export default function Projects({ categorized = false }: { categorized?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const [activeType, setActiveType] = useState<(typeof projectTypes)[number]["id"]>("all");
  const visibleProjects = categorized && activeType !== "all" ? projects.filter((project) => project.type === activeType) : projects;

  useLayoutEffect(() => {
    registerMotion();
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(motionMedia.desktop, () => {
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
          const image = card.querySelector(".project-image");
          const media = card.querySelector(".project-image img");
          gsap.from(card.querySelectorAll(".project-info > *"), { scrollTrigger: { trigger: card, start: "top 70%" }, x: index % 2 === 0 ? -36 : 36, opacity: 0, duration: .8, stagger: .08, ease: "power3.out" });
          gsap.from(image, { clipPath: index % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", duration: 1.15, ease: "power4.inOut", scrollTrigger: { trigger: card, start: "top 78%" } });
          gsap.fromTo(media, { scale: 1.1, yPercent: -3 }, { scale: 1.01, yPercent: 3, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 } });
        });
      });
      mm.add(motionMedia.mobile, () => {
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
          gsap.from(card.querySelectorAll(".project-reveal"), { scrollTrigger: { trigger: card, start: "top 84%" }, y: 24, opacity: 0, duration: .65, stagger: .08, ease: "power2.out" });
        });
      });
    }, section);
    return () => ctx.revert();
  }, [activeType, categorized]);

  return (
    <section ref={section} id="projects" data-scroll-section className="projects-section">
      <div className="projects-header">
        <div><span>03 / SELECTED WORK</span><span className="project-count">(03 PROJECTS)</span></div>
        <h2>Selected work that turns<br />ideas into <em>impact.</em></h2>
        <p>A collection of digital products shaped through strategy, design, and thoughtful technology.</p>
      </div>
      {categorized && <div className="project-categories" aria-label="Project categories">
        <div className="project-category-intro">
          <span>EXPLORE BY DISCIPLINE</span>
          <p>{projectTypes.find((type) => type.id === activeType)?.description}</p>
        </div>
        <div className="project-category-tabs" role="group" aria-label="Filter projects by discipline">
          {projectTypes.map((type) => <button type="button" className={activeType === type.id ? "is-active" : ""} aria-pressed={activeType === type.id} onClick={() => setActiveType(type.id)} key={type.id}><span>{type.label}</span><small>{type.id === "all" ? projects.length : projects.filter((project) => project.type === type.id).length}</small></button>)}
        </div>
      </div>}
      <div className="projects-list" aria-live="polite">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined} className="project-image project-reveal" aria-label={`View ${project.title} project`}>
              <Image src={project.image} alt={`${project.title} project presentation`} fill sizes="(max-width: 900px) 94vw, 58vw" />
              <span className="project-arrow"><ArrowUpRight size={24} /></span>
              {project.featured && <span className="featured-pill">FEATURED REDESIGN</span>}
            </a>
            <div className="project-info project-reveal">
              <div className="project-meta"><span>{project.number}</span><span>{project.category}</span><span>{project.year}</span></div>
              <div className="project-title-row"><h3>{project.title}</h3><p>{project.description}</p>{project.github && project.live && <div className="project-links"><a href={project.live} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={14} /></a><a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div>}</div>
            </div>
          </article>
        ))}
        {categorized && visibleProjects.length === 0 && <div className="projects-empty-state">
          <span>03 / MOTION DESIGN</span>
          <h3>Motion work is<br /><em>coming soon.</em></h3>
          <p>Dedicated motion design projects have not been published yet. This space is ready for title sequences, animated brand systems, product motion, and interaction studies.</p>
          <a href="mailto:hello@windsun.dev?subject=Motion%20design%20project">Discuss a motion project <ArrowUpRight size={17} /></a>
        </div>}
      </div>
      <a href="/contact" className="all-work-link">Start a project <span><ArrowUpRight size={20} /></span></a>
    </section>
  );
}
