-- Migration 008: Prospect Bid Matching Table
-- Stores pairs of (prospect, bid) with scoring and reasons

CREATE TABLE IF NOT EXISTS public.prospect_bid_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
    bid_id UUID NOT NULL REFERENCES public.bids(id) ON DELETE CASCADE,
    
    score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    match_reasons JSONB DEFAULT '[]'::jsonb,
    
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'notified', 'dismissed', 'archived')),
    
    last_scored_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    -- Ensure we don't have duplicate matches
    UNIQUE(prospect_id, bid_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_pbm_score ON public.prospect_bid_matches(score DESC);
CREATE INDEX IF NOT EXISTS idx_pbm_bid_id ON public.prospect_bid_matches(bid_id);
CREATE INDEX IF NOT EXISTS idx_pbm_prospect_id ON public.prospect_bid_matches(prospect_id);
CREATE INDEX IF NOT EXISTS idx_pbm_status ON public.prospect_bid_matches(status);

-- Enable RLS
ALTER TABLE public.prospect_bid_matches ENABLE ROW LEVEL SECURITY;

-- Admin policies
CREATE POLICY "Admins can do everything on prospect_bid_matches"
    ON public.prospect_bid_matches
    FOR ALL
    TO authenticated
    USING (
        auth.jwt() ->> 'email' LIKE '%@strongerbuilt.us' OR 
        auth.jwt() ->> 'email' = 'roy@strongerbuilt.us' OR
        auth.jwt() ->> 'email' = 'crazyme2207@gmail.com'
    );
