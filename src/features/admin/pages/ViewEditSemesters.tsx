import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Plus, Edit, Trash2, Loader2, X } from "lucide-react";
import {
  getSemesters,
  createSemester,
  updateSemester,
  deleteSemester,
  getSessionsForSemesters,
  Semester,
  SessionOption,
} from "../services/semesterService";

const ViewEditSemesters = () => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [sessions, setSessions] = useState<SessionOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    session_id: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [semestersData, sessionsData] = await Promise.all([
          getSemesters(),
          getSessionsForSemesters(),
        ]);
        setSemesters(semestersData);
        setSessions(sessionsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchSemesters = async () => {
    try {
      const data = await getSemesters();
      setSemesters(data);
    } catch (error) {
      console.error("Failed to fetch semesters", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSemester) {
        await updateSemester(editingSemester.id, formData);
      } else {
        await createSemester(formData);
      }
      setIsModalOpen(false);
      setEditingSemester(null);
      setFormData({ name: "", session_id: "", start_date: "", end_date: "" });
      fetchSemesters();
    } catch (error) {
      console.error("Failed to save semester", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this semester?")) {
      try {
        await deleteSemester(id);
        fetchSemesters();
      } catch (error) {
        console.error("Failed to delete semester", error);
      }
    }
  };

  const openEditModal = (semester: Semester) => {
    setEditingSemester(semester);
    setFormData({
      name: semester.name,
      session_id: semester.session_id,
      start_date: semester.start_date,
      end_date: semester.end_date,
    });
    setIsModalOpen(true);
  };

  return (
    <AdminLayout title="Manage Semesters" description="Configure semesters within sessions">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Semesters</h2>
        <button
          onClick={() => {
            setEditingSemester(null);
            setFormData({ name: "", session_id: "", start_date: "", end_date: "" });
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Add Semester
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
                <th className="px-6 py-3 font-medium text-gray-700">Session</th>
                <th className="px-6 py-3 font-medium text-gray-700">Start Date</th>
                <th className="px-6 py-3 font-medium text-gray-700">End Date</th>
                <th className="px-6 py-3 font-medium text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {semesters.map((semester) => (
                <tr key={semester.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{semester.name}</td>
                  <td className="px-6 py-3">{semester.session_name}</td>
                  <td className="px-6 py-3">{semester.start_date}</td>
                  <td className="px-6 py-3">{semester.end_date}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(semester)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(semester.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {semesters.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No semesters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg">
                {editingSemester ? "Edit Semester" : "Add New Semester"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. First Semester"
                  className="input-academic"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                <select
                  required
                  className="input-academic"
                  value={formData.session_id}
                  onChange={(e) => setFormData({ ...formData, session_id: e.target.value })}
                >
                  <option value="">Select Session</option>
                  {sessions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    className="input-academic"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    className="input-academic"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary py-2 text-sm">
                  {editingSemester ? "Update Semester" : "Create Semester"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ViewEditSemesters;
