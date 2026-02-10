import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "../components/AdminSidebar";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * AdminLayout – Shared layout wrapper for all admin pages.
 */

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    signOut();
    navigate("/admin-login", { replace: true });
  };

  const initials = (user?.email || "AD").slice(0, 2).toUpperCase();

  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <AdminSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-background border-b border-border">
          <div className="flex items-center justify-between h-14 px-4 lg:px-8">
            <div className="hidden md:flex items-center flex-1 max-w-lg">
              <div className="relative w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-muted/50 border-0 rounded-lg py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <button className="relative p-2 hover:bg-muted rounded-full">
                <Bell size={18} className="text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-semibold text-foreground">{title}</h1>
            {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
          </div>
          {children}
        </main>

        <footer className="border-t border-border py-4 px-4 lg:px-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} University of Calabar. Admin Portal
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
