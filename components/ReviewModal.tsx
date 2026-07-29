"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import ReviewForm from "@/components/ReviewForm";
import type { StoredReview } from "@/lib/reviews";

type Props = {
  open: boolean;
  onClose: () => void;
  onReviewAdded: (review: StoredReview) => void;
};

export default function ReviewModal({ open, onClose, onReviewAdded }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () => Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])') ?? []);
    window.requestAnimationFrame(() => focusable()[0]?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="review-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialog} className="review-modal" role="dialog" aria-modal="true" aria-labelledby="review-modal-title" aria-describedby="review-modal-description">
        <div className="review-modal-topline">
          <span>07 / CLIENT REVIEW</span>
          <button type="button" onClick={onClose} aria-label="Close review form"><X size={20} /></button>
        </div>
        <div className="review-modal-heading">
          <div><p>SHARE YOUR EXPERIENCE</p><h2 id="review-modal-title">Add a <em>review.</em></h2></div>
          <p id="review-modal-description">Worked with me on a project? Tell others what the experience was like.</p>
        </div>
        <ReviewForm onSuccess={(review) => { onReviewAdded(review); onClose(); }} />
      </div>
    </div>,
    document.body,
  );
}
