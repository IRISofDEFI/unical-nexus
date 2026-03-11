import api from "@/lib/api";

export const uploadResult = (formData: FormData): Promise<{ message: string }> => {
  // Note: We use fetch directly or ensure api helper handles FormData correctly (usually without Content-Type header to let browser set boundary)
  // For this helper, assuming api handles json, we might need a specific override or just use the generic one if modified.
  return api("/results/upload/", { method: "POST", body: formData as any, headers: {} }); // Casting to any to bypass string check in simple helpers or ensuring helper handles it
};