"use client";

import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Asterisk, Check } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const outcomes = ["Clearer service positioning", "Responsive three-page experience", "Reusable visual design system", "Stronger conversion pathways"];

export default function IntrinsicCaseStudy() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".case-hero-reveal", { y: 45, opacity: 0, duration: .9, stagger: .1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".case-reveal").forEach((item) => {
        gsap.from(item, { scrollTrigger: { trigger: item, start: "top 84%" }, y: 50, opacity: 0, duration: .85, ease: "power3.out" });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="case-study-page">
      <section data-scroll-section id="case-study" className="case-hero">
        <a href="/projects" className="case-back case-hero-reveal"><ArrowLeft size={16} /> All projects</a>
        <div className="case-kicker case-hero-reveal"><span>UI/UX CASE STUDY</span><span>2026</span></div>
        <div className="case-title-row">
          <h1 className="case-hero-reveal">Intrinsic Tech<br /><em>Website Redesign</em></h1>
          <p className="case-hero-reveal">Turning a technically capable AI consultancy into a confident, accessible digital brand with a clear story and conversion-focused experience.</p>
        </div>
        <div className="case-meta case-hero-reveal">
          <div><span>ROLE</span><strong>UI/UX Designer</strong></div>
          <div><span>SCOPE</span><strong>Research, UX, UI, Responsive</strong></div>
          <div><span>INDUSTRY</span><strong>AI &amp; Technology</strong></div>
          <a href="https://intrinsic-tech.net/" target="_blank" rel="noreferrer">Visit live website <ArrowUpRight size={17} /></a>
        </div>
        <div className="case-cover case-hero-reveal"><Image src="/Home Page Desktop view.png" alt="Intrinsic Tech redesigned home page" fill priority sizes="100vw" /></div>
      </section>

      <section data-scroll-section className="case-overview">
        <div className="case-section-label case-reveal"><Asterisk size={14} /> THE CHALLENGE</div>
        <div className="case-two-col">
          <h2 className="case-reveal">Complex technology needed a <em>simpler story.</em></h2>
          <div className="case-body case-reveal"><p>Intrinsic Tech offers advanced AI services, but the website needed stronger hierarchy, clearer service discovery, and a more credible visual presence. The redesign helps business audiences understand the offer quickly without losing the company&apos;s technical depth.</p><p>The experience was reorganized around concise messaging, modular service cards, visible proof, and repeated calls to action across desktop and mobile.</p></div>
        </div>
        <div className="case-outcomes case-reveal">{outcomes.map((outcome) => <span key={outcome}><Check size={14} />{outcome}</span>)}</div>
      </section>

      <section data-scroll-section className="case-process-block">
        <div className="case-section-label case-reveal"><Asterisk size={14} /> FROM STRUCTURE TO SYSTEM</div>
        <div className="case-two-col"><h2 className="case-reveal">A consistent foundation for every <em>page and breakpoint.</em></h2><p className="case-body case-reveal">Low-fidelity structures established the content hierarchy first. A focused Poppins type system and blue-to-violet palette then created a recognizable language that can scale across services, case studies, and future content.</p></div>
        <div className="case-foundations case-reveal">
          <figure><Image src="/Home Page.png" alt="Intrinsic Tech home page wireframe" width={1440} height={3756} /><figcaption>01 / HOME WIREFRAME</figcaption></figure>
          <div className="case-system-stack">
            <figure><Image src="/TYPOGRAPHY SYSTEM.png" alt="Poppins typography system" width={361} height={542} /><figcaption>02 / TYPOGRAPHY</figcaption></figure>
            <figure><Image src="/Colors.png" alt="Intrinsic Tech color palette" width={880} height={380} /><figcaption>03 / COLOR SYSTEM</figcaption></figure>
          </div>
        </div>
      </section>

      <section data-scroll-section className="case-final-designs">
        <div className="case-section-label case-reveal"><Asterisk size={14} /> FINAL EXPERIENCE</div>
        <div className="case-two-col"><h2 className="case-reveal">Three connected journeys.<br /><em>One clear identity.</em></h2><p className="case-body case-reveal">The final layouts use generous spacing, high-contrast navigation, modular cards, and a recurring conversion panel. Each experience was designed in desktop and mobile formats—not simply compressed after the fact.</p></div>
        <div className="case-screen case-screen--wide case-reveal"><Image src="/Service Page Desktop view.png" alt="Final Intrinsic Tech services page desktop design" width={1440} height={4545} /></div>
        <div className="case-mobile-grid case-reveal">
          <figure className="case-screen"><Image src="/Mobile – Home.png" alt="Final home page mobile design" width={375} height={5643} /><figcaption>HOME</figcaption></figure>
          <figure className="case-screen"><Image src="/Mobile – Service.png" alt="Final services page mobile design" width={375} height={5850} /><figcaption>SERVICES</figcaption></figure>
          <figure className="case-screen"><Image src="/Mobile – Case Study.png" alt="Final case studies page mobile design" width={375} height={4670} /><figcaption>CASE STUDIES</figcaption></figure>
        </div>
      </section>

      <section data-scroll-section className="case-closing case-reveal">
        <span>THE RESULT</span><h2>A more credible product story, built to <em>grow with the business.</em></h2>
        <div><a href="https://intrinsic-tech.net/" target="_blank" rel="noreferrer">View live website <ArrowUpRight size={18} /></a><a href="/contact">Discuss a redesign <ArrowUpRight size={18} /></a></div>
      </section>
    </main>
  );
}
