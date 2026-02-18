import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import {
  createDepartment,
  getFaculties,
  type FacultyOption,
} from "../../services/departmentService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const AddDepartment = () => {
  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [faculties, setFaculties] = useState<FacultyOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [facultiesLoading, setFacultiesLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getFaculties()
      .then(setFaculties)
      .catch(() =>
        toast({ title: "Error", description: "Failed to load faculties.", variant: "destructive" })
      )
      .finally(() => setFacultiesLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || !facultyId) return;

    setLoading(true);
    try {
      await createDepartment({ name: trimmed, faculty_id: facultyId });
      toast({ title: "Department created", description: `"${trimmed}" has been added.` });
      navigate("/admin/departments/view-edit");
    } catch (err: any) {
      const msg = err?.message?.includes("unique")
        ? "A department with this name already exists."
        : "Failed to create department.";
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Department" description="Create a new department">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg">New Department</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dept-name">Department Name</Label>
              <Input
                id="dept-name"
                placeholder="e.g. Computer Science"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={120}
              />
            </div>

            <div className="space-y-2">
              <Label>Faculty</Label>
              <Select value={facultyId} onValueChange={setFacultyId} required>
                <SelectTrigger>
                  <SelectValue placeholder={facultiesLoading ? "Loading…" : "Select faculty"} />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={loading || !name.trim() || !facultyId}>
              {loading ? "Creating…" : "Create Department"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AddDepartment;
