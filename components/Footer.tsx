"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navigation = [
  { label: "Home", href: "#" },
  { label: "Selected work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Behance", href: "https://www.behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  const footer = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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
    }, footer);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footer} className="modern-footer">
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-main">
        <div className="footer-identity footer-reveal">
          <a href="#" className="footer-logo" aria-label="Wind Sun home">
            <span className="sun-mark"><span /></span>
            <span>WIND SUN</span>
          </a>
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

      <div className="footer-wordmark" aria-label="Wind Sun"><span>WIND</span><span>SUN</span></div>

      <div className="footer-bottom footer-reveal">
        <span>© 2026 WIND SUN. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED &amp; BUILT WITH INTENTION.</span>
        <a href="#" aria-label="Back to top">BACK TO TOP <i><ArrowUp size={15} /></i></a>
      </div>
    </footer>
  );
}
