"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Asterisk, Award, Building2, ChevronDown } from "lucide-react";
import { SiCoursera, SiGoogle, SiMeta } from "react-icons/si";
import { TbBrandAws } from "react-icons/tb";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerMotion } from "@/components/motion";

const certificates = [
  { title: "Google UX Design Professional Certificate", issuer: "Google", year: "2026", file: "Coursera S97Q9Q2JAQH7 (1).pdf", icon: SiGoogle, featured: true },
  { title: "Google AI Professional Certificate", issuer: "Google", year: "2026", file: "Coursera 14FQK19TVN67 (1).pdf", icon: SiGoogle, featured: true },
  { title: "AWS Cloud Practitioner Essentials", issuer: "AWS Training & Certification", year: "2026", file: "ffb5fef9-3870-4481-8a8b-776ca1d489f6.pdf", icon: TbBrandAws, featured: true },
  { title: "Designing User Interfaces and Experiences", issuer: "IBM", year: "2024", file: "Designing User Interfaces and Experiences (UIUX).pdf", icon: Building2, featured: true },
  { title: "React Basics", issuer: "Meta", year: "2024", file: "react.pdf", icon: SiMeta, featured: true },
  { title: "Web Design for Beginners", issuer: "University of Moratuwa", year: "Professional learning", file: "Web_Design_for_Beginners_E-Certificate.pdf", icon: Award, featured: true },
  { title: "Foundations of Prompt Engineering", issuer: "AWS Training & Certification", year: "2026", file: "7dd1c41b-f2c5-473f-9215-92c1a275073a.pdf", icon: TbBrandAws },
  { title: "Getting Started with DevOps on AWS", issuer: "AWS Training & Certification", year: "2026", file: "b7059cda-d8ac-4a3a-a132-c2e1c92747b9 (1).pdf", icon: TbBrandAws },
  { title: "Build Dynamic User Interfaces for Websites", issuer: "Google", year: "2024", file: "Build Dynamic User Interfaces (UI) for Websites.pdf", icon: SiGoogle },
  { title: "Build Wireframes and Low-Fidelity Prototypes", issuer: "Google", year: "2024", file: "Build Wireframes and Low-Fidelity Prototypes by Google.pdf", icon: SiGoogle },
  { title: "Conduct UX Research and Test Early Concepts", issuer: "Google", year: "2024", file: "Conduct UX Research and Test Early Concepts.pdf", icon: SiGoogle },
  { title: "AI for App Building", issuer: "Google", year: "2026", file: "Coursera 0JICYAOR5LDY.pdf", icon: SiGoogle },
  { title: "UI/UX Wireframing and Prototyping with Figma", issuer: "SkillUp", year: "2026", file: "Coursera 0MYANULGZRH9.pdf", icon: SiCoursera },
  { title: "UX Research and Information Architecture", issuer: "IBM", year: "2026", file: "Coursera 1FLI8RNNKMXA (1).pdf", icon: Building2 },
  { title: "Connect and Protect: Networks and Network Security", issuer: "Google", year: "2024", file: "Coursera 2WTBEFP5METL.pdf", icon: SiGoogle },
  { title: "AI for Brainstorming and Planning", issuer: "Google", year: "2026", file: "Coursera 5J7K7EK1CON7 (1).pdf", icon: SiGoogle },
  { title: "AI for Writing and Communicating", issuer: "Google", year: "2026", file: "Coursera 8OR1G3UN1BP1.pdf", icon: SiGoogle },
  { title: "AI for Research and Insights", issuer: "Google", year: "2026", file: "Coursera AAPXPC1W2B1D.pdf", icon: SiGoogle },
  { title: "AI for Content Creation", issuer: "Google", year: "2026", file: "Coursera BYQDECPR4C1P (1).pdf", icon: SiGoogle },
  { title: "Introduction to Web Development with HTML, CSS, JavaScript", issuer: "IBM", year: "2024", file: "Coursera FTFFLBKVZA4K.pdf", icon: Building2 },
  { title: "Generative AI: The Future of UX/UI Design", issuer: "SkillUp", year: "2026", file: "Coursera M5ISOECYBMF9.pdf", icon: SiCoursera },
  { title: "Programming with JavaScript", issuer: "Meta", year: "2026", file: "Coursera O60GZV1S8NSD.pdf", icon: SiMeta },
  { title: "Design a UX for Social Good & Prepare for Jobs", issuer: "Google", year: "2024", file: "Coursera RTWEJXMHM73S.pdf", icon: SiGoogle },
  { title: "Foundations of Cybersecurity", issuer: "Google", year: "2024", file: "Coursera S49HC57GP3XX.pdf", icon: SiGoogle },
  { title: "Play It Safe: Manage Security Risks", issuer: "Google", year: "2024", file: "Coursera V39M4BYPUGZW.pdf", icon: SiGoogle },
  { title: "UX/UI Design Fundamentals", issuer: "SkillUp", year: "2025", file: "Coursera W54H4CRQYHUH.pdf", icon: SiCoursera },
  { title: "AI Fundamentals", issuer: "Google", year: "2026", file: "Coursera WDCZHXRO5VAJ.pdf", icon: SiGoogle },
  { title: "Version Control", issuer: "Meta", year: "2026", file: "Coursera YQQ16IJDP5H6 (1).pdf", icon: SiMeta },
  { title: "Create High-Fidelity Designs and Prototypes in Figma", issuer: "Google", year: "2024", file: "Create High-Fidelity Designs and Prototypes in Figma.pdf", icon: SiGoogle },
  { title: "Introduction to Cloud Computing", issuer: "IBM", year: "2024", file: "ibm software engineering 1.pdf", icon: Building2 },
  { title: "Principles of UX/UI Design", issuer: "Meta", year: "2024", file: "PrinciplesofUDesignmeta.pdf", icon: SiMeta },
  { title: "Visual Elements of User Interface Design", issuer: "CalArts", year: "2024", file: "ui calarts 1.pdf", icon: SiCoursera },
  { title: "Start the UX Design Process: Empathize, Define and Ideate", issuer: "Google", year: "2024", file: "ux 2 by google.pdf", icon: SiGoogle },
  { title: "Foundations of User Experience Design", issuer: "Google", year: "2024", file: "ux by google 1.pdf", icon: SiGoogle },
  { title: "UX Design Fundamentals", issuer: "CalArts", year: "2024", file: "ux design fundamental by calarts.pdf", icon: SiCoursera },
];

export default function Certificates() {
  const section = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? certificates : certificates.filter((item) => item.featured);

  useLayoutEffect(() => {
    registerMotion();
    const ctx = gsap.context(() => {
      gsap.from(".certificate-reveal", { scrollTrigger: { trigger: section.current, start: "top 78%" }, y: 42, opacity: 0, duration: .8, stagger: .08, ease: "power3.out" });
    }, section);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!showAll || !section.current) return;
    const cards = section.current.querySelectorAll(".certificate-card");
    const expandedCards = Array.from(cards).slice(6);
    const animation = gsap.from(expandedCards, { y: 24, opacity: 0, duration: .5, stagger: .025, ease: "power2.out", clearProps: "transform,opacity" });
    ScrollTrigger.refresh();
    return () => {
      animation.kill();
    };
  }, [showAll]);

  return (
    <section ref={section} data-scroll-section className="certificates-section">
      <div className="certificates-topline certificate-reveal"><span>04 / CERTIFICATES</span><span>{certificates.length} VERIFIED LEARNING MILESTONES</span></div>
      <div className="certificates-intro">
        <div className="certificate-reveal"><p className="eyebrow"><Asterisk size={15} /> CERTIFICATIONS</p><h2>Learning with proof.<br /><em>Growing with purpose.</em></h2></div>
        <p className="certificate-reveal">Selected credentials across UX design, software development, cloud computing, cybersecurity, and applied AI.</p>
      </div>
      <div className={`certificates-grid${showAll ? " certificates-grid--all" : ""}`}>
        {visible.map((certificate, index) => {
          const Icon = certificate.icon;
          return <a className="certificate-card certificate-reveal" href={`/certificates/${certificate.file}`} target="_blank" rel="noreferrer" key={certificate.file}>
            <div className="certificate-card-top"><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /></div>
            <div><span>{certificate.issuer} / {certificate.year}</span><h3>{certificate.title}</h3></div>
            <div className="certificate-link">View certificate <ArrowUpRight size={16} /></div>
          </a>;
        })}
      </div>
      <button className="certificates-toggle certificate-reveal" type="button" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll}>
        <span>{showAll ? "Show featured" : `View all ${certificates.length} certificates`}</span><ChevronDown className={showAll ? "is-open" : ""} size={18} />
      </button>
    </section>
  );
}
