import api from "@/lib/api";

export interface FeeItem {
  id: string;
  name: string;
  amount: number;
  description?: string;
}

export interface FacultyCharge {
  id: string;
  faculty: string;
  department: string;
  level: string;
  session: string;
  amount: number;
}

export interface ExtraCharge {
  id: string;
  name: string;
  amount: number;
  type: string;
}

export interface Payment {
  id: string;
  student: string;
  matric: string;
  amount: number;
  date: string;
  status: string;
  ref: string;
}

export interface Transaction {
  id: string;
  ref: string;
  amount: number;
  type: string;
  date: string;
  status: "Success" | "Pending" | "Failed";
  gateway: string;
}

// Fee Items
export const getFeeItems = (): Promise<FeeItem[]> => api("/fees/items/");
export const createFeeItem = (data: Omit<FeeItem, "id">): Promise<FeeItem> => api("/fees/items/", { method: "POST", body: JSON.stringify(data) });
export const updateFeeItem = (id: string, data: Partial<FeeItem>): Promise<FeeItem> => api(`/fees/items/${id}/`, { method: "PUT", body: JSON.stringify(data) });
export const deleteFeeItem = (id: string): Promise<null> => api(`/fees/items/${id}/`, { method: "DELETE" });

// Faculty Charges
export const getFacultyCharges = (): Promise<FacultyCharge[]> => api("/fees/faculty-charges/");
export const createFacultyCharge = (data: Omit<FacultyCharge, "id">): Promise<FacultyCharge> => api("/fees/faculty-charges/", { method: "POST", body: JSON.stringify(data) });
export const deleteFacultyCharge = (id: string): Promise<null> => api(`/fees/faculty-charges/${id}/`, { method: "DELETE" });

// Extra Charges
export const getExtraCharges = (): Promise<ExtraCharge[]> => api("/fees/extra-charges/");
export const createExtraCharge = (data: Omit<ExtraCharge, "id">): Promise<ExtraCharge> => api("/fees/extra-charges/", { method: "POST", body: JSON.stringify(data) });
export const deleteExtraCharge = (id: string): Promise<null> => api(`/fees/extra-charges/${id}/`, { method: "DELETE" });

// Payments & Transactions
export const getPayments = (): Promise<Payment[]> => api("/payments/");
export const getTransactions = (): Promise<Transaction[]> => api("/transactions/");