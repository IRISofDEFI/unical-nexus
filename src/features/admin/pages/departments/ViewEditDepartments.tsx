import { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getFaculties,
  type Department,
  type FacultyOption,
} from "../../services/departmentService";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ViewEditDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculties, setFaculties] = useState<FacultyOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Department | null>(null);
  const [editName, setEditName] = useState("");
  const [editFacultyId, setEditFacultyId] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [depts, facs] = await Promise.all([getDepartments(), getFaculties()]);
      setDepartments(depts);
      setFaculties(facs);
    } catch {
      toast({ title: "Error", description: "Failed to load data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ---- Edit ----
  const openEdit = (dept: Department) => {
    setEditTarget(dept);
    setEditName(dept.name);
    setEditFacultyId(dept.faculty_id);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!editTarget || !editName.trim() || !editFacultyId) return;
    setSaving(true);
    try {
      await updateDepartment(editTarget.id, { name: editName.trim(), faculty_id: editFacultyId });
      toast({ title: "Updated", description: `Department updated successfully.` });
      setEditOpen(false);
      fetchData();
    } catch (err: any) {
      const msg = err?.message?.includes("unique")
        ? "A department with this name already exists."
        : "Update failed.";
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // ---- Delete ----
  const openDelete = (dept: Department) => {
    setDeleteTarget(dept);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteDepartment(deleteTarget.id);
      toast({ title: "Deleted", description: `"${deleteTarget.name}" removed.` });
      setDeleteOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Delete failed.", variant: "destructive" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="View / Edit Departments" description="Browse, edit, and delete departments">
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : departments.length === 0 ? (
        <p className="text-muted-foreground text-sm">No departments found.</p>
      ) : (
        <div className="rounded-lg border border-border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">S/N</TableHead>
                <TableHead>Department Name</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead className="w-28 text-center">Edit</TableHead>
                <TableHead className="w-28 text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((d, i) => (
                <TableRow key={d.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.faculty_name}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(d)}>
                      <Pencil size={16} />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDelete(d)}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>Update the department details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-dept-name">Department Name</Label>
              <Input id="edit-dept-name" value={editName} onChange={(e) => setEditName(e.target.value)} maxLength={120} />
            </div>
            <div className="space-y-2">
              <Label>Faculty</Label>
              <Select value={editFacultyId} onValueChange={setEditFacultyId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((f) => (
                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={saving || !editName.trim() || !editFacultyId}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>"{deleteTarget?.name}"</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ViewEditDepartments;
