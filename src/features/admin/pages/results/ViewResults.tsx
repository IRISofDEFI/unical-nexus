import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { getResults, type ResultBatch } from "../../services/resultService";
import { useToast } from "@/hooks/use-toast";

const ViewResults = () => {
  const [results, setResults] = useState<ResultBatch[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults();
        setResults(data);
      } catch {
        // Silent fail or toast
      }
    };
    fetchResults();
  }, []);

  return (
    <AdminLayout title="View Results" description="Browse and manage uploaded results">
      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-medium">{batch.course}</TableCell>
                <TableCell>{batch.session} ({batch.semester})</TableCell>
                <TableCell>{batch.uploadDate}</TableCell>
                <TableCell>{batch.totalStudents}</TableCell>
                <TableCell><Badge variant={batch.status === "Published" ? "default" : "secondary"}>{batch.status}</Badge></TableCell>
                <TableCell className="text-center space-x-2">
                  <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {results.length === 0 && <TableRow><TableCell colSpan={6} className="text-center h-24 text-muted-foreground">No results found.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ViewResults;
