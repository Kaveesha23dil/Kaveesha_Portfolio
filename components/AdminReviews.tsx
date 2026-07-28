"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Check, LogOut, RefreshCw, Star, Trash2, X } from "lucide-react";
import {
  deleteReview,
  getReviewsForModeration,
  getStoredAdminSession,
  signInAdmin,
  signOutAdmin,
  updateReviewStatus,
  type ModeratedReview,
  type SupabaseSession,
} from "@/lib/supabase";

export default function AdminReviews() {
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [reviews, setReviews] = useState<ModeratedReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loadReviews = useCallback(async (activeSession: SupabaseSession) => {
    setLoading(true);
    setError("");
    try {
      setReviews(await getReviewsForModeration(activeSession));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Reviews could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = getStoredAdminSession();
    if (!stored) return;
    const restoreSession = async () => {
      await Promise.resolve();
      setSession(stored);
      await loadReviews(stored);
    };
    void restoreSession();
  }, [loadReviews]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthLoading(true);
    setError("");
    try {
      const nextSession = await signInAdmin(email, password);
      setSession(nextSession);
      setPassword("");
      await loadReviews(nextSession);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Sign in failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const changeStatus = async (review: ModeratedReview, status: ModeratedReview["status"]) => {
    if (!session) return;
    setBusyId(review.id);
    setError("");
    try {
      await updateReviewStatus(session, review.id, status);
      setReviews((current) => current.map((item) => item.id === review.id ? { ...item, status } : item));
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "The review could not be updated.");
    } finally {
      setBusyId("");
    }
  };

  const removeReview = async (review: ModeratedReview) => {
    if (!session || !window.confirm(`Permanently delete the review from ${review.full_name}?`)) return;
    setBusyId(review.id);
    setError("");
    try {
      await deleteReview(session, review.id);
      setReviews((current) => current.filter((item) => item.id !== review.id));
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "The review could not be deleted.");
    } finally {
      setBusyId("");
    }
  };

  const logout = () => {
    signOutAdmin();
    setSession(null);
    setReviews([]);
  };

  if (!session) {
    return (
      <main className="review-admin review-admin--login">
        <div className="review-admin-login">
          <span>PRIVATE / REVIEW MODERATION</span>
          <h1>Admin <em>access.</em></h1>
          <p>Sign in with the Supabase account registered as a review administrator.</p>
          <form onSubmit={handleLogin}>
            <label htmlFor="admin-email">EMAIL ADDRESS</label>
            <input id="admin-email" type="email" required autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} />
            <label htmlFor="admin-password">PASSWORD</label>
            <input id="admin-password" type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
            {error && <p className="review-admin-error" role="alert">{error}</p>}
            <button type="submit" disabled={authLoading}>{authLoading ? "SIGNING IN..." : "SIGN IN"}</button>
          </form>
        </div>
      </main>
    );
  }

  const pendingCount = reviews.filter((review) => review.status === "pending").length;

  return (
    <main className="review-admin">
      <header className="review-admin-header">
        <div><span>PRIVATE DASHBOARD</span><h1>Review <em>moderation.</em></h1></div>
        <div className="review-admin-session">
          <span>{session.user.email}</span>
          <button type="button" onClick={() => void loadReviews(session)} aria-label="Refresh reviews"><RefreshCw size={16} /></button>
          <button type="button" onClick={logout}><LogOut size={16} /> Sign out</button>
        </div>
      </header>

      <div className="review-admin-summary">
        <div><strong>{reviews.length}</strong><span>TOTAL REVIEWS</span></div>
        <div><strong>{pendingCount}</strong><span>AWAITING APPROVAL</span></div>
        <div><strong>{reviews.filter((review) => review.status === "approved").length}</strong><span>PUBLISHED</span></div>
      </div>

      {error && <p className="review-admin-error" role="alert">{error}</p>}
      {loading ? <div className="review-admin-empty">LOADING REVIEWS...</div> : reviews.length === 0 ? <div className="review-admin-empty">NO REVIEWS HAVE BEEN SUBMITTED.</div> : (
        <div className="review-admin-list">
          {reviews.map((review, index) => (
            <article className="review-admin-card" key={review.id}>
              <div className="review-admin-card-top">
                <span>{String(index + 1).padStart(2, "0")} / {new Date(review.created_at).toLocaleDateString()}</span>
                <b data-status={review.status}>{review.status}</b>
              </div>
              <blockquote>{review.review_text}</blockquote>
              <div className="review-admin-rating" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, star) => <Star key={star} size={13} fill={star < review.rating ? "currentColor" : "none"} />)}
              </div>
              <dl>
                <div><dt>NAME</dt><dd>{review.full_name}</dd></div>
                <div><dt>ROLE</dt><dd>{review.job_title}{review.company_name ? `, ${review.company_name}` : ""}</dd></div>
                <div><dt>EMAIL</dt><dd><a href={`mailto:${review.email}`}>{review.email}</a></dd></div>
                <div><dt>PROJECT</dt><dd>{review.project_type || "Not specified"}</dd></div>
              </dl>
              <div className="review-admin-actions">
                <button type="button" disabled={busyId === review.id || review.status === "approved"} onClick={() => void changeStatus(review, "approved")}><Check size={15} /> Approve</button>
                <button type="button" disabled={busyId === review.id || review.status === "rejected"} onClick={() => void changeStatus(review, "rejected")}><X size={15} /> Reject</button>
                <button className="is-danger" type="button" disabled={busyId === review.id} onClick={() => void removeReview(review)}><Trash2 size={15} /> Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
