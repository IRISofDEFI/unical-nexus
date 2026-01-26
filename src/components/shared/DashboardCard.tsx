import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * DashboardCard Component
 * Card for dashboard quick actions and services
 * Features: Icon, title, description, notification badge
 */

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  badge?: string | number;
  variant?: "default" | "primary" | "secondary" | "accent";
}

const DashboardCard = ({ 
  icon: Icon, 
  title, 
  description, 
  link, 
  badge,
  variant = "default"
}: DashboardCardProps) => {
  // Variant styles for icon container
  const iconVariants = {
    default: "bg-muted text-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <Link 
      to={link}
      className="card-academic p-6 group relative overflow-hidden"
    >
      {/* Badge (if present) */}
      {badge && (
        <span className="absolute top-4 right-4 bg-secondary text-secondary-foreground 
                         text-xs font-semibold px-2.5 py-1 rounded-full">
          {badge}
        </span>
      )}

      {/* Icon */}
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4
                      ${iconVariants[variant]} group-hover:scale-105 transition-transform`}>
        <Icon size={32} />
      </div>

      {/* Content */}
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2 
                     group-hover:text-secondary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm">
        {description}
      </p>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary 
                      transform scale-x-0 group-hover:scale-x-100 
                      transition-transform duration-300 origin-left" />
    </Link>
  );
};

export default DashboardCard;
