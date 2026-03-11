import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createCourse } from "../../services/courseService";
import { getDepartments, type Department } from "../../services/departmentService";
import { Save, ArrowLeft } from "lucide-react";


const AddCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "", code: "", units: "", level: "", semester: "", department_id: "", description: "",
  });
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const depts = await getDepartments();
        setDepartments(depts);
      } catch (error) {
        toast({ title: "Error", description: "Failed to load departments.", variant: "destructive" });
      }
    };
    fetchDepartments();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.code || !formData.units || !formData.level || !formData.semester || !formData.department_id) {
        toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
        return;
    }
    
    setLoading(true);
    try {
      await createCourse(formData);
      toast({ title: "Success", description: "Course created successfully." });
      navigate("/admin/courses/view");
    } catch (error) {
      toast({ title: "Error", description: "Failed to create course.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Course" description="Create a new course for the university curriculum">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate("/admin/courses/view")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>
      </div>
      
      <div className="max-w-3xl mx-auto rounded-lg border border-border bg-background p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label htmlFor="title">Course Title</Label><Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Introduction to Programming" required /></div>
            <div className="space-y-2"><Label htmlFor="code">Course Code</Label><Input id="code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="e.g. CSC 101" required /></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2"><Label htmlFor="units">Credit Units</Label><Input id="units" type="number" value={formData.units} onChange={(e) => setFormData({ ...formData, units: e.target.value })} required /></div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, level: value })} value={formData.level}><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent><SelectItem value="100">100 Level</SelectItem><SelectItem value="200">200 Level</SelectItem><SelectItem value="300">300 Level</SelectItem><SelectItem value="400">400 Level</SelectItem><SelectItem value="500">500 Level</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, semester: value })} value={formData.semester}><SelectTrigger><SelectValue placeholder="Select semester" /></SelectTrigger>
                <SelectContent><SelectItem value="First">First Semester</SelectItem><SelectItem value="Second">Second Semester</SelectItem></SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, department_id: value })} value={formData.department_id}><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>{departments.map(dep => (<SelectItem key={dep.id} value={dep.id}>{dep.name}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Briefly describe the course content and objectives." />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}><Save className="mr-2 h-4 w-4" />{loading ? "Saving..." : "Save Course"}</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddCourse;