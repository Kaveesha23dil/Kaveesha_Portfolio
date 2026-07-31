"use client";

import { FormEvent, useState } from "react";
import { Send, Star } from "lucide-react";
import { saveReview, type ReviewSubmission } from "@/lib/reviews";

const projectTypes = ["UI/UX Design", "Web Development", "Brand Design", "Motion Design", "Other"];
const initialForm = {
  fullName: "",
  jobTitle: "",
  companyName: "",
  email: "",
  reviewText: "",
  rating: 0,
  projectType: "",
  website: "",
};

type FormState = typeof initialForm;
type Errors = Partial<Record<keyof FormState, string>>;

type Props = {
  onSuccess: () => void;
};

const clean = (value: string, max: number) =>
  value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);

function validate(form: FormState): { errors: Errors; review?: ReviewSubmission } {
  const errors: Errors = {};
  const fullName = clean(form.fullName, 100);
  const jobTitle = clean(form.jobTitle, 100);
  const companyName = clean(form.companyName, 120);
  const email = clean(form.email, 254).toLowerCase();
  const reviewText = clean(form.reviewText, 500);
  const projectType = projectTypes.includes(form.projectType) ? form.projectType : "";

  if (!fullName) errors.fullName = "Please enter your full name.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (!reviewText) errors.reviewText = "Please write your review.";
  if (reviewText.length > 500) errors.reviewText = "Your review must be 500 characters or fewer.";
  if (form.rating < 1 || form.rating > 5) errors.rating = "Please choose a rating.";

  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    review: {
      full_name: fullName,
      job_title: jobTitle || "Client",
      company_name: companyName || null,
      email: email || undefined,
      review_text: reviewText,
      rating: form.rating,
      project_type: projectType || null,
    },
  };
}

export default function ReviewForm({ onSuccess }: Props) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const update = (field: keyof FormState, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.website) return;

    const result = validate(form);
    setErrors(result.errors);
    if (!result.review) return;

    setStatus("loading");
    setSubmitError("");
    try {
      await saveReview(result.review);
      setForm(initialForm);
      setStatus("success");
      window.setTimeout(onSuccess, 1300);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <div className="review-form-grid">
        <div className="review-field">
          <label htmlFor="review-name">FULL NAME <span>*</span></label>
          <input id="review-name" value={form.fullName} onChange={(event) => update("fullName", event.target.value)} maxLength={100} autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "review-name-error" : undefined} />
          {errors.fullName && <small id="review-name-error" role="alert">{errors.fullName}</small>}
        </div>
        <div className="review-field">
          <label htmlFor="review-job">JOB TITLE <i>OPTIONAL</i></label>
          <input id="review-job" value={form.jobTitle} onChange={(event) => update("jobTitle", event.target.value)} maxLength={100} autoComplete="organization-title" aria-invalid={Boolean(errors.jobTitle)} aria-describedby={errors.jobTitle ? "review-job-error" : undefined} />
          {errors.jobTitle && <small id="review-job-error" role="alert">{errors.jobTitle}</small>}
        </div>
        <div className="review-field">
          <label htmlFor="review-company">COMPANY NAME <i>OPTIONAL</i></label>
          <input id="review-company" value={form.companyName} onChange={(event) => update("companyName", event.target.value)} maxLength={120} autoComplete="organization" />
        </div>
        <div className="review-field">
          <label htmlFor="review-email">EMAIL ADDRESS <i>OPTIONAL</i></label>
          <input id="review-email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} maxLength={254} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "review-email-error" : "review-email-note"} />
          <em id="review-email-note">Never displayed publicly.</em>
          {errors.email && <small id="review-email-error" role="alert">{errors.email}</small>}
        </div>
        <div className="review-field review-field--wide">
          <label htmlFor="review-project">PROJECT TYPE <i>OPTIONAL</i></label>
          <select id="review-project" value={form.projectType} onChange={(event) => update("projectType", event.target.value)}>
            <option value="" disabled>Select a project type</option>
            {projectTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>
        <div className="review-field review-field--wide">
          <div className="review-label-row"><label htmlFor="review-text">YOUR REVIEW <span>*</span></label><b>{form.reviewText.length} / 500</b></div>
          <textarea id="review-text" rows={5} value={form.reviewText} onChange={(event) => update("reviewText", event.target.value)} maxLength={500} aria-invalid={Boolean(errors.reviewText)} aria-describedby={errors.reviewText ? "review-text-error" : undefined} />
          {errors.reviewText && <small id="review-text-error" role="alert">{errors.reviewText}</small>}
        </div>
        <fieldset className="review-rating review-field--wide" aria-describedby={errors.rating ? "review-rating-error" : undefined}>
          <legend>RATING <span>*</span></legend>
          <div>
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              return <button type="button" key={value} onClick={() => update("rating", value)} aria-label={`${value} star${value > 1 ? "s" : ""}`} aria-pressed={form.rating === value}><Star size={24} fill={value <= form.rating ? "currentColor" : "none"} /></button>;
            })}
            {form.rating > 0 && <strong>{form.rating}.0</strong>}
          </div>
          {errors.rating && <small id="review-rating-error" role="alert">{errors.rating}</small>}
        </fieldset>
      </div>

      <div className="review-honeypot" aria-hidden="true">
        <label htmlFor="review-website">Website</label>
        <input id="review-website" name="website" value={form.website} onChange={(event) => update("website", event.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      {status === "success" && <p className="review-success" role="status">Thank you! Your review was submitted for approval.</p>}
      {status === "error" && <p className="review-error" role="alert">{submitError}</p>}

      <div className="review-form-footer">
        <p>Your review will appear after it has been approved.</p>
        <button className="review-submit" type="submit" disabled={status === "loading" || status === "success"}>
          {status === "loading" ? "SUBMITTING..." : status === "success" ? "SUBMITTED" : "SUBMIT REVIEW"}
          <span><Send size={16} /></span>
        </button>
      </div>
    </form>
  );
}
