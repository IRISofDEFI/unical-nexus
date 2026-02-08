import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Public Pages
import Home from "@/pages/Home";
import Academics from "@/pages/Academics";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import NotFound from "@/pages/NotFound";

// Student Feature
import StudentLogin from "@/features/student/pages/StudentLogin";
import StudentDashboard from "@/features/student/pages/StudentDashboard";

// Staff Feature
import StaffLogin from "@/features/staff/pages/StaffLogin";
import StaffDashboard from "@/features/staff/pages/StaffDashboard";

// Admin Feature
import AdminLogin from "@/features/admin/pages/AdminLogin";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";

// Protected Route
import ProtectedRoute from "@/components/shared/ProtectedRoute";

/**
 * RedirectIfAuthenticated
 * Redirects logged-in users to their role-specific dashboard
 */
const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
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

  if (user && roles.length > 0) {
    if (roles.includes("admin")) return <Navigate to="/admin/dashboard" replace />;
    if (roles.includes("staff")) return <Navigate to="/staff/dashboard" replace />;
    if (roles.includes("student")) return <Navigate to="/student/dashboard" replace />;
  }

  return <>{children}</>;
};

/**
 * AppRoutes Component
 * Centralized routing configuration for the UNICAL portal
 * - Login and home routes redirect authenticated users to their dashboard
 * - Dashboard routes are protected and require authentication + correct role
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes - redirect if already logged in */}
      <Route
        path="/"
        element={
          <RedirectIfAuthenticated>
            <Home />
          </RedirectIfAuthenticated>
        }
      />

      {/* Academic Pages */}
      <Route path="/academics" element={<Academics />} />

      {/* Articles/News */}
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />

      {/* Student Routes */}
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <StudentLogin />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Staff Routes */}
      <Route
        path="/staff-login"
        element={
          <RedirectIfAuthenticated>
            <StaffLogin />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute requiredRole="staff">
            <StaffDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin-login"
        element={
          <RedirectIfAuthenticated>
            <AdminLogin />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Legacy route redirects */}
      <Route path="/student-dashboard" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/staff-dashboard" element={<Navigate to="/staff/dashboard" replace />} />
      <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
