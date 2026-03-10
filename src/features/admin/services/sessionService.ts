/**
 * Session Service Layer
 */

const API_BASE_URL = "https://unical-nexus-backend.onrender.com/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export interface Session {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface CreateSessionPayload {
  name: string;
  start_date: string;
  end_date: string;
}

export interface UpdateSessionPayload {
  name?: string;
  start_date?: string;
  end_date?: string;
}

// --------------- Public API ---------------

export async function getSessions(): Promise<Session[]> {
  const response = await fetch(`${API_BASE_URL}/sessions/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }
  return response.json();
}

export async function createSession(data: CreateSessionPayload): Promise<Session> {
  const response = await fetch(`${API_BASE_URL}/sessions/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create session");
  }
  return response.json();
}

export async function updateSession(id: string, data: UpdateSessionPayload): Promise<Session> {
  const response = await fetch(`${API_BASE_URL}/sessions/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update session");
  }
  return response.json();
}

export async function deleteSession(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/sessions/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete session");
  }
}