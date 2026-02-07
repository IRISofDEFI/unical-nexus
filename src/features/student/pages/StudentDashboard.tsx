import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DashboardSidebar,
  DashboardHeader,
  ProfileCard,
  StatsRow,
  ActivityCard,
  CalendarCard,
  NewsCard,
} from "../components";
import studentPlaceholder from "@/assets/images/student-placeholder.jpg";

/**
 * Student Dashboard Page
 * Main dashboard for logged-in students
 * Redesigned to match UNICAL portal with sidebar navigation
 */

// Enhanced mock student data
const studentData = {
  name: "Ms Ubi Blessing George",
  matricNo: "22/071145217",
  email: "blessgeo2020@gmail.com",
  phone: "07030641052",
  level: "300 Level",
  studentType: "NUC Student",
  department: "Computer Science",
  faculty: "Faculty of Science",
  semester: "First Semester",
  session: "2024/2025",
  quote: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
  academicProgress: 60,
  profileImage: studentPlaceholder,
  verified: true,
  // Financial stats
  feesPaid: "₦213,750.00",
  leviesPaid: "₦45,000.00",
  cgpa: "3.75",
  totalCourses: 24,
};

// Mock calendar events
const calendarEvents = [
  {
    id: "1",
    title: "Course Registration Deadline",
    date: "February 28, 2025",
    type: "deadline" as const,
  },
  {
    id: "2",
    title: "Mid-Semester Break",
    date: "March 10-14, 2025",
    type: "break" as const,
  },
  {
    id: "3",
    title: "Semester Examinations",
    date: "May 5-26, 2025",
    type: "exam" as const,
  },
];

// Mock activities
const recentActivities = [
  {
    id: "1",
    title: "Login successful",
    description: "You logged in from a new device",
    time: "2 hours ago",
    type: "login" as const,
  },
  {
    id: "2",
    title: "Course Registration",
    description: "Successfully registered for CSC 301",
    time: "1 day ago",
    type: "registration" as const,
  },
  {
    id: "3",
    title: "Payment Confirmed",
    description: "School fees payment of ₦213,750.00 received",
    time: "3 days ago",
    type: "payment" as const,
  },
];

// Mock news
const recentNews = [
  {
    id: "1",
    title: "2026 Admission Portal Now Open",
    date: "one week ago",
    excerpt: "The University of Calabar has officially opened its admission portal for the 2026 academic session.",
    link: "/articles/1",
  },
  {
    id: "2",
    title: "UNICAL Ranked Top 10 Universities in Nigeria",
    date: "two weeks ago",
    excerpt: "The University of Calabar has been ranked among the top 10 universities in Nigeria.",
    link: "/articles/2",
  },
  {
    id: "3",
    title: "New Faculty of Computing Launched",
    date: "one month ago",
    excerpt: "A new Faculty of Computing has been established to meet growing demand.",
    link: "/articles/3",
  },
];

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex w-full">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Header with logout in dropdown */}
        <DashboardHeader
          studentName={studentData.name}
          profileImage={studentData.profileImage}
          notificationCount={3}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 space-y-6">
          {/* Profile Card */}
          <ProfileCard
            name={studentData.name}
            matricNo={studentData.matricNo}
            email={studentData.email}
            phone={studentData.phone}
            level={studentData.level}
            studentType={studentData.studentType}
            quote={studentData.quote}
            academicProgress={studentData.academicProgress}
            profileImage={studentData.profileImage}
            verified={studentData.verified}
          />

          {/* Stats Row */}
          <StatsRow
            feesPaid={studentData.feesPaid}
            leviesPaid={studentData.leviesPaid}
            cgpa={studentData.cgpa}
            totalCourses={studentData.totalCourses}
            showEVoting={true}
          />

          {/* Three Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CalendarCard
              session={studentData.session}
              events={calendarEvents}
            />
            <ActivityCard activities={recentActivities} />
            <NewsCard news={recentNews} />
          </div>
        </main>

        {/* Footer - No logout button */}
        <footer className="bg-primary text-primary-foreground py-4 mt-auto">
          <div className="px-4 lg:px-8 flex items-center justify-center">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} University of Calabar. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default StudentDashboard;
