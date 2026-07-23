"use client";

import { ArrowUpRight, Asterisk, Quote, Star } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motionMedia, registerMotion } from "@/components/motion";

const testimonials = [
  {
    quote: "Kaveesha brought rare clarity to a complex product. The experience now feels effortless, focused, and unmistakably ours.",
    name: "Maya Chen",
    role: "Co-founder, Nova Finance",
    initials: "MC",
    project: "PRODUCT DESIGN · 2026",
  },
  {
    quote: "The process was thoughtful from day one. Every design decision had a reason, and the final site exceeded what we imagined.",
    name: "Daniel Reed",
    role: "Creative Director, Roam",
    initials: "DR",
    project: "WEB EXPERIENCE · 2025",
  },
  {
    quote: "A true creative partner—strategic, responsive, and obsessive about the details that make a product feel exceptional.",
    name: "Amara Silva",
    role: "Head of Product, Synapse AI",
    initials: "AS",
    project: "BRAND & PRODUCT · 2025",
  },
];

export default function Testimonials() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerMotion();
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-reveal", {
        scrollTrigger: { trigger: section.current, start: "top 72%" },
        y: 42,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      });
      const mm = gsap.matchMedia();
      mm.add(motionMedia.desktop, () => {
        gsap.from(".testimonial-card", { scrollTrigger: { trigger: ".testimonials-grid", start: "top 78%" }, y: 50, scale: .96, opacity: 0, duration: .85, stagger: .12, ease: "power3.out" });
        gsap.from(".testimonial-card blockquote", { scrollTrigger: { trigger: ".testimonials-grid", start: "top 70%" }, clipPath: "inset(0 0 100% 0)", y: 18, duration: .8, stagger: .1, ease: "power3.out" });
        gsap.to(".testimonial-halo", { rotate: 90, scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1.2 } });
      });
      mm.add(motionMedia.mobile, () => gsap.from(".testimonial-card", { scrollTrigger: { trigger: ".testimonials-grid", start: "top 84%" }, y: 24, opacity: 0, duration: .6, stagger: .08, ease: "power2.out" }));
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="testimonials" data-scroll-section className="testimonials-section">
      <div className="testimonial-halo" aria-hidden="true"><i /><i /><i /></div>

      <div className="testimonials-topline testimonials-reveal">
        <span>06 / TESTIMONIALS</span>
        <span>TRUST BUILT THROUGH GOOD WORK</span>
      </div>

      <div className="testimonials-intro">
        <div className="testimonials-heading testimonials-reveal">
          <p className="eyebrow"><Asterisk size={15} /> KIND WORDS</p>
          <h2>Good work leaves a <em>lasting impression.</em></h2>
        </div>
        <div className="testimonial-rating testimonials-reveal" aria-label="Rated five out of five">
          <div>{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}</div>
          <strong>5.0</strong>
          <span>AVERAGE CLIENT RATING</span>
        </div>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((item, index) => (
          <article className={`testimonial-card ${index === 0 ? "testimonial-card--featured" : ""}`} key={item.name}>
            <div className="testimonial-card-top">
              <Quote size={index === 0 ? 42 : 29} fill="currentColor" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <blockquote>{item.quote}</blockquote>
            <div className="testimonial-person">
              <span className="testimonial-avatar">{item.initials}</span>
              <div><strong>{item.name}</strong><span>{item.role}</span></div>
              <small>{item.project}</small>
            </div>
          </article>
        ))}
      </div>

      <div className="testimonials-footer testimonials-reveal">
        <div><span>18</span><p>happy clients<br />across 9 countries</p></div>
        <p>Great partnerships begin with an honest conversation.</p>
        <a href="mailto:kaveeshadilshankd23@gmail.com?subject=Let%27s%20create%20something%20great">Become the next success story <ArrowUpRight size={19} /></a>
      </div>
    </section>
  );
}
