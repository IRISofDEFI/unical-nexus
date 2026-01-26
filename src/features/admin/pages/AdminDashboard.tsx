import { Link } from "react-router-dom";
import { 
  Users, 
  Settings, 
  Shield, 
  Bell, 
  LogOut,
  BarChart3,
  Database,
  UserCog
} from "lucide-react";
import unicalLogo from "@/assets/logos/unical-logo.png";

/**
 * Admin Dashboard Page
 * Main dashboard for university administrators
 * Placeholder - ready for full implementation
 */

const AdminDashboard = () => {
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
                Admin Portal
              </span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-primary-foreground/10 rounded-full">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-destructive rounded-full flex items-center justify-center">
                  <Shield size={18} className="text-destructive-foreground" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">System Admin</p>
                  <p className="text-xs text-primary-foreground/70">Administrator</p>
                </div>
              </div>
              <Link 
                to="/admin-login"
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
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            University system administration and management controls.
          </p>
        </div>

        {/* Placeholder Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, title: "Manage Users", desc: "Students, staff, and admins" },
            { icon: Database, title: "Database", desc: "Data management tools" },
            { icon: UserCog, title: "Roles & Permissions", desc: "Access control" },
            { icon: BarChart3, title: "Analytics", desc: "System reports" },
          ].map((item) => (
            <div 
              key={item.title}
              className="card-academic p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Placeholder Content */}
        <div className="card-academic p-8 text-center">
          <Settings size={48} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
            Admin Features Coming Soon
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            This dashboard is prepared for full admin functionality. 
            Add your specific admin features and controls here.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 mt-12">
        <div className="container-academic text-center">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} University of Calabar. Admin Portal v1.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
