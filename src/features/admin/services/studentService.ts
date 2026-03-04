/**
 * Student Service Layer
 */

const API_BASE_URL = "https://unical-nexus-backend.onrender.com/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export interface Student {
  id: string;
  full_name: string;
  matric_number: string;
  department_id: string;
  department_name?: string;
  created_at: string;
}

export interface CreateStudentPayload {
  full_name: string;
  matric_number: string;
  department_id: string;
}

export interface UpdateStudentPayload {
  full_name?: string;
  matric_number?: string;
  department_id?: string;
}

// For dropdowns when creating/editing a student
export interface DepartmentOption {
  id: string;
  name: string;
}

// --------------- Public API ---------------

export async function getDepartmentsForStudents(): Promise<DepartmentOption[]> {
  const response = await fetch(`${API_BASE_URL}/departments/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch departments for students");
  }
  return response.json();
}

export async function getStudents(): Promise<Student[]> {
  const response = await fetch(`${API_BASE_URL}/students/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
}

export async function createStudent(data: CreateStudentPayload): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/students/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create student");
  }
  return response.json();
}

export async function updateStudent(id: string, data: UpdateStudentPayload): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update student");
  }
  return response.json();
}

export async function deleteStudent(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
}