/**
 * Fee Item Service Layer
 */

const API_BASE_URL = "https://unical-nexus-backend.onrender.com/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export interface FeeItem {
  id: string;
  name: string;
  description?: string;
  amount: number;
  created_at: string;
}

export interface CreateFeeItemPayload {
  name: string;
  description?: string;
  amount: number;
}

export interface UpdateFeeItemPayload {
  name?: string;
  description?: string;
  amount?: number;
}

// --------------- Public API ---------------

export async function getFeeItems(): Promise<FeeItem[]> {
  const response = await fetch(`${API_BASE_URL}/fee-items/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch fee items");
  }
  return response.json();
}

export async function createFeeItem(data: CreateFeeItemPayload): Promise<FeeItem> {
  const response = await fetch(`${API_BASE_URL}/fee-items/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create fee item");
  }
  return response.json();
}

export async function updateFeeItem(id: string, data: UpdateFeeItemPayload): Promise<FeeItem> {
  const response = await fetch(`${API_BASE_URL}/fee-items/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update fee item");
  }
  return response.json();
}

export async function deleteFeeItem(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/fee-items/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete fee item");
  }
}