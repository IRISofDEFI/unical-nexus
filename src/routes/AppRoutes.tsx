import { Routes, Route } from "react-router-dom";

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

/**
 * AppRoutes Component
 * Centralized routing configuration for the UNICAL portal
 * All navigation links should have corresponding routes here
 */

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      
      {/* Academic Pages */}
      <Route path="/academics" element={<Academics />} />
      
      {/* Articles/News */}
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      
      {/* Student Routes */}
      <Route path="/login" element={<StudentLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      
      {/* Staff Routes */}
      <Route path="/staff-login" element={<StaffLogin />} />
      <Route path="/staff-dashboard" element={<StaffDashboard />} />
      
      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      
      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
