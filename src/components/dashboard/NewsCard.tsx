import { Link } from "react-router-dom";
import { Newspaper, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

/**
 * News Card Component (Dashboard)
 * Displays recent news with navigation arrows
 * Matches UNICAL portal "Recent News" section
 */

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

interface NewsCardProps {
  news?: NewsItem[];
}

const NewsCard = ({ news = [] }: NewsCardProps) => {
  const hasNews = news.length > 0;

  return (
    <div className="bg-background border border-border rounded-xl overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            Recent News
          </h3>
          <p className="text-xs text-muted-foreground">News updates</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-muted rounded transition-colors">
            <ChevronLeft size={16} className="text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted rounded transition-colors">
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-muted rounded transition-colors">
            <MoreHorizontal size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {hasNews ? (
          <div className="space-y-4">
            {news.slice(0, 3).map((item) => (
              <div key={item.id} className="group">
                <Link
                  to={item.link}
                  className="text-secondary hover:text-secondary/80 font-medium text-sm 
                             transition-colors line-clamp-2"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  Posted {item.date}
                </p>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item.excerpt}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-3">
              <Newspaper size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No news yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
