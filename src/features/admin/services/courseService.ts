import api from "@/lib/api";

export interface Course {
  id: string;
  code: string;
  title: string;
  units: number;
  department_id: string;
  department_name?: string;
  level: number;
  semester: "First" | "Second";
}

export const getCourses = (): Promise<Course[]> => {
  return api("/courses/");
};

export const createCourse = (data: Omit<Course, "id" | "department_name">): Promise<Course> => {
  return api("/courses/", { method: "POST", body: JSON.stringify(data) });
};

export const deleteCourse = (id: string): Promise<null> => {
  return api(`/courses/${id}/`, { method: "DELETE" });
};