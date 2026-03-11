import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { getResults, type ResultBatch } from "../../services/resultService";

const DownloadResults = () => {
  const [results, setResults] = useState<ResultBatch[]>([]);

  useEffect(() => {
    getResults().then(setResults).catch(() => {});
  }, []);

  const handleDownload = (id: string) => {
    // Logic to trigger download
    window.open(`https://unical-nexus-backend.onrender.com/api/results/${id}/download`, '_blank');
  };

  return (
    <AdminLayout title="Download Results" description="Download result sheets and broadsheets">
      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-medium">{batch.course}</TableCell>
                <TableCell>{batch.session}</TableCell>
                <TableCell>{batch.semester}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleDownload(batch.id)}>
                    <Download className="mr-2 h-4 w-4" /> CSV
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {results.length === 0 && <TableRow><TableCell colSpan={4} className="text-center h-24 text-muted-foreground">No results available.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default DownloadResults;
