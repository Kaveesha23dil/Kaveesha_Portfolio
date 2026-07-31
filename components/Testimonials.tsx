"use client";

import { ArrowUpRight, Asterisk, Plus, Star } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { motionMedia, registerMotion } from "@/components/motion";
import ReviewCard, { type DisplayReview } from "@/components/ReviewCard";
import ReviewModal from "@/components/ReviewModal";
import { getReviews, type StoredReview } from "@/lib/reviews";

function toDisplayReview(review: StoredReview): DisplayReview {
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
  const [reviews, setReviews] = useState<StoredReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    let active = true;
    const loadReviews = async () => {
      try {
        const nextReviews = await getReviews();
        if (active) setReviews(nextReviews);
      } catch {
        if (active) setReviews([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadReviews();
    const refresh = window.setInterval(() => void loadReviews(), 30_000);
    return () => {
      active = false;
      window.clearInterval(refresh);
    };
  }, []);

  const displayedReviews = useMemo(() => reviews.map(toDisplayReview), [reviews]);
  const averageRating = useMemo(
    () => displayedReviews.length
      ? (displayedReviews.reduce((sum, review) => sum + review.rating, 0) / displayedReviews.length).toFixed(1)
      : "—",
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
        const grid = section.current?.querySelector(".testimonials-grid");
        if (grid) {
          gsap.from(grid.querySelectorAll(".testimonial-card"), { scrollTrigger: { trigger: grid, start: "top 78%" }, y: 50, scale: .96, opacity: 0, duration: .85, stagger: .12, ease: "power3.out" });
          gsap.from(grid.querySelectorAll(".testimonial-card blockquote"), { scrollTrigger: { trigger: grid, start: "top 70%" }, clipPath: "inset(0 0 100% 0)", y: 18, duration: .8, stagger: .1, ease: "power3.out" });
        }
        gsap.to(".testimonial-halo", { rotate: 90, scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1.2 } });
      });
      mm.add(motionMedia.mobile, () => {
        const grid = section.current?.querySelector(".testimonials-grid");
        if (grid) gsap.from(grid.querySelectorAll(".testimonial-card"), { scrollTrigger: { trigger: grid, start: "top 84%" }, y: 24, opacity: 0, duration: .6, stagger: .08, ease: "power2.out" });
      });
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

      {loading ? (
        <div className="testimonials-loading" aria-live="polite" aria-busy="true">
          <span />
          <p>LOADING CLIENT REVIEWS</p>
        </div>
      ) : displayedReviews.length ? (
        <div className="testimonials-grid">
          {displayedReviews.map((review, index) => <ReviewCard review={review} index={index} key={review.id} />)}
        </div>
      ) : (
        <div className="testimonials-empty">
          <span>01 / YOUR STORY COULD BE HERE</span>
          <h3>No reviews yet.</h3>
          <p>Worked with me before? Submit your experience for review and publication.</p>
          <button type="button" onClick={() => setModalOpen(true)}>Add the first review <Plus size={18} /></button>
        </div>
      )}

      <div className="testimonials-footer testimonials-reveal">
        <p>Great partnerships begin with an honest conversation.</p>
        <div className="testimonials-actions">
          <a href="mailto:kaveeshadilshankd23@gmail.com?subject=Let%27s%20create%20something%20great">Become the next success story <ArrowUpRight size={19} /></a>
          <button type="button" onClick={() => setModalOpen(true)}>Add a review <Plus size={18} /></button>
        </div>
      </div>

      <ReviewModal
        open={modalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
