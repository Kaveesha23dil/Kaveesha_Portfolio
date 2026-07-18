"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const sectionNames: Record<string, string> = {
  home: "HOME",
  about: "ABOUT",
  projects: "WORK",
  services: "SERVICES",
  process: "PROCESS",
  testimonials: "WORDS",
  contact: "CONTACT",
};

export default function MotionController() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const progressBar = useRef<HTMLElement>(null);
  const progressNumber = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: reduceMotion ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
      touchMultiplier: 1.1,
    });
    const onScroll = ({ progress: scrollProgress }: { progress: number }) => {
      if (progressBar.current) progressBar.current.style.transform = `scaleY(${scrollProgress})`;
      if (progressNumber.current) progressNumber.current.textContent = String(Math.round(scrollProgress * 100)).padStart(2, "0");
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const anchorHandlers: Array<[HTMLAnchorElement, (event: MouseEvent) => void]> = [];
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      const handler = (event: MouseEvent) => {
        const href = anchor.getAttribute("href");
        if (!href) return;
        event.preventDefault();
        lenis.scrollTo(href === "#" ? 0 : href, { offset: 0, duration: reduceMotion ? 0 : 1.35 });
      };
      anchor.addEventListener("click", handler);
      anchorHandlers.push([anchor, handler]);
    });

    const activate = (id: string) => {
      setActiveSection(id);
    };
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-section]"));
    const observers = sections.map((section) => ScrollTrigger.create({
      trigger: section,
      start: "top 48%",
      end: "bottom 48%",
      onEnter: () => activate(section.id),
      onEnterBack: () => activate(section.id),
    }));
    activate("home");

    const cleanupMagnetic: Array<() => void> = [];
    if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>(".primary-btn,.secondary-btn,.talk-btn,.all-work-link,.contact-submit").forEach((element) => {
        const move = (event: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          gsap.to(element, { x: (event.clientX - rect.left - rect.width / 2) * .13, y: (event.clientY - rect.top - rect.height / 2) * .16, duration: .35, ease: "power2.out" });
        };
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: .65, ease: "elastic.out(1, .4)" });
        element.addEventListener("mousemove", move);
        element.addEventListener("mouseleave", leave);
        cleanupMagnetic.push(() => { element.removeEventListener("mousemove", move); element.removeEventListener("mouseleave", leave); });
      });
    }

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.utils.toArray<HTMLElement>("[data-scroll-section]").forEach((section) => {
          const heading = section.querySelector("h2");
          if (heading) gsap.fromTo(heading, { yPercent: 7 }, { yPercent: -3, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "top 15%", scrub: 1 } });
        });
        gsap.utils.toArray<HTMLElement>(".service-icon,.process-step-head svg,.testimonial-card-top svg").forEach((accent) => {
          gsap.to(accent, { y: -8, ease: "none", scrollTrigger: { trigger: accent, start: "top bottom", end: "bottom top", scrub: 1.2 } });
        });
      }
    });

    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
      observers.forEach((observer) => observer.kill());
      anchorHandlers.forEach(([anchor, handler]) => anchor.removeEventListener("click", handler));
      cleanupMagnetic.forEach((cleanup) => cleanup());
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [pathname]);

  return (
    <div className="scroll-indicator" aria-hidden="true">
      <span>{sectionNames[activeSection] ?? "EXPLORE"}</span>
      <i><b ref={progressBar} /></i>
      <small ref={progressNumber}>00</small>
    </div>
  );
}
