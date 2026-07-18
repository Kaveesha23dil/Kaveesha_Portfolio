"use client";

import { ArrowUpRight, Asterisk, Braces, Layers3, PenTool, Sparkles } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    number: "01",
    title: "Product & UX Design",
    description: "Useful, intuitive digital products shaped around real people and clear business goals.",
    tags: ["UX STRATEGY", "WIREFRAMES", "UI SYSTEMS"],
    icon: Layers3,
  },
  {
    number: "02",
    title: "Creative Development",
    description: "Fast, responsive websites with thoughtful interactions and a polished, production-ready finish.",
    tags: ["NEXT.JS", "ANIMATION", "CMS"],
    icon: Braces,
  },
  {
    number: "03",
    title: "Brand & Art Direction",
    description: "Distinct visual identities and flexible design languages built to stay recognizable everywhere.",
    tags: ["IDENTITY", "DIRECTION", "GUIDELINES"],
    icon: PenTool,
  },
  {
    number: "04",
    title: "Motion & Interaction",
    description: "Purposeful movement that guides attention, adds character, and makes every interaction feel alive.",
    tags: ["PROTOTYPES", "MICRO-MOTION", "GSAP"],
    icon: Sparkles,
  },
];

export default function Services() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".services-reveal", {
        scrollTrigger: { trigger: section.current, start: "top 72%" },
        y: 42,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
      });
      gsap.from(".service-card", {
        scrollTrigger: { trigger: ".services-grid", start: "top 78%" },
        y: 48,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="services" data-scroll-section className="services-section">
      <div className="services-orbit" aria-hidden="true"><span /></div>
      <div className="services-topline services-reveal">
        <span>04 / SERVICES</span>
        <span>STRATEGY · DESIGN · DEVELOPMENT</span>
      </div>

      <div className="services-intro">
        <div className="services-heading services-reveal">
          <p className="eyebrow"><Asterisk size={15} /> HOW I CAN HELP</p>
          <h2>From first sketch to <em>final pixel.</em></h2>
        </div>
        <div className="services-copy services-reveal">
          <p>I partner with ambitious teams to turn early ideas into clear, memorable digital experiences—combining sharp thinking, expressive design, and reliable code.</p>
          <a href="mailto:hello@windsun.dev?subject=Project%20enquiry">Start a project <ArrowUpRight size={18} /></a>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article className="service-card" key={service.title}>
              <div className="service-card-top">
                <span>{service.number}</span>
                <span className="service-icon"><Icon size={22} strokeWidth={1.5} /></span>
              </div>
              <div className="service-card-body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className="service-tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          );
        })}
      </div>

      <div className="services-cta services-reveal">
        <span>Have something else in mind?</span>
        <a href="mailto:hello@windsun.dev?subject=Let%27s%20work%20together">Let&apos;s shape it together <ArrowUpRight size={21} /></a>
      </div>
    </section>
  );
}
