import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getHostelRequests, updateHostelRequestStatus, type HostelRequest } from "../../services/hostelService";

const ManageHostels = () => {
  const [requests, setRequests] = useState<HostelRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchRequests = async () => {
    try {
      const data = await getHostelRequests();
      setRequests(data);
    } catch { toast({ title: "Error", description: "Failed to load requests.", variant: "destructive" }); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleAction = async (id: string, action: "Approved" | "Rejected") => {
    await updateHostelRequestStatus(id, action);
    toast({ title: `Request ${action}`, description: `Status updated to ${action}.` });
    fetchRequests();
  };

  const filteredRequests = requests.filter(req => 
    req.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.matric.includes(searchTerm)
  );

  return (
    <AdminLayout title="Hostel Management" description="Manage student accommodation requests and allocations">
      <div className="flex items-center space-x-2 mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search student or matric no..." 
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Matric No.</TableHead>
              <TableHead>Requested Hostel</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="font-medium">{req.student}</TableCell>
                <TableCell>{req.matric}</TableCell>
                <TableCell>{req.hostel}</TableCell>
                <TableCell>{req.type}</TableCell>
                <TableCell>
                  <Badge variant={req.status === "Approved" ? "default" : req.status === "Rejected" ? "destructive" : "secondary"}>
                    {req.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {req.status === "Pending" && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleAction(req.id, "Approved")}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleAction(req.id, "Rejected")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ManageHostels;