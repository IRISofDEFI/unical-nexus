import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MOCK_EXTRA_CHARGES = [
  { id: "1", name: "Late Registration", amount: 5000, type: "Penalty" },
  { id: "2", name: "Transcript Processing", amount: 15000, type: "Service" },
];

const ExtraCharges = () => {
  const [charges, setCharges] = useState(MOCK_EXTRA_CHARGES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", amount: "", type: "" });
  const { toast } = useToast();

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      const newCharge = { id: Date.now().toString(), ...formData, amount: Number(formData.amount) };
      setCharges([...charges, newCharge]);
      setIsDialogOpen(false);
      setLoading(false);
      setFormData({ name: "", amount: "", type: "" });
      toast({ title: "Saved", description: "Extra charge added successfully." });
    }, 500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this charge?")) {
      setCharges(charges.filter(c => c.id !== id));
      toast({ title: "Deleted", description: "Charge removed." });
    }
  };

  return (
    <AdminLayout title="Extra Charges" description="Manage extra/miscellaneous charges">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Extra Charge
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Charge Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount (₦)</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {charges.map((charge) => (
              <TableRow key={charge.id}>
                <TableCell className="font-medium">{charge.name}</TableCell>
                <TableCell>{charge.type}</TableCell>
                <TableCell>₦{charge.amount.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(charge.id)} className="text-destructive" >
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
          <DialogHeader><DialogTitle>Add Extra Charge</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Name</Label><Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Late Registration" /></div>
            <div className="space-y-2"><Label>Type</Label><Input value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} placeholder="e.g. Penalty" /></div>
            <div className="space-y-2"><Label>Amount</Label><Input type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ExtraCharges;
