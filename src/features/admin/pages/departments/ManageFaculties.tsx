import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getFaculties, createFaculty, updateFaculty, deleteFaculty, type Faculty } from "../../services/facultyService";


const ManageFaculties = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [deletingFaculty, setDeletingFaculty] = useState<Faculty | null>(null);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFaculties();
      setFaculties(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch faculties.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openFormDialog = (faculty: Faculty | null = null) => {
    setEditingFaculty(faculty);
    setName(faculty ? faculty.name : "");
    setIsFormOpen(true);
  };

  const openDeleteDialog = (faculty: Faculty) => {
    setDeletingFaculty(faculty);
    setIsDeleteOpen(true);
  }

  const handleSave = async () => {
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      if (editingFaculty) {
        await updateFaculty(editingFaculty.id, { name });
        toast({ title: "Success", description: "Faculty updated." });
      } else {
        await createFaculty({ name });
        toast({ title: "Success", description: "Faculty created." });
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
    if (!deletingFaculty) return;
    setSubmitting(true);
    try {
      await deleteFaculty(deletingFaculty.id);
      toast({ title: "Deleted", description: `Faculty "${deletingFaculty.name}" removed.` });
      setIsDeleteOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete faculty.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Faculties" description="Manage all university faculties">
      <div className="flex justify-end mb-4">
        <Button onClick={() => openFormDialog()}><Plus className="mr-2 h-4 w-4" /> Add Faculty</Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Faculty Name</TableHead><TableHead className="w-[150px] text-center">Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={2} className="text-center">Loading faculties...</TableCell></TableRow>
            ) : faculties.length === 0 ? (
              <TableRow><TableCell colSpan={2} className="text-center">No faculties found.</TableCell></TableRow>
            ) : (
              faculties.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell className="font-medium">{faculty.name}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openFormDialog(faculty)}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(faculty)} className="text-destructive"><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>{editingFaculty ? "Edit Faculty" : "Add New Faculty"}</DialogTitle></DialogHeader>
          <div className="py-4">
            <div className="space-y-2"><Label htmlFor="name">Faculty Name</Label><Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Faculty of Engineering" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={submitting || !name.trim()}>{submitting ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Faculty</DialogTitle>
            <DialogDescription>Are you sure you want to delete <strong>"{deletingFaculty?.name}"</strong>? This action cannot be undone.</DialogDescription>
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

export default ManageFaculties;