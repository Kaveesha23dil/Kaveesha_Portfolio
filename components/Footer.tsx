"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motionMedia, registerMotion } from "@/components/motion";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Selected work", href: "/projects" },
  { label: "Services", href: "/about#services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/about#process" },
];

const socials = [
  { label: "Behance", href: "https://www.behance.net/kaveeshadilshan10" },
  { label: "Dribbble", href: "https://dribbble.com/Kavee23" },
  { label: "GitHub", href: "https://github.com/Kaveesha23dil" },
];

export default function Footer() {
  const footer = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerMotion();
    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        scrollTrigger: { trigger: footer.current, start: "top 88%" },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".footer-wordmark span", {
        scrollTrigger: { trigger: ".footer-wordmark", start: "top 90%" },
        yPercent: 110,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
      });
      const mm = gsap.matchMedia();
      mm.add(motionMedia.desktop, () => {
        gsap.fromTo(".footer-glow", { scale: .65, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: footer.current, start: "top bottom", end: "bottom bottom", scrub: 1 } });
        gsap.from(".footer-column a", { x: -12, opacity: 0, duration: .4, stagger: .04, ease: "power2.out", scrollTrigger: { trigger: ".footer-main", start: "top 82%" } });
      });
    }, footer);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footer} className="modern-footer">
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-main">
        <div className="footer-identity footer-reveal">
          <Link href="/" className="footer-logo" aria-label="Kaveesha Dilshan home">
            <span className="sun-mark"><span /></span>
            <span>KAVEESHA DILSHAN</span>
          </Link>
          <p>Independent designer and creative developer crafting thoughtful digital experiences for ambitious brands.</p>
          <span className="footer-status"><i /> AVAILABLE FOR SELECT PROJECTS</span>
        </div>

        <div className="footer-column footer-reveal">
          <span className="footer-label">EXPLORE</span>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          </nav>
        </div>

        <div className="footer-column footer-reveal">
          <span className="footer-label">FOLLOW</span>
          <nav aria-label="Social links">
            {socials.map((item) => <a href={item.href} target="_blank" rel="noreferrer" key={item.label}>{item.label}<ArrowUpRight size={13} /></a>)}
          </nav>
        </div>

        <div className="footer-contact footer-reveal">
          <span className="footer-label">SAY HELLO</span>
          <p>Have a project in mind or just want to connect?</p>
          <a href="mailto:hello@windsun.dev" className="footer-email">hello@windsun.dev <ArrowUpRight size={18} /></a>
          <span>COLOMBO, SRI LANKA · UTC +05:30</span>
        </div>
      </div>

      <div className="footer-wordmark" aria-label="Kaveesha Dilshan"><span>KAVEESHA</span><span>DILSHAN</span></div>

      <div className="footer-bottom footer-reveal">
        <span>© 2026 KAVEESHA DILSHAN. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED &amp; BUILT WITH INTENTION.</span>
        <a href="#" aria-label="Back to top">BACK TO TOP <i><ArrowUp size={15} /></i></a>
      </div>
    </footer>
  );
}
