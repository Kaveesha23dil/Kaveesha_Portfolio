"use client";

import Image from "next/image";
import { ArrowRight, Cloud, Menu, Sparkles, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Loader from "@/components/Loader";

const links = ["Home", "Projects", "Services", "About", "Process", "Testimonials", "Contact"];

function SunMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`sun-mark ${small ? "sun-mark--small" : ""}`} aria-hidden="true">
      <span />
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".nav-in", { y: -18, opacity: 0, duration: 0.7 })
        .from(".hero-reveal", { y: 36, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.35")
        .from(".visual-card", { x: 55, opacity: 0, scale: 0.96, duration: 1 }, "-=0.85")
        .from(".orbit-shape", { scale: 0, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.8")
        .from(".floating-note", { y: 25, opacity: 0, duration: 0.65 }, "-=0.4");

      gsap.to(".sun-mark", { rotate: 360, duration: 18, ease: "none", repeat: -1 });
      gsap.to(".lime-orb", { y: -14, x: 7, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".side-orb", { y: 18, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="hero-shell">
      <Loader />
      <div className="grain" />
      <div className="side-orb side-orb--left" />
      <div className="side-orb side-orb--right" />

      <header className="nav-in topbar">
        <a href="#" className="brand" aria-label="Wind Sun home"><SunMark /><span>WIND SUN</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link, index) => <a key={link} href={`#${link.toLowerCase()}`} className={index === 0 ? "active" : ""}>{link}</a>)}
        </nav>
        <a className="talk-btn" href="mailto:hello@windsun.dev"><span>Let&apos;s Talk</span><i><ArrowRight size={17} /></i></a>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </header>

      {open && <nav className="mobile-nav">{links.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}</nav>}

      <section className="hero-grid">
        <div className="copy-col">
          <div className="hero-reveal availability"><span /> AVAILABLE FOR FREELANCE</div>
          <h1 className="hero-reveal">Transforming<br /><em>Ideas</em> Into Digital<br />Products</h1>
          <p className="hero-reveal intro">I design and build user-centered websites, applications, and digital experiences that are beautiful, functional, and impactful.</p>
          <div className="hero-reveal actions">
            <a href="#projects" className="primary-btn">View Projects <ArrowRight size={17} /></a>
            <a href="mailto:hello@windsun.dev" className="secondary-btn">Hire Me <ArrowRight size={17} /></a>
          </div>
          <div className="hero-reveal trust">
            <p>Trusted by forward-thinking brands</p>
            <div className="brands">
              <span><i className="loop" />Looply</span><span><i className="coin">P</i>Paywave</span><span><i className="coin">S</i>Stackly</span><span><i className="coin">N</i>Nimble</span><span><Cloud size={18} />Cloudix</span>
            </div>
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
