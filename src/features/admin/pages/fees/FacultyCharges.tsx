import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const MOCK_CHARGES = [
  { id: "1", faculty: "Faculty of Science", department: "Computer Science", level: "100", amount: 45000, session: "2024/2025" },
  { id: "2", faculty: "Faculty of Science", department: "Microbiology", level: "100", amount: 42000, session: "2024/2025" },
];

const FacultyCharges = () => {
  const [charges, setCharges] = useState(MOCK_CHARGES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ faculty: "", department: "", level: "", amount: "", session: "" });
  const { toast } = useToast();

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      const newCharge = { id: Date.now().toString(), ...formData, amount: Number(formData.amount) };
      setCharges([...charges, newCharge]);
      setIsDialogOpen(false);
      setLoading(false);
      setFormData({ faculty: "", department: "", level: "", amount: "", session: "" });
      toast({ title: "Saved", description: "Faculty charge added successfully." });
    }, 500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this charge?")) {
      setCharges(charges.filter(c => c.id !== id));
      toast({ title: "Deleted", description: "Charge removed." });
    }
  };

  return (
    <AdminLayout title="Faculty Charges" description="Manage faculty-specific charges">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Charge
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Faculty</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Amount (₦)</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {charges.map((charge) => (
              <TableRow key={charge.id}>
                <TableCell>{charge.faculty}</TableCell>
                <TableCell>{charge.department}</TableCell>
                <TableCell>{charge.level}</TableCell>
                <TableCell>{charge.session}</TableCell>
                <TableCell>₦{charge.amount.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(charge.id)} className="text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Faculty Charge</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Faculty</Label><Input value={formData.faculty} onChange={e => setFormData({...formData, faculty: e.target.value})} placeholder="e.g. Science" /></div><div className="space-y-2"><Label>Department</Label><Input value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} placeholder="e.g. Computer Science" /></div></div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Level</Label><Input value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} placeholder="e.g. 100" /></div><div className="space-y-2"><Label>Session</Label><Input value={formData.session} onChange={e => setFormData({...formData, session: e.target.value})} placeholder="e.g. 2024/2025" /></div></div>
            <div className="space-y-2"><Label>Amount</Label><Input type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default FacultyCharges;
