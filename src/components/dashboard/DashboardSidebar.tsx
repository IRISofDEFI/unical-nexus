import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Settings,
  CreditCard,
  Wallet,
  BookOpen,
  GraduationCap,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import unicalLogo from "@/assets/logos/unical-logo.png";
import { cn } from "@/lib/utils";

/**
 * Dashboard Sidebar Component
 * Left navigation sidebar for student dashboard
 * Features grouped navigation sections matching UNICAL portal design
 */

interface NavItem {
  title: string;
  icon: LucideIcon;
  href: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "GENERAL",
    items: [
      { title: "General", icon: Settings, href: "/profile" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { title: "My Payments", icon: CreditCard, href: "/receipts" },
      { title: "Pay Fees", icon: Wallet, href: "/pay-fees" },
    ],
  },
  {
    title: "ACADEMICS",
    items: [
      { title: "Courses", icon: BookOpen, href: "/course-registration" },
      { title: "E-Learning", icon: GraduationCap, href: "/e-learning" },
    ],
  },
  {
    title: "HELP DESK",
    items: [
      { title: "Support", icon: HelpCircle, href: "/support" },
    ],
  },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ isOpen, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    navGroups.map((g) => g.title)
  );

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-primary text-primary-foreground z-50",
          "w-64 transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary-foreground/10">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={unicalLogo}
              alt="UNICAL Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-heading font-semibold text-lg">
              Unical Portal
            </span>
          </Link>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 hover:bg-primary-foreground/10 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dashboard Link */}
        <div className="p-4">
          <Link
            to="/student-dashboard"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive("/student-dashboard")
                ? "bg-secondary text-secondary-foreground"
                : "hover:bg-primary-foreground/10"
            )}
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
        </div>

        {/* Navigation Groups */}
        <nav className="px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          {navGroups.map((group) => (
            <div key={group.title}>
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.title)}
                className="flex items-center justify-between w-full px-4 py-2 text-xs 
                           font-semibold text-primary-foreground/60 uppercase tracking-wider
                           hover:text-primary-foreground/80 transition-colors"
              >
                {group.title}
                {expandedGroups.includes(group.title) ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>

              {/* Group Items */}
              {expandedGroups.includes(group.title) && (
                <div className="space-y-1 mt-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                        isActive(item.href)
                          ? "bg-secondary text-secondary-foreground"
                          : "hover:bg-primary-foreground/10 text-primary-foreground/80"
                      )}
                    >
                      <item.icon size={18} />
                      <span className="text-sm">{item.title}</span>
                      <ChevronRight size={14} className="ml-auto opacity-50" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed top-4 left-4 z-30 p-2 bg-primary text-primary-foreground rounded-lg",
          "lg:hidden shadow-lg",
          isOpen && "hidden"
        )}
      >
        <Menu size={24} />
      </button>
    </>
  );
};

export default DashboardSidebar;
