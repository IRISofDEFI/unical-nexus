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
import AddFaculty from "@/features/admin/pages/faculty/AddFaculty";
import ViewEditFaculties from "@/features/admin/pages/faculty/ViewEditFaculties";
import AddDepartment from "@/features/admin/pages/departments/AddDepartment";
import ViewEditDepartments from "@/features/admin/pages/departments/ViewEditDepartments";
import AddProgramme from "@/features/admin/pages/programmes/AddProgramme";
import ViewEditProgrammes from "@/features/admin/pages/programmes/ViewEditProgrammes";
import AddCourse from "@/features/admin/pages/courses/AddCourse";
import ViewEditCourses from "@/features/admin/pages/courses/ViewEditCourses";
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
import ViewEditStudents from "@/features/admin/pages/students/ViewEditStudents";
import StudentProfile from "@/features/admin/pages/students/StudentProfile";
import WithdrawStudent from "@/features/admin/pages/students/WithdrawStudent";
import StartSession from "@/features/admin/pages/session/StartSession";
import Semester from "@/features/admin/pages/session/Semester";
import OpenRegistration from "@/features/admin/pages/session/OpenRegistration";
import CloseRegistration from "@/features/admin/pages/session/CloseRegistration";
import AddFeeItem from "@/features/admin/pages/fees/AddFeeItem";
import ViewEditFeeItems from "@/features/admin/pages/fees/ViewEditFeeItems";
import FacultyCharges from "@/features/admin/pages/fees/FacultyCharges";
import ExtraCharges from "@/features/admin/pages/fees/ExtraCharges";
import Payments from "@/features/admin/pages/fees/Payments";
import Transactions from "@/features/admin/pages/fees/Transactions";
import Lecturers from "@/features/admin/pages/users/Lecturers";
import FacultyOfficers from "@/features/admin/pages/users/FacultyOfficers";
import Assignments from "@/features/admin/pages/users/Assignments";
import ViewEditUsers from "@/features/admin/pages/users/ViewEditUsers";
import Reports from "@/features/admin/pages/reports/Reports";

// Protected Route
import ProtectedRoute from "@/components/shared/ProtectedRoute";

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
    <Route path="/student/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />

    {/* Staff */}
    <Route path="/staff/dashboard" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />

    {/* Admin */}
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/faculty/add" element={<ProtectedRoute><AddFaculty /></ProtectedRoute>} />
    <Route path="/admin/faculty/view-edit" element={<ProtectedRoute><ViewEditFaculties /></ProtectedRoute>} />
    <Route path="/admin/departments/add" element={<ProtectedRoute><AddDepartment /></ProtectedRoute>} />
    <Route path="/admin/departments/view-edit" element={<ProtectedRoute><ViewEditDepartments /></ProtectedRoute>} />
    <Route path="/admin/programmes/add" element={<ProtectedRoute><AddProgramme /></ProtectedRoute>} />
    <Route path="/admin/programmes/view-edit" element={<ProtectedRoute><ViewEditProgrammes /></ProtectedRoute>} />
    <Route path="/admin/courses/add" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
    <Route path="/admin/courses/view-edit" element={<ProtectedRoute><ViewEditCourses /></ProtectedRoute>} />
    <Route path="/admin/courses/upload" element={<ProtectedRoute><UploadCourses /></ProtectedRoute>} />
    <Route path="/admin/courses/prescribed" element={<ProtectedRoute><PrescribedCourses /></ProtectedRoute>} />
    <Route path="/admin/courses/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
    <Route path="/admin/courses/pass-mark" element={<ProtectedRoute><PassMark /></ProtectedRoute>} />
    <Route path="/admin/courses/allocation" element={<ProtectedRoute><Allocation /></ProtectedRoute>} />
    <Route path="/admin/results/upload" element={<ProtectedRoute><UploadResults /></ProtectedRoute>} />
    <Route path="/admin/results/view" element={<ProtectedRoute><ViewResults /></ProtectedRoute>} />
    <Route path="/admin/results/reports" element={<ProtectedRoute><ResultReports /></ProtectedRoute>} />
    <Route path="/admin/results/download" element={<ProtectedRoute><DownloadResults /></ProtectedRoute>} />
    <Route path="/admin/students/upload" element={<ProtectedRoute><UploadStudents /></ProtectedRoute>} />
    <Route path="/admin/students/view-edit" element={<ProtectedRoute><ViewEditStudents /></ProtectedRoute>} />
    <Route path="/admin/students/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
    <Route path="/admin/students/withdraw" element={<ProtectedRoute><WithdrawStudent /></ProtectedRoute>} />
    <Route path="/admin/session/start" element={<ProtectedRoute><StartSession /></ProtectedRoute>} />
    <Route path="/admin/session/semester" element={<ProtectedRoute><Semester /></ProtectedRoute>} />
    <Route path="/admin/session/open-reg" element={<ProtectedRoute><OpenRegistration /></ProtectedRoute>} />
    <Route path="/admin/session/close-reg" element={<ProtectedRoute><CloseRegistration /></ProtectedRoute>} />
    <Route path="/admin/fees/add-item" element={<ProtectedRoute><AddFeeItem /></ProtectedRoute>} />
    <Route path="/admin/fees/view-edit-items" element={<ProtectedRoute><ViewEditFeeItems /></ProtectedRoute>} />
    <Route path="/admin/fees/faculty-charges" element={<ProtectedRoute><FacultyCharges /></ProtectedRoute>} />
    <Route path="/admin/fees/extra-charges" element={<ProtectedRoute><ExtraCharges /></ProtectedRoute>} />
    <Route path="/admin/fees/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
    <Route path="/admin/fees/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
    <Route path="/admin/users/lecturers" element={<ProtectedRoute><Lecturers /></ProtectedRoute>} />
    <Route path="/admin/users/faculty-officers" element={<ProtectedRoute><FacultyOfficers /></ProtectedRoute>} />
    <Route path="/admin/users/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
    <Route path="/admin/users/view-edit" element={<ProtectedRoute><ViewEditUsers /></ProtectedRoute>} />
    <Route path="/admin/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />

    {/* Legacy redirects */}
    <Route path="/student-dashboard" element={<Navigate to="/student/dashboard" replace />} />
    <Route path="/staff-dashboard" element={<Navigate to="/staff/dashboard" replace />} />
    <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/admin/departments/edit" element={<Navigate to="/admin/departments/view-edit" replace />} />
    <Route path="/admin/departments/view" element={<Navigate to="/admin/departments/view-edit" replace />} />
    <Route path="/admin/programmes/edit" element={<Navigate to="/admin/programmes/view-edit" replace />} />
    <Route path="/admin/programmes/view" element={<Navigate to="/admin/programmes/view-edit" replace />} />
    <Route path="/admin/courses/edit" element={<Navigate to="/admin/courses/view-edit" replace />} />
    <Route path="/admin/courses/view" element={<Navigate to="/admin/courses/view-edit" replace />} />
    <Route path="/admin/students/view" element={<Navigate to="/admin/students/view-edit" replace />} />
    <Route path="/admin/fees/view-items" element={<Navigate to="/admin/fees/view-edit-items" replace />} />
    <Route path="/admin/users/view" element={<Navigate to="/admin/users/view-edit" replace />} />

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
