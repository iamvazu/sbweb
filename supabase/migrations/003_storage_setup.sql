-- Ensure Storage Bucket is public and has proper policies for BidIQ
-- This script provides the underlying setup for the 'bid-documents' bucket.

-- 1. Insert bucket if not exists (redundant to python but good for SQL control)
INSERT INTO storage.buckets (id, name, public)
VAlUES ('bid-documents', 'bid-documents', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to read files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'bid-documents' );

-- 3. Allow service role to manage files (already default, but explicit for clarity)
CREATE POLICY "Service Role Full Access"
ON storage.objects FOR ALL
TO service_role
USING ( bucket_id = 'bid-documents' )
WITH CHECK ( bucket_id = 'bid-documents' );
