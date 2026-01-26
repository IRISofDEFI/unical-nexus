import { Calendar, MoreHorizontal } from "lucide-react";

/**
 * Calendar Card Component
 * Displays academic calendar events
 * Matches UNICAL portal "Academic Calendar" section
 */

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "deadline" | "break" | "exam" | "event";
}

interface CalendarCardProps {
  session?: string;
  events?: CalendarEvent[];
}

const CalendarCard = ({
  session = "2024/2025",
  events = [],
}: CalendarCardProps) => {
  const hasEvents = events.length > 0;

  const getEventColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "deadline":
        return "bg-secondary/10 text-secondary";
      case "break":
        return "bg-accent/10 text-accent";
      case "exam":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="bg-background border border-border rounded-xl overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            Academic Calendar
          </h3>
          <p className="text-xs text-muted-foreground">
            Current Session: {session}
          </p>
        </div>
        <button className="p-1 hover:bg-muted rounded transition-colors">
          <MoreHorizontal size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {hasEvents ? (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                  <Calendar size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {event.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-3">
              <Calendar size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No item yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarCard;
