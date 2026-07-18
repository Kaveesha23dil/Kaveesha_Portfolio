"use client";

import { ArrowUpRight, Asterisk, Check, Send } from "lucide-react";
import { FormEvent, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        scrollTrigger: { trigger: section.current, start: "top 72%" },
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.to(".contact-orbit", { rotate: 130, duration: 20, repeat: -1, ease: "none" });
    }, section);
    return () => ctx.revert();
  }, []);

  function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`New ${data.get("project")} enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject: ${data.get("project")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:hello@windsun.dev?subject=${subject}&body=${body}`;
  }

  return (
    <section ref={section} id="contact" data-scroll-section className="contact-section">
      <div className="contact-orbit" aria-hidden="true"><i /><span>LET&apos;S CREATE · LET&apos;S CREATE ·</span></div>
      <div className="contact-topline contact-reveal">
        <span>07 / CONTACT</span>
        <span className="contact-availability"><i /> AVAILABLE FOR SELECT PROJECTS</span>
      </div>

      <div className="contact-intro">
        <div className="contact-heading contact-reveal">
          <p className="eyebrow"><Asterisk size={15} /> START A CONVERSATION</p>
          <h2>Have an idea?<br /><em>Let&apos;s make it real.</em></h2>
        </div>
        <div className="contact-direct contact-reveal">
          <span>PREFER EMAIL?</span>
          <a href="mailto:hello@windsun.dev">hello@windsun.dev <ArrowUpRight size={20} /></a>
          <p>I usually reply within 1–2 business days.</p>
        </div>
      </div>

      <div className="contact-layout">
        <form className="contact-form contact-reveal" onSubmit={sendEnquiry}>
          <div className="contact-field contact-field--half">
            <label htmlFor="contact-name">YOUR NAME</label>
            <input id="contact-name" name="name" type="text" placeholder="What should I call you?" required />
          </div>
          <div className="contact-field contact-field--half">
            <label htmlFor="contact-email">EMAIL ADDRESS</label>
            <input id="contact-email" name="email" type="email" placeholder="you@company.com" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-project">WHAT CAN I HELP WITH?</label>
            <select id="contact-project" name="project" defaultValue="Digital product">
              <option>Digital product</option>
              <option>Website</option>
              <option>Brand identity</option>
              <option>Motion & interaction</option>
              <option>Something else</option>
            </select>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">TELL ME ABOUT THE PROJECT</label>
            <textarea id="contact-message" name="message" rows={4} placeholder="A little context, your goals, timeline, and budget..." required />
          </div>
          <button type="submit" className="contact-submit">Send enquiry <span><Send size={17} /></span></button>
        </form>

        <aside className="contact-details contact-reveal">
          <div className="contact-detail-block">
            <span>BASED IN</span>
            <strong>Colombo, Sri Lanka</strong>
            <p>Working remotely with teams worldwide.</p>
          </div>
          <div className="contact-detail-block">
            <span>GOOD FIT FOR</span>
            <ul>
              <li><Check size={13} /> Early-stage products</li>
              <li><Check size={13} /> Ambitious redesigns</li>
              <li><Check size={13} /> Creative collaborations</li>
            </ul>
          </div>
          <div className="contact-detail-block">
            <span>LOCAL TIME</span>
            <strong>UTC +05:30</strong>
            <p>Flexible overlap for global teams.</p>
          </div>
        </aside>
      </div>

    </section>
  );
}
