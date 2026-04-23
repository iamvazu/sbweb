-- Fix RLS for partner_applications to allow all @strongerbuilt.us admins
drop policy if exists "Admins can view and update applications" on public.partner_applications;

create policy "Admins can view and update applications"
  on public.partner_applications for all
  using (
    auth.jwt() ->> 'email' like '%@strongerbuilt.us' OR 
    auth.jwt() ->> 'email' = 'crazyme2207@gmail.com' OR
    auth.jwt() ->> 'email' = 'roy@strongerbuilt.us'
  );

-- Create system_logs table
create table if not exists public.system_logs (
  id          uuid primary key default gen_random_uuid(),
  level       text not null default 'info',
  module      text not null,
  message     text not null,
  details     jsonb,
  created_at  timestamptz default now()
);

alter table public.system_logs enable row level security;

create policy "Admins can view system logs"
  on public.system_logs for select
  using (
    auth.jwt() ->> 'email' like '%@strongerbuilt.us' OR 
    auth.jwt() ->> 'email' = 'crazyme2207@gmail.com' OR
    auth.jwt() ->> 'email' = 'roy@strongerbuilt.us'
  );
