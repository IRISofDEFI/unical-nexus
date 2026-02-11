import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Home,
  Building2,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Users as UsersIcon,
  Calendar,
  DollarSign,
  UserCog,
  BarChart3,
  ChevronDown,
  Menu,
  X,
  Plus,
  Eye,
  Edit,
  Upload,
  Download,
  FileText,
  ListChecks,
  UserMinus,
  PlayCircle,
  Layers,
  DoorOpen,
  DoorClosed,
  Receipt,
  CreditCard,
  ArrowLeftRight,
  Briefcase,
  ClipboardList,
  LogOut,
} from "lucide-react";
import unicalLogo from "@/assets/logos/unical-logo.png";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

/**
 * Admin Dashboard Sidebar
 * Collapsible sidebar with grouped, nested navigation items
 * matching the UNICAL admin portal reference design.
 */

interface NavSubItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface NavGroup {
  label?: string; // section header like "ADMINISTRATION"
  items: NavItem[];
}

interface NavItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  subItems?: NavSubItem[];
}

const navGroups: NavGroup[] = [
  {
    items: [
      { title: "Dashboard", icon: Home, href: "/admin/dashboard" },
      {
        title: "Faculty",
        icon: Building2,
        subItems: [
          { title: "Add Faculty", href: "/admin/faculty/add", icon: Plus },
          { title: "View / Edit Faculties", href: "/admin/faculty/view-edit", icon: Eye },
        ],
      },
      {
        title: "Department",
        icon: Building2,
        subItems: [
          { title: "Add Department", href: "/admin/departments/add", icon: Plus },
          { title: "View / Edit Departments", href: "/admin/departments/view-edit", icon: Eye },
        ],
      },
      {
        title: "Programme",
        icon: GraduationCap,
        subItems: [
          { title: "Add Programme", href: "/admin/programmes/add", icon: Plus },
          { title: "View / Edit Programmes", href: "/admin/programmes/view-edit", icon: Eye },
        ],
      },
      {
        title: "Course",
        icon: BookOpen,
        subItems: [
          { title: "Add Course", href: "/admin/courses/add", icon: Plus },
          { title: "View / Edit Courses", href: "/admin/courses/view-edit", icon: Eye },
          { title: "Upload Courses", href: "/admin/courses/upload", icon: Upload },
          { title: "Prescribed Courses", href: "/admin/courses/prescribed", icon: ListChecks },
          { title: "Attendance", href: "/admin/courses/attendance", icon: ClipboardList },
          { title: "Pass Mark", href: "/admin/courses/pass-mark", icon: ClipboardCheck },
          { title: "Allocation", href: "/admin/courses/allocation", icon: Layers },
        ],
      },
      {
        title: "Results",
        icon: ClipboardCheck,
        subItems: [
          { title: "Upload Results", href: "/admin/results/upload", icon: Upload },
          { title: "View Results", href: "/admin/results/view", icon: Eye },
          { title: "Reports", href: "/admin/results/reports", icon: BarChart3 },
          { title: "Download Results", href: "/admin/results/download", icon: Download },
        ],
      },
      {
        title: "Students",
        icon: UsersIcon,
        subItems: [
          { title: "Upload List", href: "/admin/students/upload", icon: Upload },
          { title: "View / Edit Students", href: "/admin/students/view-edit", icon: Eye },
          { title: "Student Profile", href: "/admin/students/profile", icon: FileText },
          { title: "Withdraw Student", href: "/admin/students/withdraw", icon: UserMinus },
        ],
      },
    ],
  },
  {
    label: "ADMINISTRATION",
    items: [
      {
        title: "Academic Session",
        icon: Calendar,
        subItems: [
          { title: "Start Session", href: "/admin/session/start", icon: PlayCircle },
          { title: "Semester", href: "/admin/session/semester", icon: Layers },
          { title: "Open Registration", href: "/admin/session/open-reg", icon: DoorOpen },
          { title: "Close Registration", href: "/admin/session/close-reg", icon: DoorClosed },
        ],
      },
      {
        title: "Fee Management",
        icon: DollarSign,
        subItems: [
          { title: "Add Fee Item", href: "/admin/fees/add-item", icon: Plus },
          { title: "View / Edit Fee Items", href: "/admin/fees/view-edit-items", icon: Eye },
          { title: "Faculty Charges", href: "/admin/fees/faculty-charges", icon: Receipt },
          { title: "Extra Charges", href: "/admin/fees/extra-charges", icon: CreditCard },
          { title: "Payments", href: "/admin/fees/payments", icon: DollarSign },
          { title: "Transactions", href: "/admin/fees/transactions", icon: ArrowLeftRight },
        ],
      },
      {
        title: "Users",
        icon: UserCog,
        subItems: [
          { title: "Lecturers", href: "/admin/users/lecturers", icon: Briefcase },
          { title: "Faculty Officers", href: "/admin/users/faculty-officers", icon: UsersIcon },
          { title: "Assignments", href: "/admin/users/assignments", icon: ClipboardList },
          { title: "View / Edit Users", href: "/admin/users/view-edit", icon: Eye },
        ],
      },
    ],
  },
  {
    label: "REPORTS",
    items: [
      { title: "Reports", icon: BarChart3, href: "/admin/reports" },
    ],
  },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const AdminSidebar = ({ isOpen, onToggle, onLogout }: AdminSidebarProps) => {
  const location = useLocation();

  const [openDropdowns, setOpenDropdowns] = useState<string[]>(() => {
    const active: string[] = [];
    navGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.subItems?.some((sub) => location.pathname === sub.href)) {
          active.push(item.title);
        }
      });
    });
    return active;
  });

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isDropdownOpen = (title: string) => openDropdowns.includes(title);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
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
            <img src={unicalLogo} alt="UNICAL Logo" className="h-10 w-10 object-contain" />
            <span className="font-heading font-semibold text-lg">Admin Portal</span>
          </Link>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 hover:bg-primary-foreground/10 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="px-4 pt-5 pb-2 text-xs font-semibold tracking-wider text-primary-foreground/50 uppercase">
                  {group.label}
                </p>
              )}
              {group.items.map((item) => (
                <div key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={isDropdownOpen(item.title)}
                      onOpenChange={() => toggleDropdown(item.title)}
                    >
                      <CollapsibleTrigger
                        className={cn(
                          "flex items-center justify-between w-full px-4 py-2.5 rounded-lg transition-colors",
                          "hover:bg-primary-foreground/10 text-primary-foreground/90",
                          isDropdownOpen(item.title) && "bg-primary-foreground/5"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={18} />
                          <span className="text-sm font-medium">{item.title}</span>
                        </div>
                        <ChevronDown
                          size={14}
                          className={cn(
                            "transition-transform duration-200",
                            isDropdownOpen(item.title) && "rotate-180"
                          )}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className="pl-4 mt-1 space-y-0.5">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                            onClick={() => { if (window.innerWidth < 1024) onToggle(); }}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm",
                                isActive(sub.href)
                                  ? "bg-secondary text-secondary-foreground"
                                  : "hover:bg-primary-foreground/10 text-primary-foreground/70"
                              )}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                              <span>{sub.title}</span>
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      to={item.href!}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                        isActive(item.href!)
                          ? "bg-secondary text-secondary-foreground"
                          : "hover:bg-primary-foreground/10 text-primary-foreground/90"
                      )}
                    >
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-primary-foreground/10">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg
                       hover:bg-destructive/20 text-primary-foreground/80 transition-colors text-sm"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Toggle */}
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

export default AdminSidebar;
