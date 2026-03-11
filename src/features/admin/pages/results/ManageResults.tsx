import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadResult } from "../../services/resultService";

const ManageResults = () => {
  const [session, setSession] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !course || !file) {
      toast({ title: "Error", description: "Please fill all fields and select a file.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("session", session);
    formData.append("course", course);
    formData.append("file", file);

    try {
      await uploadResult(formData);
      toast({ title: "Success", description: `Results for ${course} uploaded successfully.` });
      setFile(null);
    } catch { toast({ title: "Error", description: "Upload failed.", variant: "destructive" }); }
    finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Upload Results" description="Upload student results for a specific session and course">
      <div className="max-w-2xl mx-auto mt-8">
        <div className="card-academic p-8">
          <form onSubmit={handleUpload} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Session</Label>
                <Select value={session} onValueChange={setSession}>
                  <SelectTrigger><SelectValue placeholder="Select Session" /></SelectTrigger>
                  <SelectContent><SelectItem value="2024/2025">2024/2025</SelectItem><SelectItem value="2023/2024">2023/2024</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Semester</Label>
                <Select defaultValue="First">
                  <SelectTrigger><SelectValue placeholder="Select Semester" /></SelectTrigger>
                  <SelectContent><SelectItem value="First">First</SelectItem><SelectItem value="Second">Second</SelectItem></SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger><SelectValue placeholder="Select Course" /></SelectTrigger>
                <SelectContent><SelectItem value="CSC 301">CSC 301 - Structured Programming</SelectItem><SelectItem value="CSC 303">CSC 303 - Web Design</SelectItem></SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Result File (CSV/Excel)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-muted/30 transition-colors cursor-pointer relative">
                <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files?.[0] || null)} accept=".csv,.xlsx,.xls" />
                <div className="flex flex-col items-center gap-2">
                  {file ? <FileText className="h-10 w-10 text-primary" /> : <Upload className="h-10 w-10 text-muted-foreground" />}
                  <span className="text-sm font-medium text-foreground">{file ? file.name : "Click to upload or drag and drop"}</span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Uploading..." : "Upload Results"}</Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageResults;