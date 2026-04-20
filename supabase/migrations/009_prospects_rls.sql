-- Migration 009: RLS Policies for Prospects
-- Allows authorized admins to view prospect data in the portal

-- Enable RLS on prospects if not already enabled
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;

-- Drop existing admin select if it exists to avoid conflicts
DROP POLICY IF EXISTS "Admins can view all prospects" ON public.prospects;

-- Create policy for Admin view access
CREATE POLICY "Admins can view all prospects"
    ON public.prospects
    FOR SELECT
    TO authenticated
    USING (
        auth.jwt() ->> 'email' LIKE '%@strongerbuilt.us' OR 
        auth.jwt() ->> 'email' = 'roy@strongerbuilt.us' OR
        auth.jwt() ->> 'email' = 'crazyme2207@gmail.com'
    );

-- Also ensure prospect_bid_matches has similar robust access
DROP POLICY IF EXISTS "Admins can do everything on prospect_bid_matches" ON public.prospect_bid_matches;

CREATE POLICY "Admins can do everything on prospect_bid_matches"
    ON public.prospect_bid_matches
    FOR ALL 
    TO authenticated
    USING (
        auth.jwt() ->> 'email' LIKE '%@strongerbuilt.us' OR 
        auth.jwt() ->> 'email' = 'roy@strongerbuilt.us' OR
        auth.jwt() ->> 'email' = 'crazyme2207@gmail.com'
    );
