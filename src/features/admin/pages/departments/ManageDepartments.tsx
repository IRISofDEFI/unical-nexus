import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getDepartments, createDepartment, updateDepartment, deleteDepartment, getFaculties, type Department, type FacultyOption } from "../../services/departmentService";


const ManageDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculties, setFaculties] = useState<FacultyOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [deletingDepartment, setDeletingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: "", faculty_id: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [deptData, facData] = await Promise.all([getDepartments(), getFaculties()]);
      setDepartments(deptData);
      setFaculties(facData);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openFormDialog = (department: Department | null = null) => {
    setEditingDepartment(department);
    setFormData(department ? { name: department.name, faculty_id: department.faculty_id } : { name: "", faculty_id: "" });
    setIsFormOpen(true);
  };

  const openDeleteDialog = (department: Department) => {
    setDeletingDepartment(department);
    setIsDeleteOpen(true);
  }

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.faculty_id) return;
    setSubmitting(true);
    try {
      if (editingDepartment) {
        await updateDepartment(editingDepartment.id, formData);
        toast({ title: "Success", description: "Department updated." });
      } else {
        await createDepartment(formData);
        toast({ title: "Success", description: "Department created." });
      }
      setIsFormOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "An error occurred.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingDepartment) return;
    setSubmitting(true);
    try {
      await deleteDepartment(deletingDepartment.id);
      toast({ title: "Deleted", description: `Department "${deletingDepartment.name}" removed.` });
      setIsDeleteOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete department.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Departments" description="Manage academic departments and their faculties">
      <div className="flex justify-end mb-4">
        <Button onClick={() => openFormDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add Department
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Department Name</TableHead><TableHead>Faculty</TableHead><TableHead className="text-center">Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={3} className="text-center">Loading departments...</TableCell></TableRow>
            ) : departments.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center">No departments found.</TableCell></TableRow>
            ) : (
              departments.map((dept) => (
              <TableRow key={dept.id}>
                <TableCell className="font-medium">{dept.name}</TableCell>
                <TableCell>{dept.faculty_name}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openFormDialog(dept)}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(dept)} className="text-destructive"><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDepartment ? "Edit Department" : "Add New Department"}</DialogTitle>
            <DialogDescription>{editingDepartment ? `Update details for ${editingDepartment.name}.` : "Create a new academic department."}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2"><Label htmlFor="name">Department Name</Label><Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Computer Science" /></div>
            <div className="space-y-2">
              <Label htmlFor="faculty">Faculty</Label>
              <Select value={formData.faculty_id} onValueChange={(value) => setFormData({ ...formData, faculty_id: value })}>
                <SelectTrigger><SelectValue placeholder="Select a faculty" /></SelectTrigger>
                <SelectContent>{faculties.map(f => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={submitting || !formData.name.trim() || !formData.faculty_id}>{submitting ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
            <DialogDescription>Are you sure you want to delete <strong>"{deletingDepartment?.name}"</strong>? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={submitting}>{submitting ? "Deleting..." : "Delete"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageDepartments;