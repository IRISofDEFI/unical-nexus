import api from "@/lib/api";

export interface Faculty {
  id: string;
  name: string;
}

export const getFaculties = (): Promise<Faculty[]> => {
  return api("/faculties/");
};

export const createFaculty = (data: { name: string }): Promise<Faculty> => {
  return api("/faculties/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateFaculty = (id: string, data: { name:string }): Promise<Faculty> => {
  return api(`/faculties/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteFaculty = (id: string): Promise<null> => {
  return api(`/faculties/${id}/`, {
    method: "DELETE",
  });
};