import api from "@/lib/api";

export interface Department {
  id: string;
  name: string;
  faculty_id: string;
  faculty_name?: string;
}

export interface FacultyOption {
  id: string;
  name: string;
}

export const getDepartments = (): Promise<Department[]> => {
  return api("/departments/");
};

export const getFaculties = (): Promise<FacultyOption[]> => {
  return api("/faculties/");
};

export const createDepartment = (data: { name: string; faculty_id: string }): Promise<Department> => {
  return api("/departments/", { method: "POST", body: JSON.stringify(data) });
};

export const updateDepartment = (id: string, data: { name: string; faculty_id: string }): Promise<Department> => {
  return api(`/departments/${id}/`, { method: "PUT", body: JSON.stringify(data) });
};

export const deleteDepartment = (id: string): Promise<null> => {
  return api(`/departments/${id}/`, { method: "DELETE" });
};