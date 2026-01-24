import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * InfoCard Component
 * Reusable card for displaying portal services and information
 * Features: Icon, title, description, hover effects
 */

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  linkText?: string;
}

const InfoCard = ({ 
  icon: Icon, 
  title, 
  description, 
  link, 
  linkText = "Access Now" 
}: InfoCardProps) => {
  return (
    <Link 
      to={link}
      className="card-info group block"
    >
      {/* Icon Container */}
      <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center 
                      justify-center mb-4 group-hover:bg-secondary 
                      transition-colors duration-300">
        <Icon 
          size={28} 
          className="text-secondary group-hover:text-secondary-foreground 
                     transition-colors duration-300" 
        />
      </div>

      {/* Content */}
      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Link Indicator */}
      <span className="text-secondary font-medium text-sm inline-flex items-center 
                       gap-1 group-hover:gap-2 transition-all duration-200">
        {linkText}
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </span>
    </Link>
  );
};

export default InfoCard;
