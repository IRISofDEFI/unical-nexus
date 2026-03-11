import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

// Mock available courses
const AVAILABLE_COURSES = [
  { id: "1", code: "CSC 301", title: "Structured Programming", units: 3, status: "Core" },
  { id: "2", code: "CSC 303", title: "Introduction to Web Design", units: 2, status: "Core" },
  { id: "3", code: "GSS 301", title: "Entrepreneurship Studies", units: 2, status: "GSS" },
  { id: "4", code: "MTH 301", title: "Abstract Algebra", units: 3, status: "Elective" },
];

const CourseRegistration = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState(AVAILABLE_COURSES);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // In a real app, we would fetch courses based on student level/department here
  useEffect(() => {
    // Simulate fetch
  }, []);

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleRegister = async () => {
    if (selectedCourses.length === 0) {
      toast({ title: "Error", description: "Please select at least one course.", variant: "destructive" });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Success", description: "Courses registered successfully." });
      // Redirect or update UI state
    }, 1500);
  };

  const totalUnits = courses
    .filter(c => selectedCourses.includes(c.id))
    .reduce((sum, c) => sum + c.units, 0);

  return (
    <div className="container-academic py-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Course Registration</h1>
        <p className="text-muted-foreground">Select courses for the 2024/2025 First Semester.</p>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 bg-muted/30 border-b border-border flex justify-between items-center">
            <span className="font-medium">Available Courses</span>
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                Total Units Selected: {totalUnits}
            </span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedCourses.includes(course.id)}
                    onCheckedChange={() => handleToggleCourse(course.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{course.code}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.units}</TableCell>
                <TableCell>{course.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleRegister} disabled={loading} size="lg">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</> : <><Save className="mr-2 h-4 w-4" /> Register Courses</>}
        </Button>
      </div>
    </div>
  );
};

export default CourseRegistration;