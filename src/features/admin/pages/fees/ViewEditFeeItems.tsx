import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getFeeItems, type FeeItem } from "../../services/feeItemService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ViewEditFeeItems = () => {
  const [fees, setFees] = useState<FeeItem[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);
  const { toast } = useToast();

  const fetchFees = async () => {
    try {
      const data = await getFeeItems();
      setFees(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleEditClick = (fee: FeeItem) => {
    setSelectedFee(fee);
    setEditOpen(true);
  };

  const handleSave = () => {
    // Mock save functionality
    toast({ title: "Updated", description: "Fee item updated successfully." });
    setEditOpen(false);
    fetchFees(); // Refresh
  };

  return (
    <AdminLayout title="View / Edit Fee Items" description="Browse and edit all configured fee items">
      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount (₦)</TableHead>
              <TableHead className="w-20 text-center">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium">{fee.name}</TableCell>
                <TableCell>{fee.description || "-"}</TableCell>
                <TableCell>₦{fee.amount.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(fee)}>
                    <Pencil size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Fee Item</DialogTitle></DialogHeader>
          {selectedFee && (
            <div className="space-y-4 py-2">
              <div className="space-y-2"><Label>Name</Label><Input defaultValue={selectedFee.name} /></div>
              <div className="space-y-2"><Label>Amount</Label><Input type="number" defaultValue={selectedFee.amount} /></div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button><Button onClick={handleSave}>Save Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ViewEditFeeItems;
