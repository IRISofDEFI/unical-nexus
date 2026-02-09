import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { Plus } from "lucide-react";
const Page = () => (<AdminLayout title="Add Department" description="Create a new department"><AdminPlaceholder title="Add Department" icon={Plus} /></AdminLayout>);
export default Page;
