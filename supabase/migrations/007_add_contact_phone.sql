-- Migration: Add contact_phone to bids table
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS contact_phone TEXT;

-- Ensure all other intelligence columns are present (idempotent)
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS published_date TIMESTAMPTZ;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS event_version TEXT;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS prebid_comments TEXT;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS unspsc_codes JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS service_areas JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS event_format_type TEXT;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS contractor_license_type TEXT;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE public.bids ADD COLUMN IF NOT EXISTS contact_email TEXT;
