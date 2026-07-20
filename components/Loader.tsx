"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "wind-sun-intro-seen";
const INTRO_COMPLETE_EVENT = "portfolio:intro-complete";

export default function Loader() {
  const loader = useRef<HTMLDivElement>(null);
  const limeLayer = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      queueMicrotask(() => {
        setVisible(false);
        window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
      });
      return;
    }

    const loaderElement = loader.current;
    const limeLayerElement = limeLayer.current;

    if (!loaderElement || !limeLayerElement) {
      queueMicrotask(() => {
        setVisible(false);
        window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
      });
      return;
    }

    document.body.classList.add("is-loading");
    const progress = { value: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let completed = false;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          completed = true;
          sessionStorage.setItem(SESSION_KEY, "true");
          document.body.classList.remove("is-loading");
          setVisible(false);
          window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
        },
      });

      timeline
        .from(".loader-brand > *", {
          y: 22,
          opacity: 0,
          duration: reducedMotion ? 0.01 : 0.55,
          stagger: 0.08,
          ease: "power3.out",
        })
        .to(progress, {
          value: 100,
          duration: reducedMotion ? 0.1 : 1.45,
          ease: "power2.inOut",
          onUpdate: () => {
            if (number.current) number.current.textContent = Math.round(progress.value).toString().padStart(3, "0");
          },
        }, reducedMotion ? 0 : "-=0.2")
        .to(".loader-line-fill", { scaleX: 1, duration: reducedMotion ? 0.1 : 1.45, ease: "power2.inOut" }, "<")
        .to(".loader-status", { y: -12, opacity: 0, duration: reducedMotion ? 0.01 : 0.25 })
        .to(loaderElement, {
          clipPath: "inset(0 0 100% 0)",
          duration: reducedMotion ? 0.01 : 0.9,
          ease: "power4.inOut",
        })
        .to(limeLayerElement, { scaleY: 0, duration: reducedMotion ? 0.01 : 0.7, ease: "power4.inOut" }, "-=0.72");
    }, loaderElement);

    return () => {
      ctx.revert();
      document.body.classList.remove("is-loading");
      if (!completed) sessionStorage.removeItem(SESSION_KEY);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={limeLayer} className="loader-lime-layer" aria-hidden="true" />
      <div ref={loader} className="site-loader" role="status" aria-label="Loading portfolio" aria-live="polite">
        <div className="loader-grid" aria-hidden="true" />
        <div className="loader-brand">
          <span className="loader-sun"><i /></span>
          <span>KAVEESHA DILSHAN</span>
        </div>
        <div className="loader-status">
          <div className="loader-copy"><span>LOADING EXPERIENCE</span><span ref={number}>000</span></div>
          <div className="loader-line"><span className="loader-line-fill" /></div>
        </div>
        <span className="loader-index">PORTFOLIO / 2026</span>
      </div>
    </>
  );
}
