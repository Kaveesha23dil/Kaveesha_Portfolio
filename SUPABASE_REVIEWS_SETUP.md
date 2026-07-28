# Supabase reviews setup

## 1. Create the database objects

1. Create or open a project at [Supabase](https://supabase.com/dashboard).
2. Open **SQL Editor**.
3. Copy and run the complete contents of [`supabase/reviews.sql`](./supabase/reviews.sql).

The script creates `public.reviews`, database validation constraints, Row Level Security, an anonymous insert policy limited to pending reviews, and a public read policy limited to approved reviews. Anonymous users receive no update or delete permission. Column-level grants prevent the anonymous API from selecting reviewer email addresses.

## 2. Configure local development

Copy `.env.example` to `.env.local` and add the public project values from **Supabase → Project Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Use only the public anonymous key. Never add the service-role key to a `NEXT_PUBLIC_` variable or commit it to Git.

Restart the development server after changing environment variables.

## 3. Configure Vercel

1. Open the portfolio project in Vercel.
2. Go to **Settings → Environment Variables**.
3. Add `NEXT_PUBLIC_SUPABASE_URL`.
4. Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Apply both variables to Production, Preview, and Development as appropriate.
6. Redeploy the latest commit.

## 4. Moderate reviews

New submissions use the database default status `pending` and do not appear on the website.

To publish a review:

1. Open **Supabase → Table Editor → reviews**.
2. Check the review content and reviewer details.
3. Change `status` from `pending` to `approved`.

The approved review will then appear newest-first. Set the status to `rejected` to keep a review private.

## Files created

- `components/ReviewCard.tsx`
- `components/ReviewForm.tsx`
- `components/ReviewModal.tsx`
- `lib/supabase.ts`
- `supabase/reviews.sql`
- `SUPABASE_REVIEWS_SETUP.md`

## Files modified

- `.env.example`
- `app/globals.css`
- `components/Testimonials.tsx`
- `README.md`
