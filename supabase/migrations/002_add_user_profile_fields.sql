-- MIGRATION: Add missing profile fields to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS entity_type TEXT,
ADD COLUMN IF NOT EXISTS sam_uei TEXT,
ADD COLUMN IF NOT EXISTS cslb_classes TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS max_radius TEXT DEFAULT '50',
ADD COLUMN IF NOT EXISTS max_concurrent_bids INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS exclusion_keywords TEXT[] DEFAULT '{}';

-- ADD COMMENTS for clarity
COMMENT ON COLUMN public.users.address IS 'Physical business address';
COMMENT ON COLUMN public.users.phone IS 'Business contact phone number';
COMMENT ON COLUMN public.users.entity_type IS 'Legal entity type (LLC, Corp, etc.)';
COMMENT ON COLUMN public.users.sam_uei IS 'SAM.gov Unique Entity ID';
COMMENT ON COLUMN public.users.cslb_classes IS 'List of CSLB license classifications held';
COMMENT ON COLUMN public.users.max_radius IS 'Maximum travel distance in miles';
COMMENT ON COLUMN public.users.max_concurrent_bids IS 'Target number of simultaneous bid pursuits';
COMMENT ON COLUMN public.users.exclusion_keywords IS 'Keywords used to ignore irrelevant bids';
