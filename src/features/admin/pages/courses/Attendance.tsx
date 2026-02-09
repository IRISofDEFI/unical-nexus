import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { ClipboardList } from "lucide-react";
const Page = () => (<AdminLayout title="Attendance" description="View and manage course attendance records"><AdminPlaceholder title="Attendance" icon={ClipboardList} /></AdminLayout>);
export default Page;
