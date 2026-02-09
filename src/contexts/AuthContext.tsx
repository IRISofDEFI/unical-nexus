import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Mock Authentication Context
 * 
 * Frontend-only mock auth for development.
 * Backend auth will be handled by a separate Python service later.
 */

type AppRole = "student" | "staff" | "admin";

interface UserProfile {
  display_name: string;
  email: string;
  matric_number?: string | null;
  staff_id?: string | null;
  department?: string | null;
  faculty?: string | null;
  level?: string | null;
  phone?: string | null;
}

interface MockUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: MockUser | null;
  profile: UserProfile | null;
  roles: AppRole[];
  loading: boolean;
  signIn: (identifier: string, password: string) => Promise<{ role: AppRole }>;
  signOut: () => Promise<void>;
}

// Demo accounts for mock auth
const MOCK_ACCOUNTS: Record<string, { password: string; role: AppRole; profile: UserProfile }> = {
  "22/071145217": {
    password: "Demo@1234",
    role: "student",
    profile: {
      display_name: "Adebayo Okonkwo",
      email: "adebayo@student.unical.edu.ng",
      matric_number: "22/071145217",
      department: "Computer Science",
      faculty: "Faculty of Science",
      level: "400",
    },
  },
  "STF/2015/001234": {
    password: "Staff@1234",
    role: "staff",
    profile: {
      display_name: "Dr. Amaka Okonkwo",
      email: "a.okonkwo@unical.edu.ng",
      staff_id: "STF/2015/001234",
      department: "Computer Science",
      faculty: "Faculty of Science",
    },
  },
  "admin@unical.demo": {
    password: "Admin@1234",
    role: "admin",
    profile: {
      display_name: "System Administrator",
      email: "admin@unical.demo",
      department: "ICT",
    },
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  roles: [],
  loading: false,
  signIn: async () => ({ role: "student" }),
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);

  const signIn = async (identifier: string, password: string): Promise<{ role: AppRole }> => {
    const account = MOCK_ACCOUNTS[identifier.trim()];
    if (!account || account.password !== password) {
      throw new Error("Invalid login credentials. Please check your details and try again.");
    }

    setUser({ id: "mock-" + account.role, email: account.profile.email });
    setProfile(account.profile);
    setRoles([account.role]);
    return { role: account.role };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ user, profile, roles, loading: false, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
