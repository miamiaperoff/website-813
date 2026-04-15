-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- Allow anyone to upload a resume (applicants are not authenticated)
CREATE POLICY "Anyone can upload resumes"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'resumes');

-- Allow authenticated users (admins) to view resumes
CREATE POLICY "Authenticated users can view resumes"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');