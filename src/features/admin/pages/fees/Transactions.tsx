import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { ArrowLeftRight } from "lucide-react";
const Page = () => (<AdminLayout title="Transactions" description="View payment transaction history"><AdminPlaceholder title="Transactions" icon={ArrowLeftRight} /></AdminLayout>);
export default Page;
