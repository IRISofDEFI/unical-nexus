import AdminLayout from "../components/AdminLayout";
import { Users, BarChart3, BookOpen, DollarSign } from "lucide-react";

/**
 * Admin Dashboard – Overview page with summary cards and mock data.
 */

const stats = [
  { label: "Total Students", value: "12,458", icon: Users },
  { label: "Active Courses", value: "342", icon: BookOpen },
  { label: "Revenue (₦)", value: "₦284M", icon: DollarSign },
  { label: "Reports Generated", value: "89", icon: BarChart3 },
];

const AdminDashboard = () => (
  <AdminLayout title="Dashboard" description="University administration overview">
    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="card-academic p-5">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <s.icon size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Quick actions */}
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="card-academic p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {[
            "New student batch uploaded – 245 records",
            "2025/2026 session fees configured",
            "CSC 401 results uploaded by Dr. Obi",
            "Registration window closed for first semester",
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-sm text-foreground">
              <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
              {a}
            </div>
          ))}
        </div>
      </div>
      <div className="card-academic p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">System Status</h3>
        <div className="space-y-4">
          {[
            { label: "Current Session", value: "2025/2026" },
            { label: "Current Semester", value: "First Semester" },
            { label: "Registration", value: "Open" },
            { label: "Result Upload", value: "Enabled" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AdminLayout>
);

export default AdminDashboard;
