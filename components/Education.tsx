"use client";

import { Asterisk, ArrowUpRight, BookOpen } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motionMedia, registerMotion } from "@/components/motion";

const education = [
  {
    period: "FOUNDATION",
    title: "Software Engineering & Computing",
    type: "Academic focus",
    description: "A technical foundation in programming, software architecture, databases, web technologies, and structured problem-solving.",
  },
  {
    period: "SPECIALIZATION",
    title: "UI/UX & Product Design",
    type: "Design practice",
    description: "User research, information architecture, interaction design, prototyping, visual systems, and accessible interface design.",
  },
  {
    period: "ONGOING",
    title: "Creative Development & Motion",
    type: "Continuous learning",
    description: "Expanding the bridge between design and engineering through responsive development, creative coding, animation, and emerging tools.",
  },
];

export default function Education() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerMotion();
    const ctx = gsap.context(() => {
      gsap.from(".education-topline,.education-intro .education-reveal", {
        scrollTrigger: { trigger: section.current, start: "top 78%" },
        y: 42,
        opacity: 0,
        duration: .85,
        stagger: .09,
        ease: "power3.out",
      });
      const mm = gsap.matchMedia();
      mm.add(motionMedia.desktop, () => {
        gsap.fromTo(".education-item", { x: (index) => index % 2 === 0 ? -34 : 34, opacity: 0 }, { x: 0, opacity: 1, duration: .75, stagger: .1, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".education-list", start: "top 82%", once: true } });
        gsap.fromTo(".education-list", { "--education-progress": "0%" }, { "--education-progress": "100%", ease: "none", scrollTrigger: { trigger: ".education-list", start: "top 75%", end: "bottom 45%", scrub: 1 } });
      });
      mm.add(motionMedia.mobile, () => {
        gsap.fromTo(".education-item", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .07, ease: "power2.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".education-list", start: "top 88%", once: true } });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} data-scroll-section className="education-section">
      <div className="education-topline education-reveal"><span>03 / EDUCATION</span><span>LEARNING THAT SHAPES THE WORK</span></div>
      <div className="education-intro">
        <div className="education-reveal">
          <p className="eyebrow"><Asterisk size={15} /> EDUCATION &amp; GROWTH</p>
          <h2>Built on curiosity.<br /><em>Refined through practice.</em></h2>
        </div>
        <div className="education-note education-reveal"><BookOpen size={22} /><p>My education combines software thinking, human-centered design, and continuous experimentation—giving me the range to take ideas from concept to working experience.</p></div>
      </div>
      <div className="education-list">
        {education.map((item, index) => (
          <article className="education-item education-reveal" key={item.title}>
            <span className="education-number">{String(index + 1).padStart(2, "0")}</span>
            <div><span>{item.period}</span><h3>{item.title}</h3></div>
            <strong>{item.type}</strong>
            <p>{item.description}</p>
            <ArrowUpRight size={18} />
          </article>
        ))}
      </div>
    </section>
  );
}
