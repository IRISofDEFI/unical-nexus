import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { Upload } from "lucide-react";
const Page = () => (<AdminLayout title="Upload Courses" description="Bulk upload courses via CSV"><AdminPlaceholder title="Upload Courses" icon={Upload} /></AdminLayout>);
export default Page;
