import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { Eye } from "lucide-react";
const Page = () => (<AdminLayout title="View Users" description="Browse all system users"><AdminPlaceholder title="View Users" icon={Eye} /></AdminLayout>);
export default Page;
