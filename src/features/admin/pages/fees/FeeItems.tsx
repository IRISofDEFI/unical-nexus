import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  getFeeItems,
  createFeeItem,
  deleteFeeItem,
  type FeeItem,
} from "../../services/feeItemService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeeItems = () => {
  const [fees, setFees] = useState<FeeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", amount: 0, description: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchFees = async () => {
    setLoading(true);
    try {
      const data = await getFeeItems();
      setFees(data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load fee items.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleCreate = async () => {
    if (!formData.name || formData.amount <= 0) return;
    setSubmitting(true);
    try {
      await createFeeItem(formData);
      toast({ title: "Success", description: "Fee item created successfully." });
      setCreateOpen(false);
      setFormData({ name: "", amount: 0, description: "" });
      fetchFees();
    } catch (error) {
      toast({ title: "Error", description: "Failed to create fee item.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this fee item?")) return;
    try {
      await deleteFeeItem(id);
      toast({ title: "Deleted", description: "Fee item removed successfully." });
      fetchFees();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete fee item.", variant: "destructive" });
    }
  };

  return (
    <AdminLayout title="Fee Items" description="Manage fee configurations">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Fee Item
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount (₦)</TableHead>
              <TableHead className="w-20 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium">{fee.name}</TableCell>
                <TableCell>{fee.description || "-"}</TableCell>
                <TableCell>₦{fee.amount.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(fee.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Fee Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Fee Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Acceptance Fee"
              />
            </div>
            <div className="space-y-2">
              <Label>Amount (₦)</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={submitting || !formData.name || formData.amount <= 0}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default FeeItems;