"use client";

import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Asterisk, Check, Code2 } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motionMedia, registerMotion } from "@/components/motion";

export type DevelopmentProject = {
  eyebrow: string;
  title: string;
  accent: string;
  summary: string;
  year: string;
  role: string;
  scope: string;
  mockup: string;
  live: string;
  github: string;
  challenge: string;
  solution: string;
  contributions: { title: string; detail: string }[];
  process: { number: string; title: string; detail: string }[];
  features: string[];
  stack: string[];
  challenges: { title: string; detail: string }[];
  outcome: string;
  disclaimer?: string;
};

export default function DevelopmentCaseStudy({ project }: { project: DevelopmentProject }) {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    registerMotion();
    const ctx = gsap.context(() => {
      gsap.from(".dev-hero-reveal", { y: 45, opacity: 0, duration: .9, stagger: .1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".dev-reveal").forEach((item) => gsap.from(item, { scrollTrigger: { trigger: item, start: "top 84%" }, y: 42, opacity: 0, duration: .8, ease: "power3.out" }));
      const mm = gsap.matchMedia();
      mm.add(motionMedia.desktop, () => {
        gsap.from(".dev-case-cover", { clipPath: "inset(0 0 100% 0)", duration: 1.25, ease: "power4.inOut", delay: .25 });
        gsap.fromTo(".dev-case-cover img", { scale: 1.08 }, { scale: 1, yPercent: 4, ease: "none", scrollTrigger: { trigger: ".dev-case-cover", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.from(".dev-info-card", { scale: .95, duration: .7, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: ".dev-card-grid", start: "top 80%" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="dev-case-page">
      <section data-scroll-section id="project-detail" className="dev-case-hero">
        <a href="/projects" className="case-back dev-hero-reveal"><ArrowLeft size={16} /> All projects</a>
        <div className="case-kicker dev-hero-reveal"><span>{project.eyebrow}</span><span>{project.year}</span></div>
        <div className="dev-title-row"><h1 className="dev-hero-reveal">{project.title}<br /><em>{project.accent}</em></h1><p className="dev-hero-reveal">{project.summary}</p></div>
        <div className="case-meta dev-hero-reveal"><div><span>ROLE</span><strong>{project.role}</strong></div><div><span>SCOPE</span><strong>{project.scope}</strong></div><div><span>DELIVERABLE</span><strong>Production website</strong></div><a href={project.live} target="_blank" rel="noreferrer">View live site <ArrowUpRight size={17} /></a></div>
        {project.disclaimer && <p className="case-disclaimer dev-hero-reveal">{project.disclaimer}</p>}
        <div className="dev-case-cover dev-hero-reveal"><Image src={project.mockup} alt={`${project.title} presentation mockup`} fill priority sizes="100vw" /></div>
      </section>

      <section data-scroll-section className="dev-context">
        <div className="case-section-label dev-reveal"><Asterisk size={14} /> PROJECT CONTEXT</div>
        <div className="dev-context-grid"><article className="dev-reveal"><span>THE CHALLENGE</span><h2>{project.challenge}</h2></article><article className="dev-reveal"><span>THE SOLUTION</span><p>{project.solution}</p></article></div>
      </section>

      <section data-scroll-section className="dev-contribution">
        <div className="case-section-label dev-reveal"><Asterisk size={14} /> WHAT I DID</div>
        <div className="dev-section-heading"><h2 className="dev-reveal">My contribution from concept to <em>working experience.</em></h2><p className="dev-reveal">I owned the front-end implementation and translated the creative direction into reusable components, interaction logic, and production-ready behavior.</p></div>
        <div className="dev-card-grid">{project.contributions.map((item, index) => <article className="dev-info-card dev-reveal" key={item.title}><span>{String(index + 1).padStart(2,"0")}</span><Code2 size={22} /><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
      </section>

      <section data-scroll-section className="dev-process">
        <div className="case-section-label dev-reveal"><Asterisk size={14} /> HOW I BUILT IT</div>
        <div className="dev-section-heading"><h2 className="dev-reveal">A deliberate build process,<br /><em>step by step.</em></h2></div>
        <div className="dev-process-list">{project.process.map((step) => <article className="dev-reveal" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.detail}</p></article>)}</div>
      </section>

      <section data-scroll-section className="dev-technical">
        <div className="dev-feature-panel dev-reveal"><span>CORE FEATURES</span><ul>{project.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul></div>
        <div className="dev-stack-panel dev-reveal"><span>TECHNOLOGY</span><div>{project.stack.map((item) => <strong key={item}>{item}</strong>)}</div><a href={project.github} target="_blank" rel="noreferrer">Explore source code <ArrowUpRight size={17} /></a></div>
      </section>

      <section data-scroll-section className="dev-challenges">
        <div className="case-section-label dev-reveal"><Asterisk size={14} /> PROBLEMS I SOLVED</div>
        <div className="dev-challenge-list">{project.challenges.map((item) => <article className="dev-reveal" key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
      </section>

      <section data-scroll-section className="case-closing dev-reveal"><span>THE OUTCOME</span><h2>{project.outcome}</h2><div><a href={project.live} target="_blank" rel="noreferrer">Open live project <ArrowUpRight size={18} /></a><a href={project.github} target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={18} /></a></div></section>
    </main>
  );
}
