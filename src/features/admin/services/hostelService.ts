import api from "@/lib/api";

export interface HostelRequest {
  id: string;
  student: string;
  matric: string;
  hostel: string;
  type: string;
  status: "Pending" | "Approved" | "Rejected";
}

export const getHostelRequests = (): Promise<HostelRequest[]> => api("/hostels/requests/");
export const updateHostelRequestStatus = (id: string, status: "Approved" | "Rejected"): Promise<HostelRequest> => {
  return api(`/hostels/requests/${id}/status/`, { method: "PUT", body: JSON.stringify({ status }) });
};