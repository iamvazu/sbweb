-- TABLE: partner_applications
create table public.partner_applications (
  id                    uuid primary key default gen_random_uuid(),
  company_name          text not null,
  contact_name          text not null,
  email                 text not null,
  phone                 text,
  trade_categories      text[] default '{}',
  cslb_license          text,
  certifications        text[] default '{}',
  insurance_on_file     boolean default false,
  dir_number            text,
  coverage_area         text[] default '{}',
  years_in_business     integer,
  status                text default 'pending'
                        check (status in ('pending', 'reviewing', 'approved', 'rejected')),
  created_at            timestamptz default now()
);

-- RLS
alter table public.partner_applications enable row level security;

-- POLICIES
create policy "Anyone can submit partner application"
  on public.partner_applications for insert
  with check (true);

create policy "Admins can view and update applications"
  on public.partner_applications for all
  using (auth.jwt() ->> 'email' = 'info@strongerbuilt.us');
