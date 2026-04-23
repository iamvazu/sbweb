-- Update subscription_tier check constraint to include 'scout'
alter table public.users drop constraint if exists users_subscription_tier_check;

alter table public.users add constraint users_subscription_tier_check 
  check (subscription_tier in ('free', 'scout', 'pro', 'enterprise'));
