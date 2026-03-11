import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getFeeItems, createFeeItem, updateFeeItem, deleteFeeItem, type FeeItem } from "../../services/feeService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ViewEditFeeItems = () => {
  const [fees, setFees] = useState<FeeItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeItem | null>(null);
  const [formData, setFormData] = useState({ name: "", amount: "", description: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchFees = async () => {
    try {
      const data = await getFeeItems();
      setFees(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch fee items.", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchFees();
    // eslint-disable-next-line
  }, []);

  const openDialog = (fee: FeeItem | null = null) => {
    setEditingFee(fee);
    setFormData(fee ? { name: fee.name, amount: fee.amount.toString(), description: fee.description || "" } : { name: "", amount: "", description: "" });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.amount) return;
    setLoading(true);
    try {
      const payload = { ...formData, amount: Number(formData.amount) };
      if (editingFee) {
        await updateFeeItem(editingFee.id, payload);
        toast({ title: "Updated", description: "Fee item updated successfully." });
      } else {
        await createFeeItem(payload);
        toast({ title: "Created", description: "Fee item created successfully." });
      }
      setIsDialogOpen(false);
      fetchFees();
    } catch (error) {
      toast({ title: "Error", description: "Operation failed.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteFeeItem(id);
      toast({ title: "Deleted", description: "Fee item removed." });
      fetchFees();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete item.", variant: "destructive" });
    }
  };

  return (
    <AdminLayout title="Fee Items" description="Configure fee items for the university">
      <div className="flex justify-end mb-4">
        <Button onClick={() => openDialog()}><Plus className="mr-2 h-4 w-4" /> Add Fee Item</Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Name</TableHead><TableHead>Description</TableHead><TableHead>Amount (₦)</TableHead><TableHead className="text-center">Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium">{fee.name}</TableCell>
                <TableCell>{fee.description || "-"}</TableCell>
                <TableCell>₦{fee.amount.toLocaleString()}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => openDialog(fee)}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(fee.id)} className="text-destructive"><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingFee ? "Edit Fee Item" : "Add Fee Item"}</DialogTitle>
            <DialogDescription>{editingFee ? "Update fee configuration" : "Create a new fee type"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><Label>Name</Label><Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Tuition" /></div>
            <div className="space-y-2"><Label>Amount</Label><Input type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} /></div>
            <div className="space-y-2"><Label>Description</Label><Input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ViewEditFeeItems;
