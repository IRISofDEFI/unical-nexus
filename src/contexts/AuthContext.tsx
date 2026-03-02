import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Authentication Context
 * 
 * Connects to the backend API for user authentication.
 * Persists user session in localStorage.
 */

const API_BASE_URL = "https://unical-nexus-backend.onrender.com/api";

type AppRole = "student" | "staff" | "admin";

export interface MockUser {
  id: string;
  email: string;
  role: AppRole;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signIn: (identifier: string, password: string, role?: AppRole) => Promise<MockUser>;
  signOut: () => void;
}

const STORAGE_KEY = "unical_mock_user";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({} as MockUser),
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setLoading(false);
  }, []);

  const signIn = async (identifier: string, password: string, role: AppRole = "admin") => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Backend expects 'username', not 'identifier'
        body: JSON.stringify({ username: identifier, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      const data = await response.json();
      
      // Store JWT tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      // Map backend response to frontend user object
      // Backend returns role in uppercase (e.g., 'STUDENT'), frontend uses lowercase
      const user: MockUser = {
        id: String(data.user_id),
        email: data.full_name || identifier, 
        role: (data.user_role?.toLowerCase() as AppRole) || role 
      }; 
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
