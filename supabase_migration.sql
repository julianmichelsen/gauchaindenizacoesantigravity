-- 1. Enable Storage
-- Make sure you have created a public bucket named 'images' in Supabase Storage.
-- You can do this in the Supabase Dashboard -> Storage -> New Bucket -> Name: 'images', Public: true.

-- 2. Add new columns to site_content table
-- We use JSONB to store arrays of objects for flexibility.

ALTER TABLE site_content 
ADD COLUMN IF NOT EXISTS testimonials JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]'::jsonb;

-- Optional: If you want to migrate existing data or set defaults, you can do updates here.
-- Example:
-- UPDATE site_content SET testimonials = '[{"name": "Start", "text": "Example"}]' WHERE id = 1;
