/**
 * Department Service Layer
 */

const API_BASE_URL = "https://unical-nexus-backend.onrender.com";

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
  const response = await fetch(`${API_BASE_URL}/faculties`);
  if (!response.ok) {
    throw new Error("Failed to fetch faculties");
  }
  return response.json();
}

export async function getDepartments(): Promise<Department[]> {
  const response = await fetch(`${API_BASE_URL}/departments`);
  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }
  return response.json();
}

export async function createDepartment(payload: CreateDepartmentPayload): Promise<Department> {
  const response = await fetch(`${API_BASE_URL}/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create department");
  }
  return response.json();
}

export async function updateDepartment(id: string, payload: UpdateDepartmentPayload): Promise<Department> {
  const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update department");
  }
  return response.json();
}

export async function deleteDepartment(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/departments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete department");
  }
}
