import api from "@/lib/api";

export interface PortalSettings {
  currentSession: string;
  currentSemester: string;
  admissionPortalOpen: boolean;
  courseRegOpen: boolean;
  resultUploadOpen: boolean;
  lateRegFee: string;
}

export const getSettings = (): Promise<PortalSettings> => api("/settings/");
export const updateSettings = (settings: PortalSettings): Promise<PortalSettings> => {
  return api("/settings/", { method: "PUT", body: JSON.stringify(settings) });
};