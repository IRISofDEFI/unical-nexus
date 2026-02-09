import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { Eye } from "lucide-react";
const Page = () => (<AdminLayout title="View Students" description="Browse all student records"><AdminPlaceholder title="View Students" icon={Eye} /></AdminLayout>);
export default Page;
