import { FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * AdminPlaceholder
 * Reusable placeholder for admin pages not yet implemented.
 */

interface AdminPlaceholderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

const AdminPlaceholder = ({ title, description, icon: Icon = FileText }: AdminPlaceholderProps) => (
  <div className="card-academic p-8 lg:p-12 text-center">
    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
      <Icon size={32} className="text-primary" />
    </div>
    <h2 className="font-heading text-xl font-semibold text-foreground mb-2">{title}</h2>
    <p className="text-muted-foreground max-w-md mx-auto">
      {description || `The ${title} module is under development. This page will be connected to the backend API.`}
    </p>
  </div>
);

export default AdminPlaceholder;
