const getAuthToken = () => localStorage.getItem("access_token");

const api = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as any).Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`https://unical-nexus-backend.onrender.com/api${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(errorData.detail || "An API error occurred");
  }

  return response.status === 204 ? null : response.json();
};

export default api;