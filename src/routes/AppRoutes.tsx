import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import StudentDashboard from "@/pages/StudentDashboard";
import StaffDashboard from "@/pages/StaffDashboard";
import NotFound from "@/pages/NotFound";

/**
 * AppRoutes Component
 * Centralized routing configuration for the UNICAL portal
 */

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
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
