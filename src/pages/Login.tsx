import { Link } from "react-router-dom";
import { Shield, HelpCircle, FileText, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import unicalLogo from "@/assets/logos/unical-logo.png";

/**
 * Login Page
 * Portal login page for students and staff
 * Features: Login form, portal info panel, help links
 */

// Portal services information
const portalServices = [
  {
    icon: FileText,
    title: "Pay School Fees",
    description: "Securely pay your tuition and other fees online"
  },
  {
    icon: Shield,
    title: "Course Registration",
    description: "Register for courses each semester"
  },
  {
    icon: FileText,
    title: "View Results",
    description: "Access your academic results and transcript"
  },
  {
    icon: HelpCircle,
    title: "Support Services",
    description: "Get help with academic and administrative issues"
  },
];

const Login = () => {
  const handleLogin = (data: { identifier: string; password: string; remember: boolean }) => {
    // Mock login - in real app, this would authenticate
    console.log("Login attempt:", data);
    // Redirect to student dashboard for demo
    window.location.href = "/student-dashboard";
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
                    Student Portal Login
                  </h1>
                  <p className="text-muted-foreground text-sm mt-2">
                    Access your academic dashboard
                  </p>
                </div>

                {/* Login Form */}
                <LoginForm onSubmit={handleLogin} userType="student" />

                {/* Staff Login Link */}
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    Are you a staff member?{" "}
                    <Link 
                      to="/staff-login" 
                      className="text-secondary font-medium hover:underline"
                    >
                      Staff Portal Login
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
                    Help Center
                  </a>
                  <a 
                    href="tel:+2348012345678" 
                    className="flex items-center gap-2 text-sm text-secondary 
                               hover:underline"
                  >
                    <Phone size={16} />
                    +234 801 234 5678
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Portal Info */}
            <div className="order-1 lg:order-2">
              <div className="lg:pl-8">
                {/* Welcome Message */}
                <span className="text-secondary font-semibold text-sm uppercase tracking-wide">
                  Welcome to
                </span>
                <h2 className="font-heading text-3xl lg:text-4xl text-foreground mt-2 mb-4">
                  UNICAL Student Portal
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The University of Calabar online portal provides students with 
                  easy access to essential academic services. Manage your fees, 
                  register courses, and track your academic progress all in one place.
                </p>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {portalServices.map((service) => (
                    <div 
                      key={service.title}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex 
                                      items-center justify-center flex-shrink-0">
                        <service.icon size={20} className="text-secondary" />
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

                {/* Important Notice */}
                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
                  <h4 className="font-semibold text-foreground text-sm mb-2">
                    Important Notice
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    2025/2026 school fees payment deadline is March 31, 2025. 
                    Ensure your fees are paid before course registration closes.
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

export default Login;
