import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Plus, Edit, Trash2, Loader2, X } from "lucide-react";
import {
  getFeeItems,
  createFeeItem,
  updateFeeItem,
  deleteFeeItem,
  FeeItem,
} from "../services/feeItemService";

const ViewEditFeeItems = () => {
  const [feeItems, setFeeItems] = useState<FeeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeeItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: 0,
  });

  useEffect(() => {
    fetchFeeItems();
  }, []);

  const fetchFeeItems = async () => {
    try {
      const data = await getFeeItems();
      setFeeItems(data);
    } catch (error) {
      console.error("Failed to fetch fee items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateFeeItem(editingItem.id, formData);
      } else {
        await createFeeItem(formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ name: "", description: "", amount: 0 });
      fetchFeeItems();
    } catch (error) {
      console.error("Failed to save fee item", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this fee item?")) {
      try {
        await deleteFeeItem(id);
        fetchFeeItems();
      } catch (error) {
        console.error("Failed to delete fee item", error);
      }
    }
  };

  const openEditModal = (item: FeeItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      amount: item.amount,
    });
    setIsModalOpen(true);
  };

  return (
    <AdminLayout title="Manage Fee Items" description="Configure fee types and amounts">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Fee Items</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ name: "", description: "", amount: 0 });
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Add Fee Item
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 font-medium text-gray-700">Description</th>
                <th className="px-6 py-3 font-medium text-gray-700">Amount (₦)</th>
                <th className="px-6 py-3 font-medium text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feeItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{item.name}</td>
                  <td className="px-6 py-3 text-gray-500">{item.description || "-"}</td>
                  <td className="px-6 py-3 font-medium">₦{Number(item.amount).toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg">{editingItem ? "Edit Fee Item" : "Add Fee Item"}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" required className="input-academic" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="number" required className="input-academic" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="input-academic" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="btn-primary py-2 text-sm">{editingItem ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ViewEditFeeItems;
