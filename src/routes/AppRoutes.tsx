import { Routes, Route, Navigate } from "react-router-dom";
import { RedirectIfAuthenticated } from "./RedirectIfAuthenticated";

// Public Pages
import Home from "@/pages/Home";
import Academics from "@/pages/Academics";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import NotFound from "@/pages/NotFound";

// Login Pages
import StudentLogin from "@/features/student/pages/StudentLogin";
import StudentDashboard from "@/features/student/pages/StudentDashboard";
import StaffLogin from "@/features/staff/pages/StaffLogin";
import StaffDashboard from "@/features/staff/pages/StaffDashboard";
import AdminLogin from "@/features/admin/pages/AdminLogin";

// Admin Pages
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AddDepartment from "@/features/admin/pages/departments/AddDepartment";
import EditDepartment from "@/features/admin/pages/departments/EditDepartment";
import ViewDepartments from "@/features/admin/pages/departments/ViewDepartments";
import AddProgramme from "@/features/admin/pages/programmes/AddProgramme";
import EditProgramme from "@/features/admin/pages/programmes/EditProgramme";
import ViewProgrammes from "@/features/admin/pages/programmes/ViewProgrammes";
import AddCourse from "@/features/admin/pages/courses/AddCourse";
import EditCourse from "@/features/admin/pages/courses/EditCourse";
import ViewCourses from "@/features/admin/pages/courses/ViewCourses";
import UploadCourses from "@/features/admin/pages/courses/UploadCourses";
import PrescribedCourses from "@/features/admin/pages/courses/PrescribedCourses";
import Attendance from "@/features/admin/pages/courses/Attendance";
import PassMark from "@/features/admin/pages/courses/PassMark";
import Allocation from "@/features/admin/pages/courses/Allocation";
import UploadResults from "@/features/admin/pages/results/UploadResults";
import ViewResults from "@/features/admin/pages/results/ViewResults";
import ResultReports from "@/features/admin/pages/results/ResultReports";
import DownloadResults from "@/features/admin/pages/results/DownloadResults";
import UploadStudents from "@/features/admin/pages/students/UploadStudents";
import ViewStudents from "@/features/admin/pages/students/ViewStudents";
import StudentProfile from "@/features/admin/pages/students/StudentProfile";
import WithdrawStudent from "@/features/admin/pages/students/WithdrawStudent";
import StartSession from "@/features/admin/pages/session/StartSession";
import Semester from "@/features/admin/pages/session/Semester";
import OpenRegistration from "@/features/admin/pages/session/OpenRegistration";
import CloseRegistration from "@/features/admin/pages/session/CloseRegistration";
import AddFeeItem from "@/features/admin/pages/fees/AddFeeItem";
import ViewFeeItems from "@/features/admin/pages/fees/ViewFeeItems";
import FacultyCharges from "@/features/admin/pages/fees/FacultyCharges";
import ExtraCharges from "@/features/admin/pages/fees/ExtraCharges";
import Payments from "@/features/admin/pages/fees/Payments";
import Transactions from "@/features/admin/pages/fees/Transactions";
import Lecturers from "@/features/admin/pages/users/Lecturers";
import FacultyOfficers from "@/features/admin/pages/users/FacultyOfficers";
import Assignments from "@/features/admin/pages/users/Assignments";
import ViewUsers from "@/features/admin/pages/users/ViewUsers";
import Reports from "@/features/admin/pages/reports/Reports";

// Protected Route
import ProtectedRoute from "@/components/shared/ProtectedRoute";

/**
 * AppRoutes
 * Centralized routing with mock auth guards.
 */
const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<RedirectIfAuthenticated><Home /></RedirectIfAuthenticated>} />
    <Route path="/academics" element={<Academics />} />
    <Route path="/articles" element={<Articles />} />
    <Route path="/articles/:id" element={<ArticleDetail />} />

    {/* Login routes */}
    <Route path="/login" element={<RedirectIfAuthenticated><StudentLogin /></RedirectIfAuthenticated>} />
    <Route path="/staff-login" element={<RedirectIfAuthenticated><StaffLogin /></RedirectIfAuthenticated>} />
    <Route path="/admin-login" element={<RedirectIfAuthenticated><AdminLogin /></RedirectIfAuthenticated>} />

    {/* Student */}
    <Route path="/student/dashboard" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} />

    {/* Staff */}
    <Route path="/staff/dashboard" element={<ProtectedRoute requiredRole="staff"><StaffDashboard /></ProtectedRoute>} />

    {/* Admin */}
    <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/departments/add" element={<ProtectedRoute requiredRole="admin"><AddDepartment /></ProtectedRoute>} />
    <Route path="/admin/departments/edit" element={<ProtectedRoute requiredRole="admin"><EditDepartment /></ProtectedRoute>} />
    <Route path="/admin/departments/view" element={<ProtectedRoute requiredRole="admin"><ViewDepartments /></ProtectedRoute>} />
    <Route path="/admin/programmes/add" element={<ProtectedRoute requiredRole="admin"><AddProgramme /></ProtectedRoute>} />
    <Route path="/admin/programmes/edit" element={<ProtectedRoute requiredRole="admin"><EditProgramme /></ProtectedRoute>} />
    <Route path="/admin/programmes/view" element={<ProtectedRoute requiredRole="admin"><ViewProgrammes /></ProtectedRoute>} />
    <Route path="/admin/courses/add" element={<ProtectedRoute requiredRole="admin"><AddCourse /></ProtectedRoute>} />
    <Route path="/admin/courses/edit" element={<ProtectedRoute requiredRole="admin"><EditCourse /></ProtectedRoute>} />
    <Route path="/admin/courses/view" element={<ProtectedRoute requiredRole="admin"><ViewCourses /></ProtectedRoute>} />
    <Route path="/admin/courses/upload" element={<ProtectedRoute requiredRole="admin"><UploadCourses /></ProtectedRoute>} />
    <Route path="/admin/courses/prescribed" element={<ProtectedRoute requiredRole="admin"><PrescribedCourses /></ProtectedRoute>} />
    <Route path="/admin/courses/attendance" element={<ProtectedRoute requiredRole="admin"><Attendance /></ProtectedRoute>} />
    <Route path="/admin/courses/pass-mark" element={<ProtectedRoute requiredRole="admin"><PassMark /></ProtectedRoute>} />
    <Route path="/admin/courses/allocation" element={<ProtectedRoute requiredRole="admin"><Allocation /></ProtectedRoute>} />
    <Route path="/admin/results/upload" element={<ProtectedRoute requiredRole="admin"><UploadResults /></ProtectedRoute>} />
    <Route path="/admin/results/view" element={<ProtectedRoute requiredRole="admin"><ViewResults /></ProtectedRoute>} />
    <Route path="/admin/results/reports" element={<ProtectedRoute requiredRole="admin"><ResultReports /></ProtectedRoute>} />
    <Route path="/admin/results/download" element={<ProtectedRoute requiredRole="admin"><DownloadResults /></ProtectedRoute>} />
    <Route path="/admin/students/upload" element={<ProtectedRoute requiredRole="admin"><UploadStudents /></ProtectedRoute>} />
    <Route path="/admin/students/view" element={<ProtectedRoute requiredRole="admin"><ViewStudents /></ProtectedRoute>} />
    <Route path="/admin/students/profile" element={<ProtectedRoute requiredRole="admin"><StudentProfile /></ProtectedRoute>} />
    <Route path="/admin/students/withdraw" element={<ProtectedRoute requiredRole="admin"><WithdrawStudent /></ProtectedRoute>} />
    <Route path="/admin/session/start" element={<ProtectedRoute requiredRole="admin"><StartSession /></ProtectedRoute>} />
    <Route path="/admin/session/semester" element={<ProtectedRoute requiredRole="admin"><Semester /></ProtectedRoute>} />
    <Route path="/admin/session/open-reg" element={<ProtectedRoute requiredRole="admin"><OpenRegistration /></ProtectedRoute>} />
    <Route path="/admin/session/close-reg" element={<ProtectedRoute requiredRole="admin"><CloseRegistration /></ProtectedRoute>} />
    <Route path="/admin/fees/add-item" element={<ProtectedRoute requiredRole="admin"><AddFeeItem /></ProtectedRoute>} />
    <Route path="/admin/fees/view-items" element={<ProtectedRoute requiredRole="admin"><ViewFeeItems /></ProtectedRoute>} />
    <Route path="/admin/fees/faculty-charges" element={<ProtectedRoute requiredRole="admin"><FacultyCharges /></ProtectedRoute>} />
    <Route path="/admin/fees/extra-charges" element={<ProtectedRoute requiredRole="admin"><ExtraCharges /></ProtectedRoute>} />
    <Route path="/admin/fees/payments" element={<ProtectedRoute requiredRole="admin"><Payments /></ProtectedRoute>} />
    <Route path="/admin/fees/transactions" element={<ProtectedRoute requiredRole="admin"><Transactions /></ProtectedRoute>} />
    <Route path="/admin/users/lecturers" element={<ProtectedRoute requiredRole="admin"><Lecturers /></ProtectedRoute>} />
    <Route path="/admin/users/faculty-officers" element={<ProtectedRoute requiredRole="admin"><FacultyOfficers /></ProtectedRoute>} />
    <Route path="/admin/users/assignments" element={<ProtectedRoute requiredRole="admin"><Assignments /></ProtectedRoute>} />
    <Route path="/admin/users/view" element={<ProtectedRoute requiredRole="admin"><ViewUsers /></ProtectedRoute>} />
    <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><Reports /></ProtectedRoute>} />

    {/* Legacy redirects */}
    <Route path="/student-dashboard" element={<Navigate to="/student/dashboard" replace />} />
    <Route path="/staff-dashboard" element={<Navigate to="/staff/dashboard" replace />} />
    <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
