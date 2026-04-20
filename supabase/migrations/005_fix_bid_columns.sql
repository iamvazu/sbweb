-- Migration 005: Align Bids Table Schema with Agents and Frontend
-- Renames buyer columns to contact to match scraper logic and frontend expectations

-- Rename buyer_name to contact_name
ALTER TABLE public.bids RENAME COLUMN buyer_name TO contact_name;

-- Rename buyer_email to contact_email
ALTER TABLE public.bids RENAME COLUMN buyer_email TO contact_email;

-- Add doc_links as JSONB to store structured document metadata
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS doc_links JSONB DEFAULT '[]'::jsonb;

-- Comment for clarity
COMMENT ON COLUMN public.bids.contact_name IS 'Primary contact person for the bid, extracted via deep scraping';
COMMENT ON COLUMN public.bids.contact_email IS 'Email address of the primary contact, extracted via deep scraping';
COMMENT ON COLUMN public.bids.doc_links IS 'Array of objects containing document names, types, and statuses';
