import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Printer } from "lucide-react";

// Mock result data
const MOCK_RESULTS = [
  { code: "CSC 201", title: "Computer Programming II", unit: 3, grade: "A", point: 5 },
  { code: "CSC 203", title: "Operating Systems I", unit: 3, grade: "B", point: 4 },
  { code: "MTH 201", title: "Mathematical Methods", unit: 3, grade: "A", point: 5 },
  { code: "GST 201", title: "Peace & Conflict Resolution", unit: 2, grade: "C", point: 3 },
];

const CheckResults = () => {
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [resultsVisible, setResultsVisible] = useState(false);

  const handleCheckResult = () => {
    if (session && semester) {
      // In a real app, fetch results here
      setResultsVisible(true);
    }
  };

  const calculateGPA = () => {
    const totalPoints = MOCK_RESULTS.reduce((acc, curr) => acc + (curr.unit * curr.point), 0);
    const totalUnits = MOCK_RESULTS.reduce((acc, curr) => acc + curr.unit, 0);
    return (totalPoints / totalUnits).toFixed(2);
  };

  return (
    <div className="container-academic py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Check Results</h1>
        <p className="text-muted-foreground">View your semester results and academic standing.</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
            <CardTitle className="text-lg">Select Session & Semester</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Session</Label>
              <Select value={session} onValueChange={setSession}>
                <SelectTrigger><SelectValue placeholder="Select Session" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023/2024">2023/2024</SelectItem>
                  <SelectItem value="2022/2023">2022/2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger><SelectValue placeholder="Select Semester" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="First">First Semester</SelectItem>
                  <SelectItem value="Second">Second Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleCheckResult} disabled={!session || !semester} className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" /> View Result
          </Button>
        </CardContent>
      </Card>

      {resultsVisible && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Result Sheet ({session} - {semester})</CardTitle>
            <Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Course Code</TableHead><TableHead>Title</TableHead><TableHead>Unit</TableHead><TableHead>Grade</TableHead><TableHead className="text-right">Points</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_RESULTS.map((res, index) => (<TableRow key={index}><TableCell className="font-medium">{res.code}</TableCell><TableCell>{res.title}</TableCell><TableCell>{res.unit}</TableCell><TableCell>{res.grade}</TableCell><TableCell className="text-right">{res.point}</TableCell></TableRow>))}
                <TableRow className="bg-muted/50 font-bold"><TableCell colSpan={2}>Total</TableCell><TableCell>{MOCK_RESULTS.reduce((a, b) => a + b.unit, 0)}</TableCell><TableCell>GPA</TableCell><TableCell className="text-right">{calculateGPA()}</TableCell></TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CheckResults;