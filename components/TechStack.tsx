"use client";

import { Asterisk, ArrowUpRight, Scissors } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiFigma, SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiGreensock, SiGit, SiMongodb, SiGo, SiFlutter, SiKotlin, SiHtml5, SiCss, SiJavascript, SiWordpress } from "react-icons/si";
import { TbBrandAdobePhotoshop, TbBrandAdobeAfterEffect, TbBrandAws } from "react-icons/tb";

const stack = [
  { name: "Figma", category: "Product design", icon: SiFigma },
  { name: "Photoshop", category: "Visual design", icon: TbBrandAdobePhotoshop },
  { name: "Next.js", category: "Framework", icon: SiNextdotjs },
  { name: "React", category: "Interface", icon: SiReact },
  { name: "TypeScript", category: "Development", icon: SiTypescript },
  { name: "Tailwind CSS", category: "Styling", icon: SiTailwindcss },
  { name: "GSAP", category: "Motion", icon: SiGreensock },
  { name: "Git & GitHub", category: "Workflow", icon: SiGit },
  { name: "MongoDB", category: "Database", icon: SiMongodb },
  { name: "AWS", category: "Cloud platform", icon: TbBrandAws },
  { name: "Go", category: "Backend development", icon: SiGo },
  { name: "Flutter", category: "Cross-platform apps", icon: SiFlutter },
  { name: "Kotlin", category: "Mobile development", icon: SiKotlin },
  { name: "HTML", category: "Web structure", icon: SiHtml5 },
  { name: "CSS", category: "Web styling", icon: SiCss },
  { name: "JavaScript", category: "Web development", icon: SiJavascript },
  { name: "CapCut", category: "Video editing", icon: Scissors },
  { name: "After Effects", category: "Motion graphics", icon: TbBrandAdobeAfterEffect },
  { name: "WordPress", category: "CMS development", icon: SiWordpress },
];

export default function TechStack() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".stack-reveal", {
        scrollTrigger: { trigger: section.current, start: "top 78%" },
        y: 42,
        opacity: 0,
        duration: .8,
        stagger: .07,
        ease: "power3.out",
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} data-scroll-section className="tech-stack-section">
      <div className="tech-stack-topline stack-reveal"><span>05 / TECH STACK</span><span>TOOLS I USE TO SHIP IDEAS</span></div>
      <div className="tech-stack-intro">
        <div className="stack-reveal">
          <p className="eyebrow"><Asterisk size={15} /> MY TOOLKIT</p>
          <h2>From first frame to <em>final build.</em></h2>
        </div>
        <p className="stack-reveal">A focused toolkit for designing distinctive interfaces, building responsive experiences, and adding motion that makes every interaction feel intentional.</p>
      </div>
      <div className="tech-stack-grid">
        {stack.map((tool, index) => {
          const Icon = tool.icon;
          return (
          <article className="tech-card stack-reveal" key={tool.name}>
            <div className="tech-mark" aria-label={`${tool.name} icon`}><Icon aria-hidden="true" /></div>
            <span>{String(index + 1).padStart(2, "0")} / {tool.category}</span>
            <h3>{tool.name}</h3>
            <ArrowUpRight size={18} />
          </article>
          );
        })}
      </div>
    </section>
  );
}
