import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  getSemesters,
  createSemester,
  deleteSemester,
  getSessionsForSemesters,
  type Semester,
  type SessionOption,
} from "../../services/semesterService";
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
} from "@/components/ui/dialog";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Semesters = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [sessions, setSessions] = useState<SessionOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", session_id: "", start_date: "", end_date: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [semData, sessData] = await Promise.all([getSemesters(), getSessionsForSemesters()]);
      setSemesters(semData);
      setSessions(sessData);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!formData.name || !formData.session_id || !formData.start_date || !formData.end_date) return;
    setSubmitting(true);
    try {
      await createSemester(formData);
      toast({ title: "Success", description: "Semester created successfully." });
      setCreateOpen(false);
      setFormData({ name: "", session_id: "", start_date: "", end_date: "" });
      fetchData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to create semester.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this semester?")) return;
    try {
      await deleteSemester(id);
      toast({ title: "Deleted", description: "Semester removed successfully." });
      fetchData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete semester.", variant: "destructive" });
    }
  };

  return (
    <AdminLayout title="Semesters" description="Manage academic semesters">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Semester
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Semester Name</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="w-20 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters.map((sem) => (
              <TableRow key={sem.id}>
                <TableCell className="font-medium">{sem.name}</TableCell>
                <TableCell>{sem.session_name || "N/A"}</TableCell>
                <TableCell>{sem.start_date}</TableCell>
                <TableCell>{sem.end_date}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(sem.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Semester</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Semester Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. First Semester"
              />
            </div>
            <div className="space-y-2">
              <Label>Session</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.session_id}
                onChange={(e) => setFormData({ ...formData, session_id: e.target.value })}
              >
                <option value="">Select Session</option>
                {sessions.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={submitting || !formData.name || !formData.session_id || !formData.start_date || !formData.end_date}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Semesters;