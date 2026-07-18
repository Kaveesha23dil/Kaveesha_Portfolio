"use client";

import Image from "next/image";
import { ArrowUpRight, Asterisk, Circle } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = ["UI/UX Design", "Creative Development", "Motion", "Brand Systems"];
const stats = [
  { value: "05+", label: "Years of experience" },
  { value: "42", label: "Projects delivered" },
  { value: "18", label: "Global clients" },
];

export default function About() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        scrollTrigger: { trigger: section.current, start: "top 72%" },
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ".stats-row", start: "top 86%" },
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
      });
      gsap.to(".about-ring", {
        scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
        rotate: 110,
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="about" className="about-section">
      <div className="about-ring" aria-hidden="true"><span>DESIGN · DEVELOP · DELIVER · </span></div>
      <div className="about-topline about-reveal">
        <span>02 / ABOUT ME</span>
        <span className="about-status"><i /> BASED IN SRI LANKA — WORKING WORLDWIDE</span>
      </div>

      <div className="about-layout">
        <div className="about-heading about-reveal">
          <p className="eyebrow"><Asterisk size={15} /> A LITTLE ABOUT ME</p>
          <h2>I turn complex ideas into <em>simple, memorable</em> digital experiences.</h2>
        </div>

        <div className="about-story about-reveal">
          <p className="story-lead">I&apos;m Kaveesha Dilshan, a multidisciplinary designer and creative developer focused on the space where thoughtful design meets purposeful technology.</p>
          <p>I care about the details people feel but don&apos;t always notice—clear hierarchy, intuitive interaction, expressive motion, and a visual language that makes every product unmistakably its own.</p>
          <a href="mailto:hello@windsun.dev" className="about-link">More about my journey <ArrowUpRight size={18} /></a>
        </div>
      </div>

      <div className="about-showcase">
        <div className="about-portrait about-reveal">
          <div className="portrait-frame">
            <Image src="/about-portrait.png" alt="Kaveesha, designer and developer, in a creative studio" fill sizes="(max-width: 800px) 92vw, 38vw" />
            <div className="portrait-shade" />
            <span className="portrait-caption">DESIGNER<br />&amp; DEVELOPER</span>
            <span className="portrait-year">© 2026</span>
          </div>
        </div>

        <div className="about-details">
          <div className="skill-list about-reveal">
            <p>WHAT I DO</p>
            {skills.map((skill, index) => (
              <div key={skill} className="skill-row">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{skill}</strong>
                <Circle size={8} fill="currentColor" />
              </div>
            ))}
          </div>

          <div className="quote-card about-reveal">
            <Asterisk size={25} />
            <p>Good design should feel inevitable—clear in purpose, distinct in character, and effortless to use.</p>
          </div>
        </div>
      </div>

      <div className="stats-row">
        {stats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
