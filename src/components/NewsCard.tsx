import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

/**
 * NewsCard Component
 * Displays news and announcement items
 * Features: Date, category, title, excerpt
 */

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  link: string;
  image?: string;
}

const NewsCard = ({ 
  title, 
  excerpt, 
  date, 
  category, 
  link,
  image 
}: NewsCardProps) => {
  return (
    <Link 
      to={link}
      className="card-academic group overflow-hidden flex flex-col"
    >
      {/* Image (if provided) */}
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 
                       transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
            {category}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 
                       group-hover:text-secondary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
          {excerpt}
        </p>

        {/* Read More */}
        <div className="mt-4 pt-4 border-t border-border">
          <span className="text-secondary font-medium text-sm inline-flex items-center 
                           gap-1 group-hover:gap-2 transition-all">
            Read More
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
