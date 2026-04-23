-- Allow admins to view all data across critical tables
create policy "Admins can view all users"
  on public.users for select
  using (
    auth.jwt() ->> 'email' like '%@strongerbuilt.us' OR 
    auth.jwt() ->> 'email' = 'crazyme2207@gmail.com' OR
    auth.jwt() ->> 'email' = 'roy@strongerbuilt.us'
  );

create policy "Admins can update any user"
  on public.users for update
  using (
    auth.jwt() ->> 'email' like '%@strongerbuilt.us' OR 
    auth.jwt() ->> 'email' = 'crazyme2207@gmail.com' OR
    auth.jwt() ->> 'email' = 'roy@strongerbuilt.us'
  );

create policy "Admins can view all matches"
  on public.user_bid_matches for select
  using (
    auth.jwt() ->> 'email' like '%@strongerbuilt.us' OR 
    auth.jwt() ->> 'email' = 'crazyme2207@gmail.com' OR
    auth.jwt() ->> 'email' = 'roy@strongerbuilt.us'
  );

create policy "Admins can view all engagements"
  on public.service_engagements for select
  using (
    auth.jwt() ->> 'email' like '%@strongerbuilt.us' OR 
    auth.jwt() ->> 'email' = 'crazyme2207@gmail.com' OR
    auth.jwt() ->> 'email' = 'roy@strongerbuilt.us'
  );

create policy "Admins can update any engagement"
  on public.service_engagements for update
  using (
    auth.jwt() ->> 'email' like '%@strongerbuilt.us' OR 
    auth.jwt() ->> 'email' = 'crazyme2207@gmail.com' OR
    auth.jwt() ->> 'email' = 'roy@strongerbuilt.us'
  );

create policy "Admins can update any bid"
  on public.bids for update
  using (
    auth.jwt() ->> 'email' like '%@strongerbuilt.us' OR 
    auth.jwt() ->> 'email' = 'crazyme2207@gmail.com' OR
    auth.jwt() ->> 'email' = 'roy@strongerbuilt.us'
  );
