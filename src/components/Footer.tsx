import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube 
} from "lucide-react";
import unicalLogo from "@/assets/logos/unical-logo.png";

/**
 * Footer Component
 * University footer with contact info, quick links, and social media
 * Features: Multi-column layout, academic styling
 */

const quickLinks = [
  { name: "About UNICAL", path: "/about" },
  { name: "Academic Calendar", path: "/calendar" },
  { name: "Faculties & Departments", path: "/faculties" },
  { name: "Library", path: "/library" },
  { name: "Research", path: "/research" },
];

const portalLinks = [
  { name: "Student Portal", path: "/login" },
  { name: "Staff Portal", path: "/login" },
  { name: "Admissions Portal", path: "/admissions" },
  { name: "E-Learning", path: "/elearning" },
  { name: "Webmail", path: "/webmail" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container-academic section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* University Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={unicalLogo} 
                alt="UNICAL Logo" 
                className="h-16 w-16 object-contain"
              />
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  University of Calabar
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  Knowledge for Service
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              The University of Calabar is a federal university in Calabar, 
              Cross River State, Nigeria. Established in 1975, we are committed 
              to excellence in teaching, research, and community service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-white 
                               transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portal Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">
              Portals
            </h4>
            <ul className="space-y-3">
              {portalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-white 
                               transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-accent" />
                <p className="text-primary-foreground/80 text-sm">
                  University of Calabar<br />
                  P.M.B. 1115, Calabar<br />
                  Cross River State, Nigeria
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent" />
                <a 
                  href="tel:+2348012345678" 
                  className="text-primary-foreground/80 hover:text-white text-sm"
                >
                  +234 801 234 5678
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent" />
                <a 
                  href="mailto:info@unical.edu.ng" 
                  className="text-primary-foreground/80 hover:text-white text-sm"
                >
                  info@unical.edu.ng
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="bg-primary-foreground/10 hover:bg-secondary 
                               p-2.5 rounded transition-colors"
                    aria-label="Social media link"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-academic py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} University of Calabar. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-primary-foreground/60 hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-primary-foreground/60 hover:text-white"
              >
                Terms of Use
              </Link>
              <Link 
                to="/sitemap" 
                className="text-primary-foreground/60 hover:text-white"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
