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

export type ModeratedReview = ApprovedReview & {
  email: string;
  status: "pending" | "approved" | "rejected";
};

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; email?: string };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const sessionKey = "portfolio-review-admin-session";

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

export async function signInAdmin(email: string, password: string): Promise<SupabaseSession> {
  if (!supabaseUrl || !supabaseAnonKey) throw new Error("Supabase is not configured.");
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  });
  if (!response.ok) throw new Error("Incorrect email or password.");
  const data = await response.json();
  const session: SupabaseSession = {
    ...data,
    expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
  };
  window.localStorage.setItem(sessionKey, JSON.stringify(session));
  return session;
}

export function getStoredAdminSession(): SupabaseSession | null {
  try {
    const value = window.localStorage.getItem(sessionKey);
    return value ? JSON.parse(value) as SupabaseSession : null;
  } catch {
    return null;
  }
}

export function signOutAdmin() {
  window.localStorage.removeItem(sessionKey);
}

async function authenticatedHeaders(session: SupabaseSession, prefer?: string): Promise<HeadersInit> {
  if (!supabaseAnonKey || !supabaseUrl) throw new Error("Supabase is not configured.");
  if (session.expires_at <= Math.floor(Date.now() / 1000) + 30) {
    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    if (!response.ok) {
      signOutAdmin();
      throw new Error("Your session expired. Please sign in again.");
    }
    const data = await response.json();
    const refreshed: SupabaseSession = {
      ...data,
      expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
    };
    Object.assign(session, refreshed);
    window.localStorage.setItem(sessionKey, JSON.stringify(session));
  }
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

export async function getReviewsForModeration(session: SupabaseSession): Promise<ModeratedReview[]> {
  if (!supabaseUrl) throw new Error("Supabase is not configured.");
  const response = await fetch(
    `${supabaseUrl}/rest/v1/reviews?select=id,full_name,job_title,company_name,email,review_text,rating,project_type,status,created_at&order=created_at.desc`,
    { headers: await authenticatedHeaders(session), cache: "no-store" },
  );
  if (response.status === 401 || response.status === 403) throw new Error("Your admin session is not authorized.");
  if (!response.ok) throw new Error("Reviews could not be loaded.");
  return response.json() as Promise<ModeratedReview[]>;
}

export async function updateReviewStatus(session: SupabaseSession, id: string, status: ModeratedReview["status"]) {
  if (!supabaseUrl) throw new Error("Supabase is not configured.");
  const response = await fetch(`${supabaseUrl}/rest/v1/reviews?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: await authenticatedHeaders(session, "return=minimal"),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("The review status could not be updated.");
}

export async function deleteReview(session: SupabaseSession, id: string) {
  if (!supabaseUrl) throw new Error("Supabase is not configured.");
  const response = await fetch(`${supabaseUrl}/rest/v1/reviews?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: await authenticatedHeaders(session, "return=minimal"),
  });
  if (!response.ok) throw new Error("The review could not be deleted.");
}
