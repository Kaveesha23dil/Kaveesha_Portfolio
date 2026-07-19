"use client";

import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Asterisk, Check, MoveDownRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const outcomes = ["Clearer service positioning", "Responsive three-page experience", "Reusable visual design system", "Stronger conversion pathways"];
const principles = [
  { number: "01", title: "Clarity before complexity", copy: "Technical services are translated into direct, benefit-led messages that business audiences can scan quickly." },
  { number: "02", title: "Confidence through contrast", copy: "Electric blue, deep violet, and generous white space give the brand a precise, modern technology presence." },
  { number: "03", title: "One system, every screen", copy: "Shared type, spacing, card, and CTA rules keep the experience consistent from desktop to mobile." },
];
const contributions = [
  { title: "UX structure", detail: "Reorganized Home, Services, and Case Studies around clear user questions, scannable content, and conversion points." },
  { title: "Visual direction", detail: "Created the blue-to-violet identity, Poppins type hierarchy, cards, spacing, icon treatment, and reusable interface patterns." },
  { title: "Responsive design", detail: "Designed dedicated mobile compositions for all three journeys instead of shrinking the desktop layouts." },
  { title: "Design handoff", detail: "Prepared consistent final screens and a reusable system that supports implementation and future service content." },
];

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
        <div className="case-cover case-hero-reveal">
          <div className="case-cover-chrome"><span /><span /><span /><strong>intrinsic-tech.net</strong></div>
          <Image src="/Home Page Desktop view.png" alt="Intrinsic Tech redesigned home page" fill priority sizes="100vw" />
          <div className="case-cover-stamp"><span>SCROLL TO EXPLORE</span><MoveDownRight size={20} /></div>
        </div>
      </section>

      <section data-scroll-section className="case-overview">
        <div className="case-section-label case-reveal"><Asterisk size={14} /> THE CHALLENGE</div>
        <div className="case-two-col">
          <h2 className="case-reveal">Complex technology needed a <em>simpler story.</em></h2>
          <div className="case-body case-reveal"><p>Intrinsic Tech offers advanced AI services, but the website needed stronger hierarchy, clearer service discovery, and a more credible visual presence. The redesign helps business audiences understand the offer quickly without losing the company&apos;s technical depth.</p><p>The experience was reorganized around concise messaging, modular service cards, visible proof, and repeated calls to action across desktop and mobile.</p></div>
        </div>
        <div className="case-outcomes case-reveal">{outcomes.map((outcome) => <span key={outcome}><Check size={14} />{outcome}</span>)}</div>
      </section>

      <section data-scroll-section className="case-statement">
        <span className="case-reveal">THE CORE IDEA / 2026</span>
        <p className="case-reveal">Make advanced AI feel <em>clear, credible,</em> and ready for business.</p>
      </section>

      <section data-scroll-section className="dev-contribution">
        <div className="case-section-label case-reveal"><Asterisk size={14} /> WHAT I DID</div>
        <div className="dev-section-heading"><h2 className="case-reveal">My role across the complete <em>redesign process.</em></h2><p className="case-reveal">I worked from information structure and low-fidelity layouts through visual design, responsive adaptation, and implementation-ready handoff.</p></div>
        <div className="dev-card-grid">{contributions.map((item, index) => <article className="dev-info-card case-reveal" key={item.title}><span>{String(index + 1).padStart(2,"0")}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
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

      <section data-scroll-section className="case-principles">
        <div className="case-section-label case-reveal"><Asterisk size={14} /> DESIGN PRINCIPLES</div>
        <div className="case-principles-head"><h2 className="case-reveal">A premium digital language built on <em>three simple rules.</em></h2><span className="case-reveal">STRATEGY / ART DIRECTION / SYSTEM</span></div>
        <div className="case-principles-grid">{principles.map((item) => <article className="case-reveal" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
      </section>

      <section data-scroll-section className="case-final-designs">
        <div className="case-section-label case-reveal"><Asterisk size={14} /> FINAL EXPERIENCE</div>
        <div className="case-two-col"><h2 className="case-reveal">Three connected journeys.<br /><em>One clear identity.</em></h2><p className="case-body case-reveal">The final layouts use generous spacing, high-contrast navigation, modular cards, and a recurring conversion panel. Each experience was designed in desktop and mobile formats—not simply compressed after the fact.</p></div>
        <div className="case-screen case-screen--wide case-reveal"><Image src="/Service Page Desktop view.png" alt="Final Intrinsic Tech services page desktop design" width={1440} height={4545} /></div>
        <div className="case-showcase-split case-reveal">
          <figure><Image src="/Home Page Desktop view.png" alt="Intrinsic Tech home page interface" width={1440} height={5500} /><figcaption>01 / HOME — BRAND &amp; POSITIONING</figcaption></figure>
          <figure><Image src="/Case Study Page Desktop view.png" alt="Intrinsic Tech case studies interface" width={1440} height={4550} /><figcaption>02 / CASE STUDIES — PROOF &amp; TRUST</figcaption></figure>
        </div>
        <div className="case-mobile-grid case-reveal">
          <figure className="case-screen"><Image src="/Mobile – Home.png" alt="Final home page mobile design" width={375} height={5643} /><figcaption>HOME</figcaption></figure>
          <figure className="case-screen"><Image src="/Mobile – Service.png" alt="Final services page mobile design" width={375} height={5850} /><figcaption>SERVICES</figcaption></figure>
          <figure className="case-screen"><Image src="/Mobile – Case Study.png" alt="Final case studies page mobile design" width={375} height={4670} /><figcaption>CASE STUDIES</figcaption></figure>
        </div>
      </section>

      <section data-scroll-section className="case-impact">
        <div className="case-impact-index case-reveal">05 / OUTCOME</div>
        <div className="case-impact-copy"><h2 className="case-reveal">Not just a new interface.<br /><em>A sharper business story.</em></h2><p className="case-reveal">The redesign gives Intrinsic Tech a coherent presentation system: clearer services, stronger visual credibility, responsive journeys, and reusable foundations for future growth.</p></div>
      </section>

      <section data-scroll-section className="case-closing case-reveal">
        <span>THE RESULT</span><h2>A more credible product story, built to <em>grow with the business.</em></h2>
        <div><a href="https://intrinsic-tech.net/" target="_blank" rel="noreferrer">View live website <ArrowUpRight size={18} /></a><a href="/contact">Discuss a redesign <ArrowUpRight size={18} /></a></div>
      </section>
    </main>
  );
}
