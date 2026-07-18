"use client";

import { ArrowDownRight, Asterisk, Check } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    title: "Discover",
    label: "LISTEN & ALIGN",
    description: "We unpack the challenge, audience, goals, and constraints so every decision starts from a shared understanding.",
    outputs: ["Kickoff workshop", "Research & audit", "Project roadmap"],
  },
  {
    number: "02",
    title: "Define",
    label: "FOCUS THE IDEA",
    description: "Insights become a clear strategy, product structure, and creative direction designed to solve the right problem.",
    outputs: ["Experience strategy", "Information architecture", "Creative direction"],
  },
  {
    number: "03",
    title: "Design",
    label: "SHAPE THE EXPERIENCE",
    description: "We explore, prototype, and refine the visual and interactive system until every screen feels clear and distinctive.",
    outputs: ["UX & UI design", "Interactive prototype", "Design system"],
  },
  {
    number: "04",
    title: "Deliver",
    label: "BUILD & LAUNCH",
    description: "The final experience is developed, tested, and polished for a confident launch—with support beyond handoff.",
    outputs: ["Development", "Quality assurance", "Launch support"],
  },
];

export default function Process() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".process-reveal", {
        scrollTrigger: { trigger: section.current, start: "top 72%" },
        y: 42,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".process-step", {
        scrollTrigger: { trigger: ".process-steps", start: "top 77%" },
        y: 52,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.fromTo(".process-progress i", { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: ".process-steps", start: "top 78%", end: "bottom 72%", scrub: 1 },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="process" className="process-section">
      <div className="process-topline process-reveal">
        <span>05 / WORK PROCESS</span>
        <span>ONE CLEAR PATH · FOUR FOCUSED PHASES</span>
      </div>

      <div className="process-intro">
        <div className="process-heading process-reveal">
          <p className="eyebrow"><Asterisk size={15} /> HOW WE&apos;LL WORK</p>
          <h2>A simple process for <em>meaningful outcomes.</em></h2>
        </div>
        <p className="process-lead process-reveal">Collaborative by nature and clear by design. You&apos;ll always know what we&apos;re solving, what comes next, and why it matters.</p>
      </div>

      <div className="process-progress" aria-hidden="true"><i /></div>

      <div className="process-steps">
        {steps.map((step) => (
          <article className="process-step" key={step.number}>
            <div className="process-step-head">
              <span className="process-number">{step.number}</span>
              <ArrowDownRight size={21} />
            </div>
            <div className="process-step-title">
              <span>{step.label}</span>
              <h3>{step.title}</h3>
            </div>
            <p>{step.description}</p>
            <ul>
              {step.outputs.map((output) => <li key={output}><Check size={12} />{output}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <div className="process-note process-reveal">
        <span className="process-note-mark">*</span>
        <p>Every engagement is different. The process flexes to fit your team, timeline, and ambition—without losing clarity.</p>
        <a href="mailto:hello@windsun.dev?subject=Tell%20me%20about%20your%20process">Discuss your project <ArrowDownRight size={18} /></a>
      </div>
    </section>
  );
}
