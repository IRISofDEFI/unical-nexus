import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { Plus } from "lucide-react";
const Page = () => (<AdminLayout title="Add Course" description="Create a new course"><AdminPlaceholder title="Add Course" icon={Plus} /></AdminLayout>);
export default Page;
