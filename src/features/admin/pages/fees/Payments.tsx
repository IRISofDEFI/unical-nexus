import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { DollarSign } from "lucide-react";
const Page = () => (<AdminLayout title="Payments" description="View and manage fee payments"><AdminPlaceholder title="Payments" icon={DollarSign} /></AdminLayout>);
export default Page;
