/**
 * Semester Service Layer
 */

const API_BASE_URL = "http://localhost:8005/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export interface Semester {
  id: string;
  name: string;
  session_id: string;
  session_name?: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface CreateSemesterPayload {
  name: string;
  session_id: string;
  start_date: string;
  end_date: string;
}

export interface UpdateSemesterPayload {
  name?: string;
  session_id?: string;
  start_date?: string;
  end_date?: string;
}

// For dropdowns when creating/editing a semester
export interface SessionOption {
  id: string;
  name: string;
}

// --------------- Public API ---------------

export async function getSessionsForSemesters(): Promise<SessionOption[]> {
  const response = await fetch(`${API_BASE_URL}/sessions/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch sessions for semesters");
  }
  return response.json();
}

export async function getSemesters(): Promise<Semester[]> {
  const response = await fetch(`${API_BASE_URL}/semesters/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch semesters");
  }
  return response.json();
}

export async function createSemester(data: CreateSemesterPayload): Promise<Semester> {
  const response = await fetch(`${API_BASE_URL}/semesters/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create semester");
  }
  return response.json();
}

export async function updateSemester(id: string, data: UpdateSemesterPayload): Promise<Semester> {
  const response = await fetch(`${API_BASE_URL}/semesters/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update semester");
  }
  return response.json();
}

export async function deleteSemester(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/semesters/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete semester");
  }
}