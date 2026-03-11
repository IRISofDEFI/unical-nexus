import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, ArrowLeft } from "lucide-react";

const AddFeeItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", amount: "", description: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: "Success", description: "Fee item created successfully." });
      navigate(-1);
    } catch (error) {
      toast({ title: "Error", description: "Failed to create fee item.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Fee Item" description="Create a new fee configuration">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      
      <div className="max-w-2xl mx-auto rounded-lg border border-border bg-background p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Fee Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Acceptance Fee" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₦)</Label>
            <Input id="amount" type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description of the fee" />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}><Save className="mr-2 h-4 w-4" />{loading ? "Saving..." : "Save Fee Item"}</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddFeeItem;
