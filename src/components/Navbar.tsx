import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User } from "lucide-react";
import unicalLogo from "@/assets/logos/unical-logo.png";

/**
 * Navbar Component
 * Main navigation header for UNICAL portal
 * Features: Responsive, sticky, academic styling
 */

const navItems = [
  { name: "Home", path: "/" },
  { name: "Admissions", path: "/admissions" },
  { name: "Academics", path: "/academics" },
  { name: "Students", path: "/students" },
  { name: "Staff", path: "/staff" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-academic">
      {/* Main Navigation */}
      <nav className="container-academic">
        <div className="flex items-center justify-between h-20">
          {/* Logo and University Name */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={unicalLogo} 
              alt="University of Calabar Logo" 
              className="h-14 w-14 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-primary-foreground font-heading text-lg font-semibold leading-tight">
                University of Calabar
              </h1>
              <p className="text-primary-foreground/70 text-xs tracking-wide">
                Knowledge for Service
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link py-2 ${
                  isActive(item.path) 
                    ? "text-white after:w-full" 
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Portal Login Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/login"
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 
                         text-secondary-foreground px-5 py-2.5 rounded font-medium 
                         transition-all duration-200"
            >
              <User size={18} />
              <span>Portal Login</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-primary-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary-foreground/10">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-primary-foreground py-3 px-4 rounded 
                             hover:bg-primary-foreground/10 transition-colors
                             ${isActive(item.path) ? "bg-primary-foreground/10" : ""}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 bg-secondary text-secondary-foreground 
                           py-3 px-4 rounded font-medium mt-2"
              >
                <User size={18} />
                <span>Portal Login</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
