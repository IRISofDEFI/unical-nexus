import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * RedirectIfAuthenticated
 * Redirects logged-in users to their role-specific dashboard
 */
export const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const { user, roles } = useAuth();

  if (user && roles.length > 0) {
    if (roles.includes("admin")) return <Navigate to="/admin/dashboard" replace />;
    if (roles.includes("staff")) return <Navigate to="/staff/dashboard" replace />;
    if (roles.includes("student")) return <Navigate to="/student/dashboard" replace />;
  }

  return <>{children}</>;
};
