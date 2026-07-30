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
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function supabaseHeaders(prefer?: string): HeadersInit {
  return {
    apikey: supabaseKey ?? "",
    Authorization: `Bearer ${supabaseKey ?? ""}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

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

function createReview(submission: ReviewSubmission): StoredReview {
  return {
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
}

export async function getReviews(signal?: AbortSignal): Promise<StoredReview[]> {
  if (!supabaseUrl || !supabaseKey) return getStoredReviews();

  try {
    const columns = "id,full_name,job_title,company_name,review_text,rating,project_type,created_at";
    const response = await fetch(
      `${supabaseUrl}/rest/v1/reviews?status=eq.approved&select=${columns}&order=created_at.desc`,
      { headers: supabaseHeaders(), signal, cache: "no-store" },
    );
    if (!response.ok) throw new Error("Reviews could not be loaded.");
    return await response.json() as StoredReview[];
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    return getStoredReviews();
  }
}

export async function saveReview(submission: ReviewSubmission): Promise<StoredReview> {
  const review = createReview(submission);

  if (supabaseUrl && supabaseKey) {
    const response = await fetch(`${supabaseUrl}/rest/v1/reviews?select=id,full_name,job_title,company_name,review_text,rating,project_type,created_at`, {
      method: "POST",
      headers: supabaseHeaders("return=representation"),
      body: JSON.stringify({ ...submission, status: "approved" }),
    });

    if (!response.ok) {
      let detail = "";
      try {
        const error = await response.json() as { message?: string };
        detail = error.message ? ` ${error.message}` : "";
      } catch {
        // Supabase did not return a JSON error body.
      }
      throw new Error(`Your review could not be published.${detail}`);
    }

    const saved = await response.json() as StoredReview[];
    if (saved[0]) return saved[0];
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify([review, ...getStoredReviews()]));
  } catch {
    // The review is still returned and displayed for this session when storage
    // is unavailable (for example, in a browser's strict privacy mode).
  }
  return review;
}
