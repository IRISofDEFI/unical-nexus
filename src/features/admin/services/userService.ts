import api from "@/lib/api";

export interface Student {
  id: string;
  name: string;
  matric: string;
  department: string;
  level: string;
}

export interface Staff {
  id: string;
  name: string;
  staffId: string;
  role: string;
  department: string;
}

export interface Applicant {
  id: string;
  name: string;
  jambReg: string;
  score: number;
  department: string;
  status: string;
}

// Students
export const getStudents = (): Promise<Student[]> => api("/students/");
export const createStudent = (data: Omit<Student, "id">): Promise<Student> => api("/students/", { method: "POST", body: JSON.stringify(data) });
export const deleteStudent = (id: string): Promise<null> => api(`/students/${id}/`, { method: "DELETE" });

// Staff
export const getStaff = (): Promise<Staff[]> => api("/staff/");
export const createStaff = (data: Omit<Staff, "id">): Promise<Staff> => api("/staff/", { method: "POST", body: JSON.stringify(data) });
export const deleteStaff = (id: string): Promise<null> => api(`/staff/${id}/`, { method: "DELETE" });

// Admissions
export const getApplicants = (): Promise<Applicant[]> => api("/admissions/applicants/");
export const admitApplicant = (id: string): Promise<Applicant> => api(`/admissions/applicants/${id}/admit/`, { method: "POST" });