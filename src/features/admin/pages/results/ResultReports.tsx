import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import { getResults } from "../../services/resultService";

const ResultReports = () => {
  const [stats, setStats] = useState({ totalBatches: 0, totalStudents: 0, passed: 0 });

  useEffect(() => {
    getResults().then(data => {
      const totalStudents = data.reduce((acc, curr) => acc + curr.totalStudents, 0);
      setStats({
        totalBatches: data.length,
        totalStudents,
        passed: Math.floor(totalStudents * 0.85) // Mock pass rate logic
      });
    }).catch(() => {});
  }, []);

  return (
    <AdminLayout title="Result Reports" description="Overview of result processing and performance">
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Results Uploaded</CardTitle><BarChart3 className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.totalBatches}</div><p className="text-xs text-muted-foreground">Courses processed</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Students Graded</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.totalStudents}</div><p className="text-xs text-muted-foreground">Total records</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pass Rate (Est.)</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" /></CardHeader>
          <CardContent><div className="text-2xl font-bold">85%</div><p className="text-xs text-muted-foreground">+2.5% from last session</p></CardContent>
        </Card>
      </div>
      
      <div className="rounded-lg border border-border bg-background p-8 text-center text-muted-foreground">
        <p>Detailed breakdown and charts will appear here after more data is collected.</p>
      </div>
    </AdminLayout>
  );
};

export default ResultReports;
