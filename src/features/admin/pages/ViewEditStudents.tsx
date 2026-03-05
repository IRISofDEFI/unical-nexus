import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Plus, Edit, Trash2, Loader2, X } from "lucide-react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getDepartmentsForStudents,
  Student,
  DepartmentOption,
} from "../services/studentService";

const ViewEditStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    matric_number: "",
    department_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, departmentsData] = await Promise.all([
          getStudents(),
          getDepartmentsForStudents(),
        ]);
        setStudents(studentsData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
      } else {
        await createStudent(formData);
      }
      setIsModalOpen(false);
      setEditingStudent(null);
      setFormData({ full_name: "", matric_number: "", department_id: "" });
      fetchStudents();
    } catch (error) {
      console.error("Failed to save student", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error("Failed to delete student", error);
      }
    }
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      full_name: student.full_name,
      matric_number: student.matric_number,
      department_id: student.department_id,
    });
    setIsModalOpen(true);
  };

  return (
    <AdminLayout title="Manage Students" description="Register and manage student records">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Students</h2>
        <button
          onClick={() => {
            setEditingStudent(null);
            setFormData({ full_name: "", matric_number: "", department_id: "" });
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Add Student
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
                <th className="px-6 py-3 font-medium text-gray-700">Full Name</th>
                <th className="px-6 py-3 font-medium text-gray-700">Matric Number</th>
                <th className="px-6 py-3 font-medium text-gray-700">Department</th>
                <th className="px-6 py-3 font-medium text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{student.full_name}</td>
                  <td className="px-6 py-3">{student.matric_number}</td>
                  <td className="px-6 py-3">{student.department_name}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(student)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(student.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
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
              <h3 className="font-semibold text-lg">{editingStudent ? "Edit Student" : "Add Student"}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required className="input-academic" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matric Number</label>
                <input type="text" required className="input-academic" value={formData.matric_number} onChange={(e) => setFormData({ ...formData, matric_number: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select required className="input-academic" value={formData.department_id} onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}>
                  <option value="">Select Department</option>
                  {departments.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="btn-primary py-2 text-sm">{editingStudent ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ViewEditStudents;
