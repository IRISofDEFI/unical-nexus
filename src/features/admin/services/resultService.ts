/**
 * Result Service Layer
 */

const API_BASE_URL = "http://localhost:8005/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export interface Result {
  id: string;
  student_id: string;
  student_name?: string;
  student_matric?: string;
  course_id: string;
  course_code?: string;
  course_name?: string;
  score: number;
  grade: string;
  created_at: string;
}

export interface CreateResultPayload {
  student_id: string;
  course_id: string;
  score: number;
  grade: string;
}

export interface UpdateResultPayload {
  student_id?: string;
  course_id?: string;
  score?: number;
  grade?: string;
}

// For dropdowns when creating/editing a result
export interface StudentOption {
  id: string;
  name: string;
}

export interface CourseOption {
  id: string;
  name: string;
}

// --------------- Public API ---------------

export async function getStudentsForResults(): Promise<StudentOption[]> {
  const response = await fetch(`${API_BASE_URL}/students/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch students for results");
  }
  return response.json();
}

export async function getCoursesForResults(): Promise<CourseOption[]> {
  const response = await fetch(`${API_BASE_URL}/courses/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch courses for results");
  }
  return response.json();
}

export async function getResults(): Promise<Result[]> {
  const response = await fetch(`${API_BASE_URL}/results/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }
  return response.json();
}

export async function createResult(data: CreateResultPayload): Promise<Result> {
  const response = await fetch(`${API_BASE_URL}/results/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create result");
  }
  return response.json();
}

export async function updateResult(id: string, data: UpdateResultPayload): Promise<Result> {
  const response = await fetch(`${API_BASE_URL}/results/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update result");
  }
  return response.json();
}

export async function uploadResults(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_BASE_URL}/results/upload/`, {
    method: "POST",
    headers: {
      "Authorization": token ? `Bearer ${token}` : "",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload results");
  }
  return response.json();
}

export async function deleteResult(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/results/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete result");
  }
}