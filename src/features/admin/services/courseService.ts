import api from "@/lib/api";

export interface Course {
  id: string;
  code: string;
  title: string;
  units: number;
  level: number;
  semester: "First" | "Second";
  department: string; // department name for display
  department_id: string;
  description?: string;
}

export type CourseCreatePayload = {
  title: string;
  code: string;
  units: string;
  level: string;
  semester: string;
  department_id: string;
  description?: string;
}

export const getCourses = (): Promise<Course[]> => {
  return api("/courses/");
};

export const createCourse = (data: CourseCreatePayload): Promise<Course> => {
  return api("/courses/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteCourse = (id: string): Promise<null> => {
  return api(`/courses/${id}/`, { method: "DELETE" });
};