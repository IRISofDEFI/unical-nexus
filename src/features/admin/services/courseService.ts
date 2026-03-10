/**
 * Course Service Layer
 */

const API_BASE_URL = "http://localhost:8005/api";

const getHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

export interface Course {
  id: string;
  name: string;
  code: string;
  programme_id: string;
  programme_name?: string;
  created_at: string;
}

export interface CreateCoursePayload {
  name: string;
  code: string;
  programme_id: string;
}

export interface UpdateCoursePayload {
  name?: string;
  code?: string;
  programme_id?: string;
}

// For dropdowns when creating/editing a course
export interface ProgrammeOption {
  id: string;
  name: string;
}

// --------------- Public API ---------------

export async function getProgrammesForCourses(): Promise<ProgrammeOption[]> {
  const response = await fetch(`${API_BASE_URL}/programmes/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch programmes for courses");
  }
  return response.json();
}

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${API_BASE_URL}/courses/`, { headers: getHeaders() });
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
}

export async function createCourse(data: CreateCoursePayload): Promise<Course> {
  const response = await fetch(`${API_BASE_URL}/courses/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create course");
  }
  return response.json();
}

export async function updateCourse(id: string, data: UpdateCoursePayload): Promise<Course> {
  const response = await fetch(`${API_BASE_URL}/courses/${id}/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update course");
  }
  return response.json();
}

export async function uploadCourses(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_BASE_URL}/courses/upload/`, {
    method: "POST",
    headers: {
      "Authorization": token ? `Bearer ${token}` : "",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload courses");
  }
  return response.json();
}

export async function deleteCourse(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/courses/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete course");
  }
}