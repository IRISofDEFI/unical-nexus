import { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  getFaculties,
  updateFaculty,
  deleteFaculty,
  type Faculty,
} from "../../services/facultyService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ViewEditFaculties = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Faculty | null>(null);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Faculty | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFaculties();
      setFaculties(data);
    } catch {
      toast({ title: "Error", description: "Failed to load faculties.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ---- Edit handlers ----
  const openEdit = (faculty: Faculty) => {
    setEditTarget(faculty);
    setEditName(faculty.name);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!editTarget || !editName.trim()) return;
    setSaving(true);
    try {
      await updateFaculty(editTarget.id, { name: editName.trim() });
      toast({ title: "Updated", description: `Faculty renamed to "${editName.trim()}".` });
      setEditOpen(false);
      fetchData();
    } catch {
      toast({ title: "Error", description: "Update failed.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // ---- Delete handlers ----
  const openDelete = (faculty: Faculty) => {
    setDeleteTarget(faculty);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteFaculty(deleteTarget.id);
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
    <AdminLayout title="View / Edit Faculties" description="Browse, edit, and delete faculties">
      {loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : faculties.length === 0 ? (
        <p className="text-muted-foreground text-sm">No faculties found.</p>
      ) : (
        <div className="rounded-lg border border-border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">S/N</TableHead>
                <TableHead>Faculty Name</TableHead>
                <TableHead className="w-28 text-center">Edit</TableHead>
                <TableHead className="w-28 text-center">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculties.map((f, i) => (
                <TableRow key={f.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{f.name}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(f)}>
                      <Pencil size={16} />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDelete(f)}>
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
            <DialogTitle>Edit Faculty</DialogTitle>
            <DialogDescription>Update the faculty name below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="edit-name">Faculty Name</Label>
            <Input
              id="edit-name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              maxLength={120}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={saving || !editName.trim()}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Faculty</DialogTitle>
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

export default ViewEditFaculties;
