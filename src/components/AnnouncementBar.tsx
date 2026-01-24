import { X } from "lucide-react";
import { useState } from "react";

/**
 * AnnouncementBar Component
 * Displays important university announcements at the top of the page
 * Features: dismissible, prominent wine/maroon background
 */

interface AnnouncementBarProps {
  message: string;
  link?: string;
  linkText?: string;
}

const AnnouncementBar = ({ 
  message, 
  link, 
  linkText = "Learn More" 
}: AnnouncementBarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="announcement-bar relative">
      <div className="container-academic flex items-center justify-center gap-2">
        <span>{message}</span>
        {link && (
          <a 
            href={link} 
            className="underline underline-offset-2 hover:no-underline font-semibold"
          >
            {linkText}
          </a>
        )}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:bg-secondary-foreground/10 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
