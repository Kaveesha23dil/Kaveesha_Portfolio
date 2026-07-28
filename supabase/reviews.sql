create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(btrim(full_name)) between 1 and 100),
  job_title text not null check (char_length(btrim(job_title)) between 1 and 100),
  company_name text check (company_name is null or char_length(btrim(company_name)) between 1 and 120),
  email text not null check (
    char_length(btrim(email)) between 3 and 254
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  review_text text not null check (char_length(btrim(review_text)) between 1 and 500),
  rating integer not null check (rating between 1 and 5),
  project_type text check (
    project_type is null or project_type in (
      'UI/UX Design',
      'Web Development',
      'Brand Design',
      'Motion Design',
      'Other'
    )
  ),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create table if not exists public.review_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.review_admins enable row level security;

revoke all on table public.reviews from anon;
grant insert (
  full_name,
  job_title,
  company_name,
  email,
  review_text,
  rating,
  project_type
) on table public.reviews to anon;
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
) on table public.reviews to anon;
grant select, update, delete on table public.reviews to authenticated;
grant select on table public.review_admins to authenticated;

drop policy if exists "Anonymous visitors can submit pending reviews" on public.reviews;
create policy "Anonymous visitors can submit pending reviews"
on public.reviews
for insert
to anon
with check (status = 'pending');

drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
on public.reviews
for select
to anon
using (status = 'approved');

drop policy if exists "Administrators can read every review" on public.reviews;
create policy "Administrators can read every review"
on public.reviews
for select
to authenticated
using (
  exists (
    select 1 from public.review_admins
    where review_admins.user_id = auth.uid()
  )
);

drop policy if exists "Administrators can update reviews" on public.reviews;
create policy "Administrators can update reviews"
on public.reviews
for update
to authenticated
using (
  exists (
    select 1 from public.review_admins
    where review_admins.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.review_admins
    where review_admins.user_id = auth.uid()
  )
);

drop policy if exists "Administrators can delete reviews" on public.reviews;
create policy "Administrators can delete reviews"
on public.reviews
for delete
to authenticated
using (
  exists (
    select 1 from public.review_admins
    where review_admins.user_id = auth.uid()
  )
);

drop policy if exists "Administrators can read their membership" on public.review_admins;
create policy "Administrators can read their membership"
on public.review_admins
for select
to authenticated
using (user_id = auth.uid());

-- Anonymous visitors receive no UPDATE or DELETE grants or policies.
-- After creating an Auth user, register it as an administrator:
-- insert into public.review_admins (user_id)
-- values ('AUTH_USER_UUID_HERE');
