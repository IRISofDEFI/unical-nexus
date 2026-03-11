import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getStudents, createStudent, deleteStudent, type Student } from "../../services/userService";

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", matric: "", department: "", level: "" });
  const { toast } = useToast();

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch {
      toast({ title: "Error", description: "Failed to load students.", variant: "destructive" });
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.matric.includes(searchTerm)
  );

  const handleSave = async () => {
    try {
      await createStudent(formData);
      toast({ title: "Success", description: "Student added successfully." });
      setIsDialogOpen(false);
      setFormData({ name: "", matric: "", department: "", level: "" });
      fetchStudents();
    } catch { toast({ title: "Error", description: "Failed to create student.", variant: "destructive" }); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this student?")) return;
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <AdminLayout title="Manage Students" description="View and manage registered students">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search name or matric no..." 
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Register Student
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Matric No.</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.matric}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(student.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent><DialogHeader><DialogTitle>Register New Student</DialogTitle></DialogHeader><div className="grid gap-4 py-4"><div className="space-y-2"><Label>Full Name</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div><div className="space-y-2"><Label>Matric Number</Label><Input value={formData.matric} onChange={e => setFormData({...formData, matric: e.target.value})} /></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Department</Label><Input value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} /></div><div className="space-y-2"><Label>Level</Label><Input value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} /></div></div></div><DialogFooter><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={handleSave}>Register</Button></DialogFooter></DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageStudents;