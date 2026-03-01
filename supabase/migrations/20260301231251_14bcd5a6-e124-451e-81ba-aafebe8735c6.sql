
-- Fix: Change restrictive policies to permissive on faculties
DROP POLICY "Authenticated users can view faculties" ON public.faculties;
CREATE POLICY "Authenticated users can view faculties"
  ON public.faculties FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY "Admins can insert faculties" ON public.faculties;
CREATE POLICY "Admins can insert faculties"
  ON public.faculties FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Admins can update faculties" ON public.faculties;
CREATE POLICY "Admins can update faculties"
  ON public.faculties FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Admins can delete faculties" ON public.faculties;
CREATE POLICY "Admins can delete faculties"
  ON public.faculties FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Fix: Change restrictive policies to permissive on departments
DROP POLICY "Authenticated users can view departments" ON public.departments;
CREATE POLICY "Authenticated users can view departments"
  ON public.departments FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY "Admins can insert departments" ON public.departments;
CREATE POLICY "Admins can insert departments"
  ON public.departments FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Admins can update departments" ON public.departments;
CREATE POLICY "Admins can update departments"
  ON public.departments FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Admins can delete departments" ON public.departments;
CREATE POLICY "Admins can delete departments"
  ON public.departments FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
