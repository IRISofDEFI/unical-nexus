/**
 * Report Service Layer
 */

const API_BASE_URL = "https://unical-nexus-backend.onrender.com/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export interface Report {
  id: string;
  title: string;
  description?: string;
  data: any;
  generated_at: string;
}

export interface CreateReportPayload {
  title: string;
  description?: string;
  data?: any;
}

// --------------- Public API ---------------

export async function getReports(): Promise<Report[]> {
  const response = await fetch(`${API_BASE_URL}/reports/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }
  return response.json();
}

export async function createReport(data: CreateReportPayload): Promise<Report> {
  const response = await fetch(`${API_BASE_URL}/reports/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create report");
  }
  return response.json();
}

export async function deleteReport(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/reports/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete report");
  }
}
