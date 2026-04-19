-- Add missing compliance column to bids table
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS mandatory_prebid BOOLEAN DEFAULT FALSE;

-- Ensure audit column exists for good measure
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS ai_analysis_version INTEGER DEFAULT 1;
