/**
 * Faculty Service Layer
 */

const API_BASE_URL = "https://unical-nexus-backend.onrender.com/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export interface Faculty {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreateFacultyPayload {
  name: string;
}

export interface UpdateFacultyPayload {
  name: string;
}

// --------------- Public API ---------------

export async function getFaculties(): Promise<Faculty[]> {
  const response = await fetch(`${API_BASE_URL}/faculties/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch faculties");
  }
  return response.json();
}

export async function createFaculty(data: CreateFacultyPayload): Promise<Faculty> {
  const response = await fetch(`${API_BASE_URL}/faculties/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create faculty");
  }
  return response.json();
}

export async function updateFaculty(id: string, data: UpdateFacultyPayload): Promise<Faculty> {
  const response = await fetch(`${API_BASE_URL}/faculties/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update faculty");
  }
  return response.json();
}

export async function deleteFaculty(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/faculties/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete faculty");
  }
}
