import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * ProtectedRoute – redirects to login if no mock user exists.
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
