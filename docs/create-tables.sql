-- CrownCare — missing tables in the current Supabase project (fjouxmpzsxmxttisdnjd)
-- Run this in Supabase → SQL Editor. Only `waitlist` existed; this adds the rest.

-- 1. Source column on waitlist (optional but recommended) so Sheets/analytics
--    can tell signups vs newsletter vs premium apart without parsing the name.
alter table if exists public.waitlist
  add column if not exists source text;

-- 2. bookings — powers the "Book Consultation" form (ExpertDetailPage)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  expert_id text not null,
  expert_name text not null,
  topic text not null,
  preferred_date text not null,
  time_slot text not null,
  notes text
);
alter table public.bookings enable row level security;
create policy "Anyone can request a booking"
  on public.bookings for insert
  with check (true);

-- After running: Supabase auto-reloads the schema cache within a minute.
-- If the app still says "table not found", run:  notify pgrst, 'reload schema';
