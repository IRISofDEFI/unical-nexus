
-- Create faculties table
CREATE TABLE IF NOT EXISTS public.faculties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view faculties"
  ON public.faculties FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert faculties"
  ON public.faculties FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update faculties"
  ON public.faculties FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete faculties"
  ON public.faculties FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed initial faculties
INSERT INTO public.faculties (name) VALUES
  ('Faculty of Science'),
  ('Faculty of Arts'),
  ('Faculty of Engineering')
ON CONFLICT (name) DO NOTHING;

-- Create departments table
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  faculty_id UUID NOT NULL REFERENCES public.faculties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view departments"
  ON public.departments FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert departments"
  ON public.departments FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update departments"
  ON public.departments FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete departments"
  ON public.departments FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
