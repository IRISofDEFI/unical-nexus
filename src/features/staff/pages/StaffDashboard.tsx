import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  FileCheck, 
  Upload, 
  Bell,
  BarChart3,
  Settings,
  Search,
  LogOut,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  User
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DashboardCard from "@/components/shared/DashboardCard";
import unicalLogo from "@/assets/logos/unical-logo.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Staff Dashboard Page
 * Admin dashboard for university staff
 * Features: Quick actions, statistics, recent activities
 */

// Mock staff data
const staffData = {
  name: "Dr. Amaka Okonkwo",
  staffId: "STF/2015/001234",
  department: "Computer Science",
  faculty: "Faculty of Science",
  role: "Senior Lecturer",
  email: "a.okonkwo@unical.edu.ng",
};

// Dashboard quick actions for staff
const dashboardCards = [
  {
    icon: FileCheck,
    title: "Verify Payments",
    description: "Verify and confirm student payment receipts",
    link: "/verify-payments",
    variant: "secondary" as const,
    badge: 12,
  },
  {
    icon: Users,
    title: "Manage Students",
    description: "View and manage student records",
    link: "/manage-students",
    variant: "primary" as const,
  },
  {
    icon: Upload,
    title: "Upload Results",
    description: "Upload and publish semester results",
    link: "/upload-results",
    variant: "default" as const,
  },
  {
    icon: Bell,
    title: "Announcements",
    description: "Create and manage announcements",
    link: "/announcements",
    variant: "accent" as const,
  },
  {
    icon: BarChart3,
    title: "Reports",
    description: "Generate and view reports",
    link: "/reports",
    variant: "default" as const,
  },
  {
    icon: Settings,
    title: "Settings",
    description: "Manage account and preferences",
    link: "/settings",
    variant: "default" as const,
  },
];

// Mock statistics
const stats = [
  { 
    label: "Total Students", 
    value: "2,456", 
    change: "+12%", 
    trend: "up",
    icon: Users,
  },
  { 
    label: "Pending Verifications", 
    value: "12", 
    change: "-5%", 
    trend: "down",
    icon: Clock,
  },
  { 
    label: "Results Uploaded", 
    value: "85%", 
    change: "+8%", 
    trend: "up",
    icon: Upload,
  },
  { 
    label: "Active Courses", 
    value: "24", 
    change: "0%", 
    trend: "neutral",
    icon: BarChart3,
  },
];

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    action: "Payment verified",
    student: "John Adebayo (UNI/2021/001234)",
    time: "5 minutes ago",
  },
  {
    id: 2,
    action: "Result uploaded",
    course: "CSC 401 - Artificial Intelligence",
    time: "1 hour ago",
  },
  {
    id: 3,
    action: "Student record updated",
    student: "Mary Nwachukwu (UNI/2022/005678)",
    time: "2 hours ago",
  },
  {
    id: 4,
    action: "Announcement published",
    title: "Mid-Semester Test Schedule",
    time: "Yesterday",
  },
];

// Mock pending tasks
const pendingTasks = [
  { id: 1, task: "Verify 12 pending payments", priority: "high" },
  { id: 2, task: "Upload CSC 402 results", priority: "medium" },
  { id: 3, task: "Review course registration", priority: "low" },
];

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const initials = staffData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const handleLogout = async () => {
    await signOut();
    navigate("/staff-login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-muted/30">
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
                Staff Portal
              </span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/50" 
                />
                <input 
                  type="text"
                  placeholder="Search students, courses..."
                  className="w-full bg-primary-foreground/10 border-0 rounded-lg py-2 pl-10 pr-4
                             text-sm placeholder:text-primary-foreground/50 focus:outline-none
                             focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-primary-foreground/10 rounded-full">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded-full">
                    <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-accent/50 transition-all">
                      <AvatarFallback className="bg-accent text-accent-foreground font-semibold text-sm">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium">{staffData.name}</p>
                      <p className="text-xs text-primary-foreground/70">{staffData.role}</p>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background border border-border shadow-lg z-50">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-foreground">{staffData.name}</p>
                      <p className="text-xs text-muted-foreground">{staffData.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/staff-profile" className="flex items-center gap-2 cursor-pointer">
                      <User size={16} />
                      <span>View/Edit Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/staff-settings" className="flex items-center gap-2 cursor-pointer">
                      <Settings size={16} />
                      <span>Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-academic py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
            Staff Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {staffData.name}. Here's an overview of your activities.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card-academic p-5">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center 
                                justify-center">
                  <stat.icon size={20} className="text-secondary" />
                </div>
                {stat.trend !== "neutral" && (
                  <span className={`flex items-center gap-1 text-xs font-medium
                    ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-heading font-bold text-foreground mt-3">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card) => (
              <DashboardCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="card-academic">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    Recent Activities
                  </h3>
                  <Link 
                    to="/activity-log"
                    className="text-secondary text-sm font-medium hover:underline"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-border">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <p className="text-muted-foreground text-sm mt-1">
                          {activity.student || activity.course || activity.title}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="lg:col-span-1">
            <div className="card-academic">
              <div className="p-6 border-b border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Pending Tasks
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {pendingTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0
                      ${task.priority === "high" ? "bg-red-500" : 
                        task.priority === "medium" ? "bg-accent" : "bg-green-500"}`} 
                    />
                    <p className="text-sm text-foreground">{task.task}</p>
                  </div>
                ))}
                <Link 
                  to="/tasks"
                  className="flex items-center gap-1 text-secondary text-sm font-medium 
                             hover:gap-2 transition-all mt-4"
                >
                  View All Tasks
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Quick Help */}
            <div className="card-academic mt-6 p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                Need Help?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Contact ICT Support for technical assistance with the portal.
              </p>
              <a 
                href="mailto:ict.support@unical.edu.ng"
                className="text-secondary text-sm font-medium hover:underline"
              >
                ict.support@unical.edu.ng
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer - No logout button */}
      <footer className="bg-primary text-primary-foreground py-6 mt-12">
        <div className="container-academic text-center">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} University of Calabar. Staff Portal v2.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StaffDashboard;
