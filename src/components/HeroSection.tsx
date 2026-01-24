import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import campusHero from "@/assets/images/campus-hero.jpg";

/**
 * HeroSection Component
 * Main landing hero with background image and CTAs
 * Features: Full-width, overlay, animated text
 */

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${campusHero})` }}
      />
      
      {/* Overlay */}
      <div className="overlay-dark" />

      {/* Content */}
      <div className="container-academic relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-secondary/90 text-secondary-foreground 
                          px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <BookOpen size={16} />
            <span>Admissions Open for 2025/2026 Academic Session</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-primary-foreground font-heading text-4xl md:text-5xl 
                         lg:text-6xl font-bold leading-tight mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}>
            Knowledge for Service
          </h1>

          {/* Subheading */}
          <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed 
                        mb-8 max-w-2xl animate-fade-in"
             style={{ animationDelay: "0.2s" }}>
            Welcome to the University of Calabar — a premier institution of higher 
            learning in Nigeria, committed to academic excellence, innovation, and 
            community development since 1975.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in" 
               style={{ animationDelay: "0.3s" }}>
            <Link 
              to="/admissions"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Apply Now
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/login"
              className="btn-outline-light inline-flex items-center gap-2"
            >
              Login
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 
                          animate-fade-in" 
               style={{ animationDelay: "0.4s" }}>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-accent">
                50+
              </p>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Years of Excellence
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-accent">
                16
              </p>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Faculties
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-heading font-bold text-accent">
                40K+
              </p>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
