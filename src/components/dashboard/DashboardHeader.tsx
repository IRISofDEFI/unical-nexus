import { Link } from "react-router-dom";
import { Bell, Home, Zap } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/**
 * Dashboard Header Component
 * Top navigation bar for student dashboard
 * Features quick actions, notifications, and user info
 */

interface DashboardHeaderProps {
  studentName: string;
  profileImage?: string;
  notificationCount?: number;
}

const DashboardHeader = ({
  studentName,
  profileImage,
  notificationCount = 0,
}: DashboardHeaderProps) => {
  const firstName = studentName.split(" ")[0];
  const initials = studentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-20">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Left Side - Quick Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/quick-actions"
            className="flex items-center gap-2 text-secondary hover:text-secondary/80 
                       font-medium text-sm transition-colors"
          >
            <Zap size={16} />
            <span className="hidden sm:inline">Quick Actions</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground 
                       text-sm transition-colors"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Back to Homepage</span>
          </Link>
        </div>

        {/* Right Side - User Info */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
            <Bell size={20} className="text-muted-foreground" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
            )}
          </button>

          {/* User Greeting */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Hi, <span className="font-medium text-foreground">{firstName}</span>
            </span>
            <Avatar className="w-9 h-9">
              <AvatarImage
                src={profileImage}
                alt={`${studentName}'s profile`}
                className="object-cover"
              />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
