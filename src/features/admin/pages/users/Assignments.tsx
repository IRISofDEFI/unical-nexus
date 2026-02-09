import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { ClipboardList } from "lucide-react";
const Page = () => (<AdminLayout title="Assignments" description="Manage user role assignments"><AdminPlaceholder title="Assignments" icon={ClipboardList} /></AdminLayout>);
export default Page;
