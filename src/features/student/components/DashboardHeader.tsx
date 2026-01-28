import { Link, useNavigate } from "react-router-dom";
import { Bell, Home, Zap, LogOut, User, Settings } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Dashboard Header Component
 * Top navigation bar for student dashboard
 * Features quick actions, notifications, and user dropdown with profile/logout
 */

interface DashboardHeaderProps {
  studentName: string;
  profileImage?: string;
  notificationCount?: number;
  onLogout?: () => void;
}

const DashboardHeader = ({
  studentName,
  profileImage,
  notificationCount = 0,
  onLogout,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const firstName = studentName.split(" ")[0];
  const initials = studentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate("/login");
    }
  };

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
          <span className="text-sm text-muted-foreground hidden sm:block">
            Hi, <span className="font-medium text-foreground">{firstName}</span>
          </span>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 rounded-full">
                <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-secondary/50 transition-all">
                  <AvatarImage
                    src={profileImage}
                    alt={`${studentName}'s profile`}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border border-border shadow-lg z-50">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-foreground">{studentName}</p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User size={16} />
                  <span>View/Edit Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account-settings" className="flex items-center gap-2 cursor-pointer">
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
    </header>
  );
};

export default DashboardHeader;
