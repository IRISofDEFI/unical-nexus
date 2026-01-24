import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import StaffLogin from "@/pages/StaffLogin";
import StudentDashboard from "@/pages/StudentDashboard";
import StaffDashboard from "@/pages/StaffDashboard";
import Academics from "@/pages/Academics";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import NotFound from "@/pages/NotFound";

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
      <Route path="/login" element={<Login />} />
      <Route path="/staff-login" element={<StaffLogin />} />
      
      {/* Academic Pages */}
      <Route path="/academics" element={<Academics />} />
      
      {/* Articles/News */}
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      
      {/* Student Routes */}
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      
      {/* Staff Routes */}
      <Route path="/staff-dashboard" element={<StaffDashboard />} />
      
      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
