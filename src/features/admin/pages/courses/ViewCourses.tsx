import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getCourses, deleteCourse, type Course } from "../../services/courseService";

const ViewCourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch courses.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (course: Course) => {
    if (!confirm(`Are you sure you want to delete ${course.code} - ${course.title}?`)) return;
    
    try {
      await deleteCourse(course.id);
      toast({ title: "Success", description: "Course deleted successfully." });
      fetchData(); // Refresh the list
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete course.", variant: "destructive" });
    }
  };

  return (
    <AdminLayout title="Courses" description="Manage all university courses">
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/admin/courses/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead><TableHead>Title</TableHead><TableHead className="text-center">Units</TableHead><TableHead>Level</TableHead><TableHead>Department</TableHead><TableHead>Semester</TableHead><TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center">Loading courses...</TableCell></TableRow>
            ) : courses.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center">No courses found. Click "Add Course" to create one.</TableCell></TableRow>
            ) : (
              courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.code}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell className="text-center">{course.units}</TableCell>
                <TableCell><Badge variant="outline">{course.level}</Badge></TableCell>
                <TableCell>{course.department}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/admin/courses/edit/${course.id}`)}><Pencil className="mr-2 h-4 w-4" /><span>Edit</span></DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(course)}><Trash2 className="mr-2 h-4 w-4" /><span>Delete</span></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ViewCourses;