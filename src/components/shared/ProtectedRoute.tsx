import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * ProtectedRoute Component
 * 
 * Wraps dashboard routes to ensure only authenticated users
 * with the correct role can access them.
 * 
 * Redirects to the appropriate login page if not authenticated.
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
  const { user, roles, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={loginRoutes[requiredRole]} replace />;
  }

  if (!roles.includes(requiredRole)) {
    // User is logged in but doesn't have the required role
    // Redirect to their appropriate dashboard or login
    if (roles.includes("student")) return <Navigate to="/student-dashboard" replace />;
    if (roles.includes("staff")) return <Navigate to="/staff-dashboard" replace />;
    if (roles.includes("admin")) return <Navigate to="/admin-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
