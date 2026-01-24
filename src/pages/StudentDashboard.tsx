import { 
  CreditCard, 
  FileText, 
  BookOpen, 
  ClipboardList,
  User,
  Bell,
  Calendar,
  LogOut,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardCard from "@/components/DashboardCard";
import unicalLogo from "@/assets/logos/unical-logo.png";

/**
 * Student Dashboard Page
 * Main dashboard for logged-in students
 * Features: Quick actions, profile overview, notifications
 */

// Mock student data
const studentData = {
  name: "John Adebayo",
  matricNo: "UNI/2021/001234",
  department: "Computer Science",
  faculty: "Faculty of Science",
  level: "400 Level",
  email: "john.adebayo@student.unical.edu.ng",
  semester: "First Semester",
  session: "2024/2025",
};

// Dashboard quick actions - includes Support as requested
const dashboardCards = [
  {
    icon: CreditCard,
    title: "Pay School Fees",
    description: "Pay your tuition and other fees online",
    link: "/pay-fees",
    variant: "secondary" as const,
    badge: "Due",
  },
  {
    icon: FileText,
    title: "Reprint Receipts",
    description: "Download and reprint payment receipts",
    link: "/receipts",
    variant: "default" as const,
  },
  {
    icon: BookOpen,
    title: "Course Registration",
    description: "Register for your semester courses",
    link: "/course-registration",
    variant: "primary" as const,
    badge: "Open",
  },
  {
    icon: ClipboardList,
    title: "View Results",
    description: "Check your semester results and CGPA",
    link: "/results",
    variant: "default" as const,
  },
  {
    icon: User,
    title: "My Profile",
    description: "View and update your profile information",
    link: "/profile",
    variant: "default" as const,
  },
  {
    icon: Bell,
    title: "Support",
    description: "Get help with portal and academic issues",
    link: "/support",
    variant: "accent" as const,
  },
];

// Mock notifications
const notifications = [
  {
    id: 1,
    title: "Course Registration Open",
    message: "First semester course registration is now open. Deadline: Feb 28, 2025.",
    time: "2 hours ago",
    type: "info",
  },
  {
    id: 2,
    title: "Fee Payment Reminder",
    message: "Your school fees payment is due. Please pay before the deadline.",
    time: "1 day ago",
    type: "warning",
  },
  {
    id: 3,
    title: "New Result Published",
    message: "Your results for the previous semester have been published.",
    time: "3 days ago",
    type: "success",
  },
];

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-unical-light-gray">
      {/* Dashboard Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container-academic">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={unicalLogo} 
                alt="UNICAL Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="font-heading font-semibold hidden sm:block">
                UNICAL Portal
              </span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-primary-foreground/10 rounded-full">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center">
                  <span className="font-semibold text-sm">JA</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{studentData.name}</p>
                  <p className="text-xs text-primary-foreground/70">{studentData.matricNo}</p>
                </div>
              </div>
              <Link 
                to="/login"
                className="p-2 hover:bg-primary-foreground/10 rounded-full"
                title="Logout"
              >
                <LogOut size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-academic py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
            Welcome back, {studentData.name.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            {studentData.semester} • {studentData.session} Academic Session
          </p>
        </div>

        {/* Profile Summary Card */}
        <div className="card-academic p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Student Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center 
                              justify-center text-secondary-foreground">
                <GraduationCap size={32} />
              </div>
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  {studentData.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {studentData.matricNo} • {studentData.level}
                </p>
                <p className="text-muted-foreground text-sm">
                  {studentData.department}, {studentData.faculty}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 lg:gap-12">
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-secondary">3.75</p>
                <p className="text-xs text-muted-foreground mt-1">CGPA</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-secondary">124</p>
                <p className="text-xs text-muted-foreground mt-1">Credits</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-accent">Paid</p>
                <p className="text-xs text-muted-foreground mt-1">Fees Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card) => (
            <DashboardCard key={card.title} {...card} />
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Notifications */}
          <div className="lg:col-span-2">
            <div className="card-academic">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Recent Notifications
                  </h3>
                  <Link 
                    to="/notifications"
                    className="text-secondary text-sm font-medium hover:underline"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-border">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-medium text-foreground">{notif.title}</h4>
                        <p className="text-muted-foreground text-sm mt-1">
                          {notif.message}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Calendar */}
          <div className="lg:col-span-1">
            <div className="card-academic">
              <div className="p-6 border-b border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Upcoming Events
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center 
                                  justify-center flex-shrink-0">
                    <Calendar size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Course Registration Deadline
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      February 28, 2025
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center 
                                  justify-center flex-shrink-0">
                    <Calendar size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Mid-Semester Break
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      March 10-14, 2025
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center 
                                  justify-center flex-shrink-0">
                    <Calendar size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Semester Examinations
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      May 5-26, 2025
                    </p>
                  </div>
                </div>
                <Link 
                  to="/calendar"
                  className="flex items-center gap-1 text-secondary text-sm font-medium 
                             hover:gap-2 transition-all mt-4"
                >
                  View Full Calendar
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-primary text-primary-foreground py-6 mt-12">
        <div className="container-academic text-center">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} University of Calabar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
