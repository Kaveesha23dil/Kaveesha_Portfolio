-- Run this once in Supabase SQL Editor.
-- New reviews become public immediately; no admin approval is required.

alter table public.reviews
  alter column email drop not null,
  alter column status set default 'approved';

grant select (
  id,
  full_name,
  job_title,
  company_name,
  review_text,
  rating,
  project_type,
  status,
  created_at
) on public.reviews to anon;

grant insert (
  full_name,
  job_title,
  company_name,
  email,
  review_text,
  rating,
  project_type,
  status
) on public.reviews to anon;

update public.reviews
set status = 'approved'
where status = 'pending';

drop policy if exists "Anonymous visitors can submit pending reviews" on public.reviews;
drop policy if exists "Anonymous visitors can publish reviews" on public.reviews;

create policy "Anonymous visitors can publish reviews"
on public.reviews
for insert
to anon
with check (status = 'approved');

drop policy if exists "Anyone can read approved reviews" on public.reviews;

create policy "Anyone can read approved reviews"
on public.reviews
for select
to anon
using (status = 'approved');

notify pgrst, 'reload schema';
