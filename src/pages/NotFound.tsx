import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * NotFound (404) Page
 * Displayed when users navigate to non-existent routes
 */

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container-academic text-center">
          {/* 404 Number */}
          <h1 className="font-heading text-8xl md:text-9xl font-bold text-secondary/20 mb-4">
            404
          </h1>
          
          {/* Error Message */}
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
            Please check the URL or navigate back to the homepage.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <Home size={18} />
              Go to Homepage
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn-outline inline-flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
