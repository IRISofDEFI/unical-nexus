import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Plus, Edit, Trash2, Loader2, X } from "lucide-react";
import {
  getResults,
  createResult,
  updateResult,
  deleteResult,
  getStudentsForResults,
  getCoursesForResults,
  Result,
  StudentOption,
  CourseOption,
} from "../services/resultService";

const ViewEditResults = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
    score: 0,
    grade: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultsData, studentsData, coursesData] = await Promise.all([
          getResults(),
          getStudentsForResults(),
          getCoursesForResults(),
        ]);
        setResults(resultsData);
        setStudents(studentsData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await getResults();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch results", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingResult) {
        await updateResult(editingResult.id, formData);
      } else {
        await createResult(formData);
      }
      setIsModalOpen(false);
      setEditingResult(null);
      setFormData({ student_id: "", course_id: "", score: 0, grade: "" });
      fetchResults();
    } catch (error) {
      console.error("Failed to save result", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      try {
        await deleteResult(id);
        fetchResults();
      } catch (error) {
        console.error("Failed to delete result", error);
      }
    }
  };

  const openEditModal = (result: Result) => {
    setEditingResult(result);
    setFormData({
      student_id: result.student_id,
      course_id: result.course_id,
      score: result.score,
      grade: result.grade,
    });
    setIsModalOpen(true);
  };

  return (
    <AdminLayout title="Manage Results" description="Upload and manage student results">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Results</h2>
        <button
          onClick={() => {
            setEditingResult(null);
            setFormData({ student_id: "", course_id: "", score: 0, grade: "" });
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Add Result
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
                <th className="px-6 py-3 font-medium text-gray-700">Student</th>
                <th className="px-6 py-3 font-medium text-gray-700">Course</th>
                <th className="px-6 py-3 font-medium text-gray-700">Score</th>
                <th className="px-6 py-3 font-medium text-gray-700">Grade</th>
                <th className="px-6 py-3 font-medium text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{result.student_name} <span className="text-gray-500 text-xs">({result.student_matric})</span></td>
                  <td className="px-6 py-3">{result.course_code}</td>
                  <td className="px-6 py-3">{result.score}</td>
                  <td className="px-6 py-3 font-bold">{result.grade}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(result)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(result.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
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
              <h3 className="font-semibold text-lg">{editingResult ? "Edit Result" : "Add Result"}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                <select required className="input-academic" value={formData.student_id} onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}>
                  <option value="">Select Student</option>
                  {students.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select required className="input-academic" value={formData.course_id} onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}>
                  <option value="">Select Course</option>
                  {courses.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                  <input type="number" required className="input-academic" value={formData.score} onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <input type="text" required maxLength={2} className="input-academic" value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value.toUpperCase() })} />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="btn-primary py-2 text-sm">{editingResult ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ViewEditResults;
