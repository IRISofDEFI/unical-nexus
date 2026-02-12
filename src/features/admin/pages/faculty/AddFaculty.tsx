import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { createFaculty } from "../../services/facultyService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const AddFaculty = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      await createFaculty({ name: trimmed });
      toast({ title: "Faculty created", description: `"${trimmed}" has been added.` });
      navigate("/admin/faculty/view");
    } catch {
      toast({ title: "Error", description: "Failed to create faculty.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Faculty" description="Create a new faculty">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg">New Faculty</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="faculty-name">Faculty Name</Label>
              <Input
                id="faculty-name"
                placeholder="e.g. Faculty of Science"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={120}
              />
            </div>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? "Creating…" : "Create Faculty"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AddFaculty;
