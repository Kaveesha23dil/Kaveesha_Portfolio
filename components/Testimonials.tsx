"use client";

import { ArrowUpRight, Asterisk, Plus, Star } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { motionMedia, registerMotion } from "@/components/motion";
import ReviewCard, { type DisplayReview } from "@/components/ReviewCard";
import ReviewModal from "@/components/ReviewModal";
import { getApprovedReviews, type ApprovedReview } from "@/lib/supabase";

const testimonials: DisplayReview[] = [
  {
    id: "fallback-1",
    full_name: "Maya Chen",
    job_title: "Co-founder",
    company_name: "Nova Finance",
    review_text: "Kaveesha brought rare clarity to a complex product. The experience now feels effortless, focused, and unmistakably ours.",
    rating: 5,
    project_type: "Product Design",
    created_at: "2026-01-01",
    role: "Co-founder, Nova Finance",
    initials: "MC",
    project: "PRODUCT DESIGN · 2026",
  },
  {
    id: "fallback-2",
    full_name: "Daniel Reed",
    job_title: "Creative Director",
    company_name: "Roam",
    review_text: "The process was thoughtful from day one. Every design decision had a reason, and the final site exceeded what we imagined.",
    rating: 5,
    project_type: "Web Experience",
    created_at: "2025-01-01",
    role: "Creative Director, Roam",
    initials: "DR",
    project: "WEB EXPERIENCE · 2025",
  },
  {
    id: "fallback-3",
    full_name: "Amara Silva",
    job_title: "Head of Product",
    company_name: "Synapse AI",
    review_text: "A true creative partner—strategic, responsive, and obsessive about the details that make a product feel exceptional.",
    rating: 5,
    project_type: "Brand & Product",
    created_at: "2025-01-01",
    role: "Head of Product, Synapse AI",
    initials: "AS",
    project: "BRAND & PRODUCT · 2025",
  },
];

function toDisplayReview(review: ApprovedReview): DisplayReview {
  const initials = review.full_name.split(/\s+/).filter(Boolean).slice(0, 2).map((name) => name[0]).join("").toUpperCase();
  const role = [review.job_title, review.company_name].filter(Boolean).join(", ");
  return {
    ...review,
    initials: initials || "CR",
    role,
    project: `${(review.project_type || "CLIENT PROJECT").toUpperCase()} · ${new Date(review.created_at).getFullYear()}`,
  };
}

export default function Testimonials() {
  const section = useRef<HTMLElement>(null);
  const [approvedReviews, setApprovedReviews] = useState<ApprovedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    const controller = new AbortController();
    getApprovedReviews(controller.signal)
      .then(setApprovedReviews)
      .catch(() => setApprovedReviews([]))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const displayedReviews = useMemo(
    () => approvedReviews.length ? approvedReviews.map(toDisplayReview) : testimonials,
    [approvedReviews],
  );
  const averageRating = useMemo(
    () => (displayedReviews.reduce((sum, review) => sum + review.rating, 0) / displayedReviews.length).toFixed(1),
    [displayedReviews],
  );

  useLayoutEffect(() => {
    registerMotion();
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-reveal", {
        scrollTrigger: { trigger: section.current, start: "top 72%" },
        y: 42,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      });
      const mm = gsap.matchMedia();
      mm.add(motionMedia.desktop, () => {
        gsap.from(".testimonial-card", { scrollTrigger: { trigger: ".testimonials-grid", start: "top 78%" }, y: 50, scale: .96, opacity: 0, duration: .85, stagger: .12, ease: "power3.out" });
        gsap.from(".testimonial-card blockquote", { scrollTrigger: { trigger: ".testimonials-grid", start: "top 70%" }, clipPath: "inset(0 0 100% 0)", y: 18, duration: .8, stagger: .1, ease: "power3.out" });
        gsap.to(".testimonial-halo", { rotate: 90, scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1.2 } });
      });
      mm.add(motionMedia.mobile, () => gsap.from(".testimonial-card", { scrollTrigger: { trigger: ".testimonials-grid", start: "top 84%" }, y: 24, opacity: 0, duration: .6, stagger: .08, ease: "power2.out" }));
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="testimonials" data-scroll-section className="testimonials-section">
      <div className="testimonial-halo" aria-hidden="true"><i /><i /><i /></div>

      <div className="testimonials-topline testimonials-reveal">
        <span>06 / TESTIMONIALS</span>
        <span>TRUST BUILT THROUGH GOOD WORK</span>
      </div>

      <div className="testimonials-intro">
        <div className="testimonials-heading testimonials-reveal">
          <p className="eyebrow"><Asterisk size={15} /> KIND WORDS</p>
          <h2>Good work leaves a <em>lasting impression.</em></h2>
        </div>
        <div className="testimonial-rating testimonials-reveal" aria-label={`Rated ${averageRating} out of five`}>
          <div>{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}</div>
          <strong>{averageRating}</strong>
          <span>AVERAGE CLIENT RATING</span>
        </div>
      </div>

      <div className={`testimonials-grid ${loading ? "is-loading" : ""}`} aria-busy={loading}>
        {displayedReviews.map((review, index) => <ReviewCard review={review} index={index} key={review.id} />)}
      </div>

      <div className="testimonials-footer testimonials-reveal">
        <div><span>18</span><p>happy clients<br />across 9 countries</p></div>
        <p>Great partnerships begin with an honest conversation.</p>
        <div className="testimonials-actions">
          <a href="mailto:kaveeshadilshankd23@gmail.com?subject=Let%27s%20create%20something%20great">Become the next success story <ArrowUpRight size={19} /></a>
          <button type="button" onClick={() => setModalOpen(true)}>Add a review <Plus size={18} /></button>
        </div>
      </div>

      <ReviewModal open={modalOpen} onClose={closeModal} />
    </section>
  );
}
