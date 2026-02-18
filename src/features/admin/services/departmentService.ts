/**
 * Department Service Layer
 *
 * Async functions that call the Supabase backend.
 * A backend developer can swap the implementation for any REST/GraphQL API.
 */

import { supabase } from "@/integrations/supabase/client";

export interface Department {
  id: string;
  name: string;
  faculty_id: string;
  faculty_name?: string;
  created_at: string;
}

export interface CreateDepartmentPayload {
  name: string;
  faculty_id: string;
}

export interface UpdateDepartmentPayload {
  name?: string;
  faculty_id?: string;
}

export interface FacultyOption {
  id: string;
  name: string;
}

// --------------- Public API ---------------

export async function getFaculties(): Promise<FacultyOption[]> {
  const { data, error } = await supabase
    .from("faculties")
    .select("id, name")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getDepartments(): Promise<Department[]> {
  const { data, error } = await supabase
    .from("departments")
    .select("id, name, faculty_id, created_at, faculties(name)")
    .order("name");
  if (error) throw error;
  return (data ?? []).map((d: any) => ({
    id: d.id,
    name: d.name,
    faculty_id: d.faculty_id,
    faculty_name: d.faculties?.name ?? "",
    created_at: d.created_at,
  }));
}

export async function createDepartment(payload: CreateDepartmentPayload): Promise<Department> {
  const { data, error } = await supabase
    .from("departments")
    .insert({ name: payload.name, faculty_id: payload.faculty_id })
    .select("id, name, faculty_id, created_at")
    .single();
  if (error) throw error;
  return data;
}

export async function updateDepartment(id: string, payload: UpdateDepartmentPayload): Promise<Department> {
  const { data, error } = await supabase
    .from("departments")
    .update(payload)
    .eq("id", id)
    .select("id, name, faculty_id, created_at")
    .single();
  if (error) throw error;
  return data;
}

export async function deleteDepartment(id: string): Promise<void> {
  const { error } = await supabase.from("departments").delete().eq("id", id);
  if (error) throw error;
}
