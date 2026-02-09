import AdminLayout from "../../components/AdminLayout";
import AdminPlaceholder from "../../components/AdminPlaceholder";
import { ClipboardCheck } from "lucide-react";
const Page = () => (<AdminLayout title="Pass Mark" description="Configure pass mark settings per course"><AdminPlaceholder title="Pass Mark" icon={ClipboardCheck} /></AdminLayout>);
export default Page;
