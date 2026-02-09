import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * ProtectedRoute Component
 * Frontend-only route protection using mock auth.
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: "student" | "staff" | "admin";
}

const loginRoutes: Record<string, string> = {
  student: "/login",
  staff: "/staff-login",
  admin: "/admin-login",
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, roles } = useAuth();

  if (!user) {
    return <Navigate to={loginRoutes[requiredRole]} replace />;
  }

  if (!roles.includes(requiredRole)) {
    if (roles.includes("admin")) return <Navigate to="/admin/dashboard" replace />;
    if (roles.includes("staff")) return <Navigate to="/staff/dashboard" replace />;
    if (roles.includes("student")) return <Navigate to="/student/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
