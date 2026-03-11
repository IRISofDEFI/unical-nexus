import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getApplicants, admitApplicant, type Applicant } from "../../services/userService";

const ManageAdmissions = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchApplicants = async () => {
    try {
      const data = await getApplicants();
      setApplicants(data);
    } catch { toast({ title: "Error", description: "Failed to load applicants.", variant: "destructive" }); }
  };

  useEffect(() => { fetchApplicants(); }, []);

  const handleAdmit = async (id: string) => {
    try {
      await admitApplicant(id);
      toast({ title: "Admitted", description: "Applicant status updated." });
      fetchApplicants();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to admit applicant.",
        variant: "destructive",
      });
    }
  };

  const filteredApplicants = applicants.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.jambReg.includes(searchTerm)
  );

  return (
    <AdminLayout title="Admissions Management" description="Manage prospective student applications and admission lists">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search applicants..." 
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" /> Export List
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>JAMB Reg No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Proposed Dept.</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.jambReg}</TableCell>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.score}</TableCell>
                <TableCell>{app.department}</TableCell>
                <TableCell>
                  <Badge variant={app.status === "Admitted" ? "default" : "outline"}>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {app.status === "Pending" && (
                    <Button 
                      size="sm" 
                      onClick={() => handleAdmit(app.id)}
                    >
                      Admit Student
                    </Button>
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

export default ManageAdmissions;