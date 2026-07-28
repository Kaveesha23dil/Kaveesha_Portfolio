import { Quote, Star } from "lucide-react";
import type { ApprovedReview } from "@/lib/supabase";

export type DisplayReview = ApprovedReview & {
  initials: string;
  role: string;
  project: string;
};

type Props = {
  review: DisplayReview;
  index: number;
};

export default function ReviewCard({ review, index }: Props) {
  return (
    <article className={`testimonial-card ${index === 0 ? "testimonial-card--featured" : ""}`}>
      <div className="testimonial-card-top">
        <Quote size={index === 0 ? 42 : 29} fill="currentColor" />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="testimonial-stars" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, star) => (
          <Star key={star} size={12} fill={star < review.rating ? "currentColor" : "none"} />
        ))}
      </div>
      <blockquote>{review.review_text}</blockquote>
      <div className="testimonial-person">
        <span className="testimonial-avatar">{review.initials}</span>
        <div><strong>{review.full_name}</strong><span>{review.role}</span></div>
        <small>{review.project}</small>
      </div>
    </article>
  );
}
