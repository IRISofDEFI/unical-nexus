/**
 * Faculty Service Layer
 */

const API_BASE_URL = "https://unical-nexus-backend.onrender.com";

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
  const response = await fetch(`${API_BASE_URL}/faculties`);
  if (!response.ok) {
    throw new Error("Failed to fetch faculties");
  }
  return response.json();
}

export async function createFaculty(data: CreateFacultyPayload): Promise<Faculty> {
  const response = await fetch(`${API_BASE_URL}/faculties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create faculty");
  }
  return response.json();
}

export async function updateFaculty(id: string, data: UpdateFacultyPayload): Promise<Faculty> {
  const response = await fetch(`${API_BASE_URL}/faculties/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update faculty");
  }
  return response.json();
}

export async function deleteFaculty(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/faculties/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete faculty");
  }
}
