import { Link } from "react-router-dom";
import { Shield, HelpCircle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/shared/LoginForm";
import unicalLogo from "@/assets/logos/unical-logo.png";

/**
 * Admin Login Page
 * Portal login page for university administrators
 * Features: Admin login form, security info panel, help links
 */

const AdminLogin = () => {
  const handleLogin = (data: { identifier: string; password: string; remember: boolean }) => {
    // Mock login - in real app, this would authenticate
    console.log("Admin login attempt:", data);
    // Redirect to admin dashboard for demo
    window.location.href = "/admin-dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 py-12 lg:py-20">
        <div className="container-academic">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <div className="card-academic p-8 lg:p-10 max-w-md mx-auto lg:mx-0">
                {/* Header */}
                <div className="text-center mb-8">
                  <img 
                    src={unicalLogo} 
                    alt="UNICAL Logo" 
                    className="h-20 w-20 mx-auto mb-4"
                  />
                  <h1 className="font-heading text-2xl font-semibold text-foreground">
                    Admin Portal Login
                  </h1>
                  <p className="text-muted-foreground text-sm mt-2">
                    Access administrative controls
                  </p>
                </div>

                {/* Login Form */}
                <LoginForm onSubmit={handleLogin} userType="staff" />

                {/* Other Login Links */}
                <div className="mt-6 pt-6 border-t border-border text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Not an admin?{" "}
                    <Link 
                      to="/login" 
                      className="text-secondary font-medium hover:underline"
                    >
                      Student Portal
                    </Link>
                    {" | "}
                    <Link 
                      to="/staff-login" 
                      className="text-secondary font-medium hover:underline"
                    >
                      Staff Portal
                    </Link>
                  </p>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-8 text-center lg:text-left max-w-md mx-auto lg:mx-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Having trouble logging in?
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <a 
                    href="/help" 
                    className="flex items-center gap-2 text-sm text-secondary 
                               hover:underline"
                  >
                    <HelpCircle size={16} />
                    ICT Support
                  </a>
                  <a 
                    href="tel:+2348012345680" 
                    className="flex items-center gap-2 text-sm text-secondary 
                               hover:underline"
                  >
                    <Phone size={16} />
                    +234 801 234 5680
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Portal Info */}
            <div className="order-1 lg:order-2">
              <div className="lg:pl-8">
                {/* Welcome Message */}
                <span className="text-secondary font-semibold text-sm uppercase tracking-wide">
                  Restricted Access
                </span>
                <h2 className="font-heading text-3xl lg:text-4xl text-foreground mt-2 mb-4">
                  UNICAL Admin Portal
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The University of Calabar admin portal provides authorized 
                  administrators with full access to university management systems, 
                  user controls, and system configurations.
                </p>

                {/* Security Notice */}
                <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-lg mb-6">
                  <div className="flex items-start gap-3">
                    <Shield size={20} className="text-destructive mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-2">
                        Security Warning
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        This portal is restricted to authorized administrators only. 
                        All login attempts are logged and monitored. Unauthorized 
                        access attempts will be reported.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLogin;
