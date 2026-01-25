import type { LucideIcon } from "lucide-react";
import { CreditCard, Wallet, Award, BookOpen, Vote } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Stats Row Component
 * Displays financial and academic statistics in a horizontal row
 * Matches UNICAL portal design with icon + value cards
 */

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

interface StatsRowProps {
  feesPaid: string;
  leviesPaid: string;
  cgpa: string;
  totalCourses: number;
  showEVoting?: boolean;
}

const StatsRow = ({
  feesPaid,
  leviesPaid,
  cgpa,
  totalCourses,
  showEVoting = true,
}: StatsRowProps) => {
  const stats: StatItem[] = [
    {
      icon: CreditCard,
      label: "Fees Paid",
      value: feesPaid,
      color: "text-primary",
    },
    {
      icon: Wallet,
      label: "Levies Paid",
      value: leviesPaid,
      color: "text-secondary",
    },
    {
      icon: Award,
      label: "CGPA",
      value: cgpa,
      color: "text-accent",
    },
    {
      icon: BookOpen,
      label: "Total Courses",
      value: totalCourses.toString(),
      color: "text-primary",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Stat Cards */}
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 bg-background border border-border 
                     rounded-lg px-4 py-3 min-w-[140px] flex-1 sm:flex-none"
        >
          <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
            <stat.icon size={20} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="font-semibold text-foreground">{stat.value}</p>
          </div>
        </div>
      ))}

      {/* E-Voting Button */}
      {showEVoting && (
        <Link
          to="/e-voting"
          className="flex items-center gap-2 bg-secondary text-secondary-foreground 
                     px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 
                     transition-colors ml-auto"
        >
          <Vote size={18} />
          <span>E-Voting</span>
        </Link>
      )}
    </div>
  );
};

export default StatsRow;
