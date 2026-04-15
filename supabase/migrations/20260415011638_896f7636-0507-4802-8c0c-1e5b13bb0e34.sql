
-- Job listings table
CREATE TABLE public.job_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT,
  employment_type TEXT,
  description TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;

-- Anyone can view active listings
CREATE POLICY "Anyone can view active job listings"
ON public.job_listings FOR SELECT
USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can manage job listings"
ON public.job_listings FOR ALL
TO authenticated
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_listing_id UUID NOT NULL REFERENCES public.job_listings(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  cover_message TEXT,
  resume_url TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application (insert only)
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications FOR INSERT
WITH CHECK (true);

-- Admins can view and manage all applications
CREATE POLICY "Admins can manage job applications"
ON public.job_applications FOR ALL
TO authenticated
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Triggers for updated_at
CREATE TRIGGER update_job_listings_updated_at
BEFORE UPDATE ON public.job_listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed the first job listing
INSERT INTO public.job_listings (title, location, employment_type, description) VALUES (
  'Assistant Manager – 813 Dim Sum Café (Ozamiz City)',
  'Ozamiz City',
  'Full-time (3-month conditional employment)',
  E'## About Us\n813 Dim Sum Café is a new concept bringing a modern dim sum experience to Ozamiz. Fast-paced, high standards, no shortcuts. We''re building something from the ground up—and we need someone who can do the same.\n\n## The Role\nThis is not a "maintain the store" job. This is a **build the store, fix the problems, and make it work** job.\n\nYou will work directly with the owner (acting as Restaurant Manager for the first 3 months) to launch and run daily operations. Expect long days early on. Expect problems. Your job is to help solve them and take ownership fast.\n\n## Key Responsibilities\n\n### Setup & Launch\n- Assist in sourcing and purchasing initial equipment, tools, and supplies\n- Coordinate with suppliers and support negotiations\n- Help prepare store readiness: kitchen flow, dining setup, storage, utilities\n\n### Systems & Operations\n- Help implement POS, inventory tracking, and cash handling systems\n- Execute daily workflows for kitchen + front of house\n- Support daily remittance accuracy and cash control\n\n### Team Management\n- Assist in hiring, training, and managing staff\n- Take responsibility for hiring and firing decisions (in coordination with the owner during initial phase)\n- Implement and enforce performance improvement plans (PIPs) for underperforming staff\n- Set and enforce standards for speed, cleanliness, and customer experience\n- Help build a disciplined, respectful team culture\n\n### Problem Solving\n- Handle issues on the spot with guidance from the owner\n- Stay resourceful—find solutions even with limited resources\n- Continuously improve operations week by week\n\n## Career Path & Growth\nWe promote based on performance and ownership, not tenure.\n\n**Clear Path (Target: 12 months):**\n1. **Assistant Manager** (You start here)\n2. **Operations Manager** – lead shifts, own performance metrics\n3. **Restaurant Manager** – full ownership of the store\n\n**End Goal (Within 1 Year):**\n- You are the Restaurant Manager\n- You lead the entire operation\n- You have two Assistant Managers reporting directly to you:\n  - Assistant Manager (Café Operations) – drinks, café service, front of house\n  - Assistant Manager (Dim Sum Operations) – kitchen execution, dim sum quality, back of house\n- You are accountable for performance, team, and growth\n\n## Who We''re Looking For\n- Highly resourceful – you figure things out without waiting\n- Strong initiative – you don''t need to be told what to do\n- Comfortable with pressure and fast pace\n- Hands-on (not just managing, but doing)\n- Organized with attention to detail (especially cash + inventory)\n- **Strong preference for candidates with experience in food & beverage, hospitality, and/or retail operations**\n- **Applicants without relevant experience need not apply**\n\n## Compensation & Growth\n- Starting salary based on Cebu market standards (competitive for top performers)\n- Guaranteed annual pay increase, based on restaurant performance\n- Fast-track promotion for strong performers\n\n## Employment Terms\n- 3-month conditional/probationary period\n- During this period, you will work directly under the owner (Restaurant Manager)\n- Regularization based on performance, reliability, and results\n\n## Why Join\n- Be part of building something new in Ozamiz\n- Learn directly from the owner during launch phase\n- Real responsibility, real impact\n- Fast-paced, rewarding environment for the right person\n\n---\n\n**If you''re looking for an easy job, this is not it.**\n**If you want to build something and take ownership, we should talk.**'
);
