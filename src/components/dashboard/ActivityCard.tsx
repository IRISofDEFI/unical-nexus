import { Activity, MoreHorizontal } from "lucide-react";

/**
 * Activity Card Component
 * Displays user activities and notifications
 * Matches UNICAL portal "My Activities" section
 */

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "login" | "payment" | "registration" | "general";
}

interface ActivityCardProps {
  activities?: ActivityItem[];
}

const ActivityCard = ({ activities = [] }: ActivityCardProps) => {
  const hasActivities = activities.length > 0;

  return (
    <div className="bg-background border border-border rounded-xl overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            My Activities
          </h3>
          <p className="text-xs text-muted-foreground">Logs and notifications</p>
        </div>
        <button className="p-1 hover:bg-muted rounded transition-colors">
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {hasActivities ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Activity size={16} className="text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-3">
              <Activity size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No Activity yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
