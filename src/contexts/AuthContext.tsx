import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Mock Authentication Context (Frontend-Only)
 * 
 * Any email + password logs in successfully.
 * Persists mock user in localStorage for session continuity.
 * Backend auth will be handled by a separate Python service later.
 */

type AppRole = "student" | "staff" | "admin";

interface MockUser {
  id: string;
  email: string;
  role: AppRole;
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signIn: (email: string, password: string, role?: AppRole) => void;
  signOut: () => void;
}

const STORAGE_KEY = "unical_mock_user";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: () => {},
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

  const signIn = (email: string, _password: string, role: AppRole = "admin") => {
    const mockUser: MockUser = {
      id: "mock-" + Date.now(),
      email: email.trim(),
      role,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
