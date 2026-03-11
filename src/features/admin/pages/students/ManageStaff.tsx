import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getStaff, createStaff, deleteStaff, type Staff } from "../../services/userService";

const ManageStaff = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", staffId: "", role: "Lecturer", department: "" });
  const { toast } = useToast();

  const fetchStaff = async () => {
    try {
      const data = await getStaff();
      setStaffList(data);
    } catch {
      toast({ title: "Error", description: "Failed to load staff.", variant: "destructive" });
    }
  };

  useEffect(() => { fetchStaff(); }, []);

  const handleSave = async () => {
    try {
      await createStaff(formData);
      toast({ title: "Success", description: "Staff member created." });
      setIsDialogOpen(false);
      setFormData({ name: "", staffId: "", role: "Lecturer", department: "" });
      fetchStaff();
    } catch { toast({ title: "Error", description: "Failed to create staff.", variant: "destructive" }); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this staff member?")) return;
    await deleteStaff(id);
    fetchStaff();
  };

  return (
    <AdminLayout title="Manage Staff" description="View and manage university staff members">
      <div className="flex justify-end mb-6">
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Staff
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Staff ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffList.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{staff.name}</TableCell>
                <TableCell>{staff.staffId}</TableCell>
                <TableCell><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{staff.role}</span></TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(staff.id)} className="text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Staff</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Full Name</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
            <div className="space-y-2"><Label>Staff ID</Label><Input value={formData.staffId} onChange={e => setFormData({...formData, staffId: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={formData.role} onValueChange={val => setFormData({...formData, role: val})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Lecturer">Lecturer</SelectItem><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Non-Academic">Non-Academic</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Department</Label><Input value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} /></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={handleSave}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageStaff;