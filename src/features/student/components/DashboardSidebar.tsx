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
  Menu,
  X,
  Bell,
  FileText,
  Receipt,
  ClipboardList,
  MessageCircle,
  Headphones,
} from "lucide-react";
import unicalLogo from "@/assets/logos/unical-logo.png";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

/**
 * Dashboard Sidebar Component
 * Left navigation sidebar for student dashboard
 * Features accordion-style dropdown menus matching UNICAL portal design
 */

interface NavSubItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface NavItem {
  title: string;
  icon: LucideIcon;
  href?: string; // For single links
  subItems?: NavSubItem[]; // For dropdown menus
}

const navItems: NavItem[] = [
  {
    title: "General",
    icon: Settings,
    subItems: [
      { title: "Notices", href: "/notices", icon: Bell },
    ],
  },
  {
    title: "My Payments",
    icon: CreditCard,
    subItems: [
      { title: "Acceptance Payments", href: "/acceptance-payments", icon: FileText },
      { title: "Fees Payments", href: "/fees-payments", icon: Receipt },
      { title: "My Payment Invoices", href: "/payment-invoices", icon: ClipboardList },
      { title: "School Charge Payments", href: "/school-charge-payments", icon: Receipt },
    ],
  },
  {
    title: "Pay Fees",
    icon: Wallet,
    href: "/pay-fees",
  },
  {
    title: "Courses",
    icon: BookOpen,
    subItems: [
      { title: "Registered Courses", href: "/registered-courses", icon: ClipboardList },
      { title: "Course Registration", href: "/course-registration", icon: BookOpen },
    ],
  },
  {
    title: "E-Learning",
    icon: GraduationCap,
    href: "/e-learning",
  },
  {
    title: "Support",
    icon: HelpCircle,
    subItems: [
      { title: "Help Desk", href: "/help-desk", icon: Headphones },
      { title: "Contact Support", href: "/contact-support", icon: MessageCircle },
    ],
  },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ isOpen, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  
  // Track which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(() => {
    // Auto-open dropdown that contains current route
    const activeDropdowns: string[] = [];
    navItems.forEach((item) => {
      if (item.subItems?.some((sub) => location.pathname === sub.href)) {
        activeDropdowns.push(item.title);
      }
    });
    return activeDropdowns;
  });

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isDropdownOpen = (title: string) => openDropdowns.includes(title);

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
          "fixed left-0 top-0 h-screen bg-primary text-primary-foreground z-50",
          "w-64 transition-transform duration-300 ease-in-out flex flex-col",
          "lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto lg:shrink-0",
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
            to="/student/dashboard"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive("/student/dashboard")
                ? "bg-secondary text-secondary-foreground"
                : "hover:bg-primary-foreground/10"
            )}
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 space-y-1 overflow-y-auto flex-1">
          {navItems.map((item) => (
            <div key={item.title}>
              {item.subItems ? (
                // Dropdown Menu Item
                <Collapsible
                  open={isDropdownOpen(item.title)}
                  onOpenChange={() => toggleDropdown(item.title)}
                >
                  <CollapsibleTrigger
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors",
                      "hover:bg-primary-foreground/10 text-primary-foreground/90",
                      isDropdownOpen(item.title) && "bg-primary-foreground/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform duration-200",
                        isDropdownOpen(item.title) && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="pl-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm",
                            isActive(subItem.href)
                              ? "bg-secondary text-secondary-foreground"
                              : "hover:bg-primary-foreground/10 text-primary-foreground/70"
                          )}
                        >
                          <subItem.icon size={16} />
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                // Single Link Item
                <Link
                  to={item.href!}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item.href!)
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-primary-foreground/10 text-primary-foreground/90"
                  )}
                >
                  <item.icon size={20} />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
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
