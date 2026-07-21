"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { INTRO_COMPLETE_EVENT, INTRO_SESSION_KEY, motionMedia } from "@/components/motion";

function SunMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`sun-mark ${small ? "sun-mark--small" : ""}`} aria-hidden="true">
      <span />
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    let ctx: gsap.Context | undefined;
    const revealHero = () => {
      if (ctx) return;
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add(motionMedia.desktop, () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.from(".hero-reveal", { y: 36, opacity: 0, duration: 0.8, stagger: 0.1 })
            .from(".visual-card", { clipPath: "inset(0 100% 0 0)", x: 45, duration: 1.15, ease: "power4.inOut" }, "-=0.8")
            .from(".orbit-shape", { scale: 0.65, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.8")
            .from(".floating-note", { y: 25, opacity: 0, duration: 0.65 }, "-=0.4");
          gsap.to(".lime-orb", { y: -14, x: 7, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".side-orb", { y: 18, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".copy-col", { yPercent: -9, opacity: 0.72, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
          gsap.to(".visual-col", { yPercent: -4, scale: 0.97, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
        });
        mm.add(motionMedia.mobile, () => {
          gsap.from(".hero-reveal,.visual-card,.floating-note", { y: 24, opacity: 0, duration: 0.65, stagger: 0.08, ease: "power2.out" });
        });
        gsap.to(".sun-mark", { rotate: 360, duration: 18, ease: "none", repeat: -1 });
      }, root);
    };

    window.addEventListener(INTRO_COMPLETE_EVENT, revealHero, { once: true });
    if (sessionStorage.getItem(INTRO_SESSION_KEY)) requestAnimationFrame(revealHero);

    return () => {
      window.removeEventListener(INTRO_COMPLETE_EVENT, revealHero);
      ctx?.revert();
    };
  }, []);

  return (
    <main ref={root} id="home" data-scroll-section className="hero-shell">
      <div className="grain" />
      <div className="side-orb side-orb--left" />
      <div className="side-orb side-orb--right" />

      <section className="hero-grid">
        <div className="copy-col">
          <div className="hero-reveal availability"><span /> AVAILABLE FOR FREELANCE</div>
          <h1 className="hero-reveal">UI/UX Designer &amp;<br /><em>Creative</em> Developer<br />in Sri Lanka</h1>
          <p className="hero-reveal intro">I&apos;m Kaveesha Dilshan. I design and build user-centered websites, applications, and digital experiences that are beautiful, functional, and impactful.</p>
          <div className="hero-reveal actions">
            <a href="/projects" className="primary-btn">View Projects <ArrowRight size={17} /></a>
            <a href="mailto:hello@windsun.dev" className="secondary-btn">Hire Me <ArrowRight size={17} /></a>
          </div>
        </div>

        <div className="visual-col" aria-label="Designer portrait">
          <div className="orbit-shape lime-orb" />
          <div className="orbit-shape wire wire--one" />
          <div className="orbit-shape wire wire--two" />
          <div className="visual-card">
            <div className="card-glow" />
            <Image src="/hero-kaveesha.png" alt="Kaveesha, digital designer and developer" fill priority sizes="(max-width: 900px) 92vw, 42vw" />
            <span className="cross cross--one">+</span><span className="cross cross--two">+</span>
          </div>
          <div className="floating-note"><SunMark small /><p>Crafting digital<br />experiences that<br />connect and convert.</p><Sparkles size={14} /></div>
        </div>
      </section>
      <div className="floor-line" />
    </main>
  );
}
