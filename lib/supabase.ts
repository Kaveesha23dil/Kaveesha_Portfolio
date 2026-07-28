export type ApprovedReview = {
  id: string;
  full_name: string;
  job_title: string;
  company_name: string | null;
  review_text: string;
  rating: number;
  project_type: string | null;
  created_at: string;
};

export type ReviewSubmission = {
  full_name: string;
  job_title: string;
  company_name: string | null;
  email: string;
  review_text: string;
  rating: number;
  project_type: string | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function headers(prefer?: string): HeadersInit {
  if (!supabaseAnonKey) return {};
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export async function getApprovedReviews(signal?: AbortSignal): Promise<ApprovedReview[]> {
  if (!supabaseUrl || !supabaseAnonKey) return [];

  const columns = "id,full_name,job_title,company_name,review_text,rating,project_type,created_at";
  const response = await fetch(
    `${supabaseUrl}/rest/v1/reviews?status=eq.approved&select=${columns}&order=created_at.desc`,
    { headers: headers(), signal },
  );

  if (!response.ok) throw new Error("Approved reviews could not be loaded.");
  return response.json() as Promise<ApprovedReview[]>;
}

export async function submitReview(review: ReviewSubmission): Promise<void> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Review submissions are not configured yet.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/reviews`, {
    method: "POST",
    headers: headers("return=minimal"),
    body: JSON.stringify(review),
  });

  if (!response.ok) throw new Error("Your review could not be submitted. Please try again.");
}
