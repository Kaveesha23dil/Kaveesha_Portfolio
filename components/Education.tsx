"use client";

import { Asterisk, ArrowUpRight, BookOpen } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".education-reveal", {
        scrollTrigger: { trigger: section.current, start: "top 78%" },
        y: 42,
        opacity: 0,
        duration: .85,
        stagger: .09,
        ease: "power3.out",
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
