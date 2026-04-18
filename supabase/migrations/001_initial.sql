/**
 * SUPABASE MIGRATION: 001_initial.sql
 * BidIQ Foundation: Users, Bids, Matches, and Engagements
 */

-- ENABLE EXTENSIONS
create extension if not exists "uuid-ossp";

-- TABLE: users (extends Supabase auth.users)
-- This table stores company profiles linked to Supabase Auth IDs.
create table public.users (
  id                  uuid primary key references auth.users(id) on delete cascade,
  email               text unique not null,
  business_name       text not null default '',
  dba                 text,
  ein                 text,
  cslb_license        text,
  dir_registration    text,
  certifications      text[] default '{}',
  naics_codes         text[] default '{}',
  counties_served     text[] default '{}',
  max_contract_value  integer,
  bonding_capacity    integer,
  subscription_tier   text default 'free' check (subscription_tier in ('free','pro','enterprise')),
  subscription_status text default 'trial' check (subscription_status in ('trial','active','cancelled','expired')),
  onboarding_complete boolean default false,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- TABLE: bids
create table public.bids (
  id                      uuid primary key default gen_random_uuid(),
  event_id                text unique not null,
  department_code         text,
  department_name         text,
  event_name              text not null,
  format                  text,
  type                    text,
  end_date                timestamptz,
  status                  text default 'Posted',
  buyer_name              text,
  buyer_email             text,
  portal_link             text,
  prebid_type             text check (prebid_type in ('M','NM',null)),
  prebid_date             timestamptz,
  prebid_time             text,
  prebid_location         text,
  comments                text,
  source                  text default 'caleprocure',
  pdf_urls                text[] default '{}',
  extracted_text          text,
  bid_plan                jsonb,
  go_nogo                 text default 'PENDING' check (go_nogo in ('PENDING','GO','NO_GO','REVIEW')),
  mandatory_prebid_passed boolean default false,
  estimated_value_min     integer,
  estimated_value_max     integer,
  prevailing_wage         boolean default false,
  dbe_goal                text,
  dvbe_goal               text,
  sbe_only                boolean default false,
  bonding_required        boolean default false,
  first_seen              timestamptz default now(),
  last_updated            timestamptz default now()
);

-- TABLE: user_bid_matches
create table public.user_bid_matches (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references public.users(id) on delete cascade,
  bid_id         uuid not null references public.bids(id) on delete cascade,
  fit_score      integer check (fit_score between 0 and 100),
  pipeline_stage text default 'new_match' check (pipeline_stage in ('new_match','reviewing','pursuing','submitted','won','lost','passed')),
  user_decision  text check (user_decision in ('pursue','monitor','pass',null)),
  hire_us_requested   boolean default false,
  service_tier_selected text,
  notes          text,
  matched_at     timestamptz default now(),
  last_updated   timestamptz default now(),
  unique(user_id, bid_id)
);

-- TABLE: service_engagements
create table public.service_engagements (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.users(id) on delete cascade,
  bid_id                uuid references public.bids(id),
  tier                  text not null check (tier in ('ifb_express','rfp_standard','full_cycle','retainer')),
  price_agreed          integer not null,
  payment_status        text default 'pending' check (payment_status in ('pending','paid','invoiced')),
  stripe_payment_id     text,
  status                text default 'intake' check (status in ('intake','in_progress','submitted','complete','cancelled')),
  assigned_to           text,
  client_notes          text,
  submission_date       timestamptz,
  submission_reference  text,
  outcome               text check (outcome in ('won','lost','pending_award','disqualified',null)),
  created_at            timestamptz default now()
);

-- FUNCTION: handle_new_user
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- TRIGGER: on_auth_user_created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ENABLE RLS
alter table public.users enable row level security;
alter table public.bids enable row level security;
alter table public.user_bid_matches enable row level security;
alter table public.service_engagements enable row level security;

-- POLICIES: users
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

-- POLICIES: bids
create policy "Authenticated users can view bids" on public.bids for select using (auth.role() = 'authenticated');

-- POLICIES: user_bid_matches
create policy "Users can view own matches" on public.user_bid_matches for select using (auth.uid() = user_id);
create policy "Users can insert own matches" on public.user_bid_matches for insert with check (auth.uid() = user_id);
create policy "Users can update own matches" on public.user_bid_matches for update using (auth.uid() = user_id);

-- POLICIES: service_engagements
create policy "Users can view own engagements" on public.service_engagements for select using (auth.uid() = user_id);
create policy "Users can insert own engagements" on public.service_engagements for insert with check (auth.uid() = user_id);

-- PERFORMANCE INDEXES
create index bids_end_date_idx on public.bids(end_date);
create index bids_go_nogo_idx on public.bids(go_nogo);
create index bids_status_idx on public.bids(status);
create index bids_first_seen_idx on public.bids(first_seen);
create index matches_user_id_idx on public.user_bid_matches(user_id);
create index matches_fit_score_idx on public.user_bid_matches(fit_score desc);
create index matches_stage_idx on public.user_bid_matches(pipeline_stage);
