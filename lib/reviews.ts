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

export type ModeratedReview = StoredReview & {
  email: string | null;
  status: "pending" | "approved" | "rejected";
};

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; email?: string };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const sessionKey = "portfolio-review-admin-session";

function publicHeaders(prefer?: string): HeadersInit {
  if (!supabaseKey) return {};
  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

function ensureConfigured() {
  if (!supabaseUrl || !supabaseKey) throw new Error("Supabase is not configured.");
}

async function responseError(response: Response, fallback: string) {
  try {
    const error = await response.json() as { message?: string };
    return new Error(error.message || fallback);
  } catch {
    return new Error(fallback);
  }
}

export async function getReviews(signal?: AbortSignal): Promise<StoredReview[]> {
  if (!supabaseUrl || !supabaseKey) return [];
  const columns = "id,full_name,job_title,company_name,review_text,rating,project_type,created_at";
  const response = await fetch(
    `${supabaseUrl}/rest/v1/reviews?status=eq.approved&select=${columns}&order=created_at.desc`,
    { headers: publicHeaders(), signal, cache: "no-store" },
  );
  if (!response.ok) throw await responseError(response, "Reviews could not be loaded.");
  return response.json() as Promise<StoredReview[]>;
}

export async function saveReview(submission: ReviewSubmission): Promise<void> {
  ensureConfigured();
  const response = await fetch(`${supabaseUrl}/rest/v1/reviews`, {
    method: "POST",
    headers: publicHeaders("return=minimal"),
    body: JSON.stringify(submission),
  });
  if (!response.ok) throw await responseError(response, "Your review could not be submitted.");
}

export async function signInAdmin(email: string, password: string): Promise<SupabaseSession> {
  ensureConfigured();
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: publicHeaders(),
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
  ensureConfigured();
  if (session.expires_at <= Math.floor(Date.now() / 1000) + 30) {
    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: publicHeaders(),
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    if (!response.ok) {
      signOutAdmin();
      throw new Error("Your session expired. Please sign in again.");
    }
    const data = await response.json();
    Object.assign(session, data, {
      expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
    });
    window.localStorage.setItem(sessionKey, JSON.stringify(session));
  }
  return {
    apikey: supabaseKey!,
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

export async function getReviewsForModeration(session: SupabaseSession): Promise<ModeratedReview[]> {
  ensureConfigured();
  const columns = "id,full_name,job_title,company_name,email,review_text,rating,project_type,status,created_at";
  const response = await fetch(
    `${supabaseUrl}/rest/v1/reviews?select=${columns}&order=created_at.desc`,
    { headers: await authenticatedHeaders(session), cache: "no-store" },
  );
  if (response.status === 401 || response.status === 403) throw new Error("This account is not registered as a review administrator.");
  if (!response.ok) throw await responseError(response, "Reviews could not be loaded.");
  return response.json() as Promise<ModeratedReview[]>;
}

export async function updateReviewStatus(session: SupabaseSession, id: string, status: ModeratedReview["status"]) {
  ensureConfigured();
  const response = await fetch(`${supabaseUrl}/rest/v1/reviews?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: await authenticatedHeaders(session, "return=minimal"),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw await responseError(response, "The review status could not be updated.");
}

export async function deleteReview(session: SupabaseSession, id: string) {
  ensureConfigured();
  const response = await fetch(`${supabaseUrl}/rest/v1/reviews?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: await authenticatedHeaders(session, "return=minimal"),
  });
  if (!response.ok) throw await responseError(response, "The review could not be deleted.");
}
