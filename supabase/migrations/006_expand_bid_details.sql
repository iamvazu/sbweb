-- Migration 006: Expand Bids Table for Comprehensive Event Details
-- Captures Pre-Bid, UNSPSC, Service Areas, and other metadata found on Cal eProcure detail pages

ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS published_date TIMESTAMPTZ;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS event_version TEXT;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS prebid_comments TEXT;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS unspsc_codes JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS service_areas JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS event_format_type TEXT;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS contractor_license_type TEXT;

-- Descriptive comments
COMMENT ON COLUMN public.bids.unspsc_codes IS 'List of objects with code and description keys';
COMMENT ON COLUMN public.bids.service_areas IS 'List of objects with id and county keys';
COMMENT ON COLUMN public.bids.contractor_license_type IS 'Required contractor license type for this bid';
