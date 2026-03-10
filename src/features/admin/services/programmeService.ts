/**
 * Programme Service Layer
 */

const API_BASE_URL = "http://localhost:8005/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export interface Programme {
  id: string;
  name: string;
  department_id: string;
  department_name?: string;
  created_at: string;
}

export interface CreateProgrammePayload {
  name: string;
  department_id: string;
}

export interface UpdateProgrammePayload {
  name?: string;
  department_id?: string;
}

// For dropdowns when creating/editing a programme
export interface DepartmentOption {
  id: string;
  name: string;
}

// --------------- Public API ---------------

export async function getDepartmentsForProgrammes(): Promise<DepartmentOption[]> {
  const response = await fetch(`${API_BASE_URL}/departments/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch departments for programmes");
  }
  return response.json();
}

export async function getProgrammes(): Promise<Programme[]> {
  const response = await fetch(`${API_BASE_URL}/programmes/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch programmes");
  }
  return response.json();
}

export async function createProgramme(data: CreateProgrammePayload): Promise<Programme> {
  const response = await fetch(`${API_BASE_URL}/programmes/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create programme");
  }
  return response.json();
}

export async function updateProgramme(id: string, data: UpdateProgrammePayload): Promise<Programme> {
  const response = await fetch(`${API_BASE_URL}/programmes/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update programme");
  }
  return response.json();
}

export async function deleteProgramme(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/programmes/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete programme");
  }
}