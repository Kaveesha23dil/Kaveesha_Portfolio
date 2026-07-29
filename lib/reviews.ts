export type StoredReview = {
  id: string;
  full_name: string;
  job_title: string;
  company_name: string | null;
  review_text: string;
  rating: number;
  project_type: string | null;
  created_at: string;
};

export type ReviewSubmission = Omit<StoredReview, "id" | "created_at"> & {
  email?: string;
};

const storageKey = "kaveesha-portfolio-reviews";

export function getStoredReviews(): StoredReview[] {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return [];
    const reviews = JSON.parse(stored) as StoredReview[];
    return Array.isArray(reviews) ? reviews : [];
  } catch {
    return [];
  }
}

export function saveReview(submission: ReviewSubmission): StoredReview {
  const review: StoredReview = {
    id: globalThis.crypto?.randomUUID?.()
      ?? `review-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    full_name: submission.full_name,
    job_title: submission.job_title,
    company_name: submission.company_name,
    review_text: submission.review_text,
    rating: submission.rating,
    project_type: submission.project_type,
    created_at: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(storageKey, JSON.stringify([review, ...getStoredReviews()]));
  } catch {
    // The review is still returned and displayed for this session when storage
    // is unavailable (for example, in a browser's strict privacy mode).
  }
  return review;
}
