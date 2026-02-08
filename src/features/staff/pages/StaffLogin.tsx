import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, HelpCircle, Users, FileCheck, Upload, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/shared/LoginForm";
import unicalLogo from "@/assets/logos/unical-logo.png";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Staff Login Page
 * Portal login page for university staff
 * Features: Staff login form, admin info panel, help links
 */

// Staff portal services information
const staffServices = [
  {
    icon: Users,
    title: "Manage Students",
    description: "Access and manage student records and data"
  },
  {
    icon: FileCheck,
    title: "Verify Payments",
    description: "Review and verify student payment receipts"
  },
  {
    icon: Upload,
    title: "Upload Results",
    description: "Upload and publish semester examination results"
  },
  {
    icon: Shield,
    title: "Administrative Tools",
    description: "Access department and faculty admin functions"
  },
];

const StaffLogin = () => {
  const navigate = useNavigate();
  const { user, roles, loading } = useAuth();

   // Redirect if already logged in as staff
  useEffect(() => {
    if (!loading && user && roles.includes("staff")) {
      navigate("/staff/dashboard", { replace: true });
    }
  }, [user, roles, loading, navigate]);

  const handleLoginSuccess = () => {
    navigate("/staff/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 py-12 lg:py-20">
        <div className="container-academic">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Login Form - First */}
            <div className="order-1">
              <div className="card-academic p-8 lg:p-10 max-w-md mx-auto lg:mx-0">
                {/* Header */}
                <div className="text-center mb-8">
                  <img 
                    src={unicalLogo} 
                    alt="UNICAL Logo" 
                    className="h-20 w-20 mx-auto mb-4"
                  />
                  <h1 className="font-heading text-2xl font-semibold text-foreground">
                    Staff Portal Login
                  </h1>
                  <p className="text-muted-foreground text-sm mt-2">
                    Access your administrative dashboard
                  </p>
                </div>

                {/* Login Form */}
                <LoginForm onSuccess={handleLoginSuccess} userType="staff" />

                {/* Student Login Link */}
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    Are you a student?{" "}
                    <Link 
                      to="/login" 
                      className="text-secondary font-medium hover:underline"
                    >
                      Student Portal Login
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
                    ICT Help Desk
                  </a>
                  <a 
                    href="tel:+2348012345679" 
                    className="flex items-center gap-2 text-sm text-secondary 
                               hover:underline"
                  >
                    <Phone size={16} />
                    +234 801 234 5679
                  </a>
                </div>
              </div>
            </div>

            {/* Portal Info - Second */}
            <div className="order-2">
              <div className="lg:pl-8">
                {/* Welcome Message */}
                <span className="text-secondary font-semibold text-sm uppercase tracking-wide">
                  Welcome to
                </span>
                <h2 className="font-heading text-3xl lg:text-4xl text-foreground mt-2 mb-4">
                  UNICAL Staff Portal
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The University of Calabar staff portal provides academic and 
                  administrative staff with secure access to essential management 
                  tools. Verify payments, manage student records, and upload results 
                  efficiently.
                </p>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {staffServices.map((service) => (
                    <div 
                      key={service.title}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex 
                                      items-center justify-center flex-shrink-0">
                        <service.icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          {service.title}
                        </h4>
                        <p className="text-muted-foreground text-xs mt-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Security Notice */}
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                  <h4 className="font-semibold text-foreground text-sm mb-2">
                    Security Notice
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    For security reasons, staff sessions expire after 30 minutes of 
                    inactivity. Always log out when using shared computers.
                  </p>
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

export default StaffLogin;
